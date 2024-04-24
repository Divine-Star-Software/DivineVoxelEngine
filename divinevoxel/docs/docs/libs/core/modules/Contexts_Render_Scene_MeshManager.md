---
id: "Contexts_Render_Scene_MeshManager"
title: "Module: Contexts/Render/Scene/MeshManager"
sidebar_label: "Contexts/Render/Scene/MeshManager"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### MeshManager

• `Const` **MeshManager**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | \{ `add`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata), `substance`: `string`, `meshData`: [`DVENodeMeshAttributes`](Interfaces_Render_Nodes_DVERenderNode_types.md#dvenodemeshattributes)) => `void` ; `remove`: (`data`: [`RemoveChunkMeshTasks`](Contexts_Render_Tasks_RenderTasks_types.md#removechunkmeshtasks)) => `undefined` \| ``false`` ; `removeColumn`: (`data`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => `undefined` \| ``false`` ; `update`: (`data`: [`SetChunkMeshTask`](Contexts_Render_Tasks_RenderTasks_types.md#setchunkmeshtask)) => `void`  } |
| `chunks.add` | [object Object] |
| `chunks.remove` | [object Object] |
| `chunks.removeColumn` | [object Object] |
| `chunks.update` | [object Object] |
| `runningUpdate` | `boolean` |
| `removeColumnsOutsideRadius` | (`origion`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata), `radius`: `number`) => `void` |

#### Defined in

[divinevoxel/core/src/Contexts/Render/Scene/MeshManager.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Scene/MeshManager.ts#L14)
