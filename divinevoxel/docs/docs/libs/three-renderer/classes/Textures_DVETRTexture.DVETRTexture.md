---
id: "Textures_DVETRTexture.DVETRTexture"
title: "Class: DVETRTexture"
sidebar_label: "DVETRTexture"
custom_edit_url: null
---

[Textures/DVETRTexture](../modules/Textures_DVETRTexture.md).DVETRTexture

## Hierarchy

- `URITexture`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `THREE.Texture`\>

  ↳ **`DVETRTexture`**

## Constructors

### constructor

• **new DVETRTexture**(`data`): [`DVETRTexture`](Textures_DVETRTexture.DVETRTexture.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `URITextureData`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md)\> |

#### Returns

[`DVETRTexture`](Textures_DVETRTexture.DVETRTexture.md)

#### Inherited from

URITexture\<DVETRScene, THREE.Texture\>.constructor

#### Defined in

node_modules/@amodx/uri/Textures/URITexture.d.ts:32

## Properties

### \_texture

• **\_texture**: ``null`` \| `Texture`

#### Inherited from

URITexture.\_texture

#### Defined in

node_modules/@amodx/uri/Textures/URITexture.d.ts:31

## Methods

### \_create

▸ **_create**(`data`): `DataArrayTexture`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `URITextureData`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md)\> |

#### Returns

`DataArrayTexture`

#### Overrides

URITexture.\_create

#### Defined in

[divinevoxel/three-renderer/src/Textures/DVETRTexture.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Textures/DVETRTexture.ts#L19)

___

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Overrides

URITexture.dispose

#### Defined in

[divinevoxel/three-renderer/src/Textures/DVETRTexture.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Textures/DVETRTexture.ts#L62)
