---
id: "Defaults_Foundation_Types_DVEBRDefaultMaterial_types"
title: "Module: Defaults/Foundation/Types/DVEBRDefaultMaterial.types"
sidebar_label: "Defaults/Foundation/Types/DVEBRDefaultMaterial.types"
custom_edit_url: null
---

## Type Aliases

### DVEBRDefaultMaterialBaseData

Ƭ **DVEBRDefaultMaterialBaseData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |
| `substances` | [`NodeSubstanceData`](Defaults_Foundation_Types_DVEBRDefaultMaterial_types.md#nodesubstancedata)[] |
| `textureData` | `TextureData`[] |
| `textureTypes` | `string`[] |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts#L5)

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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts#L12)

___

### NodeMeshData

Ƭ **NodeMeshData**: \{ `id`: `string` ; `type?`: `string`  } & [`NodeMeshOptions`](Defaults_Foundation_Types_DVEBRDefaultMaterial_types.md#nodemeshoptions)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts#L20)

___

### NodeMeshOptions

Ƭ **NodeMeshOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `boundingBoxMaxSize` | `Vec3Array` |
| `type?` | `string` |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts#L25)

___

### NodeSubstanceData

Ƭ **NodeSubstanceData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `material` | [`NodeMaterialOptions`](Defaults_Foundation_Types_DVEBRDefaultMaterial_types.md#nodematerialoptions) |
| `mesh` | [`NodeMeshOptions`](Defaults_Foundation_Types_DVEBRDefaultMaterial_types.md#nodemeshoptions) |
| `shaderId` | `string` |
| `textureType` | `string` |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Types/DVEBRDefaultMaterial.types.ts#L30)
