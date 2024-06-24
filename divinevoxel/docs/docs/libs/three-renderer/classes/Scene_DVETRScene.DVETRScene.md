---
id: "Scene_DVETRScene.DVETRScene"
title: "Class: DVETRScene"
sidebar_label: "DVETRScene"
custom_edit_url: null
---

[Scene/DVETRScene](../modules/Scene_DVETRScene.md).DVETRScene

## Hierarchy

- `URIScene`\<`Scene`\>

  ↳ **`DVETRScene`**

## Constructors

### constructor

• **new DVETRScene**(): [`DVETRScene`](Scene_DVETRScene.DVETRScene.md)

#### Returns

[`DVETRScene`](Scene_DVETRScene.DVETRScene.md)

#### Inherited from

URIScene\<Scene\>.constructor

## Properties

### \_scene

• **\_scene**: `Scene`

#### Inherited from

URIScene.\_scene

#### Defined in

node_modules/@amodx/uri/Scenes/URIScene.d.ts:2

___

### beforeRender

• **beforeRender**: `Observable`\<`void`\>

#### Defined in

[divinevoxel/three-renderer/src/Scene/DVETRScene.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Scene/DVETRScene.ts#L5)

___

### camera

• **camera**: `Camera`

#### Defined in

[divinevoxel/three-renderer/src/Scene/DVETRScene.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Scene/DVETRScene.ts#L7)

## Methods

### registerBeforeRender

▸ **registerBeforeRender**(`run`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | () => `void` |

#### Returns

`void`

#### Overrides

URIScene.registerBeforeRender

#### Defined in

[divinevoxel/three-renderer/src/Scene/DVETRScene.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Scene/DVETRScene.ts#L8)

___

### unRegisterBeforeRender

▸ **unRegisterBeforeRender**(`run`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | () => `void` |

#### Returns

`void`

#### Overrides

URIScene.unRegisterBeforeRender

#### Defined in

[divinevoxel/three-renderer/src/Scene/DVETRScene.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Scene/DVETRScene.ts#L11)
