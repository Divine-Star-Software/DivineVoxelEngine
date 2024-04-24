---
id: "Nodes_Meshes_DVETRNodeMeshManager.DVETRNodeMeshManager"
title: "Class: DVETRNodeMeshManager"
sidebar_label: "DVETRNodeMeshManager"
custom_edit_url: null
---

[Nodes/Meshes/DVETRNodeMeshManager](../modules/Nodes_Meshes_DVETRNodeMeshManager.md).DVETRNodeMeshManager

## Hierarchy

- `DVENodeMeshManager`

  ↳ **`DVETRNodeMeshManager`**

## Constructors

### constructor

• **new DVETRNodeMeshManager**(): [`DVETRNodeMeshManager`](Nodes_Meshes_DVETRNodeMeshManager.DVETRNodeMeshManager.md)

#### Returns

[`DVETRNodeMeshManager`](Nodes_Meshes_DVETRNodeMeshManager.DVETRNodeMeshManager.md)

#### Inherited from

DVENodeMeshManager.constructor

## Properties

### meshes

• **meshes**: `Map`\<`string`, [`DVETRNodeMesh`](Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh.md)\>

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMeshManager.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMeshManager.ts#L7)

## Methods

### get

▸ **get**(`id`): [`DVETRNodeMesh`](Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`DVETRNodeMesh`](Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh.md)

#### Overrides

DVENodeMeshManager.get

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMeshManager.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMeshManager.ts#L8)

___

### register

▸ **register**(`id`, `mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `mesh` | [`DVETRNodeMesh`](Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMeshManager.register

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMeshManager.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMeshManager.ts#L13)
