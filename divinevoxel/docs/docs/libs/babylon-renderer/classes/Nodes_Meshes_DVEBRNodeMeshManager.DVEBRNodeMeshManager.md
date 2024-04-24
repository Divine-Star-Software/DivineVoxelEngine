---
id: "Nodes_Meshes_DVEBRNodeMeshManager.DVEBRNodeMeshManager"
title: "Class: DVEBRNodeMeshManager"
sidebar_label: "DVEBRNodeMeshManager"
custom_edit_url: null
---

[Nodes/Meshes/DVEBRNodeMeshManager](../modules/Nodes_Meshes_DVEBRNodeMeshManager.md).DVEBRNodeMeshManager

## Hierarchy

- `DVENodeMeshManager`

  ↳ **`DVEBRNodeMeshManager`**

## Constructors

### constructor

• **new DVEBRNodeMeshManager**(): [`DVEBRNodeMeshManager`](Nodes_Meshes_DVEBRNodeMeshManager.DVEBRNodeMeshManager.md)

#### Returns

[`DVEBRNodeMeshManager`](Nodes_Meshes_DVEBRNodeMeshManager.DVEBRNodeMeshManager.md)

#### Inherited from

DVENodeMeshManager.constructor

## Properties

### meshes

• **meshes**: `Map`\<`string`, [`DVEBRNodeMesh`](Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh.md)\>

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMeshManager.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMeshManager.ts#L6)

## Methods

### get

▸ **get**(`id`): [`DVEBRNodeMesh`](Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`DVEBRNodeMesh`](Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh.md)

#### Overrides

DVENodeMeshManager.get

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMeshManager.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMeshManager.ts#L7)

___

### register

▸ **register**(`id`, `mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `mesh` | [`DVEBRNodeMesh`](Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMeshManager.register

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMeshManager.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMeshManager.ts#L12)
