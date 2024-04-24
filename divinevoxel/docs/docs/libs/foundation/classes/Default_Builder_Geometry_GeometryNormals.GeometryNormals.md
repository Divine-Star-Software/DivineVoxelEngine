---
id: "Default_Builder_Geometry_GeometryNormals.GeometryNormals"
title: "Class: GeometryNormals"
sidebar_label: "GeometryNormals"
custom_edit_url: null
---

[Default/Builder/Geometry/GeometryNormals](../modules/Default_Builder_Geometry_GeometryNormals.md).GeometryNormals

## Constructors

### constructor

• **new GeometryNormals**(): [`GeometryNormals`](Default_Builder_Geometry_GeometryNormals.GeometryNormals.md)

#### Returns

[`GeometryNormals`](Default_Builder_Geometry_GeometryNormals.GeometryNormals.md)

## Methods

### add

▸ **add**(`v1`, `v2`): `Vec3Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `Vec3Array` |
| `v2` | `Vec3Array` |

#### Returns

`Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L20)

___

### cross

▸ **cross**(`v1`, `v2`): `Vec3Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `Vec3Array` |
| `v2` | `Vec3Array` |

#### Returns

`Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L8)

___

### getQuadNormal

▸ **getQuadNormal**(`p1`, `p2`, `p3`, `p4`): [n1: Vec3Array, n2: Vec3Array, n3: Vec3Array, n4: Vec3Array]

#### Parameters

| Name | Type |
| :------ | :------ |
| `p1` | `Vec3Array` |
| `p2` | `Vec3Array` |
| `p3` | `Vec3Array` |
| `p4` | `Vec3Array` |

#### Returns

[n1: Vec3Array, n2: Vec3Array, n3: Vec3Array, n4: Vec3Array]

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L42)

___

### getTriangleNormals

▸ **getTriangleNormals**(`p1`, `p2`, `p3`): `Vec3Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p1` | `Vec3Array` |
| `p2` | `Vec3Array` |
| `p3` | `Vec3Array` |

#### Returns

`Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L31)

___

### normalize

▸ **normalize**(`v`): `Vec3Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `Vec3Array` |

#### Returns

`Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L24)

___

### scale

▸ **scale**(`v`, `scaleFactor`): `Vec3Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `Vec3Array` |
| `scaleFactor` | `number` |

#### Returns

`Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L16)

___

### subtract

▸ **subtract**(`v1`, `v2`): `Vec3Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `Vec3Array` |
| `v2` | `Vec3Array` |

#### Returns

`Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/GeometryNormals.ts#L4)
