---
id: "Nodes_Meshes_DVETRMesh.DVETRMesh"
title: "Class: DVETRMesh"
sidebar_label: "DVETRMesh"
custom_edit_url: null
---

[Nodes/Meshes/DVETRMesh](../modules/Nodes_Meshes_DVETRMesh.md).DVETRMesh

## Hierarchy

- `URIMesh`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `Mesh`\>

  ↳ **`DVETRMesh`**

## Constructors

### constructor

• **new DVETRMesh**(`scene`): [`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | [`DVETRScene`](Scene_DVETRScene.DVETRScene.md) |

#### Returns

[`DVETRMesh`](Nodes_Meshes_DVETRMesh.DVETRMesh.md)

#### Inherited from

URIMesh\<DVETRScene, Mesh\>.constructor

#### Defined in

node_modules/@amodx/uri/Meshes/URIMesh.d.ts:5

## Properties

### \_mesh

• **\_mesh**: `Mesh`\<`BufferGeometry`\<`NormalBufferAttributes`\>, `Material` \| `Material`[], `Object3DEventMap`\>

#### Inherited from

URIMesh.\_mesh

#### Defined in

node_modules/@amodx/uri/Meshes/URIMesh.d.ts:6

___

### isVisible

• **isVisible**: `boolean`

#### Overrides

URIMesh.isVisible

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L8)

___

### scene

• **scene**: [`DVETRScene`](Scene_DVETRScene.DVETRScene.md)

#### Inherited from

URIMesh.scene

#### Defined in

node_modules/@amodx/uri/Meshes/URIMesh.d.ts:4

## Methods

### clearCachedData

▸ **clearCachedData**(): `void`

#### Returns

`void`

#### Overrides

URIMesh.clearCachedData

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L24)

___

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Overrides

URIMesh.dispose

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L5)

___

### getIndicies

▸ **getIndicies**(): `ArrayLike`\<`number`\>

#### Returns

`ArrayLike`\<`number`\>

#### Overrides

URIMesh.getIndicies

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L15)

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

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L21)

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

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L9)

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

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L12)

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

[divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Meshes/DVETRMesh.ts#L18)
