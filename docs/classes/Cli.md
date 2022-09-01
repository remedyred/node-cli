# Class: Cli<T\>

Simple Node.js CLI framework for creating command line applications.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ParsedArgs`](../interfaces/ParsedArgs.md) = `any` |

## Table of contents

### Constructors

- [constructor](Cli.md#constructor)

### Accessors

- [$name](Cli.md#$name)
- [$out](Cli.md#$out)

### Methods

- [action](Cli.md#action)
- [actions](Cli.md#actions)
- [arg](Cli.md#arg)
- [args](Cli.md#args)
- [banner](Cli.md#banner)
- [config](Cli.md#config)
- [configHandler](Cli.md#confighandler)
- [defaultAction](Cli.md#defaultaction)
- [get](Cli.md#get)
- [hideBanner](Cli.md#hidebanner)
- [includeWorkingPackage](Cli.md#includeworkingpackage)
- [name](Cli.md#name)
- [noBail](Cli.md#nobail)
- [option](Cli.md#option)
- [options](Cli.md#options)
- [run](Cli.md#run)
- [set](Cli.md#set)
- [showHelp](Cli.md#showhelp)
- [showVersion](Cli.md#showversion)
- [version](Cli.md#version)

## Constructors

### constructor

• **new Cli**<`T`\>(`args?`, `options?`)

Create a new Cli instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ParsedArgs`](../interfaces/ParsedArgs.md) = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `T` |
| `options?` | [`CLISettings`](../interfaces/CLISettings.md) |

• **new Cli**<`T`\>(`name?`, `args?`, `options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ParsedArgs`](../interfaces/ParsedArgs.md) = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |
| `args?` | `T` |
| `options?` | [`CLISettings`](../interfaces/CLISettings.md) |

## Accessors

### $name

• `get` **$name**(): `string`

Set the name of the CLI.

#### Returns

`string`

___

### $out

• `get` **$out**(): `Out`

Get the app Out instance, or fallback to the default Out instance.

#### Returns

`Out`

## Methods

### action

▸ **action**(`action`): [`Cli`](Cli.md)<`T`\>

Add a new action

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `ParsedImport` |

#### Returns

[`Cli`](Cli.md)<`T`\>

▸ **action**(`name`, `action`): [`Cli`](Cli.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `action` | [`Action`](../interfaces/Action.md)<`any`\> |

#### Returns

[`Cli`](Cli.md)<`T`\>

▸ **action**(`name`, `description`, `action`): [`Cli`](Cli.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `action` | [`Action`](../interfaces/Action.md)<`any`\> |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### actions

▸ **actions**(`actions`): [`Cli`](Cli.md)<`T`\>

Add new actions. Will override existing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | `RawImports` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### arg

▸ **arg**(`key`, `defaultArg?`): [`Cli`](Cli.md)<`T`\>

Add new positional argument

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `defaultArg?` | `string` \| `number` |

#### Returns

[`Cli`](Cli.md)<`T`\>

▸ **arg**(`key`, `arg?`): [`Cli`](Cli.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `arg?` | [`Arg`](../interfaces/Arg.md) |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### args

▸ **args**(`args`): [`Cli`](Cli.md)<`T`\>

Add new positional arguments. Will override existing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`Args`](../README.md#args) |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### banner

▸ **banner**(`message`): [`Cli`](Cli.md)<`T`\>

Set the description / banner message of the CLI

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### config

▸ **config**(`defaultConfig?`, `options?`): [`Cli`](Cli.md)<`T`\>

Enable config file support for the CLI, and define searching options.

**`See`**

[https://github.com/antonk52/lilconfig](https://github.com/antonk52/lilconfig)

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultConfig?` | `any` |
| `options?` | ``false`` \| `Options` |

#### Returns

[`Cli`](Cli.md)<`T`\>

▸ **config**(`defaultConfig`, `handler`, `options?`): [`Cli`](Cli.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultConfig` | `any` |
| `handler` | [`ConfigHandler`](../README.md#confighandler) |
| `options?` | ``false`` \| `Options` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### configHandler

▸ **configHandler**(`handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [`ConfigHandler`](../README.md#confighandler) |

#### Returns

`void`

___

### defaultAction

▸ **defaultAction**(`name`): [`Cli`](Cli.md)<`T`\>

Set the default action

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### get

▸ **get**<`O`\>(`option`): [`State`](../interfaces/State.md)<`T`\>[`O`]

Get the value of a configuration option for the CLI

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends keyof [`CLISettings`](../interfaces/CLISettings.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `option` | `O` | The option to get |

#### Returns

[`State`](../interfaces/State.md)<`T`\>[`O`]

___

### hideBanner

▸ **hideBanner**(`value?`): [`Cli`](Cli.md)<`T`\>

Hide the banner message

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `boolean` | `true` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### includeWorkingPackage

▸ **includeWorkingPackage**(`value?`): [`Cli`](Cli.md)<`T`\>

Attempt to pull the name and version from the closest package.json file to the current working directory.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `boolean` | `true` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### name

▸ **name**(`name`): [`Cli`](Cli.md)<`T`\>

Set the name of the CLI

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### noBail

▸ **noBail**(`value?`): [`Cli`](Cli.md)<`T`\>

Don't kill the process on error

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `boolean` | `false` |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### option

▸ **option**(`key`, `option`): [`Cli`](Cli.md)<`T`\>

Add a new flag/option

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `option` | `Partial`<[`Option`](../interfaces/Option.md)\> |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### options

▸ **options**(`options`): [`Cli`](Cli.md)<`T`\>

Add new flags/options. Will override existing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../README.md#options) |

#### Returns

[`Cli`](Cli.md)<`T`\>

___

### run

▸ **run**(`callback?`): `any`

Run the CLI program, parsing the argv, and running any defined actions

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | [`Action`](../interfaces/Action.md)<`any`\> |

#### Returns

`any`

___

### set

▸ **set**<`O`\>(`option`, `value`): `any`

Set a configuration option for the CLI

**`Throws`**

- If the option is not supported

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends keyof [`CLISettings`](../interfaces/CLISettings.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `option` | `O` | The option to set |
| `value` | `any` | The value to set the option to |

#### Returns

`any`

▸ **set**(`options`): `any`

Set configuration options for the CLI

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CLISettings`](../interfaces/CLISettings.md) | The options to set. These will be merged with the current options. |

#### Returns

`any`

___

### showHelp

▸ **showHelp**(): `void`

Show the help message

#### Returns

`void`

___

### showVersion

▸ **showVersion**(): `void`

Show the version message

#### Returns

`void`

___

### version

▸ **version**(`version`): [`Cli`](Cli.md)<`T`\>

Set the version of the CLI

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` \| `number` |

#### Returns

[`Cli`](Cli.md)<`T`\>
