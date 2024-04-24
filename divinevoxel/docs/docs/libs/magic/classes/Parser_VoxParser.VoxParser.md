---
id: "Parser_VoxParser.VoxParser"
title: "Class: VoxParser"
sidebar_label: "VoxParser"
custom_edit_url: null
---

[Parser/VoxParser](../modules/Parser_VoxParser.md).VoxParser

## Constructors

### constructor

• **new VoxParser**(`arrayBuffer`): [`VoxParser`](Parser_VoxParser.VoxParser.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayBuffer` | `ArrayBuffer` |

#### Returns

[`VoxParser`](Parser_VoxParser.VoxParser.md)

#### Defined in

[Parser/VoxParser.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L10)

## Properties

### \_sdfGrid

• **\_sdfGrid**: ``null`` \| `Float32Array` = `null`

#### Defined in

[Parser/VoxParser.ts:243](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L243)

___

### \_voxelGrid

• `Private` **\_voxelGrid**: `Uint32Array`

#### Defined in

[Parser/VoxParser.ts:97](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L97)

___

### cursor

• `Private` **cursor**: `number` = `0`

#### Defined in

[Parser/VoxParser.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L5)

___

### dataView

• `Private` **dataView**: `DataView`

#### Defined in

[Parser/VoxParser.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L4)

___

### palette

• **palette**: \{ `a`: `number` ; `b`: `number` ; `g`: `number` ; `r`: `number`  }[] = `[]`

#### Defined in

[Parser/VoxParser.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L7)

___

### size

• **size**: ``null`` \| \{ `x`: `number` ; `y`: `number` ; `z`: `number`  } = `null`

#### Defined in

[Parser/VoxParser.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L8)

___

### voxels

• **voxels**: \{ `colorIndex`: `number` ; `x`: `number` ; `y`: `number` ; `z`: `number`  }[] = `[]`

#### Defined in

[Parser/VoxParser.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L6)

## Methods

### applyGaussianBlur

▸ **applyGaussianBlur**(`sdfGrid`, `width`, `height`, `depth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdfGrid` | `Float32Array` |
| `width` | `number` |
| `height` | `number` |
| `depth` | `number` |

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:345](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L345)

___

### applyMedianFilter

▸ **applyMedianFilter**(`sdfGrid`, `width`, `height`, `depth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdfGrid` | `Float32Array` |
| `width` | `number` |
| `height` | `number` |
| `depth` | `number` |

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:311](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L311)

___

### createCubeAssistedLookUpTable

▸ **createCubeAssistedLookUpTable**(): `Uint32Array`

#### Returns

`Uint32Array`

#### Defined in

[Parser/VoxParser.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L110)

___

### getDualContouringMesher

▸ **getDualContouringMesher**(): [`DualContouring`](Parser_DualContouring.DualContouring.md)

#### Returns

[`DualContouring`](Parser_DualContouring.DualContouring.md)

#### Defined in

[Parser/VoxParser.ts:419](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L419)

___

### getGPUData

▸ **getGPUData**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `voxelGrid` | `Uint32Array` |
| `voxelLookUp` | `Uint32Array` |

#### Defined in

[Parser/VoxParser.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L20)

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

#### Defined in

[Parser/VoxParser.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L93)

___

### getSDFGrid

▸ **getSDFGrid**(): `Float32Array`

#### Returns

`Float32Array`

#### Defined in

[Parser/VoxParser.ts:244](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L244)

___

### getVoxelGrid

▸ **getVoxelGrid**(): `Uint32Array`

#### Returns

`Uint32Array`

#### Defined in

[Parser/VoxParser.ts:98](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L98)

___

### parse

▸ **parse**(): `void`

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L14)

___

### readChunk

▸ **readChunk**(): `void`

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L66)

___

### readHeader

▸ **readHeader**(): `void`

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L29)

___

### readInt

▸ **readInt**(): `number`

#### Returns

`number`

#### Defined in

[Parser/VoxParser.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L46)

___

### readMainChunk

▸ **readMainChunk**(): `void`

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L52)

___

### readRGBA

▸ **readRGBA**(`end`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `end` | `number` |

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:228](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L228)

___

### readSize

▸ **readSize**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Defined in

[Parser/VoxParser.ts:210](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L210)

___

### readString

▸ **readString**(`length`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Returns

`string`

#### Defined in

[Parser/VoxParser.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L38)

___

### readXYZI

▸ **readXYZI**(`end`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `end` | `number` |

#### Returns

`void`

#### Defined in

[Parser/VoxParser.ts:217](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L217)

___

### summedVolume

▸ **summedVolume**(`x`, `y`, `z`, `size`, `table`, `dimX`, `dimY`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `size` | `number` |
| `table` | `Uint32Array` |
| `dimX` | `number` |
| `dimY` | `number` |

#### Returns

`number`

#### Defined in

[Parser/VoxParser.ts:184](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/VoxParser.ts#L184)
