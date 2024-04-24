---
id: "Default_Builder_Geometry_VoxelGeometry.VoxelGeometry"
title: "Class: VoxelGeometry"
sidebar_label: "VoxelGeometry"
custom_edit_url: null
---

[Default/Builder/Geometry/VoxelGeometry](../modules/Default_Builder_Geometry_VoxelGeometry.md).VoxelGeometry

## Constructors

### constructor

• **new VoxelGeometry**(): [`VoxelGeometry`](Default_Builder_Geometry_VoxelGeometry.VoxelGeometry.md)

#### Returns

[`VoxelGeometry`](Default_Builder_Geometry_VoxelGeometry.VoxelGeometry.md)

## Methods

### addQuad

▸ **addQuad**(`tool`, `origin`, `doubleSided`, `points`, `«destructured»`, `normalOverrides?`, `ao?`, `light?`, `animations?`, `textureIndex?`, `overlayTextures?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md) |
| `origin` | `Position3Matrix` |
| `doubleSided` | `boolean` |
| `points` | [`QuadVertexVec3Data`](../modules/Default_Builder_Geometry_Geometry_types.md#quadvertexvec3data) |
| `«destructured»` | [`QuadUVData`](../modules/Default_Builder_Geometry_Geometry_types.md#quaduvdata) |
| `normalOverrides?` | [`QuadVertexVec3Data`](../modules/Default_Builder_Geometry_Geometry_types.md#quadvertexvec3data) |
| `ao?` | [`QuadVertexFloatData`](../modules/Default_Builder_Geometry_Geometry_types.md#quadvertexfloatdata) |
| `light?` | [`QuadVertexFloatData`](../modules/Default_Builder_Geometry_Geometry_types.md#quadvertexfloatdata) |
| `animations?` | [`QuadVertexFloatData`](../modules/Default_Builder_Geometry_Geometry_types.md#quadvertexfloatdata) |
| `textureIndex?` | `number` |
| `overlayTextures?` | [`QuadVertexFloatData`](../modules/Default_Builder_Geometry_Geometry_types.md#quadvertexfloatdata) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/VoxelGeometry.ts:90](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/VoxelGeometry.ts#L90)

___

### addSimpleQuad

▸ **addSimpleQuad**(`tool`, `origin`, `orientation`, `flip`, `points`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md) |
| `origin` | `Position3Matrix` |
| `orientation` | ``0`` \| ``1`` |
| `flip` | `boolean` |
| `points` | [`Vec3Array`, `Vec3Array`] |
| `«destructured»` | [`QuadUVData`](../modules/Default_Builder_Geometry_Geometry_types.md#quaduvdata) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/VoxelGeometry.ts:202](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/VoxelGeometry.ts#L202)

___

### addTriangle

▸ **addTriangle**(`tool`, `origin`, `points`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md) |
| `origin` | `Position3Matrix` |
| `points` | [`Vec3Array`, `Vec3Array`, `Vec3Array`] |
| `«destructured»` | [`Vec2Array`, `Vec2Array`, `Vec2Array`] |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/VoxelGeometry.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/VoxelGeometry.ts#L16)
