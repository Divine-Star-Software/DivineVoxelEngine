---
id: "Shaders_DVETRShaderStore.DVETRShaderStore"
title: "Class: DVETRShaderStore"
sidebar_label: "DVETRShaderStore"
custom_edit_url: null
---

[Shaders/DVETRShaderStore](../modules/Shaders_DVETRShaderStore.md).DVETRShaderStore

## Hierarchy

- `URIShaderStore`

  ↳ **`DVETRShaderStore`**

## Constructors

### constructor

• **new DVETRShaderStore**(): [`DVETRShaderStore`](Shaders_DVETRShaderStore.DVETRShaderStore.md)

#### Returns

[`DVETRShaderStore`](Shaders_DVETRShaderStore.DVETRShaderStore.md)

#### Inherited from

URIShaderStore.constructor

## Methods

### getShader

▸ **getShader**(`id`, `type`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `URIShaderTypes` |

#### Returns

``null`` \| `string`

#### Overrides

URIShaderStore.getShader

#### Defined in

[divinevoxel/three-renderer/src/Shaders/DVETRShaderStore.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Shaders/DVETRShaderStore.ts#L5)

___

### storeShader

▸ **storeShader**(`id`, `type`, `shader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `URIShaderTypes` |
| `shader` | `string` |

#### Returns

`void`

#### Overrides

URIShaderStore.storeShader

#### Defined in

[divinevoxel/three-renderer/src/Shaders/DVETRShaderStore.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Shaders/DVETRShaderStore.ts#L15)
