---
id: "Interfaces_Data_DataManager.DataManager"
title: "Class: DataManager"
sidebar_label: "DataManager"
custom_edit_url: null
---

[Interfaces/Data/DataManager](../modules/Interfaces_Data_DataManager.md).DataManager

## Constructors

### constructor

• **new DataManager**(): [`DataManager`](Interfaces_Data_DataManager.DataManager.md)

#### Returns

[`DataManager`](Interfaces_Data_DataManager.DataManager.md)

## Properties

### mapped

• **mapped**: `Object` = `MappedDataRegister`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `objectMaps` | \{ `segments`: `Map`\<`string`, `Map`\<`string`, `Record`\<`number`, `any`\>\>\> ; `get`: (`segment`: `string`, `id`: `string`, `index`: `number`) => `any` ; `sync`: (`data`: [`RegisterObjectMapSync`](../modules/Types_DataSync_types.md#registerobjectmapsync)) => `void`  } |
| `objectMaps.segments` | `Map`\<`string`, `Map`\<`string`, `Record`\<`number`, `any`\>\>\> |
| `objectMaps.get` | [object Object] |
| `objectMaps.sync` | [object Object] |
| `stringMaps` | \{ `segments`: `Map`\<`string`, `Map`\<`string`, `string`[]\>\> ; `get`: (`segment`: `string`, `id`: `string`, `index`: `number`) => `string` ; `sync`: (`data`: [`RegisterStringMapSync`](../modules/Types_DataSync_types.md#registerstringmapsync)) => `void`  } |
| `stringMaps.segments` | `Map`\<`string`, `Map`\<`string`, `string`[]\>\> |
| `stringMaps.get` | [object Object] |
| `stringMaps.sync` | [object Object] |

#### Defined in

[divinevoxel/core/src/Interfaces/Data/DataManager.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/DataManager.ts#L11)

___

### spaces

• **spaces**: \{ `chunk`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) & \{ `_regionPosition`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `getRegionIndex`: () => `number` ; `getRegionIndexXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `number` ; `getRegionPositonx`: () => `VSVec3` ; `getRegionPositonxXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `VSVec3`  } = chunkSpace; `column`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) = columnSpace; `region`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) & \{ `chunkBounds`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `columnBounds`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `getChunkVolume`: () => `number` ; `getColumnVolume`: () => `number`  } = regionSpace; `voxel`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) = voxelSpace; `setDimensions`: (`data`: \{ `chunks`: `Vector3` ; `columns`: `Vector3` ; `regions`: `Vector3`  }) => `void`  } & \{ `$INIT`: (`settings`: [`EngineSettingsData`](../modules/Types_EngineSettings_types.md#enginesettingsdata)) => `void`  } = `WorldSpaces`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/DataManager.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/DataManager.ts#L10)

___

### tags

• **tags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substances` | `SDTags` |
| `voxels` | `VDTags` |

#### Defined in

[divinevoxel/core/src/Interfaces/Data/DataManager.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/DataManager.ts#L12)

___

### worldBounds

• **worldBounds**: `Object` = `WorldBounds`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bounds` | \{ `MaxX`: `number` = Infinity; `MaxY`: `number` = 256; `MaxZ`: `number` = Infinity; `MinX`: `number` = -Infinity; `MinY`: `number` = 0; `MinZ`: `number` = -Infinity } |
| `bounds.MaxX` | `number` |
| `bounds.MaxY` | `number` |
| `bounds.MaxZ` | `number` |
| `bounds.MinX` | `number` |
| `bounds.MinY` | `number` |
| `bounds.MinZ` | `number` |
| `setWorldBounds` | (`minX`: `number`, `maxX`: `number`, `minZ`: `number`, `maxZ`: `number`, `minY`: `number`, `maxY`: `number`) => `void` |

#### Defined in

[divinevoxel/core/src/Interfaces/Data/DataManager.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/DataManager.ts#L9)
