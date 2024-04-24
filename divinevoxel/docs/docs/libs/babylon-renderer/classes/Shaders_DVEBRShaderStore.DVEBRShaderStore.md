---
id: "Shaders_DVEBRShaderStore.DVEBRShaderStore"
title: "Class: DVEBRShaderStore"
sidebar_label: "DVEBRShaderStore"
custom_edit_url: null
---

[Shaders/DVEBRShaderStore](../modules/Shaders_DVEBRShaderStore.md).DVEBRShaderStore

## Hierarchy

- `URIShaderStore`

  ↳ **`DVEBRShaderStore`**

## Constructors

### constructor

• **new DVEBRShaderStore**(): [`DVEBRShaderStore`](Shaders_DVEBRShaderStore.DVEBRShaderStore.md)

#### Returns

[`DVEBRShaderStore`](Shaders_DVEBRShaderStore.DVEBRShaderStore.md)

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

[divinevoxel/babylon-renderer/src/Shaders/DVEBRShaderStore.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Shaders/DVEBRShaderStore.ts#L6)

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

[divinevoxel/babylon-renderer/src/Shaders/DVEBRShaderStore.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Shaders/DVEBRShaderStore.ts#L16)
