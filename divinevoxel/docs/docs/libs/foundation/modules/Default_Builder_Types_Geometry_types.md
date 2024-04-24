---
id: "Default_Builder_Types_Geometry_types"
title: "Module: Default/Builder/Types/Geometry.types"
sidebar_label: "Default/Builder/Types/Geometry.types"
custom_edit_url: null
---

## Type Aliases

### AddQuadUVsData

Ƭ **AddQuadUVsData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `direction` | `DirectionNames` |
| `flipped` | `boolean` |
| `height` | [`UVCords`](Default_Builder_Types_Geometry_types.md#uvcords) |
| `rotoate` | [`TextureRotations`](Default_Builder_Types_Geometry_types.md#texturerotations) |
| `uv` | `number` |
| `uvs` | `number`[] |
| `width` | [`UVCords`](Default_Builder_Types_Geometry_types.md#uvcords) |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L18)

___

### AdvancedUVs

Ƭ **AdvancedUVs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `he1` | `number` |
| `he2` | `number` |
| `hs1` | `number` |
| `hs2` | `number` |
| `we1` | `number` |
| `we2` | `number` |
| `ws1` | `number` |
| `ws2` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L35)

___

### CustomVertexData

Ƭ **CustomVertexData**: [`number`, `number`, `number`, `number`] \| [`number`]

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L34)

___

### GeometryBuildData

Ƭ **GeometryBuildData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AOColors` | `number`[] |
| `colors` | `number`[] |
| `faceData` | `number`[] |
| `indices` | `number`[] |
| `indicieIndex` | `number` |
| `lightColors` | `number`[] |
| `normals` | `number`[] |
| `overlayUVs` | `number`[] |
| `position` | `Position3Matrix` |
| `positions` | `number`[] |
| `uvs` | `number`[] |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L4)

___

### QuadDimensions

Ƭ **QuadDimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L29)

___

### QuadTransforms

Ƭ **QuadTransforms**: `Record`\<[`QuadVertexes`](Default_Builder_Types_Geometry_types.md#quadvertexes), `Position3Matrix`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L31)

___

### QuadVertexes

Ƭ **QuadVertexes**: ``1`` \| ``2`` \| ``3`` \| ``4``

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L30)

___

### TextureRotations

Ƭ **TextureRotations**: ``0`` \| ``90`` \| ``180`` \| ``270`` \| ``360`` \| ``45`` \| ``315``

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L28)

___

### TriangleTransforms

Ƭ **TriangleTransforms**: `Record`\<[`TriangleVertexes`](Default_Builder_Types_Geometry_types.md#trianglevertexes), `Position3Matrix`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L33)

___

### TriangleVertexes

Ƭ **TriangleVertexes**: ``1`` \| ``2`` \| ``3``

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L32)

___

### UVCords

Ƭ **UVCords**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `end` | `number` |
| `start` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Types/Geometry.types.ts#L17)
