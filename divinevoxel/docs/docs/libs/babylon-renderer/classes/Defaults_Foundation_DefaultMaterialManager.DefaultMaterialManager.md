---
id: "Defaults_Foundation_DefaultMaterialManager.DefaultMaterialManager"
title: "Class: DefaultMaterialManager"
sidebar_label: "DefaultMaterialManager"
custom_edit_url: null
---

[Defaults/Foundation/DefaultMaterialManager](../modules/Defaults_Foundation_DefaultMaterialManager.md).DefaultMaterialManager

## Constructors

### constructor

• **new DefaultMaterialManager**(): [`DefaultMaterialManager`](Defaults_Foundation_DefaultMaterialManager.DefaultMaterialManager.md)

#### Returns

[`DefaultMaterialManager`](Defaults_Foundation_DefaultMaterialManager.DefaultMaterialManager.md)

## Properties

### fogData

▪ `Static` **fogData**: `Vector4`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L18)

___

### fogOptions

▪ `Static` **fogOptions**: `RenderFogOptions`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L10)

___

### sceneTool

▪ `Static` **sceneTool**: [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L27)

___

### shaders

▪ `Static` **shaders**: `Object` = `DVEShaders`

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
| `register` | `DVEShaderRegister` |
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

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L9)

___

### time

▪ `Static` **time**: `number` = `0`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L8)

___

### unifrosm

▪ `Static` **unifrosm**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `lightGradient` | `number`[] |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L19)

## Methods

### init

▸ **init**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L28)

___

### runEffects

▸ **runEffects**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:71](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L71)

___

### setBaseLevel

▸ **setBaseLevel**(`level`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:92](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L92)

___

### setOption

▸ **setOption**(`id`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:99](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L99)

___

### setSunLevel

▸ **setSunLevel**(`level`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:86](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L86)

___

### sync

▸ **sync**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L46)

___

### updateFogData

▸ **updateFogData**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Vector4` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:79](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L79)

___

### updateFogOptions

▸ **updateFogOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `RecursivePartial`\<`RenderFogOptions`\> |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:106](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L106)

___

### updateUniforms

▸ **updateUniforms**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L62)
