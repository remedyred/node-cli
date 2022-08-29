import {cli, Cli, CLISettings} from '../src'
import {cli_settings} from '../__mocks__/data'

describe('factory.cli', () => {
	it('cli should be instance of function', () => expect(cli).toBeInstanceOf(Function))
	it('cli should be typeof function', () => expect(typeof cli).toBe('function'))
	it('cli() should instance of Cli', () => expect(cli()).toBeInstanceOf(Cli))

	describe('cli settings', () => {
		it(`cli(null, cli_settings) should have name ${cli_settings.name}`, () => expect(cli(null, cli_settings).get('name')).toBe(cli_settings.name))
		it(`cli(${cli_settings.name}) should have name ${cli_settings.name}`, () => expect(cli(cli_settings.name).get('name')).toBe(cli_settings.name))

		for (const key in cli_settings) {
			it(`cli().set(${key}, ${cli_settings[key]}) should have ${key} ${cli_settings[key]}`, () => {
				const option = key as keyof CLISettings
				const instance = cli().set(option, cli_settings[key])
				expect(instance.get(option)).toBe(cli_settings[key])
			})
		}
	})
})
