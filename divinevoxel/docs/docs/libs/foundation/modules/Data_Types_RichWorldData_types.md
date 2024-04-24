---
id: "Data_Types_RichWorldData_types"
title: "Module: Data/Types/RichWorldData.types"
sidebar_label: "Data/Types/RichWorldData.types"
custom_edit_url: null
---

## Type Aliases

### RichColumn

Ƭ **RichColumn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`RichDataSchema`](Data_Types_RichWorldData_types.md#richdataschema) |

#### Defined in

[divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts#L5)

___

### RichDataSchema

Ƭ **RichDataSchema**: `Record`\<`string`, `Record`\<`string`, `any`\>\>

#### Defined in

[divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts#L3)

___

### RichRegion

Ƭ **RichRegion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columns` | `Map`\<`string`, [`RichColumn`](Data_Types_RichWorldData_types.md#richcolumn)\> |

#### Defined in

[divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts#L9)

___

### RichWorldDimensions

Ƭ **RichWorldDimensions**: `Map`\<`string`, `Map`\<`string`, [`RichRegion`](Data_Types_RichWorldData_types.md#richregion)\>\>

#### Defined in

[divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts#L12)

___

### SetRichVoxel

Ƭ **SetRichVoxel**: [id: string, dimesnion: string, x: number, y: number, z: number]

#### Defined in

[divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/Types/RichWorldData.types.ts#L14)
