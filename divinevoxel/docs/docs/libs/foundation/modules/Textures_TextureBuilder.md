---
id: "Textures_TextureBuilder"
title: "Module: Textures/TextureBuilder"
sidebar_label: "Textures/TextureBuilder"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### TextureBuilder

• `Const` **TextureBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_canvas` | `HTMLCanvasElement` |
| `_textureSize` | `number` |
| `context` | ``null`` \| `CanvasRenderingContext2D` |
| `imgHeight` | `number` |
| `imgWidth` | `number` |
| `_combineImageData` | (`totalLength`: `number`, `arrays`: `Uint8ClampedArray`[]) => `Uint8ClampedArray` |
| `_create` | (`name`: `string`, `images`: `Map`\<`string`, ``false`` \| `Uint8ClampedArray`\>, `width`: `number`, `height`: `number`) => `Promise`\<`URITexture`\<`URIScene`\<`any`\>, `any`\>\> |
| `_createMipMap` | (`level`: `number`, `images`: `Map`\<`string`, ``false`` \| `Uint8ClampedArray`\>, `width`: `number`, `height`: `number`) => `Promise`\<`Uint8ClampedArray`\> |
| `createMaterialTexture` | (`name`: `string`, `images`: `Map`\<`string`, ``false`` \| `Uint8ClampedArray`\>, `width`: `number`, `height`: `number`) => `Promise`\<`URITexture`\<`URIScene`\<`any`\>, `any`\>\> |
| `defineTextureDimensions` | (`textureSize`: `number`, `mipMapSizes`: `number`[]) => `void` |
| `loadImage` | (`imgSrcData`: `string` \| `Uint8ClampedArray`, `width`: `number`, `height`: `number`, `lod`: `number`) => `Promise`\<`Uint8ClampedArray`\> |
| `setUpImageCreation` | () => `void` |

#### Defined in

[divinevoxel/foundation/src/Textures/TextureBuilder.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureBuilder.ts#L9)
