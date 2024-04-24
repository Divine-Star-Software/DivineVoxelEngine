---
id: "Interfaces_Render_Nodes_DVERenderNode_types"
title: "Module: Interfaces/Render/Nodes/DVERenderNode.types"
sidebar_label: "Interfaces/Render/Nodes/DVERenderNode.types"
custom_edit_url: null
---

## Type Aliases

### DVENodeMeshAttributes

Ƭ **DVENodeMeshAttributes**: [id: string, data: TypedArrays, stride: number, componentTypes?: number, noramlizer?: number][]

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts#L5)

___

### NodeMaterialData

Ƭ **NodeMaterialData**: \{ `id`: `string` ; `shaderId`: `string` ; `textureTypeId?`: `string`  } & [`NodeMaterialOptions`](Interfaces_Render_Nodes_DVERenderNode_types.md#nodematerialoptions)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts#L13)

___

### NodeMaterialOptions

Ƭ **NodeMaterialOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alphaBlending` | `boolean` |
| `alphaTesting` | `boolean` |
| `backFaceCulling?` | `boolean` |
| `hasEffects?` | `boolean` |
| `mipMapBias?` | `number` |

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts#L19)

___

### NodeMeshData

Ƭ **NodeMeshData**: \{ `boundingBoxMaxSize`: [`Vec3Array`](Math_Types_Math_types.md#vec3array) ; `id`: `string` ; `materialId`: `string` ; `type?`: `string`  } & [`NodeMeshOptions`](Interfaces_Render_Nodes_DVERenderNode_types.md#nodemeshoptions)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts#L27)

___

### NodeMeshOptions

Ƭ **NodeMeshOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `boundingBoxMaxSize` | [`Vec3Array`](Math_Types_Math_types.md#vec3array) |
| `materialId` | `string` |
| `type?` | `string` |

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts#L34)

___

### NodeSubstanceData

Ƭ **NodeSubstanceData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `material` | [`NodeMaterialOptions`](Interfaces_Render_Nodes_DVERenderNode_types.md#nodematerialoptions) |
| `mesh` | [`NodeMeshOptions`](Interfaces_Render_Nodes_DVERenderNode_types.md#nodemeshoptions) |
| `shader` | `URIShader` |

#### Defined in

[divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/Nodes/DVERenderNode.types.ts#L40)
