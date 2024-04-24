---
id: "Math_Spaces_VoxelSpaces"
title: "Module: Math/Spaces/VoxelSpaces"
sidebar_label: "Math/Spaces/VoxelSpaces"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### VoxelSpaces

• `Const` **VoxelSpaces**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `zeroPointSpace` | [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) |
| `getVoxelSpaces` | () => \{ `chunk`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) & \{ `_regionPosition`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `getRegionIndex`: () => `number` ; `getRegionIndexXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `number` ; `getRegionPositonx`: () => `VSVec3` ; `getRegionPositonxXYZ`: (`x`: `number`, `y`: `number`, `z`: `number`) => `VSVec3`  } = chunkSpace; `column`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) = columnSpace; `region`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) & \{ `chunkBounds`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `columnBounds`: \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } ; `getChunkVolume`: () => `number` ; `getColumnVolume`: () => `number`  } = regionSpace; `voxel`: [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) = voxelSpace; `setDimensions`: (`data`: \{ `chunks`: `Vector3` ; `columns`: `Vector3` ; `regions`: `Vector3`  }) => `void`  } |
| `getZeroPointVoxelSpace` | (`dimensions`: `Vector3`) => [`VoxelSpace`](../classes/Math_Spaces_VoxelSpace.VoxelSpace.md) |

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpaces.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpaces.ts#L8)
