# @snickbit/node-cli

## Table of contents

### References

- [default](README.md#default)

### Classes

- [Cli](classes/Cli.md)

### Interfaces

- [Action](interfaces/Action.md)
- [Arg](interfaces/Arg.md)
- [ArgChoice](interfaces/ArgChoice.md)
- [CLISettings](interfaces/CLISettings.md)
- [ImportedAction](interfaces/ImportedAction.md)
- [Option](interfaces/Option.md)
- [ParsedArgs](interfaces/ParsedArgs.md)
- [State](interfaces/State.md)

### Type Aliases

- [ActionDefinition](README.md#actiondefinition)
- [Actions](README.md#actions)
- [ArgDefault](README.md#argdefault)
- [ArgType](README.md#argtype)
- [ArgV](README.md#argv)
- [Args](README.md#args)
- [CliOption](README.md#clioption)
- [CliOptions](README.md#clioptions)
- [ConfigHandler](README.md#confighandler)
- [OptionDefault](README.md#optiondefault)
- [OptionType](README.md#optiontype)
- [Options](README.md#options)
- [RawActions](README.md#rawactions)

### Variables

- [allowed\_keys](README.md#allowed_keys)
- [default\_options](README.md#default_options)
- [default\_state](README.md#default_state)
- [extra\_options](README.md#extra_options)
- [object\_options](README.md#object_options)

### Functions

- [chunkArguments](README.md#chunkarguments)
- [cli](README.md#cli)
- [loadedConfig](README.md#loadedconfig)
- [parseDelimited](README.md#parsedelimited)

## References

### default

Renames and re-exports [cli](README.md#cli)

## Type Aliases

### ActionDefinition

Ƭ **ActionDefinition**: `ParsedImport`

___

### Actions

Ƭ **Actions**: `ParsedImportRecords`

___

### ArgDefault

Ƭ **ArgDefault**: `string`[] \| `string`

___

### ArgType

Ƭ **ArgType**: ``"array"`` \| ``"string"``

___

### ArgV

Ƭ **ArgV**: `string`[]

Options and Arguments *

___

### Args

Ƭ **Args**: `Record`<`string`, `Partial`<[`Arg`](interfaces/Arg.md)\>\>

___

### CliOption

Ƭ **CliOption**: `string` \| keyof [`CliOptions`](README.md#clioptions)

___

### CliOptions

Ƭ **CliOptions**: `Options` & `Record`<`string`, `any`\>

___

### ConfigHandler

Ƭ **ConfigHandler**: (`config`: `any`) => `Promise`<`any`\> \| `any`

#### Type declaration

▸ (`config`): `Promise`<`any`\> \| `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |

##### Returns

`Promise`<`any`\> \| `any`

___

### OptionDefault

Ƭ **OptionDefault**: [`ArgDefault`](README.md#argdefault) \| `boolean` \| `number`

___

### OptionType

Ƭ **OptionType**: [`ArgType`](README.md#argtype) \| ``"boolean"`` \| ``"count"`` \| ``"number"``

___

### Options

Ƭ **Options**: `Record`<`string`, `Partial`<[`Option`](interfaces/Option.md)\>\>

___

### RawActions

Ƭ **RawActions**: `RawImports`

## Variables

### allowed\_keys

• `Const` **allowed\_keys**: `string`[]

___

### default\_options

• `Const` **default\_options**: [`CliOptions`](README.md#clioptions)

___

### default\_state

• `Const` **default\_state**: [`State`](interfaces/State.md)

___

### extra\_options

• `Const` **extra\_options**: `string`[]

___

### object\_options

• `Const` **object\_options**: `string`[]

## Functions

### chunkArguments

▸ **chunkArguments**(`args`): `any`[]

Split arguments by --

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any` |

#### Returns

`any`[]

___

### cli

▸ **cli**<`T`\>(`args?`, `options?`): [`Cli`](classes/Cli.md)

Simple Node.js CLI framework for creating command line applications.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ParsedArgs`](interfaces/ParsedArgs.md) = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `T` |
| `options?` | [`CLISettings`](interfaces/CLISettings.md) |

#### Returns

[`Cli`](classes/Cli.md)

▸ **cli**<`T`\>(`name?`, `args?`, `options?`): [`Cli`](classes/Cli.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ParsedArgs`](interfaces/ParsedArgs.md) = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |
| `args?` | `T` |
| `options?` | [`CLISettings`](interfaces/CLISettings.md) |

#### Returns

[`Cli`](classes/Cli.md)

___

### loadedConfig

▸ **loadedConfig**(`conf?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf?` | `any` |

#### Returns

`any`

___

### parseDelimited

▸ **parseDelimited**(`value`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`[]
