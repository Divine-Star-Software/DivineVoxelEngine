---
id: "Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase"
title: "Class: LocationBoundToolBase"
sidebar_label: "LocationBoundToolBase"
custom_edit_url: null
---

[Interfaces/Data/LocationBoundToolBase](../modules/Interfaces_Data_LocationBoundToolBase.md).LocationBoundToolBase

## Hierarchy

- **`LocationBoundToolBase`**

  ↳ [`BrushToolBase`](Interfaces_Tools_BrushToolBase.BrushToolBase.md)

  ↳ [`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

## Constructors

### constructor

• **new LocationBoundToolBase**(): [`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Returns

[`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

## Properties

### location

• **location**: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L4)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L6)

• `set` **dimension**(`dimension`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimension` | `string` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L13)

• `set` **x**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L20)

• `set` **y**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L27)

• `set` **z**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L30)

## Methods

### getLocation

▸ **getLocation**(): [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Returns

[`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L39)

___

### getXYZ

▸ **getXYZ**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)

#### Returns

[`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L43)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L34)

___

### setLocation

▸ **setLocation**(`location`): [`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

[`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L65)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L60)
