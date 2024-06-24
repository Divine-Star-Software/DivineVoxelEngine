---
id: "Defaults_Foundation_PBR_DVEBRPBRMaterial.DVEBRPBRMaterial"
title: "Class: DVEBRPBRMaterial"
sidebar_label: "DVEBRPBRMaterial"
custom_edit_url: null
---

[Defaults/Foundation/PBR/DVEBRPBRMaterial](../modules/Defaults_Foundation_PBR_DVEBRPBRMaterial.md).DVEBRPBRMaterial

## Hierarchy

- `URIMaterial`\<[`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md), `DVEBRPBRMaterialBaseData`, `PBRMaterial`\>

  ↳ **`DVEBRPBRMaterial`**

## Constructors

### constructor

• **new DVEBRPBRMaterial**(`id`, `data`): [`DVEBRPBRMaterial`](Defaults_Foundation_PBR_DVEBRPBRMaterial.DVEBRPBRMaterial.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`DVEBRPBRMaterialData`](../modules/Defaults_Foundation_PBR_DVEBRPBRMaterial.md#dvebrpbrmaterialdata) |

#### Returns

[`DVEBRPBRMaterial`](Defaults_Foundation_PBR_DVEBRPBRMaterial.DVEBRPBRMaterial.md)

#### Overrides

URIMaterial\&lt;
  DVEBRScene,
  DVEBRPBRMaterialBaseData,
  PBRMaterial
\&gt;.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L42)

## Properties

### \_material

• **\_material**: `PBRMaterial`

#### Inherited from

URIMaterial.\_material

#### Defined in

node_modules/@amodx/uri/Materials/URIMaterial.d.ts:17

___

### afterCreate

• **afterCreate**: (`material`: `PBRMaterial`) => `void`[] = `[]`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L41)

___

### data

• **data**: [`DVEBRPBRMaterialData`](../modules/Defaults_Foundation_PBR_DVEBRPBRMaterial.md#dvebrpbrmaterialdata)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L42)

___

### id

• **id**: `string`

#### Inherited from

URIMaterial.id

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L42)

___

### plugin

• **plugin**: [`DVEPBRMaterialPlugin`](Defaults_Foundation_PBR_DVEPBRMaterialPlugin.DVEPBRMaterialPlugin.md)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L37)

___

### scene

• **scene**: `Scene`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L35)

___

### shader

• **shader**: `URIShader`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L38)

___

### texture

• **texture**: `TextureType`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L39)

___

### ready

▪ `Static` **ready**: `boolean` = `false`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L34)

## Methods

### \_create

▸ **_create**(`data`): `PBRMaterial`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVEBRPBRMaterialData`](../modules/Defaults_Foundation_PBR_DVEBRPBRMaterial.md#dvebrpbrmaterialdata) |

#### Returns

`PBRMaterial`

#### Overrides

URIMaterial.\_create

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L52)

___

### createMaterial

▸ **createMaterial**(`scene`): ``false`` \| `PBRMaterial`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

``false`` \| `PBRMaterial`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L46)

___

### setMatrix

▸ **setMatrix**\<`MatrixType`\>(`uniform`, `matrix`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MatrixType` | `IMatrixLike` |

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:192](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L192)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:165](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L165)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:170](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L170)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:160](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L160)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:153](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L153)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:175](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L175)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:178](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L178)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts:182](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEBRPBRMaterial.ts#L182)
