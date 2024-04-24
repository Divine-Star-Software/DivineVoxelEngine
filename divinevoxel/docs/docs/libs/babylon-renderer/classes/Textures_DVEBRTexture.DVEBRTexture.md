---
id: "Textures_DVEBRTexture.DVEBRTexture"
title: "Class: DVEBRTexture"
sidebar_label: "DVEBRTexture"
custom_edit_url: null
---

[Textures/DVEBRTexture](../modules/Textures_DVEBRTexture.md).DVEBRTexture

## Hierarchy

- `URITexture`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `Texture`\>

  ↳ **`DVEBRTexture`**

## Constructors

### constructor

• **new DVEBRTexture**(`data`): [`DVEBRTexture`](Textures_DVEBRTexture.DVEBRTexture.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `URITextureData`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md)\> |

#### Returns

[`DVEBRTexture`](Textures_DVEBRTexture.DVEBRTexture.md)

#### Inherited from

URITexture\<DVEBRScene,Texture\>.constructor

#### Defined in

node_modules/@divinestar/uri/Textures/URITexture.d.ts:32

## Properties

### \_texture

• **\_texture**: ``null`` \| `Texture`

#### Inherited from

URITexture.\_texture

#### Defined in

node_modules/@divinestar/uri/Textures/URITexture.d.ts:31

## Methods

### \_create

▸ **_create**(`data`): `RawTexture2DArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `URITextureData`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md)\> |

#### Returns

`RawTexture2DArray`

#### Overrides

URITexture.\_create

#### Defined in

[divinevoxel/babylon-renderer/src/Textures/DVEBRTexture.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Textures/DVEBRTexture.ts#L20)

___

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Overrides

URITexture.dispose

#### Defined in

[divinevoxel/babylon-renderer/src/Textures/DVEBRTexture.ts:58](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Textures/DVEBRTexture.ts#L58)
