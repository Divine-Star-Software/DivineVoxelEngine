---
id: "Textures_TextureManager"
title: "Module: Textures/TextureManager"
sidebar_label: "Textures/TextureManager"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### TextureManager

• `Const` **TextureManager**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_ready` | `boolean` |
| `defaultTexturePath` | `string` |
| `textureTypes` | `Map`\<`string`, [`TextureType`](../classes/Textures_TextureType.TextureType.md)\> |
| `$INIT` | () => `Promise`\<`void`\> |
| `$START_ANIMATIONS` | () => `void` |
| `addTextureType` | (`id`: `string`) => [`TextureType`](../classes/Textures_TextureType.TextureType.md) |
| `clearTextureData` | () => `void` |
| `createRawDataMap` | () => `Promise`\<`Map`\<`string`, `Uint8ClampedArray`\>\> |
| `defineDefaultTexturePath` | (`path`: `string`) => `void` |
| `generateTextureUVMap` | () => [`TextureTypeUVMap`](Textures_Texture_types.md#texturetypeuvmap) |
| `getTextureData` | (`__namedParameters`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => `undefined` \| [`TextureData`](Textures_Texture_types.md#texturedata) |
| `getTextureIndex` | (`data`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` |
| `getTextureType` | (`id`: `string`) => ``false`` \| [`TextureType`](../classes/Textures_TextureType.TextureType.md) |
| `isReady` | () => `boolean` |
| `registerTexture` | (`textureData`: [`TextureData`](Textures_Texture_types.md#texturedata) \| [`TextureData`](Textures_Texture_types.md#texturedata)[]) => `void` |

#### Defined in

[divinevoxel/foundation/src/Textures/TextureManager.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureManager.ts#L10)
