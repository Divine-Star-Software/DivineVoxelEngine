---
id: "Contexts_World_Data_DVEFDataTags.DVEFDataTags"
title: "Class: DVEFDataTags"
sidebar_label: "DVEFDataTags"
custom_edit_url: null
---

[Contexts/World/Data/DVEFDataTags](../modules/Contexts_World_Data_DVEFDataTags.md).DVEFDataTags

## Hierarchy

- `DataTagBuilders`

  ↳ **`DVEFDataTags`**

## Constructors

### constructor

• **new DVEFDataTags**(): [`DVEFDataTags`](Contexts_World_Data_DVEFDataTags.DVEFDataTags.md)

#### Returns

[`DVEFDataTags`](Contexts_World_Data_DVEFDataTags.DVEFDataTags.md)

#### Overrides

DataTagBuilders.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts#L12)

## Properties

### chunkTags

• **chunkTags**: `TagManager` = `ChunkDataTags`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts#L8)

___

### columnTags

• **columnTags**: `TagManager` = `ColumnDataTags`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts#L9)

___

### regionTags

• **regionTags**: `TagManager` = `RegionDataTags`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Data/DVEFDataTags.ts#L10)

___

### substances

• **substances**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `palette` | \{ `_count`: `number` ; `_map`: `Record`\<`string`, `number`\> ; `_palette`: `string`[] ; `get`: () => `string`[] ; `getMap`: () => `Record`\<`string`, `number`\> ; `register`: (`sustance`: `any`) => `void`  } |
| `palette._count` | `number` |
| `palette._map` | `Record`\<`string`, `number`\> |
| `palette._palette` | `string`[] |
| `palette.get` | [object Object] |
| `palette.getMap` | [object Object] |
| `palette.register` | [object Object] |
| `$generate` | () => `void` |

#### Inherited from

DataTagBuilders.substances

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataTagBuilders.d.ts:4

___

### voxels

• **voxels**: typeof `VoxelDataGenerator`

#### Inherited from

DataTagBuilders.voxels

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataTagBuilders.d.ts:3
