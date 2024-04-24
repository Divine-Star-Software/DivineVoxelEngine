---
id: "Util_UtilMap.UtilMap"
title: "Class: UtilMap<T, K>"
sidebar_label: "UtilMap"
custom_edit_url: null
---

[Util/UtilMap](../modules/Util_UtilMap.md).UtilMap

## Type parameters

| Name |
| :------ |
| `T` |
| `K` |

## Constructors

### constructor

• **new UtilMap**\<`T`, `K`\>(`data?`): [`UtilMap`](Util_UtilMap.UtilMap.md)\<`T`, `K`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | [id: T, value: K][] |

#### Returns

[`UtilMap`](Util_UtilMap.UtilMap.md)\<`T`, `K`\>

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L3)

## Properties

### \_map

• **\_map**: `Map`\<`T`, `K`\>

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L2)

## Methods

### add

▸ **add**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [id: T, value: K][] |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L13)

___

### get

▸ **get**(`id`): `undefined` \| `NonNullable`\<`K`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |

#### Returns

`undefined` \| `NonNullable`\<`K`\>

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L9)

___

### has

▸ **has**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L17)

___

### remove

▸ **remove**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L20)

___

### set

▸ **set**(`id`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `value` | `K` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Util/UtilMap.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Util/UtilMap.ts#L6)
