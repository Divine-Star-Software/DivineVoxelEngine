---
id: "DVEBabylonRenderer.DVEBabylonRenderer"
title: "Class: DVEBabylonRenderer"
sidebar_label: "DVEBabylonRenderer"
custom_edit_url: null
---

[DVEBabylonRenderer](../modules/DVEBabylonRenderer.md).DVEBabylonRenderer

## Hierarchy

- `DVERenderer`

  ↳ **`DVEBabylonRenderer`**

## Constructors

### constructor

• **new DVEBabylonRenderer**(`data`): [`DVEBabylonRenderer`](DVEBabylonRenderer.DVEBabylonRenderer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVEBabylonRendererInitData`](../interfaces/DVEBabylonRenderer.DVEBabylonRendererInitData.md) |

#### Returns

[`DVEBabylonRenderer`](DVEBabylonRenderer.DVEBabylonRenderer.md)

#### Overrides

DVERenderer.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L26)

## Properties

### engine

• **engine**: [`DVEBREngine`](Engine_DVEBREngine.DVEBREngine.md)

#### Overrides

DVERenderer.engine

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L21)

___

### foManager

• **foManager**: [`DVEBRFOManager`](DVEBRFOManger.DVEBRFOManager.md)

#### Overrides

DVERenderer.foManager

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L23)

___

### meshCuller

• **meshCuller**: [`DVEBRMeshCuller`](DVEBRMeshCuller.DVEBRMeshCuller.md)

#### Overrides

DVERenderer.meshCuller

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L24)

___

### nodes

• **nodes**: [`DVEBRNodeManager`](Nodes_DVEBRNodeManager.DVEBRNodeManager.md)

#### Overrides

DVERenderer.nodes

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L20)

___

### observers

• **observers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meshCreated` | `Observable`\<[`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md)\> |
| `meshDisposed` | `Observable`\<[`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md)\> |

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L16)

___

### scene

• **scene**: [`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md)

#### Overrides

DVERenderer.scene

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L22)

___

### instance

▪ `Static` **instance**: [`DVEBabylonRenderer`](DVEBabylonRenderer.DVEBabylonRenderer.md)

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L15)

## Methods

### init

▸ **init**(`dver`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dver` | `DivineVoxelEngineRender` |

#### Returns

`Promise`\<`void`\>

#### Overrides

DVERenderer.init

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBabylonRenderer.ts#L41)
