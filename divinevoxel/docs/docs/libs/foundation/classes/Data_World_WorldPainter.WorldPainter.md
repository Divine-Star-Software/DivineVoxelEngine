---
id: "Data_World_WorldPainter.WorldPainter"
title: "Class: WorldPainter"
sidebar_label: "WorldPainter"
custom_edit_url: null
---

[Data/World/WorldPainter](../modules/Data_World_WorldPainter.md).WorldPainter

## Constructors

### constructor

• **new WorldPainter**(): [`WorldPainter`](Data_World_WorldPainter.WorldPainter.md)

#### Returns

[`WorldPainter`](Data_World_WorldPainter.WorldPainter.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L10)

## Properties

### \_currentionDimension

• **\_currentionDimension**: `string` = `"main"`

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L14)

___

### \_dt

• **\_dt**: [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L16)

___

### instance

▪ `Static` **instance**: [`WorldPainter`](Data_World_WorldPainter.WorldPainter.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L9)

## Methods

### \_\_paint

▸ **__paint**(`location`, `data`, `update?`): `undefined` \| ``false``

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `location` | `LocationData` | `undefined` |
| `data` | [`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata) | `undefined` |
| `update` | `boolean` | `true` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L31)

___

### eraseVoxel

▸ **eraseVoxel**(`location`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:78](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L78)

___

### paintVoxel

▸ **paintVoxel**(`location`, `data`, `update?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `location` | `LocationData` | `undefined` |
| `data` | [`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata) | `undefined` |
| `update` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Data/World/WorldPainter.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/WorldPainter.ts#L17)
