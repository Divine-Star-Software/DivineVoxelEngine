---
id: "Defaults_Foundation_Classic_DVETRClassicMaterial.DVEBRClassicMaterial"
title: "Class: DVEBRClassicMaterial"
sidebar_label: "DVEBRClassicMaterial"
custom_edit_url: null
---

[Defaults/Foundation/Classic/DVETRClassicMaterial](../modules/Defaults_Foundation_Classic_DVETRClassicMaterial.md).DVEBRClassicMaterial

## Hierarchy

- `URIMaterial`\<[`DVETRScene`](Scene_DVETRScene.DVETRScene.md), `DVETRClassicMaterialBaseData`, `ShaderMaterial`\>

  ↳ **`DVEBRClassicMaterial`**

## Constructors

### constructor

• **new DVEBRClassicMaterial**(`id`, `data`): [`DVEBRClassicMaterial`](Defaults_Foundation_Classic_DVETRClassicMaterial.DVEBRClassicMaterial.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`DVETRClassicMaterialData`](../modules/Defaults_Foundation_Classic_DVETRClassicMaterial.md#dvetrclassicmaterialdata) |

#### Returns

[`DVEBRClassicMaterial`](Defaults_Foundation_Classic_DVETRClassicMaterial.DVEBRClassicMaterial.md)

#### Overrides

URIMaterial\&lt;
  DVETRScene,
  DVETRClassicMaterialBaseData,
  ShaderMaterial
\&gt;.constructor

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L46)

## Properties

### \_material

• **\_material**: `ShaderMaterial`

#### Inherited from

URIMaterial.\_material

#### Defined in

node_modules/@divinestar/uri/Materials/URIMaterial.d.ts:17

___

### afterCreate

• **afterCreate**: (`material`: `ShaderMaterial`) => `void`[] = `[]`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L45)

___

### data

• **data**: [`DVETRClassicMaterialData`](../modules/Defaults_Foundation_Classic_DVETRClassicMaterial.md#dvetrclassicmaterialdata)

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L46)

___

### id

• **id**: `string`

#### Inherited from

URIMaterial.id

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L46)

___

### scene

• **scene**: `Scene`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L41)

___

### shader

• **shader**: `URIShader`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L43)

## Methods

### \_create

▸ **_create**(`data`): `ShaderMaterial`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVETRClassicMaterialData`](../modules/Defaults_Foundation_Classic_DVETRClassicMaterial.md#dvetrclassicmaterialdata) |

#### Returns

`ShaderMaterial`

#### Overrides

URIMaterial.\_create

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:56](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L56)

___

### \_setUnfirom

▸ **_setUnfirom**(`uniform`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:172](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L172)

___

### createMaterial

▸ **createMaterial**(`scene`): ``false`` \| `ShaderMaterial`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

``false`` \| `ShaderMaterial`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L50)

___

### setMatrix

▸ **setMatrix**\<`MatrixType`\>(`uniform`, `matrix`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MatrixType` | `Matrix` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `matrix` | `MatrixType` |

#### Returns

`void`

#### Overrides

URIMaterial.setMatrix

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:210](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L210)

___

### setNumber

▸ **setNumber**(`uniform`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `value` | `number` |

#### Returns

`void`

#### Overrides

URIMaterial.setNumber

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:189](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L189)

___

### setNumberArray

▸ **setNumberArray**(`uniform`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `value` | `ArrayLike`\<`number`\> |

#### Returns

`void`

#### Overrides

URIMaterial.setNumberArray

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:192](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L192)

___

### setTexture

▸ **setTexture**(`samplerId`, `sampler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `samplerId` | `string` |
| `sampler` | `URITexture`\<`URIScene`\<`any`\>, `any`\> |

#### Returns

`void`

#### Overrides

URIMaterial.setTexture

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:186](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L186)

___

### setTextureArray

▸ **setTextureArray**(`samplerId`, `sampler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `samplerId` | `string` |
| `sampler` | `URITexture`\<`URIScene`\<`any`\>, `any`\>[] |

#### Returns

`void`

#### Overrides

URIMaterial.setTextureArray

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:177](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L177)

___

### setVector2

▸ **setVector2**(`uniform`, `x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Overrides

URIMaterial.setVector2

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:195](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L195)

___

### setVector3

▸ **setVector3**(`uniform`, `x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Overrides

URIMaterial.setVector3

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:198](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L198)

___

### setVector4

▸ **setVector4**(`uniform`, `x`, `y`, `z`, `w`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniform` | `string` |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `w` | `number` |

#### Returns

`void`

#### Overrides

URIMaterial.setVector4

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts:201](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/DVETRClassicMaterial.ts#L201)
