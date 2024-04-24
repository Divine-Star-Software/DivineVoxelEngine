---
id: "Interfaces_Builder_DVEBuilder.DVEBuilder"
title: "Class: DVEBuilder"
sidebar_label: "DVEBuilder"
custom_edit_url: null
---

[Interfaces/Builder/DVEBuilder](../modules/Interfaces_Builder_DVEBuilder.md).DVEBuilder

## Hierarchy

- **`DVEBuilder`**

  ↳ [`DVEDefaultBuilder`](Default_Builder_Builder.DVEDefaultBuilder.md)

## Constructors

### constructor

• **new DVEBuilder**(): [`DVEBuilder`](Interfaces_Builder_DVEBuilder.DVEBuilder.md)

#### Returns

[`DVEBuilder`](Interfaces_Builder_DVEBuilder.DVEBuilder.md)

## Properties

### observers

• **observers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `texturesRegistered` | `Observable`\<\{ `data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap) ; `textureDataHasBeenSet`: `boolean` = false; `getTextureUV`: (`data`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` ; `isReady`: () => `boolean` ; `releaseTextureData`: () => `void` ; `setTextureIndex`: (`data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap)) => `void`  }\> |

#### Defined in

[divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts#L6)

## Methods

### buildChunk

▸ **buildChunk**(`location`, `LOD`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |
| `LOD` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts#L10)

___

### init

▸ **init**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts#L9)
