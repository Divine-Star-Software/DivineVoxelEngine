---
id: "Default_Shaders_DVEShaders"
title: "Module: Default/Shaders/DVEShaders"
sidebar_label: "Default/Shaders/DVEShaders"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### DVEShaders

• `Const` **DVEShaders**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_defaultShader` | `URIShader` |
| `builder` | \{ `define`: \{ `_process`: (`data`: `ShaderDefinesData`) => `string` ; `build`: (`data`: `ShaderDefinesData` \| `ShaderDefinesData`[] \| `Map`\<`string`, `ShaderDefinesData`\>) => `string`  } ; `functions`: \{ `_functionSets`: `Map`\<`string`, `string`[]\> ; `_functions`: `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> ; `_processFunctinos`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`) => `string` ; `build`: (`id`: `string`, `data?`: ``null`` \| `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`, `predicate?`: (`id`: `string`, `type`: `ShaderFunctionData`\<`any`\>) => `boolean`) => `string` ; `create`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>) => `void`  } ; `shaders`: \{ `_shaders`: `Map`\<`string`, `URIShader`\> ; `create`: (`id`: `string`) => `URIShader`  } ; `snippets`: \{ `_snippets`: `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> ; `_process`: (`text`: `string`, `shader?`: `URIShader`) => \{ `foundSnippet`: `boolean` ; `newBody`: `string`  } ; `build`: (`text`: `string`, `shader?`: `URIShader`) => `string` ; `create`: (`data`: `ShaderSnippetData`\<`any`\>) => `void` ; `get`: (`id`: `string`, `args?`: `any`) => `string` ; `override`: (`id`: `string`, `data`: `ShaderSnippetData`\<`any`\>) => `boolean`  } ; `uniforms`: \{ `_process`: (`data`: `ShaderUniformData`) => `string` ; `build`: (`data`: `ShaderUniformData`[] \| `Map`\<`string`, `ShaderUniformData`\>, `predicate?`: (`id`: `string`, `type`: `ShaderUniformData`) => `boolean`) => `string`  }  } |
| `builder.define` | \{ `_process`: (`data`: `ShaderDefinesData`) => `string` ; `build`: (`data`: `ShaderDefinesData` \| `ShaderDefinesData`[] \| `Map`\<`string`, `ShaderDefinesData`\>) => `string`  } |
| `builder.define._process` | [object Object] |
| `builder.define.build` | [object Object] |
| `builder.functions` | \{ `_functionSets`: `Map`\<`string`, `string`[]\> ; `_functions`: `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> ; `_processFunctinos`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`) => `string` ; `build`: (`id`: `string`, `data?`: ``null`` \| `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`, `predicate?`: (`id`: `string`, `type`: `ShaderFunctionData`\<`any`\>) => `boolean`) => `string` ; `create`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>) => `void`  } |
| `builder.functions._functionSets` | `Map`\<`string`, `string`[]\> |
| `builder.functions._functions` | `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> |
| `builder.functions._processFunctinos` | [object Object] |
| `builder.functions.build` | [object Object] |
| `builder.functions.create` | [object Object] |
| `builder.shaders` | \{ `_shaders`: `Map`\<`string`, `URIShader`\> ; `create`: (`id`: `string`) => `URIShader`  } |
| `builder.shaders._shaders` | `Map`\<`string`, `URIShader`\> |
| `builder.shaders.create` | [object Object] |
| `builder.snippets` | \{ `_snippets`: `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> ; `_process`: (`text`: `string`, `shader?`: `URIShader`) => \{ `foundSnippet`: `boolean` ; `newBody`: `string`  } ; `build`: (`text`: `string`, `shader?`: `URIShader`) => `string` ; `create`: (`data`: `ShaderSnippetData`\<`any`\>) => `void` ; `get`: (`id`: `string`, `args?`: `any`) => `string` ; `override`: (`id`: `string`, `data`: `ShaderSnippetData`\<`any`\>) => `boolean`  } |
| `builder.snippets._snippets` | `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> |
| `builder.snippets._process` | [object Object] |
| `builder.snippets.build` | [object Object] |
| `builder.snippets.create` | [object Object] |
| `builder.snippets.get` | [object Object] |
| `builder.snippets.override` | [object Object] |
| `builder.uniforms` | \{ `_process`: (`data`: `ShaderUniformData`) => `string` ; `build`: (`data`: `ShaderUniformData`[] \| `Map`\<`string`, `ShaderUniformData`\>, `predicate?`: (`id`: `string`, `type`: `ShaderUniformData`) => `boolean`) => `string`  } |
| `builder.uniforms._process` | [object Object] |
| `builder.uniforms.build` | [object Object] |
| `register` | [`DVEShaderRegister`](../classes/Default_Shaders_DVEShaderRegister.DVEShaderRegister.md) |
| `voxelAttributes` | [id: string, type: ShaderDataTypes][] |
| `voxelFragFunctions` | `string`[] |
| `voxelSharedUniforms` | [id: string, type: ShaderDataTypes][] |
| `voxelVarying` | `ShaderVaryingData`\<`any`\>[] |
| `voxelVertexFunctions` | `string`[] |
| `voxelVertexUniforms` | [id: string, type: ShaderDataTypes][] |
| `$INIT` | () => `void` |
| `_addInstances` | (`shader`: `URIShader`) => `void` |
| `createBasicTextureShader` | (`id`: `string`) => `URIShader` |
| `createSkyBoxShader` | (`id`: `string`) => `URIShader` |
| `createVoxelShader` | (`id`: `string`) => `URIShader` |

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/DVEShaders.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/DVEShaders.ts#L16)
