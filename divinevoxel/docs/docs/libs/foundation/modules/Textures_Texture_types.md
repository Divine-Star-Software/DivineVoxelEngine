---
id: "Textures_Texture_types"
title: "Module: Textures/Texture.types"
sidebar_label: "Textures/Texture.types"
custom_edit_url: null
---

## Type Aliases

### TextureAnimationData

Ƭ **TextureAnimationData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `animKeyFrameTimes?` | `number`[] | # Anim Key Frame Time --- If set globalFrameTime will be ignored. Specifies how many frames every anim should be displayed. You must supply a number for every animKey. |
| `animKeys?` | `number`[] | # Anim Keys If the texture is animated you must supply the anim key frames which is just the order of the frames. |
| `frames` | `number` | # Frames If the texture has animation frames the number of frames must be set to the number texture animatoin images. This number must be greater than 1. The number will be used to locate all the associated frames. Example: If you specify 3 frames for a texture with the ID **dreamstone** the folder would look like this: - dreamstone/default-1.png - dreamstone/default-2.png - dreamstone/default-3.png |
| `globalFrameTime?` | `number` | # Global Frame Time --- Specifies how many frames every anim key should be display. |

#### Defined in

[divinevoxel/foundation/src/Textures/Texture.types.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/Texture.types.ts#L8)

___

### TextureData

Ƭ **TextureData**: \{ `id`: `string` ; `normalMap?`: `boolean` ; `path?`: `string` ; `segment?`: `string` ; `type`: [`TextureTypes`](Textures_Texture_types.md#texturetypes) ; `variations?`: `Record`\<`string`, [`TextureAnimationData`](Textures_Texture_types.md#textureanimationdata) & [`TextureDataBase`](Textures_Texture_types.md#texturedatabase)\>  } & [`TextureAnimationData`](Textures_Texture_types.md#textureanimationdata) & [`TextureDataBase`](Textures_Texture_types.md#texturedatabase)

#### Defined in

[divinevoxel/foundation/src/Textures/Texture.types.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/Texture.types.ts#L53)

___

### TextureDataBase

Ƭ **TextureDataBase**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64?` | `string` \| `string`[] | # base64 Provide a base64 encoded string to use instead of downloading |
| `includeInRawDataMap?` | `boolean` | # includeInRawDataMap Will keep a Uint8ClampedArray of the loaded texture if set to true. |
| `rawData?` | `Uint8ClampedArray` \| `Uint8ClampedArray`[] | # rawData Provide a Uint8ClampedArray or an array of Uint8ClampedArray's instead of downloading |

#### Defined in

[divinevoxel/foundation/src/Textures/Texture.types.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/Texture.types.ts#L39)

___

### TextureTypeUVMap

Ƭ **TextureTypeUVMap**: `Record`\<`string`, `Record`\<`string`, `Record`\<`string`, `number`\>\>\>

#### Defined in

[divinevoxel/foundation/src/Textures/Texture.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/Texture.types.ts#L3)

___

### TextureTypes

Ƭ **TextureTypes**: `string`

#### Defined in

[divinevoxel/foundation/src/Textures/Texture.types.ts:1](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/Texture.types.ts#L1)
