---
id: "Contexts_World_DVEFDataSync.DVEFDataSync"
title: "Class: DVEFDataSync"
sidebar_label: "DVEFDataSync"
custom_edit_url: null
---

[Contexts/World/DVEFDataSync](../modules/Contexts_World_DVEFDataSync.md).DVEFDataSync

## Hierarchy

- `DataSync`

  ↳ **`DVEFDataSync`**

## Constructors

### constructor

• **new DVEFDataSync**(): [`DVEFDataSync`](Contexts_World_DVEFDataSync.DVEFDataSync.md)

#### Returns

[`DVEFDataSync`](Contexts_World_DVEFDataSync.DVEFDataSync.md)

#### Overrides

DataSync.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFDataSync.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFDataSync.ts#L23)

## Properties

### \_ready

• **\_ready**: `boolean`

#### Inherited from

DataSync.\_ready

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:14

___

### commMap

• **commMap**: `Map`\<`string`, `Thread` \| `ThreadPool`\>

#### Inherited from

DataSync.commMap

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:11

___

### commOptions

• **commOptions**: `WeakMap`\<`any`, `CommSyncOptions`\>

#### Inherited from

DataSync.commOptions

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:13

___

### comms

• **comms**: (`Thread` \| `ThreadPool`)[]

#### Inherited from

DataSync.comms

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:12

___

### maps

• **maps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `objects` | `DataSyncNode`\<`RegisterObjectMapSync`, `RegisterObjectMapSync`, `void`, ``false``\> |
| `strings` | `DataSyncNode`\<`RegisterStringMapSync`, `RegisterStringMapSync`, `void`, ``false``\> |

#### Inherited from

DataSync.maps

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:31

___

### palettes

• **palettes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substance` | `DataSyncNode`\<`void`, `PaletteSyncData`, `void`, ``false``\> |
| `voxel` | `DataSyncNode`\<`void`, `PaletteSyncData`, `void`, ``false``\> |

#### Inherited from

DataSync.palettes

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:27

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<`DataSync`\> |

#### Inherited from

DataSync.pipelines

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:15

___

### tags

• **tags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `substance` | `DataSyncNode`\<`void`, `RemoteTagManagerInitData`, `void`, ``false``\> |
| `voxel` | `DataSyncNode`\<`void`, [`RemoteTagManagerInitData`, `SharedArrayBuffer`], `void`, ``false``\> |

#### Inherited from

DataSync.tags

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:23

___

### worldData

• **worldData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunk` | `DataSyncNode`\<`LocationData`, [`LocationData`, [`Chunk`](Data_World_Classes_Chunk.Chunk.md)], `LocationData`, `LocationData`\> |
| `column` | `DataSyncNode`\<`LocationData`, [`LocationData`, [`Column`](Data_World_Classes_Column.Column.md)], `LocationData`, `LocationData`\> |
| `dimesnion` | `DataSyncNode`\<`string` \| `number`, [`DimensionData`](../modules/Data_Types_DimensionData_types.md#dimensiondata), `string` \| `number`, `boolean`\> |
| `region` | `DataSyncNode`\<`LocationData`, [`LocationData`, [`Region`](Data_World_Classes_Region.Region.md)], `LocationData`, `LocationData`\> |
| `regionHeader` | `DataSyncNode`\<`LocationData`, [`WorldDataSync`](../modules/Data_Types_DataSync_types.md#worlddatasync), `LocationData`, `boolean`\> |

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFDataSync.ts:77](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFDataSync.ts#L77)

___

### worldDataTags

• **worldDataTags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunk` | `DataSyncNode`\<`void`, `RemoteTagManagerInitData`, `void`, ``false``\> |
| `column` | `DataSyncNode`\<`void`, `RemoteTagManagerInitData`, `void`, ``false``\> |
| `region` | `DataSyncNode`\<`void`, [`RemoteTagManagerInitData`, `RemoteTagManagerInitData`], `void`, ``false``\> |

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFDataSync.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFDataSync.ts#L38)

___

### constructorPipeLine

▪ `Static` **constructorPipeLine**: `Pipeline`\<`DataSync`\>

#### Inherited from

DataSync.constructorPipeLine

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:10

___

### instance

▪ `Static` **instance**: `DataSync`

#### Inherited from

DataSync.instance

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:9

## Methods

### init

▸ **init**(`world`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `world` | `DVEWorldCore` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

DataSync.init

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:19

___

### isReady

▸ **isReady**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DataSync.isReady

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:20

___

### loopThroughComms

▸ **loopThroughComms**(`func`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (`comm`: `Thread` \| `ThreadPool`, `options`: `CommSyncOptions`) => `void` |

#### Returns

`void`

#### Inherited from

DataSync.loopThroughComms

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:22

___

### registerComm

▸ **registerComm**(`comm`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comm` | `Thread` \| `ThreadPool` |
| `data?` | `Partial`\<`CommSyncOptions`\> |

#### Returns

`void`

#### Inherited from

DataSync.registerComm

#### Defined in

divinevoxel/core/dist/Interfaces/World/Data/DataSync.d.ts:21
