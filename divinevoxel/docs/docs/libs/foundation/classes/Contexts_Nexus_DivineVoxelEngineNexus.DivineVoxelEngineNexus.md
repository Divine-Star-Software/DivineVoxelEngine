---
id: "Contexts_Nexus_DivineVoxelEngineNexus.DivineVoxelEngineNexus"
title: "Class: DivineVoxelEngineNexus"
sidebar_label: "DivineVoxelEngineNexus"
custom_edit_url: null
---

[Contexts/Nexus/DivineVoxelEngineNexus](../modules/Contexts_Nexus_DivineVoxelEngineNexus.md).DivineVoxelEngineNexus

## Constructors

### constructor

• **new DivineVoxelEngineNexus**(`data`): [`DivineVoxelEngineNexus`](Contexts_Nexus_DivineVoxelEngineNexus.DivineVoxelEngineNexus.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DivineVoxelEngineNexusInitData`](../modules/Contexts_Nexus_DivineVoxelEngineNexus.md#divinevoxelenginenexusinitdata) |

#### Returns

[`DivineVoxelEngineNexus`](Contexts_Nexus_DivineVoxelEngineNexus.DivineVoxelEngineNexus.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L22)

## Properties

### TC

• **TC**: `Object` = `ThreadComm`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__expectedPorts` | `Record`\<`string`, `boolean`\> |
| `__initalized` | `boolean` |
| `_commManageras` | `Record`\<`string`, `CommManager`\> |
| `_comms` | `Record`\<`string`, `CommBase`\> |
| `_queues` | `Map`\<`string`, `Map`\<`string`, `SyncedQueue`\>\> |
| `crypto` | `Crypto` |
| `environment` | ``"node"`` \| ``"browser"`` |
| `internal` | \{ `_tasks`: `Map`\<`number`, `Map`\<`number`, `any`\>\> ; `isInternal`: (`data`: `any`) => `boolean` ; `registerTasks`: (`headID`: `number`, `taskId`: `number`, `run`: `any`) => `void` ; `runInternal`: (`data`: `any`, `event`: `any`) => `undefined` \| ``false``  } |
| `internal._tasks` | `Map`\<`number`, `Map`\<`number`, `any`\>\> |
| `internal.isInternal` | [object Object] |
| `internal.registerTasks` | [object Object] |
| `internal.runInternal` | [object Object] |
| `parent` | `CommBase` |
| `threadName` | `string` |
| `threadNumber` | `number` |
| `$INIT` | (`threadName`: `string`, `threadParentName`: `string`) => `Promise`\<`void`\> |
| `addComm` | (`comm`: `CommBase`) => `void` |
| `createComm` | \<T\>(`name`: `string`, `mergeObject?`: `T`) => `T` & `CommBase` |
| `createCommManager` | (`data`: `CommManagerData`) => `CommManager` |
| `getComm` | (`id`: `string`) => `CommBase` |
| `getCommManager` | (`id`: `string`) => `CommManager` |
| `getSyncedQueue` | (`threadId`: `string`, `queueId`: `string`) => `undefined` \| `SyncedQueue` |
| `getWorkerPort` | () => `Promise`\<`any`\> |
| `onDataSync` | \<T_2, K\>(`dataType`: `string` \| `number`, `onSync?`: (`data`: `T_2`) => `void`, `onUnSync?`: (`data`: `K`) => `void`) => `any` |
| `registerTasks` | \<T_1\>(`id`: `string` \| `number`, `run`: (`data`: `T_1`, `onDone?`: (`data?`: `any`, `transfers?`: `any`) => `void`) => `void`, `mode?`: ``"async"`` \| ``"deferred"``) => `void` |

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L18)

___

### data

• **data**: `DVEDataCore`

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L19)

___

### environment

• **environment**: ``"node"`` \| ``"browser"``

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L16)

___

### threads

• **threads**: [`NexusThreads`](Contexts_Nexus_Threads_NexusTheads.NexusThreads.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L20)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineNexus`](Contexts_Nexus_DivineVoxelEngineNexus.DivineVoxelEngineNexus.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L15)

## Methods

### getDataTool

▸ **getDataTool**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L37)

___

### getRichDataTool

▸ **getRichDataTool**(): [`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Returns

[`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L34)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/DivineVoxelEngineNexus.ts#L30)
