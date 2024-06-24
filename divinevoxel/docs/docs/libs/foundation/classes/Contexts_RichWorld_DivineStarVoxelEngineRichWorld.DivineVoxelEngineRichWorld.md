---
id: "Contexts_RichWorld_DivineStarVoxelEngineRichWorld.DivineVoxelEngineRichWorld"
title: "Class: DivineVoxelEngineRichWorld"
sidebar_label: "DivineVoxelEngineRichWorld"
custom_edit_url: null
---

[Contexts/RichWorld/DivineStarVoxelEngineRichWorld](../modules/Contexts_RichWorld_DivineStarVoxelEngineRichWorld.md).DivineVoxelEngineRichWorld

## Constructors

### constructor

• **new DivineVoxelEngineRichWorld**(`data`): [`DivineVoxelEngineRichWorld`](Contexts_RichWorld_DivineStarVoxelEngineRichWorld.DivineVoxelEngineRichWorld.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DivineVoxelEngineRichWorldInitData`](../modules/Contexts_RichWorld_DivineStarVoxelEngineRichWorld.md#divinevoxelenginerichworldinitdata) |

#### Returns

[`DivineVoxelEngineRichWorld`](Contexts_RichWorld_DivineStarVoxelEngineRichWorld.DivineVoxelEngineRichWorld.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L26)

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

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L21)

___

### data

• **data**: `DVEDataCore`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L23)

___

### environment

• **environment**: ``"node"`` \| ``"browser"``

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L19)

___

### register

• **register**: [`RichDataRegister`](Contexts_RichWorld_RichDataRegister.RichDataRegister.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L22)

___

### threads

• **threads**: [`RichWorldThreads`](Contexts_RichWorld_Threads_RichWorldThreads.RichWorldThreads.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L24)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineRichWorld`](Contexts_RichWorld_DivineStarVoxelEngineRichWorld.DivineVoxelEngineRichWorld.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L18)

## Methods

### getDataTool

▸ **getDataTool**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L43)

___

### getRichDataTool

▸ **getRichDataTool**(): [`RichDataTool`](Contexts_RichWorld_Tools_RichDataTool.RichDataTool.md)

#### Returns

[`RichDataTool`](Contexts_RichWorld_Tools_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L40)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/DivineStarVoxelEngineRichWorld.ts#L36)
