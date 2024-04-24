---
id: "Defaults_Foundation_Classic_InitDVETRClassic"
title: "Module: Defaults/Foundation/Classic/InitDVETRClassic"
sidebar_label: "Defaults/Foundation/Classic/InitDVETRClassic"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### DVEBRClassicData

Ƭ **DVEBRClassicData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `scene` | `Scene` |
| `substances` | [`NodeSubstanceData`](Defaults_Foundation_Classic_InitDVETRClassic.md#nodesubstancedata)[] |
| `textureData` | `TextureData`[] |
| `textureTypes` | `string`[] |

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts#L12)

___

### NodeMaterialOptions

Ƭ **NodeMaterialOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alphaBlending` | `boolean` |
| `alphaTesting` | `boolean` |
| `backFaceCulling?` | `boolean` |
| `hasEffects?` | `boolean` |
| `mipMapBias?` | `number` |

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts#L19)

___

### NodeMeshData

Ƭ **NodeMeshData**: \{ `id`: `string` ; `type?`: `string`  } & [`NodeMeshOptions`](Defaults_Foundation_Classic_InitDVETRClassic.md#nodemeshoptions)

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts#L27)

___

### NodeMeshOptions

Ƭ **NodeMeshOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `boundingBoxMaxSize` | `Vec3Array` |
| `type?` | `string` |

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts#L32)

___

### NodeSubstanceData

Ƭ **NodeSubstanceData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `material` | [`NodeMaterialOptions`](Defaults_Foundation_Classic_InitDVETRClassic.md#nodematerialoptions) |
| `mesh` | [`NodeMeshOptions`](Defaults_Foundation_Classic_InitDVETRClassic.md#nodemeshoptions) |
| `shaderId` | `string` |
| `textureType` | `string` |

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts#L37)

## Functions

### default

▸ **default**(`initData`): [`DVEThreeRenderer`](../classes/DVEThreeRenderer.DVEThreeRenderer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `initData` | [`DVEBRClassicData`](Defaults_Foundation_Classic_InitDVETRClassic.md#dvebrclassicdata) |

#### Returns

[`DVEThreeRenderer`](../classes/DVEThreeRenderer.DVEThreeRenderer.md)

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/Classic/InitDVETRClassic.ts#L46)
