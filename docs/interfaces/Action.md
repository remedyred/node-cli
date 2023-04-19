# Interface: Action<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ParsedArgs`](ParsedArgs.md) = `any` |

## Hierarchy

- `UnparsedImport`

  ↳ **`Action`**

## Callable

### Action

▸ **Action**(`args`, `config`): `any`

Actions *

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `T` |
| `config` | `any` |

#### Returns

`any`

## Table of contents

### Properties

- [alias](Action.md#alias)
- [aliases](Action.md#aliases)
- [default](Action.md#default)
- [describe](Action.md#describe)
- [description](Action.md#description)
- [handler](Action.md#handler)
- [method](Action.md#method)
- [name](Action.md#name)
- [run](Action.md#run)

## Properties

### alias

• `Optional` **alias**: `string`

#### Inherited from

UnparsedImport.alias

___

### aliases

• `Optional` **aliases**: `string`[]

#### Inherited from

UnparsedImport.aliases

___

### default

• `Optional` **default**: `ImportMethod`<`any`, `any`\>

#### Inherited from

UnparsedImport.default

___

### describe

• `Optional` **describe**: `string`

#### Inherited from

UnparsedImport.describe

___

### description

• `Optional` **description**: `string`

#### Inherited from

UnparsedImport.description

___

### handler

• `Optional` **handler**: `ImportMethod`<`any`, `any`\>

#### Inherited from

UnparsedImport.handler

___

### method

• `Optional` **method**: `ImportMethod`<`any`, `any`\>

#### Inherited from

UnparsedImport.method

___

### name

• `Optional` **name**: `string`

#### Inherited from

UnparsedImport.name

___

### run

• `Optional` **run**: `ImportMethod`<`any`, `any`\>

#### Inherited from

UnparsedImport.run
