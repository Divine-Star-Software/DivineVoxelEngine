---
id: "Contexts_Headless_DivineVoxelEngineHeadless.DivineVoxelEngineHeadless"
title: "Class: DivineVoxelEngineHeadless"
sidebar_label: "DivineVoxelEngineHeadless"
custom_edit_url: null
---

[Contexts/Headless/DivineVoxelEngineHeadless](../modules/Contexts_Headless_DivineVoxelEngineHeadless.md).DivineVoxelEngineHeadless

## Constructors

### constructor

• **new DivineVoxelEngineHeadless**(): [`DivineVoxelEngineHeadless`](Contexts_Headless_DivineVoxelEngineHeadless.DivineVoxelEngineHeadless.md)

#### Returns

[`DivineVoxelEngineHeadless`](Contexts_Headless_DivineVoxelEngineHeadless.DivineVoxelEngineHeadless.md)

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L34)

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

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L24)

___

### core

• **core**: [`DVERenderCore`](Interfaces_Render_DVERenderCore.DVERenderCore.md)

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L28)

___

### settings

• **settings**: `Object` = `EngineSettings`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enviorment` | `string` |
| `settings` | [`EngineSettingsData`](../modules/Types_EngineSettings_types.md#enginesettingsdata) |
| `__syncWithObjects` | () => `void` |
| `doFlow` | () => `boolean` |
| `doLight` | () => `boolean` |
| `doRGBPropagation` | () => `boolean` |
| `doSunPropagation` | () => `boolean` |
| `getSettings` | () => [`EngineSettingsData`](../modules/Types_EngineSettings_types.md#enginesettingsdata) |
| `getSettingsCopy` | () => `any` |
| `isClient` | () => `boolean` |
| `isServer` | () => `boolean` |
| `richDataEnabled` | () => `boolean` |
| `saveWorldData` | () => `boolean` |
| `syncChunkInDataThread` | () => `boolean` |
| `syncChunkInFXThread` | () => `boolean` |
| `syncChunkInRichWorldThread` | () => `boolean` |
| `syncChunksInNexusThread` | () => `boolean` |
| `syncSettings` | (`data`: [`EngineSettingsData`](../modules/Types_EngineSettings_types.md#enginesettingsdata)) => `void` |
| `syncWithWorldBounds` | (`worldBounds`: \{ `bounds`: \{ `MaxX`: `number` = Infinity; `MaxY`: `number` = 256; `MaxZ`: `number` = Infinity; `MinX`: `number` = -Infinity; `MinY`: `number` = 0; `MinZ`: `number` = -Infinity } ; `setWorldBounds`: (`minX`: `number`, `maxX`: `number`, `minZ`: `number`, `maxZ`: `number`, `minY`: `number`, `maxY`: `number`) => `void`  }) => `void` |

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L26)

___

### initialized

▪ `Static` **initialized**: `boolean` = `false`

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L23)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineHeadless`](Contexts_Headless_DivineVoxelEngineHeadless.DivineVoxelEngineHeadless.md)

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L22)

## Accessors

### threads

• `get` **threads**(): [`RenderThreadManager`](Interfaces_Render_Threads_RenderThreads.RenderThreadManager.md)

#### Returns

[`RenderThreadManager`](Interfaces_Render_Threads_RenderThreads.RenderThreadManager.md)

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L30)

## Methods

### clearAll

▸ **clearAll**(): `Promise`\<`void`\>

# clearAll
---
Clear all world data and meshes.

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L50)

___

### init

▸ **init**(`initData`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `initData` | [`DVEHInitData`](../interfaces/Contexts_Headless_DivineVoxelEngineHeadless.DVEHInitData.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Headless/DivineVoxelEngineHeadless.ts#L39)
