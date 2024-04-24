---
id: "Data_World_Classes_Dimension.Dimension"
title: "Class: Dimension"
sidebar_label: "Dimension"
custom_edit_url: null
---

[Data/World/Classes/Dimension](../modules/Data_World_Classes_Dimension.md).Dimension

## Hierarchy

- `DimensionData`

  ↳ **`Dimension`**

## Constructors

### constructor

• **new Dimension**(`data`): [`Dimension`](Data_World_Classes_Dimension.Dimension.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `DimensionData` |

#### Returns

[`Dimension`](Data_World_Classes_Dimension.Dimension.md)

#### Inherited from

DimensionData.constructor

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L16)

## Properties

### id

• **id**: `string`

#### Inherited from

DimensionData.id

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L4)

___

### regions

• **regions**: `Map`\<`string`, [`Region`](Data_World_Classes_Region.Region.md)\>

#### Inherited from

DimensionData.regions

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L5)

## Methods

### delete

▸ **delete**(`regionId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `regionId` | `string` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L23)

___

### get

▸ **get**(`regionId`): `undefined` \| [`Region`](Data_World_Classes_Region.Region.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `regionId` | `string` |

#### Returns

`undefined` \| [`Region`](Data_World_Classes_Region.Region.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L26)

___

### set

▸ **set**(`regionId`, `region`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `regionId` | `string` |
| `region` | [`Region`](Data_World_Classes_Region.Region.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L20)

___

### CreateNew

▸ **CreateNew**(`id`): [`Dimension`](Data_World_Classes_Dimension.Dimension.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Dimension`](Data_World_Classes_Dimension.Dimension.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Dimension.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Dimension.ts#L10)
