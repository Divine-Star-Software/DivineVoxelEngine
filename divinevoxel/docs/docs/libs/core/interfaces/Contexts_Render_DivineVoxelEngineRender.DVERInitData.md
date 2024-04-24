---
id: "Contexts_Render_DivineVoxelEngineRender.DVERInitData"
title: "Interface: DVERInitData"
sidebar_label: "DVERInitData"
custom_edit_url: null
---

[Contexts/Render/DivineVoxelEngineRender](../modules/Contexts_Render_DivineVoxelEngineRender.md).DVERInitData

## Hierarchy

- `PartialEngineSettings`

  ↳ **`DVERInitData`**

## Properties

### chunks

• `Optional` **chunks**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoHeightMap`: `boolean` ; `chunkXPow2`: `number` ; `chunkYPow2`: `number` ; `chunkZPow2`: `number`  }\>

#### Inherited from

PartialEngineSettings.chunks

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L46)

___

### constructorWorkers

• **constructorWorkers**: `Worker`[]

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L19)

___

### core

• **core**: [`DVERenderCore`](../classes/Interfaces_Render_DVERenderCore.DVERenderCore.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L20)

___

### data

• `Optional` **data**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoSyncChunks`: `boolean` ; `enabled`: `boolean` ; `mode`: ``"server"`` \| ``"indexdb"`` \| ``"both"``  }\>

#### Inherited from

PartialEngineSettings.data

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L7)

___

### floatingOrigin

• `Optional` **floatingOrigin**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `enable`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.floatingOrigin

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L30)

___

### flow

• `Optional` **flow**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `baseFlowLimit`: ``100`` ; `enable`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.flow

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L62)

___

### fx

• `Optional` **fx**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoSyncChunks`: `boolean` ; `autoSyncVoxelPalette`: `boolean` ; `enabled`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.fx

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L17)

___

### lighting

• `Optional` **lighting**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoRGBLight`: `boolean` ; `autoSunLight`: `boolean` ; `doAO`: `boolean` ; `doRGBLight`: `boolean` ; `doSunLight`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.lighting

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L55)

___

### materials

• `Optional` **materials**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `disableFloraShaderEffects`: `boolean` ; `disableLiquidShaderEffects`: `boolean` ; `doAO`: `boolean` ; `doRGBLight`: `boolean` ; `doSunLight`: `boolean` ; `mode`: ``"classic"`` \| ``"standard"``  }\>

#### Inherited from

PartialEngineSettings.materials

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:78](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L78)

___

### meshes

• `Optional` **meshes**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `checkFloraCollisions`: `boolean` ; `checkLiquidCollisions`: `boolean` ; `checkMagmaCollisions`: `boolean` ; `checkSolidCollisions`: `boolean` ; `clearChachedGeometry`: `boolean` ; `pickable`: `boolean` ; `serialize`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.meshes

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L69)

___

### nexus

• `Optional` **nexus**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoSyncChunks`: `boolean` ; `autoSyncVoxelPalette`: `boolean` ; `enabled`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.nexus

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L2)

___

### regions

• `Optional` **regions**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `regionXPow2`: `number` ; `regionYPow2`: `number` ; `regionZPow2`: `number`  }\>

#### Inherited from

PartialEngineSettings.regions

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L41)

___

### renderer

• **renderer**: [`DVERenderer`](../classes/Interfaces_Render_DVERenderer.DVERenderer.md)

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L21)

___

### richWorld

• `Optional` **richWorld**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoSyncChunks`: `boolean` ; `autoSyncVoxelPalette`: `boolean` ; `enabled`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.richWorld

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L12)

___

### server

• `Optional` **server**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `enabled`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.server

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L22)

___

### textures

• `Optional` **textures**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `animationTime`: `number` ; `mipMapSizes`: `number`[] ; `textureSize`: `number`  }\>

#### Inherited from

PartialEngineSettings.textures

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L25)

___

### updating

• `Optional` **updating**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `autoRebuild`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.updating

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L52)

___

### voxels

• `Optional` **voxels**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `doColors`: `boolean`  }\>

#### Inherited from

PartialEngineSettings.voxels

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L66)

___

### world

• `Optional` **world**: [`RecursivePartial`](../modules/Types_Util_types.md#recursivepartial)\<\{ `maxX`: `number` ; `maxY`: `number` ; `maxZ`: `number` ; `minX`: `number` ; `minY`: `number` ; `minZ`: `number`  }\>

#### Inherited from

PartialEngineSettings.world

#### Defined in

[divinevoxel/core/src/Types/EngineSettings.types.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/EngineSettings.types.ts#L33)

___

### worldWorker

• **worldWorker**: `Worker`

#### Defined in

[divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/DivineVoxelEngineRender.ts#L18)
