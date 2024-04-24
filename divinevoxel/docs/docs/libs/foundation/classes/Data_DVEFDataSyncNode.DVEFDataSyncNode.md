---
id: "Data_DVEFDataSyncNode.DVEFDataSyncNode"
title: "Class: DVEFDataSyncNode"
sidebar_label: "DVEFDataSyncNode"
custom_edit_url: null
---

[Data/DVEFDataSyncNode](../modules/Data_DVEFDataSyncNode.md).DVEFDataSyncNode

## Hierarchy

- `RemoteDataSyncNode`

  ↳ **`DVEFDataSyncNode`**

## Constructors

### constructor

• **new DVEFDataSyncNode**(): [`DVEFDataSyncNode`](Data_DVEFDataSyncNode.DVEFDataSyncNode.md)

#### Returns

[`DVEFDataSyncNode`](Data_DVEFDataSyncNode.DVEFDataSyncNode.md)

#### Inherited from

RemoteDataSyncNode.constructor

## Properties

### maps

• **maps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `objects` | `DataSync`\<`RegisterStringMapSync`, `void`\> |
| `strings` | `DataSync`\<`RegisterStringMapSync`, `void`\> |

#### Inherited from

RemoteDataSyncNode.maps

#### Defined in

divinevoxel/core/dist/Interfaces/Data/RemoteDataSyncNode.d.ts:4

___

### palettes

• **palettes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substance` | `DataSync`\<`PaletteSyncData`, `any`\> |
| `voxel` | `DataSync`\<`PaletteSyncData`, `any`\> |

#### Inherited from

RemoteDataSyncNode.palettes

#### Defined in

divinevoxel/core/dist/Interfaces/Data/RemoteDataSyncNode.d.ts:8

___

### tags

• **tags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substance` | `DataSync`\<`RemoteTagManagerInitData`, `any`\> |
| `voxel` | `DataSync`\<`VoxelDataSync`, `any`\> |

#### Inherited from

RemoteDataSyncNode.tags

#### Defined in

divinevoxel/core/dist/Interfaces/Data/RemoteDataSyncNode.d.ts:12

___

### worldData

• **worldData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `column` | `any` |
| `dimension` | `any` |
| `region` | `any` |
| `regionHeader` | `any` |

#### Defined in

[divinevoxel/foundation/src/Data/DVEFDataSyncNode.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DVEFDataSyncNode.ts#L17)

___

### worldDataTags

• **worldDataTags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `column` | `any` |
| `region` | `any` |

#### Defined in

[divinevoxel/foundation/src/Data/DVEFDataSyncNode.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DVEFDataSyncNode.ts#L61)
