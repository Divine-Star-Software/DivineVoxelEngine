---
id: "DVEThreeRenderer.DVEThreeRenderer"
title: "Class: DVEThreeRenderer"
sidebar_label: "DVEThreeRenderer"
custom_edit_url: null
---

[DVEThreeRenderer](../modules/DVEThreeRenderer.md).DVEThreeRenderer

## Hierarchy

- `DVERenderer`

  ↳ **`DVEThreeRenderer`**

## Constructors

### constructor

• **new DVEThreeRenderer**(`data`): [`DVEThreeRenderer`](DVEThreeRenderer.DVEThreeRenderer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVEThreeRendererInitData`](../interfaces/DVEThreeRenderer.DVEThreeRendererInitData.md) |

#### Returns

[`DVEThreeRenderer`](DVEThreeRenderer.DVEThreeRenderer.md)

#### Overrides

DVERenderer.constructor

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L33)

## Properties

### engine

• **engine**: `URIEngine`\<`unknown`\>

#### Overrides

DVERenderer.engine

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L26)

___

### foManager

• **foManager**: [`DVETRFOManager`](DVETRFOManger.DVETRFOManager.md)

#### Overrides

DVERenderer.foManager

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L30)

___

### meshCuller

• **meshCuller**: [`DVETRMeshCuller`](DVETRMeshCuller.DVETRMeshCuller.md)

#### Overrides

DVERenderer.meshCuller

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L31)

___

### nodes

• **nodes**: [`DVETRNodeManager`](Nodes_DVEBRNodeManager.DVETRNodeManager.md)

#### Overrides

DVERenderer.nodes

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L28)

___

### scene

• **scene**: [`DVETRScene`](Scene_DVETRScene.DVETRScene.md)

#### Overrides

DVERenderer.scene

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L29)

___

### instance

▪ `Static` **instance**: [`DVEThreeRenderer`](DVEThreeRenderer.DVEThreeRenderer.md)

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L27)

## Methods

### createInstanceMesh

▸ **createInstanceMesh**(`mesh`): `URIInstanceMesh`\<`URIScene`\<`unknown`\>, `unknown`, `URIInstanceMeshEntity`\<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\> |

#### Returns

`URIInstanceMesh`\<`URIScene`\<`unknown`\>, `unknown`, `URIInstanceMeshEntity`\<`unknown`\>\>

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L53)

___

### createMaterial

▸ **createMaterial**(`id`): `URIMaterial`\<`URIScene`\<`unknown`\>, `any`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`URIMaterial`\<`URIScene`\<`unknown`\>, `any`, `unknown`\>

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L62)

___

### createMesh

▸ **createMesh**(): `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>

#### Returns

`URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L50)

___

### createTexture

▸ **createTexture**(`data`): `URITexture`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `URITextureData`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md)\> |

#### Returns

`URITexture`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `any`\>

#### Defined in

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L47)

___

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

[divinevoxel/three-renderer/src/DVEThreeRenderer.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/DVEThreeRenderer.ts#L46)
