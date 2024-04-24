---
id: "Default_Shaders_DVEShaderRegister.DVEShaderRegister"
title: "Class: DVEShaderRegister"
sidebar_label: "DVEShaderRegister"
custom_edit_url: null
---

[Default/Shaders/DVEShaderRegister](../modules/Default_Shaders_DVEShaderRegister.md).DVEShaderRegister

## Constructors

### constructor

• **new DVEShaderRegister**(): [`DVEShaderRegister`](Default_Shaders_DVEShaderRegister.DVEShaderRegister.md)

#### Returns

[`DVEShaderRegister`](Default_Shaders_DVEShaderRegister.DVEShaderRegister.md)

## Properties

### shaders

• **shaders**: [`UtilMap`](Util_UtilMap.UtilMap.md)\<`string`, `URIShader`\>

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts#L7)

## Methods

### create

▸ **create**(`shaders`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shaders` | `URIShader`[] |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts#L9)

___

### get

▸ **get**(`id`): `undefined` \| `URIShader`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| `URIShader`

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts#L14)

___

### getBulder

▸ **getBulder**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `define` | \{ `_process`: (`data`: `ShaderDefinesData`) => `string` ; `build`: (`data`: `ShaderDefinesData` \| `ShaderDefinesData`[] \| `Map`\<`string`, `ShaderDefinesData`\>) => `string`  } |
| `define._process` | [object Object] |
| `define.build` | [object Object] |
| `functions` | \{ `_functionSets`: `Map`\<`string`, `string`[]\> ; `_functions`: `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> ; `_processFunctinos`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`) => `string` ; `build`: (`id`: `string`, `data?`: ``null`` \| `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`, `predicate?`: (`id`: `string`, `type`: `ShaderFunctionData`\<`any`\>) => `boolean`) => `string` ; `create`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>) => `void`  } |
| `functions._functionSets` | `Map`\<`string`, `string`[]\> |
| `functions._functions` | `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> |
| `functions._processFunctinos` | [object Object] |
| `functions.build` | [object Object] |
| `functions.create` | [object Object] |
| `shaders` | \{ `_shaders`: `Map`\<`string`, `URIShader`\> ; `create`: (`id`: `string`) => `URIShader`  } |
| `shaders._shaders` | `Map`\<`string`, `URIShader`\> |
| `shaders.create` | [object Object] |
| `snippets` | \{ `_snippets`: `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> ; `_process`: (`text`: `string`, `shader?`: `URIShader`) => \{ `foundSnippet`: `boolean` ; `newBody`: `string`  } ; `build`: (`text`: `string`, `shader?`: `URIShader`) => `string` ; `create`: (`data`: `ShaderSnippetData`\<`any`\>) => `void` ; `get`: (`id`: `string`, `args?`: `any`) => `string` ; `override`: (`id`: `string`, `data`: `ShaderSnippetData`\<`any`\>) => `boolean`  } |
| `snippets._snippets` | `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> |
| `snippets._process` | [object Object] |
| `snippets.build` | [object Object] |
| `snippets.create` | [object Object] |
| `snippets.get` | [object Object] |
| `snippets.override` | [object Object] |
| `uniforms` | \{ `_process`: (`data`: `ShaderUniformData`) => `string` ; `build`: (`data`: `ShaderUniformData`[] \| `Map`\<`string`, `ShaderUniformData`\>, `predicate?`: (`id`: `string`, `type`: `ShaderUniformData`) => `boolean`) => `string`  } |
| `uniforms._process` | [object Object] |
| `uniforms.build` | [object Object] |

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/DVEShaderRegister.ts#L17)
