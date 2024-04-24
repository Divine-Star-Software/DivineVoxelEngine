---
id: "Data_World_DimensionsRegister.DimensionsRegister"
title: "Class: DimensionsRegister"
sidebar_label: "DimensionsRegister"
custom_edit_url: null
---

[Data/World/DimensionsRegister](../modules/Data_World_DimensionsRegister.md).DimensionsRegister

## Constructors

### constructor

• **new DimensionsRegister**(): [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Returns

[`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L24)

## Properties

### \_\_defaultDimensionOptions

• **\_\_defaultDimensionOptions**: [`DimensionOptions`](../modules/Data_Types_DimensionData_types.md#dimensionoptions)

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L18)

___

### \_count

• **\_count**: `number` = `1`

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L11)

___

### \_dimensions

• **\_dimensions**: `Record`\<`string`, [`DimensionData`](../modules/Data_Types_DimensionData_types.md#dimensiondata)\> = `{}`

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L23)

___

### dimensionMap

• **dimensionMap**: `Record`\<`number`, `string`\>

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L15)

___

### dimensionRecord

• **dimensionRecord**: `Record`\<`string`, `number`\>

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L12)

___

### instance

▪ `Static` **instance**: [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L10)

## Methods

### getDimension

▸ **getDimension**(`id`): [`DimensionData`](../modules/Data_Types_DimensionData_types.md#dimensiondata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

[`DimensionData`](../modules/Data_Types_DimensionData_types.md#dimensiondata)

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L42)

___

### getDimensionNumericId

▸ **getDimensionNumericId**(`id`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L52)

___

### getDimensionStringId

▸ **getDimensionStringId**(`id`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L46)

___

### registerDimension

▸ **registerDimension**(`id`, `option`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `option` | [`DimensionOptions`](../modules/Data_Types_DimensionData_types.md#dimensionoptions) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Data/World/DimensionsRegister.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/DimensionsRegister.ts#L28)
