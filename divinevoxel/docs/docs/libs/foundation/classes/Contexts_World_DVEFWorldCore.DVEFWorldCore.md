---
id: "Contexts_World_DVEFWorldCore.DVEFWorldCore"
title: "Class: DVEFWorldCore"
sidebar_label: "DVEFWorldCore"
custom_edit_url: null
---

[Contexts/World/DVEFWorldCore](../modules/Contexts_World_DVEFWorldCore.md).DVEFWorldCore

## Hierarchy

- `DVEWorldCore`

  ↳ **`DVEFWorldCore`**

## Constructors

### constructor

• **new DVEFWorldCore**(`props?`): [`DVEFWorldCore`](Contexts_World_DVEFWorldCore.DVEFWorldCore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`DVEFWorldCoreProps`](../modules/Contexts_World_DVEFWorldCore.md#dvefworldcoreprops) |

#### Returns

[`DVEFWorldCore`](Contexts_World_DVEFWorldCore.DVEFWorldCore.md)

#### Overrides

DVEWorldCore.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L34)

## Properties

### dataRegiser

• **dataRegiser**: [`DVEFDataReigster`](Contexts_World_Data_DVEFDataRegister.DVEFDataReigster.md)

#### Overrides

DVEWorldCore.dataRegiser

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L31)

___

### dataSync

• **dataSync**: [`DVEFDataSync`](Contexts_World_DVEFDataSync.DVEFDataSync.md)

#### Overrides

DVEWorldCore.dataSync

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L29)

___

### dataTagBulders

• **dataTagBulders**: [`DVEFDataTags`](Contexts_World_Data_DVEFDataTags.DVEFDataTags.md)

#### Overrides

DVEWorldCore.dataTagBulders

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L32)

___

### props

• **props**: [`DVEFWorldCoreProps`](../modules/Contexts_World_DVEFWorldCore.md#dvefworldcoreprops) = `{}`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L34)

___

### queues

• **queues**: [`DVEFoundationTasksQueues`](Contexts_World_Tasks_DVEFoundationTasksQueues.DVEFoundationTasksQueues.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L30)

___

### threads

• **threads**: [`DVEFWorldThreads`](Contexts_World_DVEFWorldThreads.DVEFWorldThreads.md)

#### Overrides

DVEWorldCore.threads

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L28)

___

### instance

▪ `Static` **instance**: [`DVEFWorldCore`](Contexts_World_DVEFWorldCore.DVEFWorldCore.md)

#### Overrides

DVEWorldCore.instance

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L27)

## Methods

### getAllTools

▸ **getAllTools**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `brush` | [`AdvancedBrush`](Default_Tools_Brush_AdvancedBrushTool.AdvancedBrush.md) |
| `builder` | [`BuilderTool`](Default_Tools_Build_BuilderTool.BuilderTool.md) |
| `chunkData` | [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md) |
| `columnData` | [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md) |
| `data` | [`DataTool`](Default_Tools_Data_DataTool.DataTool.md) |
| `heightMap` | [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md) |
| `regonData` | [`RegionDataTool`](Default_Tools_Data_WorldData_RegionDataTool.RegionDataTool.md) |
| `tasks` | [`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md) |

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L53)

___

### getBrush

▸ **getBrush**(): [`AdvancedBrush`](Default_Tools_Brush_AdvancedBrushTool.AdvancedBrush.md)

#### Returns

[`AdvancedBrush`](Default_Tools_Brush_AdvancedBrushTool.AdvancedBrush.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L66)

___

### getBuilder

▸ **getBuilder**(): [`BuilderTool`](Default_Tools_Build_BuilderTool.BuilderTool.md)

#### Returns

[`BuilderTool`](Default_Tools_Build_BuilderTool.BuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L69)

___

### getChunkDataTool

▸ **getChunkDataTool**(): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:78](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L78)

___

### getColumnDataTool

▸ **getColumnDataTool**(): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:81](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L81)

___

### getDataLoaderTool

▸ **getDataLoaderTool**(): [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Returns

[`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:90](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L90)

___

### getDataTool

▸ **getDataTool**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:72](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L72)

___

### getHeightMapTool

▸ **getHeightMapTool**(): [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Returns

[`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:84](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L84)

___

### getRegionTool

▸ **getRegionTool**(): [`RegionDataTool`](Default_Tools_Data_WorldData_RegionDataTool.RegionDataTool.md)

#### Returns

[`RegionDataTool`](Default_Tools_Data_WorldData_RegionDataTool.RegionDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:75](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L75)

___

### getRichDataTool

▸ **getRichDataTool**(): [`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Returns

[`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L93)

___

### getTasksTool

▸ **getTasksTool**(): [`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Returns

[`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:87](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L87)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

DVEWorldCore.init

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldCore.ts#L48)
