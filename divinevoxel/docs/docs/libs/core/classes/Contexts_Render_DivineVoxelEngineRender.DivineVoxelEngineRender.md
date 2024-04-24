---
id: "Contexts_Render_DivineVoxelEngineRender.DivineVoxelEngineRender"
title: "Class: DivineVoxelEngineRender"
sidebar_label: "DivineVoxelEngineRender"
custom_edit_url: null
---

[Contexts/Render/DivineVoxelEngineRender](../modules/Contexts_Render_DivineVoxelEngineRender.md).DivineVoxelEngineRender

## Constructors

### constructor

• **new DivineVoxelEngineRender**(): [`DivineVoxelEngineRender`](Contexts_Render_DivineVoxelEngineRender.DivineVoxelEngineRender.md)

#### Returns

[`DivineVoxelEngineRender`](Contexts_Render_DivineVoxelEngineRender.DivineVoxelEngineRender.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L42)

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

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L27)

___

### core

• **core**: [`DVERenderCore`](Interfaces_Render_DVERenderCore.DVERenderCore.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L34)

___

### meshManager

• **meshManager**: `Object` = `MeshManager`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | \{ `add`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata), `substance`: `string`, `meshData`: [`DVENodeMeshAttributes`](../modules/Interfaces_Render_Nodes_DVERenderNode_types.md#dvenodemeshattributes)) => `void` ; `remove`: (`data`: [`RemoveChunkMeshTasks`](../modules/Contexts_Render_Tasks_RenderTasks_types.md#removechunkmeshtasks)) => `undefined` \| ``false`` ; `removeColumn`: (`data`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => `undefined` \| ``false`` ; `update`: (`data`: [`SetChunkMeshTask`](../modules/Contexts_Render_Tasks_RenderTasks_types.md#setchunkmeshtask)) => `void`  } |
| `chunks.add` | [object Object] |
| `chunks.remove` | [object Object] |
| `chunks.removeColumn` | [object Object] |
| `chunks.update` | [object Object] |
| `runningUpdate` | `boolean` |
| `removeColumnsOutsideRadius` | (`origion`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata), `radius`: `number`) => `void` |

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L30)

___

### meshRegister

• **meshRegister**: `Object` = `MeshRegister`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_dimensions` | [`MeshRegisterDimensions`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregisterdimensions) |
| `chunk` | \{ `_getChunkData`: (`mesh`: `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>) => [`MeshRegisterChunk`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk) ; `add`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata), `mesh`: `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>, `substance`: `string`) => `Map`\<`string`, [`MeshRegisterChunk`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk)\> ; `get`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata), `substance`: `string`) => ``false`` \| [`MeshRegisterChunk`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk) ; `remove`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata), `substance`: `string`) => ``false`` \| `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>  } |
| `chunk._getChunkData` | [object Object] |
| `chunk.add` | [object Object] |
| `chunk.get` | [object Object] |
| `chunk.remove` | [object Object] |
| `column` | \{ `_getColumnData`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => [`MeshRegisterColumn`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn) ; `add`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => [`MeshRegisterColumn`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn) ; `get`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => `undefined` \| ``false`` \| [`MeshRegisterColumn`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn) ; `remove`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => ``false`` \| [`MeshRegisterColumn`](../modules/Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn)  } |
| `column._getColumnData` | [object Object] |
| `column.add` | [object Object] |
| `column.get` | [object Object] |
| `column.remove` | [object Object] |
| `dimensions` | \{ `add`: (`id`: `string`) => `Map`\<`any`, `any`\> ; `get`: (`id`: `string`) => `undefined` \| `Map`\<`string`, [`MushRegisterRegion`](../modules/Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion)\> ; `getAllMeshes`: (`id`: `string`) => `Generator`\<[location: LocationData, substance: string, mesh: URIMesh\<URIScene\<unknown\>, unknown\>], `any`, `unknown`\> ; `remove`: (`id`: `string`) => `boolean`  } |
| `dimensions.add` | [object Object] |
| `dimensions.get` | [object Object] |
| `dimensions.getAllMeshes` | [object Object] |
| `dimensions.remove` | [object Object] |
| `region` | \{ `_getRegionData`: () => [`MushRegisterRegion`](../modules/Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion) ; `add`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => [`MushRegisterRegion`](../modules/Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion) ; `get`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => ``false`` \| [`MushRegisterRegion`](../modules/Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion) ; `remove`: (`location`: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)) => `boolean`  } |
| `region._getRegionData` | [object Object] |
| `region.add` | [object Object] |
| `region.get` | [object Object] |
| `region.remove` | [object Object] |
| `$INIT` | () => `void` |
| `clearAll` | () => `void` |

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L31)

___

### renderer

• **renderer**: [`DVERenderer`](Interfaces_Render_DVERenderer.DVERenderer.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L33)

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

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L29)

___

### tasks

• **tasks**: `Object` = `RenderTasks`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clearAll` | `void` |
| `removeChunk` | `void` |
| `removeColumn` | `void` |
| `removeColumnsOutsideRadius` | `void` |
| `setChunk` | `void` |

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L36)

___

### initialized

▪ `Static` **initialized**: `boolean` = `false`

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L26)

___

### instance

▪ `Static` **instance**: [`DivineVoxelEngineRender`](Contexts_Render_DivineVoxelEngineRender.DivineVoxelEngineRender.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L25)

## Accessors

### threads

• `get` **threads**(): [`RenderThreadManager`](Interfaces_Render_Threads_RenderThreads.RenderThreadManager.md)

#### Returns

[`RenderThreadManager`](Interfaces_Render_Threads_RenderThreads.RenderThreadManager.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L38)

## Methods

### clearAll

▸ **clearAll**(): `Promise`\<`void`\>

# clearAll
---
Clear all world data and meshes.

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L61)

___

### init

▸ **init**(`initData`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `initData` | [`DVERInitData`](../interfaces/Contexts_Render_DivineVoxelEngineRender.DVERInitData.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L48)
