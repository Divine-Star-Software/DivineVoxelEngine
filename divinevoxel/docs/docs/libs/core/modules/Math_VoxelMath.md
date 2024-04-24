---
id: "Math_VoxelMath"
title: "Module: Math/VoxelMath"
sidebar_label: "Math/VoxelMath"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### VoxelMath

Ƭ **VoxelMath**: typeof [`VoxelMath`](Math_VoxelMath.md#voxelmath-1)

#### Defined in

[divinevoxel/core/src/Math/VoxelMath.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/VoxelMath.ts#L12)

[divinevoxel/core/src/Math/VoxelMath.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/VoxelMath.ts#L65)

## Variables

### VoxelMath

• `Const` **VoxelMath**: `Object`

# Voxel Math
---
Can be used in any thread that needs it.
Has functions for collision detection, finding voxels in a direction, and path finding.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `visitAll` | (`startPoint`: [`Position3Matrix`](Math_Types_Math_types.md#position3matrix), `endPoint`: [`Position3Matrix`](Math_Types_Math_types.md#position3matrix), `visitor`: (`x`: `number`, `y`: `number`, `z`: `number`) => `boolean`) => `number`[] |
| `convertToOriginGridSpace` | (`position`: `number`[]) => `number`[] |
| `distance2D` | (`x1`: `number`, `x2`: `number`, `y1`: `number`, `y2`: `number`) => `number` |
| `distance3D` | (`x1`: `number`, `y1`: `number`, `z1`: `number`, `x2`: `number`, `y2`: `number`, `z2`: `number`) => `number` |
| `getBoundingBox` | (`data`: [`BoundingBoxData`](Math_Classes_BoundingBox.md#boundingboxdata)) => [`BoundingBox`](../classes/Math_Classes_BoundingBox.BoundingBox.md) |
| `getPlane` | (`pv1`: [`Vector3`](../classes/Math_Classes_Vector3.Vector3.md), `pv2`: [`Vector3`](../classes/Math_Classes_Vector3.Vector3.md), `pv3`: [`Vector3`](../classes/Math_Classes_Vector3.Vector3.md), `pv4`: [`Vector3`](../classes/Math_Classes_Vector3.Vector3.md)) => [`Plane`](../classes/Math_Classes_Plane.Plane.md) |
| `getSimpleBoundingBox` | (`origin`: [`Vector3`](../classes/Math_Classes_Vector3.Vector3.md), `dimensions`: [`DimensionsVector3`](Math_Types_Math_types.md#dimensionsvector3)) => [`SimpleBoundingBox`](../classes/Math_Classes_SimpleBoundingBox.SimpleBoundingBox.md) |
| `getVector3` | (`x`: `number`, `y`: `number`, `z`: `number`) => [`Vector3`](../classes/Math_Classes_Vector3.Vector3.md) |

#### Defined in

[divinevoxel/core/src/Math/VoxelMath.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/VoxelMath.ts#L12)

[divinevoxel/core/src/Math/VoxelMath.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/VoxelMath.ts#L65)
