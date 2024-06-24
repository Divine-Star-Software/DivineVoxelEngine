---
id: "Defaults_Foundation_Classic_DVEBRClassicMaterial.DVEBRClassicMaterial"
title: "Class: DVEBRClassicMaterial"
sidebar_label: "DVEBRClassicMaterial"
custom_edit_url: null
---

[Defaults/Foundation/Classic/DVEBRClassicMaterial](../modules/Defaults_Foundation_Classic_DVEBRClassicMaterial.md).DVEBRClassicMaterial

## Hierarchy

- `URIMaterial`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `DVEBRClassicMaterialBaseData`, `ShaderMaterial`\>

  ↳ **`DVEBRClassicMaterial`**

## Constructors

### constructor

• **new DVEBRClassicMaterial**(`id`, `data`): [`DVEBRClassicMaterial`](Defaults_Foundation_Classic_DVEBRClassicMaterial.DVEBRClassicMaterial.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`DVEBRClassicMaterialData`](../modules/Defaults_Foundation_Classic_DVEBRClassicMaterial.md#dvebrclassicmaterialdata) |

#### Returns

[`DVEBRClassicMaterial`](Defaults_Foundation_Classic_DVEBRClassicMaterial.DVEBRClassicMaterial.md)

#### Overrides

URIMaterial\&lt;
  DVEBRScene,
  DVEBRClassicMaterialBaseData,
  ShaderMaterial
\&gt;.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L38)

## Properties

### \_material

• **\_material**: `ShaderMaterial`

#### Inherited from

URIMaterial.\_material

#### Defined in

node_modules/@amodx/uri/Materials/URIMaterial.d.ts:17

___

### afterCreate

• **afterCreate**: (`material`: `ShaderMaterial`) => `void`[] = `[]`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L37)

___

### data

• **data**: [`DVEBRClassicMaterialData`](../modules/Defaults_Foundation_Classic_DVEBRClassicMaterial.md#dvebrclassicmaterialdata)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L38)

___

### id

• **id**: `string`

#### Inherited from

URIMaterial.id

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L38)

___

### scene

• **scene**: `Scene`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L33)

___

### shader

• **shader**: `URIShader`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L35)

## Methods

### \_create

▸ **_create**(`data`): `ShaderMaterial`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVEBRClassicMaterialData`](../modules/Defaults_Foundation_Classic_DVEBRClassicMaterial.md#dvebrclassicmaterialdata) |

#### Returns

`ShaderMaterial`

#### Overrides

URIMaterial.\_create

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L48)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L42)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:161](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L161)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:140](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L140)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:143](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L143)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:137](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L137)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:128](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L128)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:146](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L146)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:149](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L149)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts:152](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Classic/DVEBRClassicMaterial.ts#L152)
