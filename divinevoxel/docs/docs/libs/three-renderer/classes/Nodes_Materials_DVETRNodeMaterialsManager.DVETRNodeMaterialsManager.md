---
id: "Nodes_Materials_DVETRNodeMaterialsManager.DVETRNodeMaterialsManager"
title: "Class: DVETRNodeMaterialsManager"
sidebar_label: "DVETRNodeMaterialsManager"
custom_edit_url: null
---

[Nodes/Materials/DVETRNodeMaterialsManager](../modules/Nodes_Materials_DVETRNodeMaterialsManager.md).DVETRNodeMaterialsManager

## Hierarchy

- `DVENodeMaterialManager`

  ↳ **`DVETRNodeMaterialsManager`**

## Constructors

### constructor

• **new DVETRNodeMaterialsManager**(): [`DVETRNodeMaterialsManager`](Nodes_Materials_DVETRNodeMaterialsManager.DVETRNodeMaterialsManager.md)

#### Returns

[`DVETRNodeMaterialsManager`](Nodes_Materials_DVETRNodeMaterialsManager.DVETRNodeMaterialsManager.md)

#### Inherited from

DVENodeMaterialManager.constructor

## Properties

### materials

• **materials**: `Map`\<`string`, `URIMaterial`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `any`, `Material`\>\>

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Materials/DVETRNodeMaterialsManager.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Materials/DVETRNodeMaterialsManager.ts#L7)

## Methods

### get

▸ **get**(`id`): `URIMaterial`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `any`, `Material`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`URIMaterial`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `any`, `Material`\>

#### Overrides

DVENodeMaterialManager.get

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Materials/DVETRNodeMaterialsManager.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Materials/DVETRNodeMaterialsManager.ts#L8)

___

### register

▸ **register**(`id`, `material`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `material` | `URIMaterial`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `any`, `Material`\> |

#### Returns

`void`

#### Overrides

DVENodeMaterialManager.register

#### Defined in

[divinevoxel/three-renderer/src/Nodes/Materials/DVETRNodeMaterialsManager.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Nodes/Materials/DVETRNodeMaterialsManager.ts#L13)
