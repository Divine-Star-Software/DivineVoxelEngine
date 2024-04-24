---
id: "Textures_TextureType.TextureType"
title: "Class: TextureType"
sidebar_label: "TextureType"
custom_edit_url: null
---

[Textures/TextureType](../modules/Textures_TextureType.md).TextureType

## Constructors

### constructor

• **new TextureType**(`id`): [`TextureType`](Textures_TextureType.TextureType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`TextureType`](Textures_TextureType.TextureType.md)

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L73)

## Properties

### extension

• **extension**: `string` = `"png"`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L69)

___

### id

• **id**: `string`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L73)

___

### materials

• **materials**: `Map`\<`string`, `URIMaterial`\<`URIScene`\<`unknown`\>, `any`, `unknown`\>\>

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:71](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L71)

___

### segments

• **segments**: `Map`\<`string`, `TextureSegment`\>

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L70)

___

### shader

• **shader**: `URIShader`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:72](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L72)

## Methods

### \_getPath

▸ **_getPath**(`textureData`, `varation?`, `extension`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `textureData` | [`TextureData`](../modules/Textures_Texture_types.md#texturedata) | `undefined` |
| `varation` | `string` | `"default"` |
| `extension` | `string` | `undefined` |

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:271](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L271)

___

### \_processVariations

▸ **_processVariations**(`textureData`, `paths`, `map`, `animations`, `textureAnimatioTimes`, `extension`, `count`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `textureData` | [`TextureData`](../modules/Textures_Texture_types.md#texturedata) |
| `paths` | `Map`\<`string`, ``false`` \| `Uint8ClampedArray`\> |
| `map` | `Record`\<`string`, `number`\> |
| `animations` | `number`[][] |
| `textureAnimatioTimes` | `number`[][] |
| `extension` | `string` |
| `count` | `number` |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:208](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L208)

___

### addTexture

▸ **addTexture**(`data`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TextureData`](../modules/Textures_Texture_types.md#texturedata) |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:134](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L134)

___

### addToMaterial

▸ **addToMaterial**(`material`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `material` | `URIMaterial`\<`URIScene`\<`unknown`\>, `any`, `unknown`\> |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:160](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L160)

___

### addToShader

▸ **addToShader**(`shader`): `URIShader`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shader` | `URIShader` |

#### Returns

`URIShader`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L141)

___

### build

▸ **build**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L88)

___

### buildTextureIndex

▸ **buildTextureIndex**(): `undefined` \| ``false``

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:277](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L277)

___

### clearSegmentData

▸ **clearSegmentData**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:123](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L123)

___

### flushAll

▸ **flushAll**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:83](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L83)

___

### getTextureIndex

▸ **getTextureIndex**(`textureId`, `varation?`, `segment?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `textureId` | `string` | `undefined` |
| `varation` | `string` | `""` |
| `segment` | `string` | `"main"` |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:103](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L103)

___

### getTextureIndexMap

▸ **getTextureIndexMap**(): `Record`\<`string`, `Record`\<`string`, `number`\>\>

#### Returns

`Record`\<`string`, `Record`\<`string`, `number`\>\>

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:198](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L198)

___

### removeSegment

▸ **removeSegment**(`id`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:127](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L127)

___

### runAnimations

▸ **runAnimations**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Textures/TextureType.ts:172](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Textures/TextureType.ts#L172)
