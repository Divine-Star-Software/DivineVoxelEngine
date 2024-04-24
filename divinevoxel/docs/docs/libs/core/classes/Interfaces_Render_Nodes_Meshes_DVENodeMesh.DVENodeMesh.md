---
id: "Interfaces_Render_Nodes_Meshes_DVENodeMesh.DVENodeMesh"
title: "Class: DVENodeMesh"
sidebar_label: "DVENodeMesh"
custom_edit_url: null
---

[Interfaces/Render/Nodes/Meshes/DVENodeMesh](../modules/Interfaces_Render_Nodes_Meshes_DVENodeMesh.md).DVENodeMesh

## Constructors

### constructor

• **new DVENodeMesh**(`data`): [`DVENodeMesh`](Interfaces_Render_Nodes_Meshes_DVENodeMesh.DVENodeMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`NodeMeshData`](../modules/Interfaces_Render_Nodes_DVERenderNode_types.md#nodemeshdata) |

#### Returns

[`DVENodeMesh`](Interfaces_Render_Nodes_Meshes_DVENodeMesh.DVENodeMesh.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L8)

## Properties

### data

• **data**: [`NodeMeshData`](../modules/Interfaces_Render_Nodes_DVERenderNode_types.md#nodemeshdata)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L8)

## Methods

### \_clearCached

▸ **_clearCached**(`mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\> |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L22)

___

### createMesh

▸ **createMesh**(`position`, `data`): `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |
| `data` | [`DVENodeMeshAttributes`](../modules/Interfaces_Render_Nodes_DVERenderNode_types.md#dvenodemeshattributes) |

#### Returns

`URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L10)

___

### returnMesh

▸ **returnMesh**(`mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\> |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L14)

___

### syncSettings

▸ **syncSettings**(`settings`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`EngineSettingsData`](../modules/Types_EngineSettings_types.md#enginesettingsdata) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L20)

___

### updateVertexData

▸ **updateVertexData**(`position`, `data`, `mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array) |
| `data` | [`DVENodeMeshAttributes`](../modules/Interfaces_Render_Nodes_DVERenderNode_types.md#dvenodemeshattributes) |
| `mesh` | `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\> |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/Meshes/DVENodeMesh.ts#L15)
