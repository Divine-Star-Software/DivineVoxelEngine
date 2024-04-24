---
id: "Data_World_Classes_Region.Region"
title: "Class: Region"
sidebar_label: "Region"
custom_edit_url: null
---

[Data/World/Classes/Region](../modules/Data_World_Classes_Region.md).Region

## Hierarchy

- `RegionData`

  ↳ **`Region`**

## Constructors

### constructor

• **new Region**(`data`): [`Region`](Data_World_Classes_Region.Region.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `RegionData` |

#### Returns

[`Region`](Data_World_Classes_Region.Region.md)

#### Inherited from

RegionData.constructor

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L31)

## Properties

### columns

• **columns**: `Map`\<`number`, [`Column`](Data_World_Classes_Column.Column.md)\>

#### Inherited from

RegionData.columns

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L9)

___

### regionState

• **regionState**: `DataView`

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L30)

___

### stateBuffer

• **stateBuffer**: `ArrayBuffer`

#### Inherited from

RegionData.stateBuffer

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L8)

___

### Tags

▪ `Static` **Tags**: `RemoteTagManager`

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L29)

## Methods

### getColumns

▸ **getColumns**(): `Generator`\<[`Column`](Data_World_Classes_Column.Column.md), `any`, `unknown`\>

#### Returns

`Generator`\<[`Column`](Data_World_Classes_Column.Column.md), `any`, `unknown`\>

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L36)

___

### AddNew

▸ **AddNew**(`data`): [`Region`](Data_World_Classes_Region.Region.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `RegionData` |

#### Returns

[`Region`](Data_World_Classes_Region.Region.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L24)

___

### CreateNew

▸ **CreateNew**(): [`Region`](Data_World_Classes_Region.Region.md)

#### Returns

[`Region`](Data_World_Classes_Region.Region.md)

#### Defined in

[divinevoxel/foundation/src/Data/World/Classes/Region.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/World/Classes/Region.ts#L14)
