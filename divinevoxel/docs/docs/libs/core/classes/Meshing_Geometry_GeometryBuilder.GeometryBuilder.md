---
id: "Meshing_Geometry_GeometryBuilder.GeometryBuilder"
title: "Class: GeometryBuilder"
sidebar_label: "GeometryBuilder"
custom_edit_url: null
---

[Meshing/Geometry/GeometryBuilder](../modules/Meshing_Geometry_GeometryBuilder.md).GeometryBuilder

## Constructors

### constructor

• **new GeometryBuilder**(): [`GeometryBuilder`](Meshing_Geometry_GeometryBuilder.GeometryBuilder.md)

#### Returns

[`GeometryBuilder`](Meshing_Geometry_GeometryBuilder.GeometryBuilder.md)

## Methods

### addQuad

▸ **addQuad**(`tool`, `origin`, `doubleSided`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md) |
| `origin` | [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix) |
| `doubleSided` | `boolean` |
| `«destructured»` | [`QuadVertexVec3Data`](../modules/Meshing_Geometry_types.md#quadvertexvec3data) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts#L62)

___

### addQuadAttributes

▸ **addQuadAttributes**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts#L61)

___

### addSimpleQuad

▸ **addSimpleQuad**(`tool`, `origin`, `orientation`, `flip`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md) |
| `origin` | [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix) |
| `orientation` | ``0`` \| ``1`` |
| `flip` | `boolean` |
| `«destructured»` | [[`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)] |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts:204](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts#L204)

___

### addTriangle

▸ **addTriangle**(`tool`, `origin`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md) |
| `origin` | [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix) |
| `«destructured»` | [[`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)] |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts#L8)

___

### calculateQuadPoints

▸ **calculateQuadPoints**(`start`, `end`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |
| `end` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `normal` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |
| `points` | readonly [[`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)] |

#### Defined in

[divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts:160](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Geometry/GeometryBuilder.ts#L160)
