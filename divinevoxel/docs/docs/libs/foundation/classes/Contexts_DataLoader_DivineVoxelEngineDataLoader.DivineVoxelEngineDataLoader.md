---
id: "Contexts_DataLoader_DivineVoxelEngineDataLoader.DivineVoxelEngineDataLoader"
title: "Class: DivineVoxelEngineDataLoader"
sidebar_label: "DivineVoxelEngineDataLoader"
custom_edit_url: null
---

[Contexts/DataLoader/DivineVoxelEngineDataLoader](../modules/Contexts_DataLoader_DivineVoxelEngineDataLoader.md).DivineVoxelEngineDataLoader

## Constructors

### constructor

• **new DivineVoxelEngineDataLoader**(`data`): [`DivineVoxelEngineDataLoader`](Contexts_DataLoader_DivineVoxelEngineDataLoader.DivineVoxelEngineDataLoader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DivineVoxelEngineDataLoaderInitData`](../modules/Contexts_DataLoader_DivineVoxelEngineDataLoader.md#divinevoxelenginedataloaderinitdata) |

#### Returns

[`DivineVoxelEngineDataLoader`](Contexts_DataLoader_DivineVoxelEngineDataLoader.DivineVoxelEngineDataLoader.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L26)

## Properties

### TC

• **TC**: `Object` = `Threads`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__expectedPorts` | `Record`\<`string`, `boolean`\> |
| `__initalized` | `boolean` |
| `_commManageras` | `Record`\<`string`, `ThreadPool`\> |
| `_comms` | `Record`\<`string`, `Thread`\> |
| `_queues` | `Map`\<`string`, `Map`\<`string`, `SyncedQueue`\>\> |
| `crypto` | `Crypto` |
| `environment` | ``"node"`` \| ``"browser"`` |
| `internal` | \{ `_tasks`: `Map`\<`number`, `Map`\<`number`, `any`\>\> ; `isInternal`: (`data`: `any`) => `boolean` ; `registerTasks`: (`headID`: `number`, `taskId`: `number`, `run`: `any`) => `void` ; `runInternal`: (`data`: `any`, `event`: `any`) => `undefined` \| ``false``  } |
| `internal._tasks` | `Map`\<`number`, `Map`\<`number`, `any`\>\> |
| `internal.isInternal` | [object Object] |
| `internal.registerTasks` | [object Object] |
| `internal.runInternal` | [object Object] |
| `parent` | `Thread` |
| `threadName` | `string` |
| `threadNumber` | `number` |
| `$INIT` | (`threadName`: `string`, `threadParentName`: `string`) => `Promise`\<`void`\> |
| `addComm` | (`comm`: `Thread`) => `void` |
| `createComm` | \<T\>(`name`: `string`, `mergeObject?`: `T`) => `T` & `Thread` |
| `createThreadPool` | (`data`: `ThreadPoolData`) => `ThreadPool` |
| `getComm` | (`id`: `string`) => `Thread` |
| `getThreadPool` | (`id`: `string`) => `ThreadPool` |
| `getSyncedQueue` | (`threadId`: `string`, `queueId`: `string`) => `undefined` \| `SyncedQueue` |
| `getWorkerPort` | () => `Promise`\<`any`\> |
| `onDataSync` | \<T_2, K\>(`dataType`: `string` \| `number`, `onSync?`: (`data`: `T_2`) => `void`, `onUnSync?`: (`data`: `K`) => `void`) => `any` |
| `registerTasks` | \<T_1\>(`id`: `string` \| `number`, `run`: (`data`: `T_1`, `onDone?`: (`data?`: `any`, `transfers?`: `any`) => `void`) => `void`, `mode?`: ``"async"`` \| ``"deferred"``) => `void` |

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L22)

___

### data

• **data**: `DVEDataCore`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L23)

___

### dataHandler

• **dataHandler**: [`DataHanlderWrapper`](Contexts_DataLoader_DataHandler_DataHandlerWrapper.DataHanlderWrapper.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L25)

___

### environment

• **environment**: ``"node"`` \| ``"browser"``

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L20)

___

### threads

• **threads**: [`DataLoaderThreads`](Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L24)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineDataLoader`](Contexts_DataLoader_DivineVoxelEngineDataLoader.DivineVoxelEngineDataLoader.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L19)

## Methods

### getDataTool

▸ **getDataTool**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L42)

___

### getRichDataTool

▸ **getRichDataTool**(): [`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Returns

[`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L39)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DivineVoxelEngineDataLoader.ts#L35)
