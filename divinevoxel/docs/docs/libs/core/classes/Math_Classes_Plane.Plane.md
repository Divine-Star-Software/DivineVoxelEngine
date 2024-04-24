---
id: "Math_Classes_Plane.Plane"
title: "Class: Plane"
sidebar_label: "Plane"
custom_edit_url: null
---

[Math/Classes/Plane](../modules/Math_Classes_Plane.md).Plane

## Constructors

### constructor

• **new Plane**(`data`): [`Plane`](Math_Classes_Plane.Plane.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`PlaneConstrucotrData`](../modules/Math_Classes_Plane.md#planeconstrucotrdata) |

#### Returns

[`Plane`](Math_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L21)

## Properties

### maxX

• **maxX**: `number` = `-Infinity`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L16)

___

### maxY

• **maxY**: `number` = `-Infinity`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L20)

___

### maxZ

• **maxZ**: `number` = `-Infinity`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L18)

___

### minX

• **minX**: `number` = `Infinity`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L15)

___

### minY

• **minY**: `number` = `Infinity`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L19)

___

### minZ

• **minZ**: `number` = `Infinity`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L17)

___

### v1

• **v1**: [`Vector3`](Math_Classes_Vector3.Vector3.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L11)

___

### v2

• **v2**: [`Vector3`](Math_Classes_Vector3.Vector3.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L12)

___

### v3

• **v3**: [`Vector3`](Math_Classes_Vector3.Vector3.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L13)

___

### v4

• **v4**: [`Vector3`](Math_Classes_Vector3.Vector3.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L14)

## Methods

### \_compareVales

▸ **_compareVales**(`v1`, `v2`, `axis`, `minProperty`, `maxProperty`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | [`Vector3`](Math_Classes_Vector3.Vector3.md) |
| `v2` | [`Vector3`](Math_Classes_Vector3.Vector3.md) |
| `axis` | ``"x"`` \| ``"y"`` \| ``"z"`` |
| `minProperty` | ``"minX"`` \| ``"minY"`` \| ``"minZ"`` |
| `maxProperty` | ``"maxX"`` \| ``"maxY"`` \| ``"maxZ"`` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L36)

___

### \_minMaxCompare

▸ **_minMaxCompare**(`v1`, `v2`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | [`Vector3`](Math_Classes_Vector3.Vector3.md) |
| `v2` | [`Vector3`](Math_Classes_Vector3.Vector3.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/Plane.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/Plane.ts#L67)
