---
id: "Default_IWG_World_Classes_IWGTasks.IWGTasks"
title: "Class: IWGTasks"
sidebar_label: "IWGTasks"
custom_edit_url: null
---

[Default/IWG/World/Classes/IWGTasks](../modules/Default_IWG_World_Classes_IWGTasks.md).IWGTasks

## Constructors

### constructor

• **new IWGTasks**(`gen`, `data`): [`IWGTasks`](Default_IWG_World_Classes_IWGTasks.IWGTasks.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gen` | [`Generator`](Default_IWG_World_Classes_Generator.Generator.md) |
| `data` | [`IWGTasksData`](../modules/Default_IWG_World_Types_IWG_types.md#iwgtasksdata) |

#### Returns

[`IWGTasks`](Default_IWG_World_Classes_IWGTasks.IWGTasks.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L12)

## Properties

### data

• **data**: [`IWGTasksData`](../modules/Default_IWG_World_Types_IWG_types.md#iwgtasksdata)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L12)

___

### gen

• **gen**: [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L12)

___

### map

• **map**: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L9)

___

### queue

• **queue**: [x: number, y: number, z: number][] = `[]`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L8)

___

### waitingFor

• **waitingFor**: `number` = `0`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L10)

## Methods

### add

▸ **add**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L14)

___

### cancelAll

▸ **cancelAll**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L21)

___

### runTasks

▸ **runTasks**(`max?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `max` | `number` | `5` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/IWGTasks.ts#L26)
