---
id: "Contexts_World_DivineVoxelEngineWorld.DivineVoxelEngineWorld"
title: "Class: DivineVoxelEngineWorld"
sidebar_label: "DivineVoxelEngineWorld"
custom_edit_url: null
---

[Contexts/World/DivineVoxelEngineWorld](../modules/Contexts_World_DivineVoxelEngineWorld.md).DivineVoxelEngineWorld

# Divine Voxel Engine World
---
This handles everything in the world worker context.

## Constructors

### constructor

• **new DivineVoxelEngineWorld**(): [`DivineVoxelEngineWorld`](Contexts_World_DivineVoxelEngineWorld.DivineVoxelEngineWorld.md)

#### Returns

[`DivineVoxelEngineWorld`](Contexts_World_DivineVoxelEngineWorld.DivineVoxelEngineWorld.md)

#### Defined in

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L21)

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

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L16)

___

### core

• **core**: [`DVEWorldCore`](Interfaces_World_DVEWorldCore.DVEWorldCore.md)

#### Defined in

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L19)

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

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L17)

___

### environment

▪ `Static` **environment**: ``"node"`` \| ``"browser"`` = `"browser"`

#### Defined in

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L14)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineWorld`](Contexts_World_DivineVoxelEngineWorld.DivineVoxelEngineWorld.md)

#### Defined in

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L15)

## Methods

### init

▸ **init**(`core`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `core` | [`DVEWorldCore`](Interfaces_World_DVEWorldCore.DVEWorldCore.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/World/DivineVoxelEngineWorld.ts#L26)
