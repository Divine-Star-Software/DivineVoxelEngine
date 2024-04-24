---
id: "Math_Flat3DIndex.Flat3DIndex"
title: "Class: Flat3DIndex"
sidebar_label: "Flat3DIndex"
custom_edit_url: null
---

[Math/Flat3DIndex](../modules/Math_Flat3DIndex.md).Flat3DIndex

## Constructors

### constructor

• **new Flat3DIndex**(`_getIndex`, `_getXYZ`): [`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_getIndex` | (`position`: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), `bounds`: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)) => `number` |
| `_getXYZ` | (`index`: `number`, `bounds`: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)) => [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix) |

#### Returns

[`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L7)

## Properties

### \_getIndex

• `Private` **\_getIndex**: (`position`: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array), `bounds`: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)) => `number`

#### Type declaration

▸ (`position`, `bounds`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |
| `bounds` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |

##### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L8)

___

### \_getXYZ

• `Private` **\_getXYZ**: (`index`: `number`, `bounds`: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)) => [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix)

#### Type declaration

▸ (`index`, `bounds`): [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix)

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `bounds` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |

##### Returns

[`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L9)

___

### bounds

• `Private` **bounds**: [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L5)

___

### position

• `Private` **position**: [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L4)

## Accessors

### size

• `get` **size**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L36)

## Methods

### getIndex

▸ **getIndex**(`position`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L40)

___

### getXYZ

▸ **getXYZ**(`index`): [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L44)

___

### setBounds

▸ **setBounds**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L48)

___

### GetXYZOrder

▸ **GetXYZOrder**(): [`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Returns

[`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L24)

___

### GetXZYOrder

▸ **GetXZYOrder**(): [`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Returns

[`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Defined in

[divinevoxel/core/src/Math/Flat3DIndex.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Flat3DIndex.ts#L12)
