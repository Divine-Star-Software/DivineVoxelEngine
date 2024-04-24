---
id: "Interfaces_World_Data_DataSyncNode.DataSyncNode"
title: "Class: DataSyncNode<SyncInput, SyncOutput, UnSyncInput, UnSyncOutput>"
sidebar_label: "DataSyncNode"
custom_edit_url: null
---

[Interfaces/World/Data/DataSyncNode](../modules/Interfaces_World_Data_DataSyncNode.md).DataSyncNode

## Type parameters

| Name |
| :------ |
| `SyncInput` |
| `SyncOutput` |
| `UnSyncInput` |
| `UnSyncOutput` |

## Constructors

### constructor

• **new DataSyncNode**\<`SyncInput`, `SyncOutput`, `UnSyncInput`, `UnSyncOutput`\>(`data`, `dataSync`): [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<`SyncInput`, `SyncOutput`, `UnSyncInput`, `UnSyncOutput`\>

#### Type parameters

| Name |
| :------ |
| `SyncInput` |
| `SyncOutput` |
| `UnSyncInput` |
| `UnSyncOutput` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.commCheck` | (`options`: [`CommSyncOptions`](../modules/Interfaces_World_Data_DataSyncNode.md#commsyncoptions), `threadId?`: `string`) => `boolean` |
| `data.dataSyncType` | `string` \| `number` |
| `data.getSyncData` | (`data`: `SyncInput`, `threadId?`: `string`) => ``false`` \| `SyncOutput` |
| `data.getUnSyncData` | (`data`: `UnSyncInput`, `threadId?`: `string`) => ``false`` \| `UnSyncOutput` |
| `dataSync` | [`DataSync`](Interfaces_World_Data_DataSync.DataSync.md) |

#### Returns

[`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<`SyncInput`, `SyncOutput`, `UnSyncInput`, `UnSyncOutput`\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L12)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `commCheck` | (`options`: [`CommSyncOptions`](../modules/Interfaces_World_Data_DataSyncNode.md#commsyncoptions), `threadId?`: `string`) => `boolean` |
| `dataSyncType` | `string` \| `number` |
| `getSyncData` | (`data`: `SyncInput`, `threadId?`: `string`) => ``false`` \| `SyncOutput` |
| `getUnSyncData` | (`data`: `UnSyncInput`, `threadId?`: `string`) => ``false`` \| `UnSyncOutput` |

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L13)

___

### dataSync

• **dataSync**: [`DataSync`](Interfaces_World_Data_DataSync.DataSync.md)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L22)

## Methods

### sync

▸ **sync**(`input`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `SyncInput` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L44)

___

### syncInThread

▸ **syncInThread**(`commName`, `input`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `commName` | `string` |
| `input` | `SyncInput` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:54](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L54)

___

### unSync

▸ **unSync**(`input`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `UnSyncInput` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L24)

___

### unSyncInThread

▸ **unSyncInThread**(`commName`, `input`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `commName` | `string` |
| `input` | `UnSyncInput` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSyncNode.ts#L32)
