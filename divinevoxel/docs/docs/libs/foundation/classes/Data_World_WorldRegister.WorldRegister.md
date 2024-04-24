---
id: "Data_World_WorldRegister.WorldRegister"
title: "Class: WorldRegister"
sidebar_label: "WorldRegister"
custom_edit_url: null
---

[Data/World/WorldRegister](../modules/Data_World_WorldRegister.md).WorldRegister

## Constructors

### constructor

• **new WorldRegister**(): [`WorldRegister`](Data_World_WorldRegister.WorldRegister.md)

#### Returns

[`WorldRegister`](Data_World_WorldRegister.WorldRegister.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L23)

## Properties

### \_cacheOn

• **\_cacheOn**: `boolean` = `false`

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L18)

___

### \_chunkCache

• **\_chunkCache**: `Map`\<`string`, [`Chunk`](Data_World_Classes_Chunk.Chunk.md)\>

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L19)

___

### \_columnCache

• **\_columnCache**: `Map`\<`string`, [`Column`](Data_World_Classes_Column.Column.md)\>

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L20)

___

### \_dimensionRegister

• **\_dimensionRegister**: [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L22)

___

### \_dimensions

• **\_dimensions**: `Map`\<`string`, [`Dimension`](Data_World_Classes_Dimension.Dimension.md)\>

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L17)

___

### cache

• **cache**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_addChunk` | (`key`: `string`, `data`: [`Chunk`](Data_World_Classes_Chunk.Chunk.md)) => `void` |
| `_addColumn` | (`key`: `string`, `data`: [`Column`](Data_World_Classes_Column.Column.md)) => `void` |
| `_getChunk` | (`key`: `string`) => `undefined` \| [`Chunk`](Data_World_Classes_Chunk.Chunk.md) |
| `_getColumn` | (`key`: `string`) => `undefined` \| [`Column`](Data_World_Classes_Column.Column.md) |
| `disable` | () => `void` |
| `enable` | () => `void` |

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L27)

___

### chunk

• **chunk**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`location`: `LocationData`, `chunk`: [`Chunk`](Data_World_Classes_Chunk.Chunk.md)) => `undefined` \| [`Chunk`](Data_World_Classes_Chunk.Chunk.md) |
| `get` | (`location`: `LocationData`) => `undefined` \| ``false`` \| [`Chunk`](Data_World_Classes_Chunk.Chunk.md) |
| `remove` | (`location`: `LocationData`) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:168](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L168)

___

### chunkTool

• **chunkTool**: [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L14)

___

### column

• **column**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`location`: `LocationData`, `column`: [`Column`](Data_World_Classes_Column.Column.md)) => `undefined` \| [`Column`](Data_World_Classes_Column.Column.md) |
| `fill` | (`location`: `LocationData`) => `void` |
| `get` | (`location`: `LocationData`) => ``false`` \| [`Column`](Data_World_Classes_Column.Column.md) |
| `remove` | (`location`: `LocationData`) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:101](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L101)

___

### columnTool

• **columnTool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L15)

___

### dimensions

• **dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`id`: `string` \| `number`) => [`Dimension`](Data_World_Classes_Dimension.Dimension.md) |
| `get` | (`id`: `string` \| `number`) => `undefined` \| [`Dimension`](Data_World_Classes_Dimension.Dimension.md) |

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:51](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L51)

___

### region

• **region**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`location`: `LocationData`, `region`: [`Region`](Data_World_Classes_Region.Region.md)) => [`Region`](Data_World_Classes_Region.Region.md) |
| `get` | (`location`: `LocationData`) => ``false`` \| [`Region`](Data_World_Classes_Region.Region.md) |
| `remove` | (`location`: `LocationData`) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L70)

___

### regionTool

• **regionTool**: [`RegionDataTool`](Default_Tools_Data_WorldData_RegionDataTool.RegionDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L16)

___

### instance

▪ `Static` **instance**: [`WorldRegister`](Data_World_WorldRegister.WorldRegister.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L13)

## Methods

### clearAll

▸ **clearAll**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldRegister.ts:64](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldRegister.ts#L64)
