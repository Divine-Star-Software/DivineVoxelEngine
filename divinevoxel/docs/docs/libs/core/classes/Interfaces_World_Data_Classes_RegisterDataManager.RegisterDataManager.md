---
id: "Interfaces_World_Data_Classes_RegisterDataManager.RegisterDataManager"
title: "Class: RegisterDataManager<T>"
sidebar_label: "RegisterDataManager"
custom_edit_url: null
---

[Interfaces/World/Data/Classes/RegisterDataManager](../modules/Interfaces_World_Data_Classes_RegisterDataManager.md).RegisterDataManager

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Constructors

### constructor

• **new RegisterDataManager**\<`T`\>(): [`RegisterDataManager`](Interfaces_World_Data_Classes_RegisterDataManager.RegisterDataManager.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Returns

[`RegisterDataManager`](Interfaces_World_Data_Classes_RegisterDataManager.RegisterDataManager.md)\<`T`\>

## Properties

### data

• **data**: `Map`\<`string`, `T`\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts#L2)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts#L19)

___

### getData

▸ **getData**(`id`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`T`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts#L3)

___

### registerData

▸ **registerData**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` \| `T`[] |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/RegisterDataManager.ts#L10)
