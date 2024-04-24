---
id: "Contexts_World_Lock_WorldLock"
title: "Module: Contexts/World/Lock/WorldLock"
sidebar_label: "Contexts/World/Lock/WorldLock"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### WorldLock

• `Const` **WorldLock**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_loadMap` | [`UtilMap`](../classes/Util_UtilMap.UtilMap.md)\<`string`, `boolean`\> |
| `dataLoader` | [`DataLoaderTool`](../classes/Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md) |
| `locks` | [`UtilMap`](../classes/Util_UtilMap.UtilMap.md)\<`string`, [`WorldLockTasks`](Types_Tasks_types.md#worldlocktasks)\> |
| `addLock` | (`data`: [`WorldLockTasks`](Types_Tasks_types.md#worldlocktasks)) => `Promise`\<`unknown`\> |
| `init` | (`dataLoaderTool`: [`DataLoaderTool`](../classes/Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)) => `void` |
| `isLocked` | (`__namedParameters`: `LocationData`) => `boolean` |
| `removeLock` | (`data`: [`WorldLockTasks`](Types_Tasks_types.md#worldlocktasks)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Lock/WorldLock.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Lock/WorldLock.ts#L10)
