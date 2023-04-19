import {isBundledElectronApp} from '@snickbit/node-utilities'
import {arrayWrap, isNumber} from '@snickbit/utilities'
import {Options} from 'yargs-parser'

/** @internal */
export const options_equal_predicate = options => x => arrayWrap(options).some(option => String(x).startsWith(`--${option}=`))

/** @internal */
export const option_not_predicate = options => x => !arrayWrap(options).some(option => String(x).startsWith(`--${option}`))

/**
 * Get the index of the node bin file
 * @internal
 */
export const getProcessArgvBinIndex = (): number => isBundledElectronApp() ? 0 : 1

/**
 * Remove the node bin file from the process argv
 * @internal
 */
export const hideBin = (argv: string[]): string[] => argv.slice(getProcessArgvBinIndex() + 1)

export type CliOptions = Options & Record<string, any>

export type CliOption = string | keyof CliOptions

export const default_options: CliOptions = {
	alias: undefined,
	array: undefined,
	boolean: undefined,
	config: undefined,
	configObjects: undefined,
	configuration: {
		'boolean-negation': true,
		'camel-case-expansion': true,
		'combine-arrays': false,
		'dot-notation': true,
		'duplicate-arguments-array': true,
		'flatten-duplicate-arrays': true,
		'greedy-arrays': false,
		'halt-at-non-option': false,
		'nargs-eats-options': false,
		'negation-prefix': 'no-',
		'parse-numbers': true,
		'parse-positional-numbers': true,
		'populate--': true,
		'set-placeholder-key': false,
		'short-option-groups': true,
		'strip-aliased': true,
		'strip-dashed': true,
		'unknown-options-as-args': false
	},
	coerce: undefined,
	count: undefined,
	default: undefined,
	envPrefix: undefined,
	narg: undefined,
	normalize: undefined,
	string: undefined,
	number: undefined,
	__: undefined,
	key: undefined
}

export const object_options = ['alias', 'default']

export const extra_options = [
	'describe',
	'description',
	'delimited',
	'preset'
]

export function parseDelimited(value) {
	const results = []
	if (Array.isArray(value)) {
		for (const v of value) {
			results.push(...parseDelimited(v))
		}
	} else {
		const split: string[] = value && String(value).split(/[\s,]+/g) || []
		results.push(...split.map(v => formatValue(v)))
	}
	return results
}

/**
 * Split arguments by --
 * @param {array} args
 */
export function chunkArguments(args) {
	if (!args.includes('--')) {
		return [args]
	}

	const chunks = []
	let chunk = []
	for (const arg of args) {
		if (arg === '--') {
			chunks.push(chunk)
			chunk = []
		} else {
			chunk.push(arg)
		}
	}
	chunks.push(chunk)
	return chunks
}

/** @internal */
export function formatValue(value: any, type?: string) {
	switch (type) {
		case 'boolean': {
			return String(value) === 'true'
		}
		case 'number': {
			return Number(value)
		}
		case 'string': {
			return String(value)
		}
		default: {
			if (isNumber(value)) {
				return Number(value)
			} else if (value === 'true' || value === 'false') {
				return String(value) === 'true'
			} else if (Array.isArray(value)) {
				return value.map(v => formatValue(v))
			} else if (value === undefined || value === null) {
				return value
			}
			return String(value)
		}
	}
}

/** @internal */
export const space = (spaces = 1) => '   '.repeat(spaces)

/** @internal */
export const helpOut = (output: string, spaces = 1) => console.log(space(spaces) + output)

/** @internal */
export const printLine = (count = 1) => console.log('\n'.repeat(count - 1 < 0 ? 0 : count - 1))
