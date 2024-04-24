---
id: "Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh"
title: "Class: DVEBRNodeMesh"
sidebar_label: "DVEBRNodeMesh"
custom_edit_url: null
---

[Nodes/Meshes/DVEBRNodeMesh](../modules/Nodes_Meshes_DVEBRNodeMesh.md).DVEBRNodeMesh

## Hierarchy

- `DVENodeMesh`

  ↳ **`DVEBRNodeMesh`**

## Constructors

### constructor

• **new DVEBRNodeMesh**(`data`): [`DVEBRNodeMesh`](Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `NodeMeshData` |

#### Returns

[`DVEBRNodeMesh`](Nodes_Meshes_DVEBRNodeMesh.DVEBRNodeMesh.md)

#### Overrides

DVENodeMesh.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L26)

## Properties

### checkCollisions

• **checkCollisions**: `boolean` = `false`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L20)

___

### clearCachedGeometry

• **clearCachedGeometry**: `boolean` = `true`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L22)

___

### data

• **data**: `NodeMeshData`

#### Inherited from

DVENodeMesh.data

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L26)

___

### defaultBb

• **defaultBb**: `BoundingInfo`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L23)

___

### engine

• **engine**: `Engine`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L25)

___

### pickable

• **pickable**: `boolean` = `false`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L19)

___

### scene

• **scene**: `Scene`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L24)

___

### serialize

• **serialize**: `boolean` = `false`

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L21)

## Methods

### \_clearCached

▸ **_clearCached**(`dveMesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dveMesh` | [`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMesh.\_clearCached

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:167](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L167)

___

### createMesh

▸ **createMesh**(`location`, `data`): [`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `Vec3Array` |
| `data` | `DVENodeMeshAttributes` |

#### Returns

[`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md)

#### Overrides

DVENodeMesh.createMesh

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L30)

___

### returnMesh

▸ **returnMesh**(`mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | [`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMesh.returnMesh

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:91](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L91)

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

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:155](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L155)

___

### updateVertexData

▸ **updateVertexData**(`location`, `data`, `dveMesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `Vec3Array` |
| `data` | `DVENodeMeshAttributes` |
| `dveMesh` | [`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md) |

#### Returns

`void`

#### Overrides

DVENodeMesh.updateVertexData

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts:95](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRNodeMesh.ts#L95)
