---
id: "Math_Spaces_VoxelSpace.VoxelSpace"
title: "Class: VoxelSpace"
sidebar_label: "VoxelSpace"
custom_edit_url: null
---

[Math/Spaces/VoxelSpace](../modules/Math_Spaces_VoxelSpace.md).VoxelSpace

## Constructors

### constructor

• **new VoxelSpace**(`data`): [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.getIndex` | (`space`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)) => `number` |
| `data.getPosition` | (`space`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)) => `VSVec3` |
| `data.getPostionFromIndex` | (`space`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md), `index`: `number`) => `VSVec3` |

#### Returns

[`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:102](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L102)

## Properties

### \_bounds

• **\_bounds**: `VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:98](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L98)

___

### \_boundsPower2

• **\_boundsPower2**: `VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:99](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L99)

___

### \_boundsSet

• **\_boundsSet**: `boolean` = `false`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:100](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L100)

___

### \_hashedPosition

• **\_hashedPosition**: `VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:97](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L97)

___

### \_location

• **\_location**: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:95](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L95)

___

### \_position

• **\_position**: `VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L96)

___

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getIndex` | (`space`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)) => `number` |
| `getPosition` | (`space`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)) => `VSVec3` |
| `getPostionFromIndex` | (`space`: [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md), `index`: `number`) => `VSVec3` |

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:103](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L103)

___

### WholeVec3

▪ `Static` **WholeVec3**: `VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:72](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L72)

___

### index

▪ `Static` **index**: [`Flat3DIndex`](Math_Flat3DIndex.Flat3DIndex.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L36)

## Methods

### getArea

▸ **getArea**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:114](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L114)

___

### getDepth

▸ **getDepth**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:126](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L126)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:118](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L118)

___

### getIndex

▸ **getIndex**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:205](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L205)

___

### getIndexLocation

▸ **getIndexLocation**(`location`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:217](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L217)

___

### getIndexToXYZ

▸ **getIndexToXYZ**(`index`): `VSVec3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:213](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L213)

___

### getIndexXYZ

▸ **getIndexXYZ**(`x`, `y`, `z`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:209](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L209)

___

### getKey

▸ **getKey**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:225](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L225)

___

### getKeyLocation

▸ **getKeyLocation**(`location`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

`string`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:233](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L233)

___

### getKeyXYZ

▸ **getKeyXYZ**(`x`, `y`, `z`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`string`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:229](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L229)

___

### getLocation

▸ **getLocation**(): [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Returns

[`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:147](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L147)

___

### getLocationXYZ

▸ **getLocationXYZ**(`x`, `y`, `z`): [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:153](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L153)

___

### getPosition

▸ **getPosition**(): `VSVec3`

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:193](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L193)

___

### getPositionFromIndex

▸ **getPositionFromIndex**(`index`): `VSVec3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:221](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L221)

___

### getPositionLocation

▸ **getPositionLocation**(`location`): `VSVec3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:201](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L201)

___

### getPositionXYZ

▸ **getPositionXYZ**(`x`, `y`, `z`): `VSVec3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:197](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L197)

___

### getVolume

▸ **getVolume**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L110)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:122](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L122)

___

### setBounds

▸ **setBounds**(`bounds`): `undefined` \| [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bounds` | `Vector3` |

#### Returns

`undefined` \| [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:184](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L184)

___

### setCubeBounds

▸ **setCubeBounds**(`bounds`): `undefined` \| [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bounds` | `Vector3` |

#### Returns

`undefined` \| [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:172](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L172)

___

### setLocation

▸ **setLocation**(`location`): [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

[`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:159](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L159)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:130](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L130)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:139](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L139)

___

### updateLoaction

▸ **updateLoaction**(`location`): [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

[`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md)

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:164](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L164)

___

### getIndex

▸ **getIndex**(`position`, `bounds`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Vector3` |
| `bounds` | `Vector3` |

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L67)

___

### getPositionFromIndex

▸ **getPositionFromIndex**(`position`, `bounds`, `index`): `VSVec3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `VSVec3` |
| `bounds` | `Vector3` \| `VSVec3` |
| `index` | `number` |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L53)

___

### mapLocationToVec3

▸ **mapLocationToVec3**(`location`, `vector`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |
| `vector` | `Vector3` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:89](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L89)

___

### simpleCubeHash

▸ **simpleCubeHash**(`space`): `VSVec3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `space` | [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L37)

___

### spatialHash

▸ **spatialHash**(`space`, `parentSpace`, `divisor?`): `VSVec3`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `space` | [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) | `undefined` |
| `parentSpace` | [`VoxelSpace`](Math_Spaces_VoxelSpace.VoxelSpace.md) | `undefined` |
| `divisor` | `Vector3` | `VoxelSpace.WholeVec3` |

#### Returns

`VSVec3`

#### Defined in

[divinevoxel/core/src/Math/Spaces/VoxelSpace.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Spaces/VoxelSpace.ts#L73)
