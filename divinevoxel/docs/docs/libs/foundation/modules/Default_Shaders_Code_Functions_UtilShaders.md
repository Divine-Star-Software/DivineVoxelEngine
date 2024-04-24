---
id: "Default_Shaders_Code_Functions_UtilShaders"
title: "Module: Default/Shaders/Code/Functions/UtilShaders"
sidebar_label: "Default/Shaders/Code/Functions/UtilShaders"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### RegisterNoiseFunctions

▸ **RegisterNoiseFunctions**(`builder`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | `Object` |
| `builder.define` | `Object` |
| `builder.define._process` | (`data`: `ShaderDefinesData`) => `string` |
| `builder.define.build` | (`data`: `ShaderDefinesData` \| `ShaderDefinesData`[] \| `Map`\<`string`, `ShaderDefinesData`\>) => `string` |
| `builder.functions` | `Object` |
| `builder.functions._functionSets` | `Map`\<`string`, `string`[]\> |
| `builder.functions._functions` | `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> |
| `builder.functions._processFunctinos` | (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`) => `string` |
| `builder.functions.build` | (`id`: `string`, `data?`: ``null`` \| `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`, `predicate?`: (`id`: `string`, `type`: `ShaderFunctionData`\<`any`\>) => `boolean`) => `string` |
| `builder.functions.create` | (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>) => `void` |
| `builder.shaders` | `Object` |
| `builder.shaders._shaders` | `Map`\<`string`, `URIShader`\> |
| `builder.shaders.create` | (`id`: `string`) => `URIShader` |
| `builder.snippets` | `Object` |
| `builder.snippets._snippets` | `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> |
| `builder.snippets._process` | (`text`: `string`, `shader?`: `URIShader`) => \{ `foundSnippet`: `boolean` ; `newBody`: `string`  } |
| `builder.snippets.build` | (`text`: `string`, `shader?`: `URIShader`) => `string` |
| `builder.snippets.create` | (`data`: `ShaderSnippetData`\<`any`\>) => `void` |
| `builder.snippets.get` | (`id`: `string`, `args?`: `any`) => `string` |
| `builder.snippets.override` | (`id`: `string`, `data`: `ShaderSnippetData`\<`any`\>) => `boolean` |
| `builder.uniforms` | `Object` |
| `builder.uniforms._process` | (`data`: `ShaderUniformData`) => `string` |
| `builder.uniforms.build` | (`data`: `ShaderUniformData`[] \| `Map`\<`string`, `ShaderUniformData`\>, `predicate?`: (`id`: `string`, `type`: `ShaderUniformData`) => `boolean`) => `string` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/Code/Functions/UtilShaders.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/Code/Functions/UtilShaders.ts#L2)
