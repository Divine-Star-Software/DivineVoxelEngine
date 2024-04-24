---
id: "Default_Tools_Util_Flat3dArray.Flat3DAnyArray"
title: "Class: Flat3DAnyArray<T>"
sidebar_label: "Flat3DAnyArray"
custom_edit_url: null
---

[Default/Tools/Util/Flat3dArray](../modules/Default_Tools_Util_Flat3dArray.md).Flat3DAnyArray

# Flat 3D Any Array
---
Used to treat a 1d array as a 3d array.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Flat3DIndex`](Default_Tools_Util_Flat3dArray.Flat3DIndex.md)

  ↳ **`Flat3DAnyArray`**

## Constructors

### constructor

• **new Flat3DAnyArray**\<`T`\>(`bounds`, `array`): [`Flat3DAnyArray`](Default_Tools_Util_Flat3dArray.Flat3DAnyArray.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `bounds` | `Vec3Array` |
| `array` | `T`[] |

#### Returns

[`Flat3DAnyArray`](Default_Tools_Util_Flat3dArray.Flat3DAnyArray.md)\<`T`\>

#### Overrides

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[constructor](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:108](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L108)

## Properties

### \_position

• **\_position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Overrides

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[_position](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#_position)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:101](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L101)

___

### array

• **array**: `T`[]

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:108](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L108)

___

### bounds

• **bounds**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[bounds](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#bounds)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L9)

___

### volumne

• **volumne**: `number` = `0`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:107](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L107)

## Methods

### deleteValue

▸ **deleteValue**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:135](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L135)

___

### getIndex

▸ **getIndex**(`x`, `y`, `z`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`number`

#### Inherited from

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[getIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#getindex)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L15)

___

### getValue

▸ **getValue**(`x`, `y`, `z`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`T`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:127](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L127)

___

### getXYZ

▸ **getXYZ**(`index`): `Position3Matrix`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Position3Matrix`

#### Inherited from

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[getXYZ](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L19)

___

### setArray

▸ **setArray**(`array`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:123](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L123)

___

### setValue

▸ **setValue**(`x`, `y`, `z`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:131](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L131)

___

### updateBounds

▸ **updateBounds**(`bounds`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bounds` | `Position3Matrix` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:117](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L117)
