---
id: "Nodes_Materials_DVEBRNodeMaterialsManager.DVEBRNodeMaterialsManager"
title: "Class: DVEBRNodeMaterialsManager"
sidebar_label: "DVEBRNodeMaterialsManager"
custom_edit_url: null
---

[Nodes/Materials/DVEBRNodeMaterialsManager](../modules/Nodes_Materials_DVEBRNodeMaterialsManager.md).DVEBRNodeMaterialsManager

## Hierarchy

- `DVENodeMaterialManager`

  ↳ **`DVEBRNodeMaterialsManager`**

## Constructors

### constructor

• **new DVEBRNodeMaterialsManager**(): [`DVEBRNodeMaterialsManager`](Nodes_Materials_DVEBRNodeMaterialsManager.DVEBRNodeMaterialsManager.md)

#### Returns

[`DVEBRNodeMaterialsManager`](Nodes_Materials_DVEBRNodeMaterialsManager.DVEBRNodeMaterialsManager.md)

#### Inherited from

DVENodeMaterialManager.constructor

## Properties

### materials

• **materials**: `Map`\<`string`, `URIMaterial`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `any`, `Material`\>\>

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Materials/DVEBRNodeMaterialsManager.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Materials/DVEBRNodeMaterialsManager.ts#L7)

## Methods

### get

▸ **get**(`id`): `URIMaterial`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `any`, `Material`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`URIMaterial`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `any`, `Material`\>

#### Overrides

DVENodeMaterialManager.get

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Materials/DVEBRNodeMaterialsManager.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Materials/DVEBRNodeMaterialsManager.ts#L8)

___

### register

▸ **register**(`id`, `material`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `material` | `URIMaterial`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `any`, `Material`\> |

#### Returns

`void`

#### Overrides

DVENodeMaterialManager.register

#### Defined in

[divinevoxel/babylon-renderer/src/Nodes/Materials/DVEBRNodeMaterialsManager.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Nodes/Materials/DVEBRNodeMaterialsManager.ts#L13)
