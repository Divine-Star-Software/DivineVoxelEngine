---
id: "Contexts_Constructor_DivineVoxelEngineConstructor.DivineVoxelEngineConstructor"
title: "Class: DivineVoxelEngineConstructor"
sidebar_label: "DivineVoxelEngineConstructor"
custom_edit_url: null
---

[Contexts/Constructor/DivineVoxelEngineConstructor](../modules/Contexts_Constructor_DivineVoxelEngineConstructor.md).DivineVoxelEngineConstructor

## Constructors

### constructor

• **new DivineVoxelEngineConstructor**(): [`DivineVoxelEngineConstructor`](Contexts_Constructor_DivineVoxelEngineConstructor.DivineVoxelEngineConstructor.md)

#### Returns

[`DivineVoxelEngineConstructor`](Contexts_Constructor_DivineVoxelEngineConstructor.DivineVoxelEngineConstructor.md)

#### Defined in

[divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts#L19)

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

[divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts#L16)

___

### core

• **core**: [`DVEConstructorCore`](Interfaces_Constructor_DVEConstructorCore.DVEConstructorCore.md)

#### Defined in

[divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts#L17)

___

### environment

▪ `Static` **environment**: ``"node"`` \| ``"browser"`` = `"browser"`

#### Defined in

[divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts#L13)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineConstructor`](Contexts_Constructor_DivineVoxelEngineConstructor.DivineVoxelEngineConstructor.md)

#### Defined in

[divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts#L14)

## Methods

### init

▸ **init**(`data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DivineVoxelEngineConstructorInitData`](../modules/Contexts_Constructor_DivineVoxelEngineConstructor.md#divinevoxelengineconstructorinitdata) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Constructor/DivineVoxelEngineConstructor.ts#L25)
