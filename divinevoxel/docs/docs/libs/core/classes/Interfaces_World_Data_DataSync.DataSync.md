---
id: "Interfaces_World_Data_DataSync.DataSync"
title: "Class: DataSync"
sidebar_label: "DataSync"
custom_edit_url: null
---

[Interfaces/World/Data/DataSync](../modules/Interfaces_World_Data_DataSync.md).DataSync

## Constructors

### constructor

• **new DataSync**(): [`DataSync`](Interfaces_World_Data_DataSync.DataSync.md)

#### Returns

[`DataSync`](Interfaces_World_Data_DataSync.DataSync.md)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L38)

## Properties

### \_ready

• **\_ready**: `boolean` = `false`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L32)

___

### commMap

• **commMap**: `Map`\<`string`, `CommBase` \| `CommManager`\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L29)

___

### commOptions

• **commOptions**: `WeakMap`\<`any`, [`CommSyncOptions`](../modules/Interfaces_World_Data_DataSyncNode.md#commsyncoptions)\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L31)

___

### comms

• **comms**: (`CommBase` \| `CommManager`)[] = `[]`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L30)

___

### maps

• **maps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `objects` | [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<[`RegisterObjectMapSync`](../modules/Types_DataSync_types.md#registerobjectmapsync), [`RegisterObjectMapSync`](../modules/Types_DataSync_types.md#registerobjectmapsync), `void`, ``false``\> |
| `strings` | [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<[`RegisterStringMapSync`](../modules/Types_DataSync_types.md#registerstringmapsync), [`RegisterStringMapSync`](../modules/Types_DataSync_types.md#registerstringmapsync), `void`, ``false``\> |

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:153](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L153)

___

### palettes

• **palettes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substance` | [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<`void`, [`PaletteSyncData`](../modules/Types_DataSync_types.md#palettesyncdata), `void`, ``false``\> |
| `voxel` | [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<`void`, [`PaletteSyncData`](../modules/Types_DataSync_types.md#palettesyncdata), `void`, ``false``\> |

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:126](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L126)

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<[`DataSync`](Interfaces_World_Data_DataSync.DataSync.md)\> |

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L34)

___

### tags

• **tags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substance` | [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<`void`, `RemoteTagManagerInitData`, `void`, ``false``\> |
| `voxel` | [`DataSyncNode`](Interfaces_World_Data_DataSyncNode.DataSyncNode.md)\<`void`, [`RemoteTagManagerInitData`, `SharedArrayBuffer`], `void`, ``false``\> |

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L96)

___

### constructorPipeLine

▪ `Static` **constructorPipeLine**: `Pipeline`\<[`DataSync`](Interfaces_World_Data_DataSync.DataSync.md)\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L28)

___

### instance

▪ `Static` **instance**: [`DataSync`](Interfaces_World_Data_DataSync.DataSync.md)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L27)

## Methods

### init

▸ **init**(`world`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `world` | [`DVEWorldCore`](Interfaces_World_DVEWorldCore.DVEWorldCore.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L44)

___

### isReady

▸ **isReady**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L66)

___

### loopThroughComms

▸ **loopThroughComms**(`func`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (`comm`: `CommBase` \| `CommManager`, `options`: [`CommSyncOptions`](../modules/Interfaces_World_Data_DataSyncNode.md#commsyncoptions)) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:86](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L86)

___

### registerComm

▸ **registerComm**(`comm`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comm` | `CommBase` \| `CommManager` |
| `data` | `Partial`\<[`CommSyncOptions`](../modules/Interfaces_World_Data_DataSyncNode.md#commsyncoptions)\> |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataSync.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataSync.ts#L70)
