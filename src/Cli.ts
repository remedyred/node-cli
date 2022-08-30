import {fileExists, findUp, getFileJson, parseImports} from '@snickbit/node-utilities'
import {Out} from '@snickbit/out'
import {arrayWrap, camelCase, isArray, isCallable, isEmpty, isNumber, kebabCase, objectClone, objectFindKey, parseOptions, typeOf} from '@snickbit/utilities'
import {Action, ActionDefinition, Actions, Arg, Args, CLISettings, ConfigHandler, Option, Options, ParsedArgs, RawActions, State} from './definitions'
import {allowed_keys, default_state, loadedConfig} from './config'
import {chunkArguments, CliOption, CliOptions, default_options, extra_options, formatValue, helpOut, hideBin, object_options, option_not_predicate, options_equal_predicate, parseDelimited, printLine, space} from './helpers'
import {lilconfig, LilconfigResult, Options as ConfigOptions} from 'lilconfig'
import parser from 'yargs-parser'

/**
 * Simple Node.js CLI framework for creating command line applications.
 */
export class Cli<T extends ParsedArgs = any> {
	#out: Out = new Out('node-cli')
	protected appPrefix: string
	protected appOut: Out
	protected asAction = false
	protected state: State<T>
	protected hasRun = false
	protected _configHandler?: ConfigHandler
	private static _instance: Cli

	/**
	 * Create a new Cli instance.
	 */
	constructor(args?: T, options?: CLISettings)
	constructor(name?: string, args?: T, options?: CLISettings)
	constructor(nameOrArgs?: T | string, optionalArgsOrOptions?: CLISettings | T, optionalOptions?: CLISettings) {
		let $cli: Cli

		if (Cli._instance) {
			$cli = Cli._instance
		} else {
			$cli = Cli._instance = this
			$cli.state = objectClone(default_state) as State
		}

		let name: string
		let args: T
		let options: CLISettings

		$cli.#out.debug('Initializing CLI')

		if (typeof nameOrArgs === 'string') {
			name = nameOrArgs
			args = optionalArgsOrOptions as T | undefined
			options = optionalOptions as CLISettings | undefined
		} else {
			args = nameOrArgs as T | undefined
			options = optionalArgsOrOptions as CLISettings | undefined
			name = options?.name
		}

		if (args) {
			$cli.#out.debug('Args provided, setting state and asAction')
			Object.assign($cli.state.parsed, args)
			$cli.asAction = true
		}

		if (name) {
			$cli.#out.debug('Name provided, setting')
			$cli.name(name)
		}

		if (options) {
			$cli.#out.debug('Options provided, setting')
			$cli.set(options)
		}

		return $cli
	}

	/**
	 * Get the value of a configuration option for the CLI
	 * @param option - The option to get
	 */
	get<O extends keyof CLISettings>(option: O): State<T>[O] {
		return this.state[option]
	}

	/**
	 * Set a configuration option for the CLI
	 * @param option - The option to set
	 * @param value - The value to set the option to
	 * @throws {Error} - If the option is not supported
	 */
	set<O extends keyof CLISettings>(option: O, value: any)

	/**
	 * Set configuration options for the CLI
	 * @param options - The options to set. These will be merged with the current options.
	 */
	set(options: CLISettings)

	set<O extends keyof CLISettings>(optionOrOptions: CLISettings | O, value?: any): State<T>[O] | this {
		// multiple options
		if (typeof optionOrOptions !== 'string') {
			const options = optionOrOptions as CLISettings
			if (typeof options === 'object' && Object.keys(options).every(k => allowed_keys.includes(k))) {
				this.state = {...this.state || default_state, ...options}
			} else {
				throw new Error('Invalid options')
			}
		} else { // single option
			const option = optionOrOptions as O

			if (option === 'out') {
				// Out specific setter
				this.appOut = value instanceof Out ? value : new Out(value)
			} else if (option === 'name') {
				// Name specific setter
				this.state.name = value
				this.setOutName(value || 'node-cli')
			} else if (allowed_keys.includes(option)) {
				// General setter
				this.state[option] = value
			} else {
				throw new Error(`Unknown option: ${option}`)
			}
		}

		return this
	}

	/**
	 * Enable config file support for the CLI, and define searching options.
	 * @param [defaultConfig]
	 * @param [options]
	 * @see {@link https://github.com/antonk52/lilconfig}
	 */
	config(defaultConfig?: any, options?: ConfigOptions | false): this
	config(defaultConfig: any, handler: ConfigHandler, options?: ConfigOptions | false): this
	config(defaultConfig?: any, handlerOrConfig?: ConfigHandler | ConfigOptions | false, optionalOptions?: ConfigOptions | false): this {
		let config: ConfigOptions | false
		let handler: ConfigHandler

		if (optionalOptions !== void 0 || isCallable(handlerOrConfig)) {
			handler = handlerOrConfig as ConfigHandler
			config = optionalOptions
		} else {
			config = handlerOrConfig as ConfigOptions | false
		}

		if (config !== false) {
			config = config || {}
			this.state = {
				...this.state,
				config: {
					searchPlaces: [
						'package.json',
						`.${this.$name}rc.json`,
						`.${this.$name}rc.js`,
						`${this.$name}.json`,
						`${this.$name}.config.json`,
						`${this.$name}.config.js`,
						`.${this.$name}rc.cjs`,
						`${this.$name}.config.cjs`
					],
					...config
				},
				default_config: defaultConfig
			} as State<T>

			if (handler) {
				this._configHandler = handler
			}

			if (!this.state.options['config']) {
				this.option('config', 		{
					alias: 'c',
					describe: 'Configuration file path',
					type: 'string',
					preset: true
				})
			}
		} else {
			if (this.state.config) {
				delete this.state.config
			}

			if (this.state.options['config'] && this.state.options['config'].preset) {
				delete this.state.options['config']
			}

			if (this.state.default_config) {
				delete this.state.default_config
			}
		}

		return this
	}

	configHandler(handler: ConfigHandler) {
		this._configHandler = handler
	}

	/**
	 * Get the app Out instance, or fallback to the default Out instance.
	 */
	get $out() {
		return this.appOut || this.#out
	}

	/**
	 * Set the name of the CLI.
	 */
	get $name(): string {
		return this.asAction && this.state.action ? this.state.action : this.state.name
	}

	/**
	 * Add a single action to the CLI.
	 * @param action
	 * @protected
	 */
	protected addAction(action: ActionDefinition): this {
		if (Object.keys(action).length === 0) {
			return
		}

		this.state.actions[action.name] = action

		if (!this.state.args) {
			this.state.args = {}
		}

		if (!this.state.args?.action) {
			this.state.args.action = {
				describe: 'Action to run',
				type: 'string',
				choices: Object.keys(this.state.actions)
			}
		}
	}

	/**
	 * Parse the options definitions
	 * @protected
	 */
	protected parseOptions() {
		const opts: Partial<CliOptions> = {...default_options}

		function pushOpts(key, value) {
			if (!opts[key]) {
				opts[key] = []
			}
			if (!opts[key].includes(value)) {
				opts[key].push(value)
			}
		}

		function pushKey(opt: CliOption) {
			if (!opts.keys) {
				opts.keys = []
			}
			if (!opts.keys.includes(opt)) {
				opts.keys.push(opt)
			}
		}

		// loop through all options
		for (const [opt, config] of Object.entries(this.state.options)) {
			// loop through all configuration entries
			if (!config.type) {
				config.type = 'boolean'
			}
			for (const [key, value] of Object.entries(config)) {
				if (key in opts) {
					if (object_options.includes(key)) {
						if (!opts[key]) {
							opts[key] = {}
						}
						opts[key][opt] = value
					} else {
						pushOpts(key, value)
						pushKey(opt)
					}
				} else if (key === 'type' && typeof value === 'string' && value in opts) {
					if (!opts[value]) {
						opts[value] = []
					}
					pushOpts(value, opt)
					pushKey(opt)
				} else if (!extra_options.includes(key)) {
					this.$out.error(`Unknown option: ${key}`)
				}
			}
		}
		return opts
	}

	/**
	 * Set the name of the Out instance.
	 * @param name
	 * @protected
	 */
	protected setOutName(name: string): Out {
		this.appPrefix = (this.appPrefix ? `${this.appPrefix}:` : '') + name
		this.appOut = new Out(`[${this.appPrefix}]`, {verbosity: 0})
		return this.appOut
	}

	/**
	 * Clean the CLI state
	 * @protected
	 */
	protected cleanState(): this {
		this.state = objectClone(default_state) as State
		return this
	}

	/**
	 * Set the name of the CLI
	 */
	name(name: string): this {
		if (this.asAction) {
			// Set name of action
			this.state.action = name
		} else {
			// Set name of CLI
			this.state.name = name
		}
		this.setOutName(name)
		return this
	}

	/**
	 * Set the version of the CLI
	 */
	version(version: number | string): this {
		this.state.version = version
		return this
	}

	/**
	 * Set the description / banner message of the CLI
	 */
	banner(message: string): this {
		this.state.banner = message
		return this
	}

	/**
	 * Hide the banner message
	 */
	hideBanner(value = true): this {
		this.state.hide_banner = value !== false
		return this
	}

	/**
	 * Attempt to pull the name and version from the closest package.json file to the current working directory.
	 */
	includeWorkingPackage(value = true): this {
		this.state.include_working_package = value !== false
		return this
	}

	/**
	 * Don't kill the process on error
	 */
	noBail(value = false): this {
		this.state.bail = value !== true
		return this
	}

	/**
	 * Add a new flag/option
	 */
	option(key: string, option: Partial<Option>): this {
		this.state.options[key] = option
		return this
	}

	/**
	 * Add new flags/options. Will override existing.
	 */
	options(options: Options): this {
		Object.assign(this.state.options, options)
		return this
	}

	/**
	 * Add new positional argument
	 */
	arg(key: string, defaultArg?: number | string): this
	arg(key: string, arg?: Arg): this
	arg(key: string, argOrDefault?: Arg | number | string): this {
		this.state.args[key] = parseOptions(argOrDefault, {
			name: key,
			key,
			type: 'string'
		}, 'default')
		return this
	}

	/**
	 * Add new positional arguments. Will override existing.
	 */
	args(args: Args): this {
		Object.assign(this.state.args, args)
		return this
	}

	/**
	 * Add a new action
	 */
	action(action: ActionDefinition): this
	action(name: string, action: Action): this
	action(name: string, description: string, action: Action): this
	action(nameOrAction: ActionDefinition | string, descriptionOrAction?: Action | string, optionalAction?: Action): this {
		const definition = {} as ActionDefinition

		if (typeof nameOrAction === 'string') {
			definition.name = nameOrAction

			if (typeof descriptionOrAction === 'string') {
				definition.description = descriptionOrAction
				definition.handler = optionalAction
			} else {
				definition.handler = descriptionOrAction
			}
		} else {
			Object.assign(definition, nameOrAction)
		}

		this.addAction(definition)
		return this
	}

	/**
	 * Add new actions. Will override existing.
	 */
	actions(actions: RawActions): this {
		const parsed: Actions = parseImports<Action>(actions)
		for (const index in parsed) {
			this.addAction(parsed[index])
		}
		return this
	}

	/**
	 * Set the default action
	 */
	defaultAction(name: string): this {
		if (this.state.args?.action) {
			this.state.args.action.default = name
		}
		return this
	}

	/**
	 * Show the help message
	 */
	showHelp() {
		printLine()

		helpOut(`Usage: ${this.appPrefix} [command] [options] [arguments]`)

		printLine()

		if (!isEmpty(this.state.options)) {
			helpOut('Options:')
			for (const [name, item] of Object.entries(this.state.options)) {
				let output = `${space()}--${name}`
				if (item.alias) {
					output += `, -${item.alias}`
				}
				if (item.description) {
					output += space(2) + item.description
				}
				helpOut(output)
			}

			printLine()
		}

		if (!isEmpty(this.state.args)) {
			helpOut('Arguments:')
			for (const [name, item] of Object.entries(this.state.args)) {
				let output = space() + name
				if (item.description) {
					output += space(2) + item.description
				}
				helpOut(output)
			}

			printLine()
		}

		if (!isEmpty(this.state.actions)) {
			helpOut('Actions:')
			for (const [name, item] of Object.entries(this.state.actions)) {
				let output = space() + [name, ...item.aliases].join(', ')
				if (item.description) {
					output += space(2) + item.description
				}
				helpOut(output)
			}

			printLine()
		}
	}

	/**
	 * Show the version message
	 */
	showVersion() {
		if (this.state.version) {
			// use console.log instead of Out because we don't want any special formatting
			console.log(`v${this.state.version}`)
		}
	}

	private getAction(key: string): ActionDefinition | undefined {
		if (key in this.state.actions) {
			this.$out.debug('Found action', key)
			return this.state.actions[key]
		}

		for (const action of Object.values(this.state.actions)) {
			if (action.name === key) {
				this.$out.debug('Found action', key)
				return action
			}

			if (Array.isArray(action.aliases) && action.aliases.includes(key)) {
				this.$out.debug('Found action alias', key)
				return action
			}
		}

		return undefined
	}

	/**
	 * Run the CLI program, parsing the argv, and running any defined actions
	 */
	run(callback?: Action): Promise<any> | any {
		this.hasRun = true
		const args = this.parseArgs()

		if (args.version) {
			return this.showVersion()
		} else if (args.help) {
			return this.showHelp()
		}

		return this.getConfig(args).then(config => {
			if (this.state.actions && Object.keys(this.state.actions).length && args.action) {
				this.#out.debug('Found action and action definitions, running action')
				return this.runAction(args, config)
			} else if (callback) {
				this.#out.debug('Sending args to callback')
				this.cleanState()
				return callback(args, config)
			}
			this.#out.debug('Nothing to run, returning args as resolved promise')
			this.cleanState()

			return {...config, ...args}
		}).catch(error => {
			this.#out.fatal(error)
		})
	}

	/**
	 * Parse the arguments
	 * @protected
	 */
	protected parseArgs(): T {
		let argv: any[] = this.state.argv || hideBin(process.argv)
		const opts = this.parseOptions()
		let preparsed = {} as T
		const overrides: any = {}

		if (!isEmpty(this.state.parsed)) {
			preparsed = this.state.parsed
			argv = []
			if (preparsed._) {
				argv.push(...preparsed._)
				delete preparsed._
			}
			if (preparsed['--']) {
				argv.push(...preparsed['--'])
				delete preparsed['--']
			}

			const override_options = Object.keys(default_state.options)
			for (const override_option of override_options) {
				if (preparsed[override_option] !== default_state.options[override_option].default) {
					overrides[override_option] = preparsed[override_option]
					delete preparsed[override_option]
				}
			}

			for (const [unparsedKey, value] of Object.entries(preparsed)) {
				let key: string
				const alias = objectFindKey(opts.alias, unparsedKey)
				if (alias) {
					delete preparsed[unparsedKey]
					key = alias
					preparsed[key] = value
				} else {
					key = unparsedKey
				}
				if (opts.keys.includes(key)) {
					delete preparsed[key]
					overrides[key] = value
				}
			}
		} else if (!Array.isArray(argv)) {
			this.#out.extra(`type: ${typeOf(argv)}`, argv).fatal('Argument \'argv\' must be an array of strings.')
		}

		// check for explicitly set count options
		if (isArray(opts.count) && opts.count.length) {
			for (const count of opts.count) {
				const count_aliases = [count, ...arrayWrap(opts.alias[count])]
				if (camelCase(count) === count) {
					count_aliases.push(kebabCase(count))
				}

				const count_args = argv.filter(options_equal_predicate(count_aliases))
				if (count_args.length) {
					argv = argv.filter(option_not_predicate(count_aliases))
					for (const count_arg of count_args) {
						const [, count_arg_value] = count_arg.split('=')
						const arg_index = argv.indexOf(count_arg)
						if (arg_index !== -1) {
							argv.splice(argv.indexOf(count_arg), 1)
						}
						const num_arg = Number.parseInt(count_arg_value)
						if (isNumber(count_arg_value) && num_arg > 0) {
							// add count_arg_value number of count_arg to argv
							for (let i = 0; i < num_arg; i++) {
								argv.push(num_arg)
							}
						}
					}
				}
			}
		}

		const parsed = parser(argv, opts)

		const args = {...preparsed, ...parsed, ...overrides}
		args.__ = argv

		this.#out.debug({
			argv,
			opts,
			parsed,
			preparsed,
			overrides,
			args
		})

		// populate args
		const positional = args._.splice(0)
		if (args['--']) {
			positional.push('--', ...args['--'].splice(0)) && delete args['--']
		}
		this.#out.debug('Populated args positional args: ', positional)
		const argument_chunks = chunkArguments(positional)
		let positional_options = argument_chunks.shift()
		this.#out.verbose('positional_options: ', positional_options)
		const missing_required = []
		for (const [key, arg] of Object.entries(this.state.args)) {
			if (arg.type === 'array') {
				args[key] = []
				let values = positional_options.length ? positional_options.splice(0) : arg.default
				this.#out.verbose(`Setting ${key} to array from`, values)

				if (!values || !values.length) {
					continue
				}

				if (arg.delimited) {
					values = parseDelimited(values)
				}

				this.#out.verbose(`Setting ${key} to array from parsed`, values)
				for (const value of values) {
					args[key].push(formatValue(value))
				}
				this.#out.verbose(`Setting ${key} to array`, args[key])
			} else {
				let value = positional_options.shift()
				if (arg.delimited) {
					value = parseDelimited(value)
				}
				args[key] = value ? formatValue(value) : arg.default
				if (!value && arg.required) {
					missing_required.push(key)
				}
				this.#out.verbose(`Setting ${key} to`, args[key])
			}

			if (!positional_options.length && argument_chunks.length) {
				positional_options = argument_chunks.shift()
			}
		}

		if (missing_required.length) {
			this.#out.fatal(`Missing required argument(s):`, missing_required.join(', '))
		}

		// get remaining positional options
		if (positional_options.length || argument_chunks.length) {
			// de-chunk argument_chunks
			for (const chunk of argument_chunks) {
				positional_options.push(...chunk)
			}

			args._ = positional_options.splice(0)
		}

		this.#out.info.debug('Double check default values')
		const needs_default_opts = opts.keys.filter(key => args[key] === undefined && opts.default[key] !== undefined)
		this.$out.debug({needs_default_opts})
		for (const key of needs_default_opts) {
			args[key] = opts.default[key]
		}

		const needs_default_args = Object.keys(this.state.args).filter(key => args[key] === undefined && this.state.args[key].default !== undefined)
		this.$out.debug({needs_default_args})
		for (const key of needs_default_args) {
			args[key] = this.state.args[key].default
		}

		this.#out.info.debug('Set environment variables')
		process.env.VERBOSE = args.verbose
		process.env.FORCE = args.force
		process.env.YES = args.yes
		process.env.DEBUG = args.debug

		if (!this.state.hide_banner && (this.$name || this.state.include_working_package)) {
			let label
			if (this.$name) {
				label = `{magenta}${this.$name}{/magenta}`

				if (this.state.version) {
					label += ` {magenta}v${this.state.version}{/magenta}`
				}
			}

			let message = this.state.banner || ''
			if (this.state.include_working_package) {
				const workingPackageJsonFile = findUp('package.json')
				let workingPackageJson: any = {}
				if (workingPackageJsonFile && fileExists(workingPackageJsonFile)) {
					workingPackageJson = getFileJson(workingPackageJsonFile)
				}

				if (workingPackageJson.name) {
					message += ` {white}${workingPackageJson.name}{/white}`
					if (workingPackageJson.version) {
						if (!String(workingPackageJson.version).startsWith('v')) {
							workingPackageJson.version = `v${workingPackageJson.version}`
						}
						message += ` {cyan}${workingPackageJson.version}{/cyan}`
					}
				}
			}

			if (message) {
				this.$out.block.title.label(label).info(message)
			} else if (label) {
				this.$out.block.info(label)
			}
		}

		this.#out.label('args').verbose(args)
		this.#out.label('opts').verbose(opts)

		this.state.parsed = args

		return args
	}

	/**
	 * Run an action
	 */
	protected async runAction(args: T, config: any): Promise<any> {
		const action = args.action
		args._action = action
		delete args.action
		if (typeOf(action) !== 'string') {
			this.$out.fatal('Argument \'action\' must be a string.', args)
		}

		const _action = this.getAction(action)
		if (!_action) {
			this.$out.fatal(`Unknown action: ${action}`, 'Available actions:', Object.keys(this.state.actions).join(', '))
		}

		this.#out.debug(`Running action: ${action}`)
		this.setOutName(action)

		try {
			const handler = _action.handler
			if (!handler) {
				this.#out.extra(_action).fatal(`Action ${action} does not have a handler`)
			}

			this.cleanState()

			return await handler(args, config)
		} catch (error) {
			if (this.state.bail) {
				this.$out.fatal(`Action ${action} failed`, error)
			} else {
				this.$out.error(`Action ${action} failed`, error)
				return false
			}
		}
	}

	protected async getConfig(args: T): Promise<any> {
		this.#out.debug('Checking for config')

		// Initialize config
		let config: any = this.state.default_config || {}

		// Search for the file with options
		if (this.state.config) {
			this.#out.debug(`Searching for config file matching ${this.$name}`)
			this.#out.verbose('Searching for config file:', this.state.config, 'starting in directory:', process.cwd())

			// initialize lilconfig
			const finder = lilconfig(this.$name, this.state.config)

			let result: LilconfigResult

			// Try to load the config file
			if (args.config) {
				if (!fileExists(args.config)) {
					this.$out.fatal(`Config file ${args.config} does not exist`)
				}

				this.#out.debug('Loading config file from config argument')
				result = await finder.load(args.config)
			} else {
				this.#out.debug('Searching for config file')
				result = await finder.search()
				this.#out.verbose('Config file search results', result)
			}

			// If we found a config file, load it
			if (result) {
				config = {...config, ...result.config}
			} else {
				this.$out.warn('No config file found.')
			}
		} else if (this.asAction) {
			this.#out.debug('Checking for previously loaded config file')
			config = {...config, ...loadedConfig()}
		} else {
			this.#out.warn('No config found.', `asAction: ${this.asAction}`)
		}

		// Override config with args
		this.#out.debug('Overriding config with CLI args')
		for (const key of Object.keys(args)) {
			if (key in config && args[key] !== undefined) {
				config[key] = args[key]
			}
		}

		if (this._configHandler) {
			this.#out.debug('Running config handler')
			try {
				config = await Promise.resolve(this._configHandler(config))
			} catch (error) {
				this.#out.fatal('Config handler failed', error)
			}
		}

		// Save the config, so it can be loaded by child commands
		loadedConfig(config)

		return config
	}
}
