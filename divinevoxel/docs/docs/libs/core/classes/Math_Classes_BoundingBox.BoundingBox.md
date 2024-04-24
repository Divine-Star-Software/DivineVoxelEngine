---
id: "Math_Classes_BoundingBox.BoundingBox"
title: "Class: BoundingBox"
sidebar_label: "BoundingBox"
custom_edit_url: null
---

[Math/Classes/BoundingBox](../modules/Math_Classes_BoundingBox.md).BoundingBox

## Constructors

### constructor

• **new BoundingBox**(`data`): [`BoundingBox`](Math_Classes_BoundingBox.BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`BoundingBoxData`](../modules/Math_Classes_BoundingBox.md#boundingboxdata) |

#### Returns

[`BoundingBox`](Math_Classes_BoundingBox.BoundingBox.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L26)

## Properties

### bottomPlane

• **bottomPlane**: [`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L13)

___

### bounds

• **bounds**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxX` | `number` |
| `maxY` | `number` |
| `maxZ` | `number` |
| `minX` | `number` |
| `minY` | `number` |
| `minZ` | `number` |

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L18)

___

### eastPlane

• **eastPlane**: [`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L16)

___

### northPlane

• **northPlane**: [`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L14)

___

### southPlane

• **southPlane**: [`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L15)

___

### topPlane

• **topPlane**: [`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L12)

___

### westPlane

• **westPlane**: [`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L17)

## Methods

### \_doMinMaxCheck

▸ **_doMinMaxCheck**(`plane`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `plane` | [`Plane`](Math_Classes_Plane.Plane.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/BoundingBox.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/BoundingBox.ts#L41)
