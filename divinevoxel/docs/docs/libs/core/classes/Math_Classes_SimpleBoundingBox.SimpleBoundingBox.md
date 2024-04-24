---
id: "Math_Classes_SimpleBoundingBox.SimpleBoundingBox"
title: "Class: SimpleBoundingBox"
sidebar_label: "SimpleBoundingBox"
custom_edit_url: null
---

[Math/Classes/SimpleBoundingBox](../modules/Math_Classes_SimpleBoundingBox.md).SimpleBoundingBox

## Constructors

### constructor

• **new SimpleBoundingBox**(`origin`, `dimensions`): [`SimpleBoundingBox`](Math_Classes_SimpleBoundingBox.SimpleBoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`Vector3`](Math_Classes_Vector3.Vector3.md) |
| `dimensions` | [`DimensionsVector3`](../modules/Math_Types_Math_types.md#dimensionsvector3) |

#### Returns

[`SimpleBoundingBox`](Math_Classes_SimpleBoundingBox.SimpleBoundingBox.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L30)

## Properties

### \_voxelBottomCheckPoints

• **\_voxelBottomCheckPoints**: `number`[][] = `[]`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L27)

___

### \_voxelCheckMap

• **\_voxelCheckMap**: `Record`\<`string`, `boolean`\> = `{}`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L25)

___

### \_voxelCheckPoints

• **\_voxelCheckPoints**: `number`[][] = `[]`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L26)

___

### \_voxelOriginPoints

• **\_voxelOriginPoints**: `number`[][] = `[]`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L28)

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

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L6)

___

### checkBounds

• **checkBounds**: `Object`

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

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L14)

___

### checkOrigin

• **checkOrigin**: [`Vector3`](Math_Classes_Vector3.Vector3.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L23)

___

### dimensions

• **dimensions**: [`DimensionsVector3`](../modules/Math_Types_Math_types.md#dimensionsvector3)

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L30)

___

### origin

• **origin**: [`Vector3`](Math_Classes_Vector3.Vector3.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L30)

## Methods

### \_getPositionKey

▸ **_getPositionKey**(`x`, `y`, `z`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`string`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:148](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L148)

___

### \_updateBounds

▸ **_updateBounds**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L37)

___

### \_updateCheckBounds

▸ **_updateCheckBounds**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L47)

___

### doesBoxIntersect

▸ **doesBoxIntersect**(`testBox`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `testBox` | [`BoundsObject`](../modules/Math_Types_Math_types.md#boundsobject) |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:164](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L164)

___

### getCurrentOriginPoints

▸ **getCurrentOriginPoints**(): `number`[][]

#### Returns

`number`[][]

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:80](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L80)

___

### getVoxelBottomCheckPoints

▸ **getVoxelBottomCheckPoints**(): `number`[][]

#### Returns

`number`[][]

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:124](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L124)

___

### getVoxelCheckPoints

▸ **getVoxelCheckPoints**(): `number`[][]

#### Returns

`number`[][]

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:100](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L100)

___

### isPointInsideBox

▸ **isPointInsideBox**(`point`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Position3Matrix`](../modules/Math_Types_Math_types.md#position3matrix) |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:152](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L152)

___

### setCheckOrigin

▸ **setCheckOrigin**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:75](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L75)

___

### setOriginToCheckOrigin

▸ **setOriginToCheckOrigin**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:63](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L63)

___

### updateOrigin

▸ **updateOrigin**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/SimpleBoundingBox.ts#L57)
