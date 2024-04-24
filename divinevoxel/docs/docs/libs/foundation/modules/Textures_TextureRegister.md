---
id: "Textures_TextureRegister"
title: "Module: Textures/TextureRegister"
sidebar_label: "Textures/TextureRegister"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### TextureRegister

• `Const` **TextureRegister**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`TextureTypeUVMap`](Textures_Texture_types.md#texturetypeuvmap) |
| `textureDataHasBeenSet` | `boolean` |
| `getTextureUV` | (`data`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` |
| `isReady` | () => `boolean` |
| `releaseTextureData` | () => `void` |
| `setTextureIndex` | (`data`: [`TextureTypeUVMap`](Textures_Texture_types.md#texturetypeuvmap)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Textures/TextureRegister.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureRegister.ts#L4)
