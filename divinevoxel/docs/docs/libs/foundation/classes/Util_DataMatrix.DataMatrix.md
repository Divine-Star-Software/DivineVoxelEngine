---
id: "Util_DataMatrix.DataMatrix"
title: "Class: DataMatrix<T>"
sidebar_label: "DataMatrix"
custom_edit_url: null
---

[Util/DataMatrix](../modules/Util_DataMatrix.md).DataMatrix

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`DataMatrix`**

  ↳ [`VoxelIDMatrix`](Util_VoxelIDMatrix.VoxelIDMatrix.md)

## Constructors

### constructor

• **new DataMatrix**\<`T`\>(`size`, `defaultValue`): [`DataMatrix`](Util_DataMatrix.DataMatrix.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `Vec3Array` |
| `defaultValue` | `T` |

#### Returns

[`DataMatrix`](Util_DataMatrix.DataMatrix.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L6)

## Properties

### \_matrix

• `Private` **\_matrix**: `T`[][][]

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L4)

___

### defaultValue

• **defaultValue**: `T`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L6)

___

### size

• **size**: `Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L6)

## Accessors

### sizeX

• `get` **sizeX**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L11)

___

### sizeY

• `get` **sizeY**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L15)

___

### sizeZ

• `get` **sizeZ**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L19)

## Methods

### cloneMatrix

▸ **cloneMatrix**(): `T`[][][]

#### Returns

`T`[][][]

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L26)

___

### deleteVec3

▸ **deleteVec3**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Vec3Array` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L49)

___

### deleteXYZ

▸ **deleteXYZ**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L53)

___

### getAll

▸ **getAll**(): `Generator`\<[`Vec3Array`, `T`], `any`, `unknown`\>

#### Returns

`Generator`\<[`Vec3Array`, `T`], `any`, `unknown`\>

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L69)

___

### getVec3

▸ **getVec3**(`«destructured»`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Vec3Array` |

#### Returns

`undefined` \| `T`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L41)

___

### getXYZ

▸ **getXYZ**(`x`, `y`, `z`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`undefined` \| `T`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L45)

___

### isCube

▸ **isCube**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:89](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L89)

___

### isWithinBounds

▸ **isWithinBounds**(`x`, `y`, `z`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L93)

___

### setAll

▸ **setAll**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L57)

___

### setMatrix

▸ **setMatrix**(`matrix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | `T`[][][] |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L23)

___

### setVec3

▸ **setVec3**(`«destructured»`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Vec3Array` |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L30)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`, `value`): `void`

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

[divinevoxel/foundation/src/Util/DataMatrix.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L37)

___

### swap

▸ **swap**(`startPosition`, `endPosition`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `startPosition` | `Vec3Array` |
| `endPosition` | `Vec3Array` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:79](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L79)
