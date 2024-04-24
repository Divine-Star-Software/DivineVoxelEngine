---
id: "Data_DVEFDataManager.DVEFDataManager"
title: "Class: DVEFDataManager"
sidebar_label: "DVEFDataManager"
custom_edit_url: null
---

[Data/DVEFDataManager](../modules/Data_DVEFDataManager.md).DVEFDataManager

## Hierarchy

- `DataManager`

  ↳ **`DVEFDataManager`**

## Constructors

### constructor

• **new DVEFDataManager**(): [`DVEFDataManager`](Data_DVEFDataManager.DVEFDataManager.md)

#### Returns

[`DVEFDataManager`](Data_DVEFDataManager.DVEFDataManager.md)

#### Inherited from

DataManager.constructor

## Properties

### dataSync

• **dataSync**: [`DVEFDataSyncNode`](Data_DVEFDataSyncNode.DVEFDataSyncNode.md)

#### Defined in

[divinevoxel/foundation/src/Data/DVEFDataManager.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DVEFDataManager.ts#L12)

___

### mapped

• **mapped**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `objectMaps` | \{ `segments`: `Map`\<`string`, `Map`\<`string`, `Record`\<`number`, `any`\>\>\> ; `get`: (`segment`: `string`, `id`: `string`, `index`: `number`) => `any` ; `sync`: (`data`: `any`) => `void`  } |
| `objectMaps.segments` | `Map`\<`string`, `Map`\<`string`, `Record`\<`number`, `any`\>\>\> |
| `objectMaps.get` | [object Object] |
| `objectMaps.sync` | [object Object] |
| `stringMaps` | \{ `segments`: `Map`\<`string`, `Map`\<`string`, `string`[]\>\> ; `get`: (`segment`: `string`, `id`: `string`, `index`: `number`) => `string` ; `sync`: (`data`: `any`) => `void`  } |
| `stringMaps.segments` | `Map`\<`string`, `Map`\<`string`, `string`[]\>\> |
| `stringMaps.get` | [object Object] |
| `stringMaps.sync` | [object Object] |

#### Inherited from

DataManager.mapped

#### Defined in

divinevoxel/core/dist/Interfaces/Data/DataManager.d.ts:95

___

### registers

• **registers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dimensions` | typeof [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md) |
| `regionHeader` | \{ `_headers`: `RegionHeaderData` ; `add`: (`location`: `LocationData`, `buffer`: `SharedArrayBuffer`) => `void` ; `get`: (`location`: `LocationData`) => `undefined` \| ``false`` \| \{ `buffer`: `SharedArrayBuffer` ; `data`: `DataView`  } ; `isStored`: (`location`: `LocationData`) => ``-1`` \| ``0`` \| ``1`` ; `remove`: (`location`: `LocationData`) => `boolean`  } |
| `regionHeader._headers` | `RegionHeaderData` |
| `regionHeader.add` | [object Object] |
| `regionHeader.get` | [object Object] |
| `regionHeader.isStored` | [object Object] |
| `regionHeader.remove` | [object Object] |
| `world` | [`WorldRegister`](Data_World_WorldRegister.WorldRegister.md) |

#### Defined in

[divinevoxel/foundation/src/Data/DVEFDataManager.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DVEFDataManager.ts#L14)

___

### spaces

• **spaces**: \{ `chunk`: `any` ; `column`: `any` ; `region`: `any` ; `voxel`: `any` ; `setDimensions`: (`data`: \{ `chunks`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `columns`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `regions`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }  }) => `void`  } & \{ `$INIT`: (`settings`: `any`) => `void`  }

#### Inherited from

DataManager.spaces

#### Defined in

divinevoxel/core/dist/Interfaces/Data/DataManager.d.ts:13

___

### tags

• **tags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substances` | \{ `byteOffSet`: `number` ; `data`: `DataView` ; `id`: `string` ; `index`: `DataView` ; `indexMap`: `Map`\<`string`, `number`\> ; `initData`: `RemoteTagManagerInitData` ; `tagIndexes`: `number` ; `tagSize`: `number` ; `$INIT`: (`data`: `RemoteTagManagerInitData`) => `void` ; `getArrayTagByteIndex`: (`id`: `string`, `index`: `number`) => `number` ; `getArrayTagValue`: (`id`: `string`, `index`: `number`) => `number` ; `getBuffer`: () => `ArrayBuffer` ; `getTag`: (`id`: `string`) => `number` ; `loopThroughAllIndexTags`: (`run`: (`id`: `string`, `value`: `number`, `index`: `number`) => `void`) => `void` ; `loopThroughIndex`: (`run`: (`data`: `number`[]) => `void`) => `void` ; `loopThroughTags`: (`run`: (`id`: `string`, `value`: `number`) => `void`) => `void` ; `setArrayTagValue`: (`id`: `string`, `index`: `number`, `value`: `number`) => `number` \| `void` ; `setBuffer`: (`data`: `BufferTypes` \| `DataView`) => `void` ; `setSubstance`: (`id`: `string` \| `number`) => `void` ; `setTag`: (`id`: `string`, `value`: `number`) => `boolean` ; `setTagIndex`: (`index`: `number`) => `void`  } |
| `substances.byteOffSet` | `number` |
| `substances.data` | `DataView` |
| `substances.id` | `string` |
| `substances.index` | `DataView` |
| `substances.indexMap` | `Map`\<`string`, `number`\> |
| `substances.initData` | `RemoteTagManagerInitData` |
| `substances.tagIndexes` | `number` |
| `substances.tagSize` | `number` |
| `substances.$INIT` | [object Object] |
| `substances.getArrayTagByteIndex` | [object Object] |
| `substances.getArrayTagValue` | [object Object] |
| `substances.getBuffer` | [object Object] |
| `substances.getTag` | [object Object] |
| `substances.loopThroughAllIndexTags` | [object Object] |
| `substances.loopThroughIndex` | [object Object] |
| `substances.loopThroughTags` | [object Object] |
| `substances.setArrayTagValue` | [object Object] |
| `substances.setBuffer` | [object Object] |
| `substances.setSubstance` | [object Object] |
| `substances.setTag` | [object Object] |
| `substances.setTagIndex` | [object Object] |
| `voxels` | \{ `byteOffSet`: `number` ; `data`: `DataView` ; `id`: `string` ; `index`: `DataView` ; `indexMap`: `Map`\<`string`, `number`\> ; `initData`: `RemoteTagManagerInitData` ; `tagIndexes`: `number` ; `tagSize`: `number` ; `voxelIndex`: `Uint16Array` ; `$INIT`: (`data`: `RemoteTagManagerInitData`) => `void` ; `getArrayTagByteIndex`: (`id`: `string`, `index`: `number`) => `number` ; `getArrayTagValue`: (`id`: `string`, `index`: `number`) => `number` ; `getBuffer`: () => `ArrayBuffer` ; `getTag`: (`id`: `string`) => `number` ; `loopThroughAllIndexTags`: (`run`: (`id`: `string`, `value`: `number`, `index`: `number`) => `void`) => `void` ; `loopThroughIndex`: (`run`: (`data`: `number`[]) => `void`) => `void` ; `loopThroughTags`: (`run`: (`id`: `string`, `value`: `number`) => `void`) => `void` ; `setArrayTagValue`: (`id`: `string`, `index`: `number`, `value`: `number`) => `number` \| `void` ; `setBuffer`: (`data`: `BufferTypes` \| `DataView`) => `void` ; `setTag`: (`id`: `string`, `value`: `number`) => `boolean` ; `setTagIndex`: (`index`: `number`) => `void` ; `setVoxel`: (`id`: `number`) => `void` ; `sync`: (`voxelMap`: `Uint16Array`) => `void`  } |
| `voxels.byteOffSet` | `number` |
| `voxels.data` | `DataView` |
| `voxels.id` | `string` |
| `voxels.index` | `DataView` |
| `voxels.indexMap` | `Map`\<`string`, `number`\> |
| `voxels.initData` | `RemoteTagManagerInitData` |
| `voxels.tagIndexes` | `number` |
| `voxels.tagSize` | `number` |
| `voxels.voxelIndex` | `Uint16Array` |
| `voxels.$INIT` | [object Object] |
| `voxels.getArrayTagByteIndex` | [object Object] |
| `voxels.getArrayTagValue` | [object Object] |
| `voxels.getBuffer` | [object Object] |
| `voxels.getTag` | [object Object] |
| `voxels.loopThroughAllIndexTags` | [object Object] |
| `voxels.loopThroughIndex` | [object Object] |
| `voxels.loopThroughTags` | [object Object] |
| `voxels.setArrayTagValue` | [object Object] |
| `voxels.setBuffer` | [object Object] |
| `voxels.setTag` | [object Object] |
| `voxels.setTagIndex` | [object Object] |
| `voxels.setVoxel` | [object Object] |
| `voxels.sync` | [object Object] |

#### Inherited from

DataManager.tags

#### Defined in

divinevoxel/core/dist/Interfaces/Data/DataManager.d.ts:107

___

### world

• **world**: [`WorldPainter`](Data_World_WorldPainter.WorldPainter.md)

#### Defined in

[divinevoxel/foundation/src/Data/DVEFDataManager.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DVEFDataManager.ts#L11)

___

### worldBounds

• **worldBounds**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bounds` | \{ `MaxX`: `number` ; `MaxY`: `number` ; `MaxZ`: `number` ; `MinX`: `number` ; `MinY`: `number` ; `MinZ`: `number`  } |
| `bounds.MaxX` | `number` |
| `bounds.MaxY` | `number` |
| `bounds.MaxZ` | `number` |
| `bounds.MinX` | `number` |
| `bounds.MinY` | `number` |
| `bounds.MinZ` | `number` |
| `setWorldBounds` | (`minX`: `number`, `maxX`: `number`, `minZ`: `number`, `maxZ`: `number`, `minY`: `number`, `maxY`: `number`) => `void` |

#### Inherited from

DataManager.worldBounds

#### Defined in

divinevoxel/core/dist/Interfaces/Data/DataManager.d.ts:2

___

### worldDataTags

• **worldDataTags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | `RemoteTagManager` |
| `column` | `RemoteTagManager` |
| `region` | `RemoteTagManager` |

#### Defined in

[divinevoxel/foundation/src/Data/DVEFDataManager.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DVEFDataManager.ts#L19)
