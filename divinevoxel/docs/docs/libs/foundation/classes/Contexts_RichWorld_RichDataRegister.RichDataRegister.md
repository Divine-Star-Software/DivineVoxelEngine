---
id: "Contexts_RichWorld_RichDataRegister.RichDataRegister"
title: "Class: RichDataRegister"
sidebar_label: "RichDataRegister"
custom_edit_url: null
---

[Contexts/RichWorld/RichDataRegister](../modules/Contexts_RichWorld_RichDataRegister.md).RichDataRegister

## Constructors

### constructor

• **new RichDataRegister**(): [`RichDataRegister`](Contexts_RichWorld_RichDataRegister.RichDataRegister.md)

#### Returns

[`RichDataRegister`](Contexts_RichWorld_RichDataRegister.RichDataRegister.md)

## Properties

### \_dimensions

• **\_dimensions**: [`RichWorldDimensions`](../modules/Data_Types_RichWorldData_types.md#richworlddimensions)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts#L10)

___

### column

• **column**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`location`: `LocationData`) => [`RichColumn`](../modules/Data_Types_RichWorldData_types.md#richcolumn) |
| `get` | (`location`: `LocationData`) => ``false`` \| [`RichColumn`](../modules/Data_Types_RichWorldData_types.md#richcolumn) |
| `remove` | (`location`: `LocationData`) => ``false`` \| [`RichColumn`](../modules/Data_Types_RichWorldData_types.md#richcolumn) |
| `update` | (`location`: `LocationData`, `data`: `any`) => `undefined` \| ``false`` |
| `_getColumnData` | () => [`RichColumn`](../modules/Data_Types_RichWorldData_types.md#richcolumn) |

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts#L62)

___

### dimensions

• **dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`dimensionId`: `string`) => `Map`\<`any`, `any`\> |
| `get` | (`dimensionId`: `string`) => ``false`` \| `Map`\<`string`, [`RichRegion`](../modules/Data_Types_RichWorldData_types.md#richregion)\> |

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts#L17)

___

### region

• **region**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`location`: `LocationData`) => [`RichRegion`](../modules/Data_Types_RichWorldData_types.md#richregion) |
| `get` | (`location`: `LocationData`) => ``false`` \| [`RichRegion`](../modules/Data_Types_RichWorldData_types.md#richregion) |
| `remove` | (`location`: `LocationData`) => ``false`` \| [`RichRegion`](../modules/Data_Types_RichWorldData_types.md#richregion) |
| `_getRegionData` | () => [`RichRegion`](../modules/Data_Types_RichWorldData_types.md#richregion) |

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts#L30)

## Methods

### getKey

▸ **getKey**(`location`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts:111](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts#L111)

___

### releaeeAll

▸ **releaeeAll**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/RichDataRegister.ts#L12)
