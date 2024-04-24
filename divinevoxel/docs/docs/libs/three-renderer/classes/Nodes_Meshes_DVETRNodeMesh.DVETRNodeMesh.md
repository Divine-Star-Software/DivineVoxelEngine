---
id: "Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh"
title: "Class: DVETRNodeMesh"
sidebar_label: "DVETRNodeMesh"
custom_edit_url: null
---

[Nodes/Meshes/DVETRNodeMesh](../modules/Nodes_Meshes_DVETRNodeMesh.md).DVETRNodeMesh

## Hierarchy

- `DVENodeMesh`

  ↳ **`DVETRNodeMesh`**

## Constructors

### constructor

• **new DVETRNodeMesh**(`data`): [`DVETRNodeMesh`](Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `NodeMeshData` |

#### Returns

[`DVETRNodeMesh`](Nodes_Meshes_DVETRNodeMesh.DVETRNodeMesh.md)

#### Overrides

DVENodeMesh.constructor

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L24)

## Properties

### checkCollisions

• **checkCollisions**: `boolean` = `false`

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L18)

___

### clearCachedGeometry

• **clearCachedGeometry**: `boolean` = `true`

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L20)

___

### data

• **data**: `NodeMeshData`

#### Inherited from

DVENodeMesh.data

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L24)

___

### defaultBoundingBox

• **defaultBoundingBox**: `Box3`

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L21)

___

### pickable

• **pickable**: `boolean` = `false`

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L17)

___

### scene

• **scene**: [`DVETRScene`](Scene_DVETRScene.DVETRScene.md)

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L22)

___

### serialize

• **serialize**: `boolean` = `false`

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L19)

## Methods

### \_clearCached

▸ **_clearCached**(`dveMesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dveMesh` | [`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMesh.\_clearCached

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:118](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L118)

___

### createMesh

▸ **createMesh**(`location`, `data`): [`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `Vector3Tuple` |
| `data` | `DVENodeMeshAttributes` |

#### Returns

[`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md)

#### Overrides

DVENodeMesh.createMesh

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L30)

___

### returnMesh

▸ **returnMesh**(`mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | [`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMesh.returnMesh

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L52)

___

### syncSettings

▸ **syncSettings**(`settings`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | `EngineSettingsData` |

#### Returns

`void`

#### Overrides

DVENodeMesh.syncSettings

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:106](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L106)

___

### updateVertexData

▸ **updateVertexData**(`location`, `data`, `dveMesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `Vector3Tuple` |
| `data` | `DVENodeMeshAttributes` |
| `dveMesh` | [`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMesh.updateVertexData

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRNodeMesh.ts#L60)
