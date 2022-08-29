import {Cli, CLISettings} from '../src'
import {cli_settings, parsed_args} from '../__mocks__/data'

describe('Cli', () => {
	it('Cli should be instance of function', () => expect(Cli).toBeInstanceOf(Function))
	it('new Cli() should instance of Cli', () => expect(new Cli()).toBeInstanceOf(Cli))

	describe('Cli.settings', () => {
		it(`new Cli(null, cli_settings) should have name ${cli_settings.name}`, () => expect(new Cli(null, cli_settings).get('name')).toBe(cli_settings.name))
		it(`new Cli(${cli_settings.name}) should have name ${cli_settings.name}`, () => expect(new Cli(cli_settings.name).get('name')).toBe(cli_settings.name))
		it(`new Cli(parsed_args, cli_settings) should have name ${cli_settings.name}`, () => expect(new Cli(parsed_args, cli_settings).get('name')).toBe(cli_settings.name))

		for (const key in cli_settings) {
			it(`new Cli().set(${key}, ${cli_settings[key]}) should have ${key} ${cli_settings[key]}`, () => {
				const option = key as keyof CLISettings
				const instance = new Cli().set(option, cli_settings[key])
				expect(instance.get(option)).toBe(cli_settings[key])
			})
		}
	})
})
