---
id: "Util_VisistedMap.VisitedMap"
title: "Class: VisitedMap"
sidebar_label: "VisitedMap"
custom_edit_url: null
---

[Util/VisistedMap](../modules/Util_VisistedMap.md).VisitedMap

## Constructors

### constructor

• **new VisitedMap**(): [`VisitedMap`](Util_VisistedMap.VisitedMap.md)

#### Returns

[`VisitedMap`](Util_VisistedMap.VisitedMap.md)

## Properties

### \_map

• **\_map**: `Map`\<`string`, `boolean`\>

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L2)

## Accessors

### size

• `get` **size**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L3)

## Methods

### \_getKey

▸ **_getKey**(`x`, `y`, `z`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L6)

___

### add

▸ **add**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L12)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L26)

___

### inMap

▸ **inMap**(`x`, `y`, `z`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L9)

___

### remove

▸ **remove**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L15)

___

### removeDiffernce

▸ **removeDiffernce**(`map`): [`VisitedMap`](Util_VisistedMap.VisitedMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | [`VisitedMap`](Util_VisistedMap.VisitedMap.md) |

#### Returns

[`VisitedMap`](Util_VisistedMap.VisitedMap.md)

#### Defined in

[divinevoxel/foundation/src/Util/VisistedMap.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/VisistedMap.ts#L18)
