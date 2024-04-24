---
id: "Default_DataLoader_Node_DivineVoxelEngineData"
title: "Module: Default/DataLoader/Node/DivineVoxelEngineData"
sidebar_label: "Default/DataLoader/Node/DivineVoxelEngineData"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### DVED

• `Const` **DVED**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `path` | \{ `_dataFolder`: `string` = "dved"; `_dataPath`: `string` = ""; `_folder`: `string` = "test"; `_tempPath`: `string` = "/"; `$INIT`: () => `void` ; `getDataDirectory`: (`fileName`: `string`) => `string` ; `getDataPath`: () => `string` ; `getDirecoty`: (`fileName`: `string`) => `string` ; `getTempPath`: (`fileName`: `string`) => `string` ; `setFolder`: (`folder`: `string`) => `void`  } |
| `path._dataFolder` | `string` |
| `path._dataPath` | `string` |
| `path._folder` | `string` |
| `path._tempPath` | `string` |
| `path.$INIT` | [object Object] |
| `path.getDataDirectory` | [object Object] |
| `path.getDataPath` | [object Object] |
| `path.getDirecoty` | [object Object] |
| `path.getTempPath` | [object Object] |
| `path.setFolder` | [object Object] |
| `regionTags` | `TagManager` |
| `spaces` | \{ `chunk`: `VoxelSpace` & \{ `_regionPosition`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `getRegionIndex`: () => `number` ; `getRegionIndexXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `number` ; `getRegionPositonx`: () => \{ `x`: `number` ; `y`: `number` ; `z`: `number` ; `copy`: () => `any` ; `copyTo`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `void` ; `multiply`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `any` ; `toArray`: () => [`number`, `number`, `number`] ; `toString`: () => `string`  } ; `getRegionPositonxXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => \{ `x`: `number` ; `y`: `number` ; `z`: `number` ; `copy`: () => `any` ; `copyTo`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `void` ; `multiply`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `any` ; `toArray`: () => [`number`, `number`, `number`] ; `toString`: () => `string`  }  } ; `column`: `VoxelSpace` ; `region`: `VoxelSpace` & \{ `chunkBounds`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `columnBounds`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `getChunkVolume`: () => `number` ; `getColumnVolume`: () => `number`  } ; `voxel`: `VoxelSpace` ; `setDimensions`: (`data`: \{ `chunks`: `Vector3` ; `columns`: `Vector3` ; `regions`: `Vector3`  }) => `void`  } |
| `spaces.chunk` | `VoxelSpace` & \{ `_regionPosition`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `getRegionIndex`: () => `number` ; `getRegionIndexXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `number` ; `getRegionPositonx`: () => \{ `x`: `number` ; `y`: `number` ; `z`: `number` ; `copy`: () => `any` ; `copyTo`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `void` ; `multiply`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `any` ; `toArray`: () => [`number`, `number`, `number`] ; `toString`: () => `string`  } ; `getRegionPositonxXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => \{ `x`: `number` ; `y`: `number` ; `z`: `number` ; `copy`: () => `any` ; `copyTo`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `void` ; `multiply`: (`vec3`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  }) => `any` ; `toArray`: () => [`number`, `number`, `number`] ; `toString`: () => `string`  }  } |
| `spaces.column` | `VoxelSpace` |
| `spaces.region` | `VoxelSpace` & \{ `chunkBounds`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `columnBounds`: \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } ; `getChunkVolume`: () => `number` ; `getColumnVolume`: () => `number`  } |
| `spaces.voxel` | `VoxelSpace` |
| `spaces.setDimensions` | [object Object] |
| `system` | \{ `fs`: `__module` ; `sync`: \{ `createAndOpenFile`: (`path`: `string`, `size`: `number`) => ``false`` \| [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile) ; `createFile`: (`path`: `string`, `size`: `number`, `mode`: `number`) => `boolean` ; `openFile`: (`filePath`: `string`, `showErrors`: `boolean`) => ``false`` \| [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile)  } ; `$INIT`: (`fs`: `__module`) => `void` ; `mkdirs`: (`paths`: `string`[]) => `void` ; `updateFolder`: (`folder`: `string`) => `void`  } |
| `system.fs` | `__module` |
| `system.sync` | \{ `createAndOpenFile`: (`path`: `string`, `size`: `number`) => ``false`` \| [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile) ; `createFile`: (`path`: `string`, `size`: `number`, `mode`: `number`) => `boolean` ; `openFile`: (`filePath`: `string`, `showErrors`: `boolean`) => ``false`` \| [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile)  } |
| `system.sync.createAndOpenFile` | [object Object] |
| `system.sync.createFile` | [object Object] |
| `system.sync.openFile` | [object Object] |
| `system.$INIT` | [object Object] |
| `system.mkdirs` | [object Object] |
| `system.updateFolder` | [object Object] |
| `$INIT` | (`data`: \{ `dataDirecotry`: `string` ; `fs`: `__module` ; `sectorSize`: `number` ; `spaceBounds`: \{ `chunks`: `Vector3` ; `columns`: `Vector3` ; `regions`: `Vector3`  }  }) => `void` |
| `getRegionTool` | () => [`NodeRegionTool`](../classes/Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md) |

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/DivineVoxelEngineData.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/DivineVoxelEngineData.ts#L14)
