---
id: "Nodes_Meshes_DVEBRMesh.DVEBRMesh"
title: "Class: DVEBRMesh"
sidebar_label: "DVEBRMesh"
custom_edit_url: null
---

[Nodes/Meshes/DVEBRMesh](../modules/Nodes_Meshes_DVEBRMesh.md).DVEBRMesh

## Hierarchy

- `URIMesh`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `Mesh`\>

  ↳ **`DVEBRMesh`**

## Constructors

### constructor

• **new DVEBRMesh**(`scene`): [`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | [`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md) |

#### Returns

[`DVEBRMesh`](Nodes_Meshes_DVEBRMesh.DVEBRMesh.md)

#### Inherited from

URIMesh\<DVEBRScene, Mesh\>.constructor

#### Defined in

node_modules/@divinestar/uri/Meshes/URIMesh.d.ts:5

## Properties

### \_mesh

• **\_mesh**: `Mesh`

#### Inherited from

URIMesh.\_mesh

#### Defined in

node_modules/@divinestar/uri/Meshes/URIMesh.d.ts:6

___

### isVisible

• **isVisible**: `boolean`

#### Overrides

URIMesh.isVisible

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L8)

___

### scene

• **scene**: [`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md)

#### Inherited from

URIMesh.scene

#### Defined in

node_modules/@divinestar/uri/Meshes/URIMesh.d.ts:4

## Methods

### clearCachedData

▸ **clearCachedData**(): `void`

#### Returns

`void`

#### Overrides

URIMesh.clearCachedData

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L24)

___

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Overrides

URIMesh.dispose

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L5)

___

### getIndicies

▸ **getIndicies**(): `ArrayLike`\<`number`\>

#### Returns

`ArrayLike`\<`number`\>

#### Overrides

URIMesh.getIndicies

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L15)

___

### getVertexData

▸ **getVertexData**(`id`): `ArrayLike`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`ArrayLike`\<`number`\>

#### Overrides

URIMesh.getVertexData

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L21)

___

### setEnabled

▸ **setEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Overrides

URIMesh.setEnabled

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L9)

___

### setIndicies

▸ **setIndicies**(`indicies`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `indicies` | `ArrayLike`\<`number`\> |

#### Returns

`void`

#### Overrides

URIMesh.setIndicies

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L12)

___

### setVertexData

▸ **setVertexData**(`id`, `data`, `stride`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `ArrayLike`\<`number`\> |
| `stride` | `number` |

#### Returns

`void`

#### Overrides

URIMesh.setVertexData

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Meshes/DVEBRMesh.ts#L18)
