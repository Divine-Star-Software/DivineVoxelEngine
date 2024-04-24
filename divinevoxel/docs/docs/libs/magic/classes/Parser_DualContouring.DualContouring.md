---
id: "Parser_DualContouring.DualContouring"
title: "Class: DualContouring"
sidebar_label: "DualContouring"
custom_edit_url: null
---

[Parser/DualContouring](../modules/Parser_DualContouring.md).DualContouring

## Constructors

### constructor

• **new DualContouring**(`sdfGrid`, `size`): [`DualContouring`](Parser_DualContouring.DualContouring.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdfGrid` | `Float32Array` |
| `size` | `Object` |
| `size.x` | `number` |
| `size.y` | `number` |
| `size.z` | `number` |

#### Returns

[`DualContouring`](Parser_DualContouring.DualContouring.md)

#### Defined in

[Parser/DualContouring.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L7)

## Properties

### hermiteData

• `Private` **hermiteData**: `Map`\<`string`, \{ `normal`: `number`[] ; `point`: `number`[]  }\>

#### Defined in

[Parser/DualContouring.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L4)

___

### sdfGrid

• `Private` **sdfGrid**: `Float32Array`

#### Defined in

[Parser/DualContouring.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L2)

___

### size

• `Private` **size**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Defined in

[Parser/DualContouring.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L3)

## Methods

### calculateNormal

▸ **calculateNormal**(`x`, `y`, `z`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`number`[]

#### Defined in

[Parser/DualContouring.ts:120](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L120)

___

### checkEdge

▸ **checkEdge**(`x1`, `y1`, `z1`, `x2`, `y2`, `z2`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x1` | `number` |
| `y1` | `number` |
| `z1` | `number` |
| `x2` | `number` |
| `y2` | `number` |
| `z2` | `number` |

#### Returns

`void`

#### Defined in

[Parser/DualContouring.ts:97](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L97)

___

### generateMesh

▸ **generateMesh**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `indices` | `number`[][] |
| `vertices` | `number`[][] |

#### Defined in

[Parser/DualContouring.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L33)

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

[Parser/DualContouring.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L15)

___

### getSDF

▸ **getSDF**(`x`, `y`, `z`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`number`

#### Defined in

[Parser/DualContouring.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L19)

___

### processCell

▸ **processCell**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[Parser/DualContouring.ts:91](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L91)

___

### solveQEF

▸ **solveQEF**(`x`, `y`, `z`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`number`[]

#### Defined in

[Parser/DualContouring.ts:127](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/magic/src/Parser/DualContouring.ts#L127)
