---
id: "Util_VoxelIDMatrix.VoxelIDMatrix"
title: "Class: VoxelIDMatrix"
sidebar_label: "VoxelIDMatrix"
custom_edit_url: null
---

[Util/VoxelIDMatrix](../modules/Util_VoxelIDMatrix.md).VoxelIDMatrix

## Hierarchy

- [`DataMatrix`](Util_DataMatrix.DataMatrix.md)\<`string` \| `number`\>

  ↳ **`VoxelIDMatrix`**

## Constructors

### constructor

• **new VoxelIDMatrix**(`size`): [`VoxelIDMatrix`](Util_VoxelIDMatrix.VoxelIDMatrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `Vec3Array` |

#### Returns

[`VoxelIDMatrix`](Util_VoxelIDMatrix.VoxelIDMatrix.md)

#### Overrides

[DataMatrix](Util_DataMatrix.DataMatrix.md).[constructor](Util_DataMatrix.DataMatrix.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L10)

## Properties

### defaultValue

• **defaultValue**: `string` \| `number`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[defaultValue](Util_DataMatrix.DataMatrix.md#defaultvalue)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L6)

___

### index

• **index**: `Flat3DIndex`

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L8)

___

### size

• **size**: `Vec3Array`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[size](Util_DataMatrix.DataMatrix.md#size)

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L10)

___

### dataTool

▪ `Static` **dataTool**: [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L7)

## Accessors

### sizeX

• `get` **sizeX**(): `number`

#### Returns

`number`

#### Inherited from

DataMatrix.sizeX

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L11)

___

### sizeY

• `get` **sizeY**(): `number`

#### Returns

`number`

#### Inherited from

DataMatrix.sizeY

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L15)

___

### sizeZ

• `get` **sizeZ**(): `number`

#### Returns

`number`

#### Inherited from

DataMatrix.sizeZ

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L19)

## Methods

### cloneMatrix

▸ **cloneMatrix**(): (`string` \| `number`)[][][]

#### Returns

(`string` \| `number`)[][][]

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[cloneMatrix](Util_DataMatrix.DataMatrix.md#clonematrix)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L26)

___

### copy

▸ **copy**(`matrix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`VoxelIDMatrix`](Util_VoxelIDMatrix.VoxelIDMatrix.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:58](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L58)

___

### deleteVec3

▸ **deleteVec3**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Vec3Array` |

#### Returns

`void`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[deleteVec3](Util_DataMatrix.DataMatrix.md#deletevec3)

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

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[deleteXYZ](Util_DataMatrix.DataMatrix.md#deletexyz)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L53)

___

### fromFlatArray

▸ **fromFlatArray**(`voxels`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `voxels` | `ArrayLike`\<`number`\> |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L44)

___

### getAll

▸ **getAll**(): `Generator`\<[`Vec3Array`, `string` \| `number`], `any`, `unknown`\>

#### Returns

`Generator`\<[`Vec3Array`, `string` \| `number`], `any`, `unknown`\>

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[getAll](Util_DataMatrix.DataMatrix.md#getall)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L69)

___

### getVec3

▸ **getVec3**(`«destructured»`): `undefined` \| `string` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Vec3Array` |

#### Returns

`undefined` \| `string` \| `number`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[getVec3](Util_DataMatrix.DataMatrix.md#getvec3)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L41)

___

### getXYZ

▸ **getXYZ**(`x`, `y`, `z`): `undefined` \| `string` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`undefined` \| `string` \| `number`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[getXYZ](Util_DataMatrix.DataMatrix.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L45)

___

### isCube

▸ **isCube**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[isCube](Util_DataMatrix.DataMatrix.md#iscube)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:89](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L89)

___

### setAll

▸ **setAll**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Returns

`void`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[setAll](Util_DataMatrix.DataMatrix.md#setall)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L57)

___

### setBounds

▸ **setBounds**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `Vec3Array` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L15)

___

### setMatrix

▸ **setMatrix**(`matrix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | (`string` \| `number`)[][][] |

#### Returns

`void`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[setMatrix](Util_DataMatrix.DataMatrix.md#setmatrix)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L23)

___

### setVec3

▸ **setVec3**(`«destructured»`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Vec3Array` |
| `value` | `string` \| `number` |

#### Returns

`void`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[setVec3](Util_DataMatrix.DataMatrix.md#setvec3)

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
| `value` | `string` \| `number` |

#### Returns

`void`

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[setXYZ](Util_DataMatrix.DataMatrix.md#setxyz)

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

#### Inherited from

[DataMatrix](Util_DataMatrix.DataMatrix.md).[swap](Util_DataMatrix.DataMatrix.md#swap)

#### Defined in

[divinevoxel/foundation/src/Util/DataMatrix.ts:79](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/DataMatrix.ts#L79)

___

### toFlatArray

▸ **toFlatArray**(): `number`[]

#### Returns

`number`[]

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L19)

___

### toTypedArray

▸ **toTypedArray**(): `Uint16Array`

#### Returns

`Uint16Array`

#### Defined in

[divinevoxel/foundation/src/Util/VoxelIDMatrix.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VoxelIDMatrix.ts#L31)
