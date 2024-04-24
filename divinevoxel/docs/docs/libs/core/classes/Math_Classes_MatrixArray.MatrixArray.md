---
id: "Math_Classes_MatrixArray.MatrixArray"
title: "Class: MatrixArray"
sidebar_label: "MatrixArray"
custom_edit_url: null
---

[Math/Classes/MatrixArray](../modules/Math_Classes_MatrixArray.md).MatrixArray

## Constructors

### constructor

• **new MatrixArray**(`startData`, `index?`): [`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `startData` | `number` \| [`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md) | `undefined` |
| `index` | `number` | `0` |

#### Returns

[`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L141)

## Properties

### cols

• **cols**: [col1: MatrixProperty, col2: MatrixProperty, col3: MatrixProperty, col4: MatrixProperty]

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:170](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L170)

___

### index

• **index**: `number` = `0`

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L141)

___

### matricies

• **matricies**: `Float32Array`

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:140](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L140)

___

### position

• **position**: [`MatrixProperty`](Math_Classes_MatrixArray.MatrixProperty.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:202](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L202)

___

### rows

• **rows**: [row1: MatrixProperty, row2: MatrixProperty, row3: MatrixProperty, row4: MatrixProperty]

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:164](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L164)

___

### scale

• **scale**: [`MatrixProperty`](Math_Classes_MatrixArray.MatrixProperty.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:176](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L176)

___

### trueIndex

• **trueIndex**: `number` = `0`

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:139](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L139)

___

### MATRIX\_INDEXES

▪ `Static` `Readonly` **MATRIX\_INDEXES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `POSITION_X` | `number` |
| `POSITION_Y` | `number` |
| `POSITION_Z` | `number` |
| `SCALE_W` | `number` |
| `SCALE_X` | `number` |
| `SCALE_Y` | `number` |
| `SCALE_Z` | `number` |

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L53)

## Methods

### copy

▸ **copy**(`matrix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:241](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L241)

___

### copyIndex

▸ **copyIndex**(): `number`[]

#### Returns

`number`[]

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:246](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L246)

___

### multiply

▸ **multiply**(`matirx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matirx` | [`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:255](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L255)

___

### setMatriciesIndex

▸ **setMatriciesIndex**(`index`): [`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md)

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:235](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L235)

___

### buildProperties

▸ **buildProperties**(`matrix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`MatrixArray`](Math_Classes_MatrixArray.MatrixArray.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Math/Classes/MatrixArray.ts:63](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Classes/MatrixArray.ts#L63)
