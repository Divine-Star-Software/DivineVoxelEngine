---
id: "Default_Tools_Util_Flat3dArray.Flat3DArray"
title: "Class: Flat3DArray"
sidebar_label: "Flat3DArray"
custom_edit_url: null
---

[Default/Tools/Util/Flat3dArray](../modules/Default_Tools_Util_Flat3dArray.md).Flat3DArray

# Flat 3D Array
---
Used to treat a number or typed array 1d array as a 3d array.

## Hierarchy

- [`Flat3DIndex`](Default_Tools_Util_Flat3dArray.Flat3DIndex.md)

  ↳ **`Flat3DArray`**

## Constructors

### constructor

• **new Flat3DArray**(`bounds`): [`Flat3DArray`](Default_Tools_Util_Flat3dArray.Flat3DArray.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bounds` | `Position3Matrix` |

#### Returns

[`Flat3DArray`](Default_Tools_Util_Flat3dArray.Flat3DArray.md)

#### Overrides

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[constructor](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L35)

## Properties

### \_position

• **\_position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[_position](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#_position)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L4)

___

### array

• **array**: `number`[] \| `Uint8Array` = `[]`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L32)

___

### bounds

• **bounds**: `Position3Matrix`

#### Inherited from

[Flat3DIndex](Default_Tools_Util_Flat3dArray.Flat3DIndex.md).[bounds](Default_Tools_Util_Flat3dArray.Flat3DIndex.md#bounds)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L35)

___

### volumne

• **volumne**: `number` = `0`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L33)

## Methods

### deleteUseObj

▸ **deleteUseObj**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Position3Matrix` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:86](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L86)

___

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

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:81](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L81)

___

### fillArray

▸ **fillArray**(`value?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `0` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L53)

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

▸ **getValue**(`x`, `y`, `z`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:59](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L59)

___

### getValueUseObj

▸ **getValueUseObj**(`position`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Position3Matrix` |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L62)

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
| `array` | `number`[] \| `Uint8Array` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L49)

___

### setValue

▸ **setValue**(`x`, `y`, `z`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L70)

___

### setValueUseObj

▸ **setValueUseObj**(`position`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Position3Matrix` |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L73)

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

[divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Util/Flat3dArray.ts#L41)
