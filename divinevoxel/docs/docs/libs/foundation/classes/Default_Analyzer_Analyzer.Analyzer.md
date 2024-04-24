---
id: "Default_Analyzer_Analyzer.Analyzer"
title: "Class: Analyzer"
sidebar_label: "Analyzer"
custom_edit_url: null
---

[Default/Analyzer/Analyzer](../modules/Default_Analyzer_Analyzer.md).Analyzer

## Hierarchy

- [`DVEAnaylzer`](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md)

  ↳ **`Analyzer`**

## Constructors

### constructor

• **new Analyzer**(): [`Analyzer`](Default_Analyzer_Analyzer.Analyzer.md)

#### Returns

[`Analyzer`](Default_Analyzer_Analyzer.Analyzer.md)

#### Inherited from

[DVEAnaylzer](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md).[constructor](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md#constructor)

## Properties

### \_flowChecks

• **\_flowChecks**: `number`[][]

#### Defined in

[divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts#L20)

___

### processor

• **processor**: `Object` = `AnalyzerProcessor`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunkTool` | [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md) |
| `columnTool` | [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md) |
| `goThroughColumn` | \<T\>(`location`: `LocationData`, `run`: (`x`: `number`, `y`: `number`, `z`: `number`, `column`: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)) => `void`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts#L19)

___

### updater

• **updater**: `Object` = `AnalyzerUpdater`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_voxels` | `Map`\<`string`, `RunFunction`\> |
| `getVoxel` | (`id`: `string`) => ``false`` \| `RunFunction` |
| `registerVoxel` | (`id`: `string`, `run`: `RunFunction`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts#L18)

## Methods

### runPropagation

▸ **runPropagation**(`data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AnaylzerTask`](../modules/Types_Tasks_types.md#anaylzertask) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DVEAnaylzer](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md).[runPropagation](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md#runpropagation)

#### Defined in

[divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts#L27)

___

### runUpdate

▸ **runUpdate**(`data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AnaylzerTask`](../modules/Types_Tasks_types.md#anaylzertask) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DVEAnaylzer](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md).[runUpdate](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md#runupdate)

#### Defined in

[divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts:78](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Analyzer/Analyzer.ts#L78)
