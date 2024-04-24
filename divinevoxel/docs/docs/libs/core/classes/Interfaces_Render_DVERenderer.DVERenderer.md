---
id: "Interfaces_Render_DVERenderer.DVERenderer"
title: "Class: DVERenderer"
sidebar_label: "DVERenderer"
custom_edit_url: null
---

[Interfaces/Render/DVERenderer](../modules/Interfaces_Render_DVERenderer.md).DVERenderer

## Constructors

### constructor

• **new DVERenderer**(): [`DVERenderer`](Interfaces_Render_DVERenderer.DVERenderer.md)

#### Returns

[`DVERenderer`](Interfaces_Render_DVERenderer.DVERenderer.md)

## Properties

### engine

• `Abstract` **engine**: `URIEngine`\<`unknown`\>

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderer.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderer.ts#L8)

___

### foManager

• `Abstract` **foManager**: [`DVEFOManager`](Interfaces_Render_DVEFOManager.DVEFOManager.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderer.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderer.ts#L10)

___

### meshCuller

• `Abstract` **meshCuller**: [`DVEMeshCuller`](Interfaces_Render_DVEMeshCuller.DVEMeshCuller.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderer.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderer.ts#L11)

___

### nodes

• `Abstract` **nodes**: [`DVENodeManager`](Interfaces_Render_Nodes_DVENodeManager.DVENodeManager.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderer.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderer.ts#L12)

___

### scene

• `Abstract` **scene**: `URIScene`\<`unknown`\>

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderer.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderer.ts#L9)

## Methods

### init

▸ **init**(`dver`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dver` | [`DivineVoxelEngineRender`](Contexts_Render_DivineVoxelEngineRender.DivineVoxelEngineRender.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderer.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderer.ts#L13)
