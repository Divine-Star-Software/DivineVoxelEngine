---
id: "Data_World_WorldSpaces"
title: "Module: Data/World/WorldSpaces"
sidebar_label: "Data/World/WorldSpaces"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### WorldSpaces

• `Const` **WorldSpaces**: \{ `chunk`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) & \{ `_regionPosition`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `getRegionIndex`: () => `number` ; `getRegionIndexXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `number` ; `getRegionPositonx`: () => `VSVec3` ; `getRegionPositonxXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `VSVec3`  } = chunkSpace; `column`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) = columnSpace; `region`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) & \{ `chunkBounds`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `columnBounds`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `getChunkVolume`: () => `number` ; `getColumnVolume`: () => `number`  } = regionSpace; `voxel`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) = voxelSpace; `setDimensions`: (`data`: \{ `chunks`: `Vector3` ; `columns`: `Vector3` ; `regions`: `Vector3`  }) => `void`  } & \{ `$INIT`: (`settings`: [`EngineSettingsData`](Types_EngineSettings_types.md#enginesettingsdata)) => `void`  }

#### Defined in

[divinevoxel/core/src/Data/World/WorldSpaces.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Data/World/WorldSpaces.ts#L6)
