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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L17)

___

### fogOptions

▪ `Static` **fogOptions**: `RenderFogOptions`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L9)

___

### shaders

▪ `Static` **shaders**: `Object` = `DVEShaders`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_defaultShader` | `URIShader` |
| `builder` | \{ `define`: \{ `_process`: (`data`: `ShaderDefinesData`) => `string` ; `build`: (`data`: `ShaderDefinesData` \| `ShaderDefinesData`[] \| `Map`\<`string`, `ShaderDefinesData`\>) => `string`  } ; `functions`: \{ `_functionSets`: `Map`\<`string`, `string`[]\> ; `_functions`: `Map`\<`string`, `ShaderFunctionData`\<`any`\>\> ; `_processFunctinos`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`) => `string` ; `build`: (`id`: `string`, `data?`: ``null`` \| `ShaderFunctionData`\<`any`\>, `shader?`: ``null`` \| `URIShader`, `predicate?`: (`id`: `string`, `type`: `ShaderFunctionData`\<`any`\>) => `boolean`) => `string` ; `create`: (`id`: `string`, `data`: `ShaderFunctionData`\<`any`\>) => `void`  } ; `shaders`: \{ `_shaders`: `Map`\<`string`, `URIShader`\> ; `create`: (`id`: `string`) => `URIShader`  } ; `snippets`: \{ `_snippets`: `Map`\<`string`, `ShaderSnippetData`\<`any`\>\> ; `_process`: (`text`: `string`, `shader?`: `URIShader`) => \{ `foundSnippet`: `boolean` ; `newBody`: `string`  } ; `build`: (`text`: `string`, `shader?`: `URIShader`) => `string` ; `create`: (`data`: `ShaderSnippetData`\<`any`\>) => `void` ; `get`: (`id`: `string`, `args?`: `any`) => `string` ; `override`: (`id`: `string`, `data`: `ShaderSnippetData`\<`any`\>) => `boolean`  } ; `uniforms`: \{ `_process`: (`data`: `ShaderUniformData`) => `string` ; `build`: (`data`: `Map`\<`string`, `ShaderUniformData`\> \| `ShaderUniformData`[], `predicate?`: (`id`: `string`, `type`: `ShaderUniformData`) => `boolean`) => `string`  }  } |
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
| `builder.uniforms` | \{ `_process`: (`data`: `ShaderUniformData`) => `string` ; `build`: (`data`: `Map`\<`string`, `ShaderUniformData`\> \| `ShaderUniformData`[], `predicate?`: (`id`: `string`, `type`: `ShaderUniformData`) => `boolean`) => `string`  } |
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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L8)

___

### time

▪ `Static` **time**: `number` = `0`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L7)

___

### unifrosm

▪ `Static` **unifrosm**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `lightGradient` | `number`[] |

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L18)

## Methods

### init

▸ **init**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L26)

___

### runEffects

▸ **runEffects**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L52)

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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L73)

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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:80](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L80)

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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L67)

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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:59](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L59)

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

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:87](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L87)

___

### updateUniforms

▸ **updateUniforms**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/three-renderer/src/Defaults/Foundation/DefaultMaterialManager.ts#L43)
