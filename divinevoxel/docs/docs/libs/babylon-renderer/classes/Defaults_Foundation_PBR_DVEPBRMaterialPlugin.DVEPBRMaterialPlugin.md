---
id: "Defaults_Foundation_PBR_DVEPBRMaterialPlugin.DVEPBRMaterialPlugin"
title: "Class: DVEPBRMaterialPlugin"
sidebar_label: "DVEPBRMaterialPlugin"
custom_edit_url: null
---

[Defaults/Foundation/PBR/DVEPBRMaterialPlugin](../modules/Defaults_Foundation_PBR_DVEPBRMaterialPlugin.md).DVEPBRMaterialPlugin

## Hierarchy

- `MaterialPluginBase`

  ↳ **`DVEPBRMaterialPlugin`**

## Constructors

### constructor

• **new DVEPBRMaterialPlugin**(`material`, `name`, `dveMaterial`, `onUBSet`): [`DVEPBRMaterialPlugin`](Defaults_Foundation_PBR_DVEPBRMaterialPlugin.DVEPBRMaterialPlugin.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `material` | `PBRMaterial` |
| `name` | `string` |
| `dveMaterial` | [`DVEBRPBRMaterial`](Defaults_Foundation_PBR_DVEBRPBRMaterial.DVEBRPBRMaterial.md) |
| `onUBSet` | (`uniformBuffer`: `UniformBuffer`) => `void` |

#### Returns

[`DVEPBRMaterialPlugin`](Defaults_Foundation_PBR_DVEPBRMaterialPlugin.DVEPBRMaterialPlugin.md)

#### Overrides

MaterialPluginBase.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L19)

## Properties

### \_material

• `Protected` **\_material**: `Material`

#### Inherited from

MaterialPluginBase.\_material

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:36

___

### \_pluginDefineNames

• `Protected` `Optional` **\_pluginDefineNames**: `Object`

#### Index signature

▪ [name: `string`]: `any`

#### Inherited from

MaterialPluginBase.\_pluginDefineNames

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:38

___

### \_pluginManager

• `Protected` **\_pluginManager**: `MaterialPluginManager`

#### Inherited from

MaterialPluginBase.\_pluginManager

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:37

___

### \_textureBound

• **\_textureBound**: `boolean` = `false`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:125](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L125)

___

### dveMaterial

• **dveMaterial**: [`DVEBRPBRMaterial`](Defaults_Foundation_PBR_DVEBRPBRMaterial.DVEBRPBRMaterial.md)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L22)

___

### id

• **id**: \`$\{string}-$\{string}-$\{string}-$\{string}-$\{string}\`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L18)

___

### markAllDefinesAsDirty

• `Readonly` **markAllDefinesAsDirty**: () => `void`

Helper function to mark defines as being dirty.

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

MaterialPluginBase.markAllDefinesAsDirty

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:45

___

### name

• **name**: `string`

Defines the name of the plugin

#### Inherited from

MaterialPluginBase.name

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:23

___

### onUBSet

• **onUBSet**: (`uniformBuffer`: `UniformBuffer`) => `void`

#### Type declaration

▸ (`uniformBuffer`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `uniformBuffer` | `UniformBuffer` |

##### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L23)

___

### priority

• **priority**: `number`

Defines the priority of the plugin. Lower numbers run first.

#### Inherited from

MaterialPluginBase.priority

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:27

___

### registerForExtraEvents

• **registerForExtraEvents**: `boolean`

Indicates that this plugin should be notified for the extra events (HasRenderTargetTextures / FillRenderTargetTextures / HardBindForSubMesh)

#### Inherited from

MaterialPluginBase.registerForExtraEvents

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:35

___

### resolveIncludes

• **resolveIncludes**: `boolean`

Indicates that any #include directive in the plugin code must be replaced by the corresponding code.

#### Inherited from

MaterialPluginBase.resolveIncludes

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:31

___

### uniformBuffer

• **uniformBuffer**: `UniformBuffer`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L16)

## Methods

### \_enable

▸ **_enable**(`enable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enable` | `boolean` |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.\_enable

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:41

___

### addFallbacks

▸ **addFallbacks**(`defines`, `fallbacks`, `currentRank`): `number`

Add fallbacks to the effect fallbacks list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defines` | `MaterialDefines` | defines the Base texture to use. |
| `fallbacks` | `EffectFallbacks` | defines the current fallback list. |
| `currentRank` | `number` | defines the current fallback rank. |

#### Returns

`number`

the new fallback rank.

#### Inherited from

MaterialPluginBase.addFallbacks

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:162

___

### bindForSubMesh

▸ **bindForSubMesh**(`uniformBuffer`, `scene`, `engine`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniformBuffer` | `UniformBuffer` |
| `scene` | `Scene` |
| `engine` | `Engine` |

#### Returns

`void`

#### Overrides

MaterialPluginBase.bindForSubMesh

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:126](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L126)

___

### collectDefines

▸ **collectDefines**(`defines`): `void`

Collects all defines.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defines` | `Object` | The object to append to. |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.collectDefines

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:109

___

### copyTo

▸ **copyTo**(`plugin`): `void`

Makes a duplicate of the current configuration into another one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | `MaterialPluginBase` | define the config where to copy the info |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.copyTo

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:198

___

### dispose

▸ **dispose**(`forceDisposeTextures?`): `void`

Disposes the resources of the material.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `forceDisposeTextures?` | `boolean` | Forces the disposal of all textures. |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.dispose

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:93

___

### fillRenderTargetTextures

▸ **fillRenderTargetTextures**(`renderTargets`): `void`

Fills the list of render target textures.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderTargets` | `SmartArray`\<`RenderTargetTexture`\> | the list of render targets to update |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.fillRenderTargetTextures

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:144

___

### getActiveTextures

▸ **getActiveTextures**(`activeTextures`): `void`

Returns an array of the actively used textures.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `activeTextures` | `BaseTexture`[] | Array of BaseTextures |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.getActiveTextures

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:149

___

### getAnimatables

▸ **getAnimatables**(`animatables`): `void`

Returns the animatable textures.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animatables` | `IAnimatable`[] | Array of animatable textures. |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.getAnimatables

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:154

___

### getAttributes

▸ **getAttributes**(`attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | `string`[] |

#### Returns

`void`

#### Overrides

MaterialPluginBase.getAttributes

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:63](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L63)

___

### getClassName

▸ **getClassName**(): `string`

#### Returns

`string`

#### Overrides

MaterialPluginBase.getClassName

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L53)

___

### getCustomCode

▸ **getCustomCode**(`shaderType`): ``null`` \| \{ `CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION?`: `undefined` ; `CUSTOM_FRAGMENT_DEFINITIONS?`: `undefined` ; `CUSTOM_FRAGMENT_MAIN_END?`: `undefined` ; `CUSTOM_FRAGMENT_UPDATE_ALBEDO?`: `undefined` ; `CUSTOM_VERTEX_DEFINITIONS`: `string` ; `CUSTOM_VERTEX_MAIN_BEGIN`: `string` ; `CUSTOM_VERTEX_UPDATE_NORMAL`: `string`  } \| \{ `CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION`: `string` ; `CUSTOM_FRAGMENT_DEFINITIONS`: `string` ; `CUSTOM_FRAGMENT_MAIN_END`: `string` ; `CUSTOM_FRAGMENT_UPDATE_ALBEDO`: `string` ; `CUSTOM_VERTEX_DEFINITIONS?`: `undefined` ; `CUSTOM_VERTEX_MAIN_BEGIN?`: `undefined` ; `CUSTOM_VERTEX_UPDATE_NORMAL?`: `undefined`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `shaderType` | `any` |

#### Returns

``null`` \| \{ `CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION?`: `undefined` ; `CUSTOM_FRAGMENT_DEFINITIONS?`: `undefined` ; `CUSTOM_FRAGMENT_MAIN_END?`: `undefined` ; `CUSTOM_FRAGMENT_UPDATE_ALBEDO?`: `undefined` ; `CUSTOM_VERTEX_DEFINITIONS`: `string` ; `CUSTOM_VERTEX_MAIN_BEGIN`: `string` ; `CUSTOM_VERTEX_UPDATE_NORMAL`: `string`  } \| \{ `CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION`: `string` ; `CUSTOM_FRAGMENT_DEFINITIONS`: `string` ; `CUSTOM_FRAGMENT_MAIN_END`: `string` ; `CUSTOM_FRAGMENT_UPDATE_ALBEDO`: `string` ; `CUSTOM_VERTEX_DEFINITIONS?`: `undefined` ; `CUSTOM_VERTEX_MAIN_BEGIN?`: `undefined` ; `CUSTOM_VERTEX_UPDATE_NORMAL?`: `undefined`  }

#### Overrides

MaterialPluginBase.getCustomCode

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:132](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L132)

___

### getSamplers

▸ **getSamplers**(`samplers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `samplers` | `string`[] |

#### Returns

`void`

#### Overrides

MaterialPluginBase.getSamplers

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L57)

___

### getUniformBuffersNames

▸ **getUniformBuffersNames**(`ubos`): `void`

Gets the uniform buffers names added by the plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ubos` | `string`[] | list that the ubo names should be added to. |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.getUniformBuffersNames

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:179

___

### getUniforms

▸ **getUniforms**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fragment` | `string` |
| `ubo` | \{ `arraySize?`: `number` ; `name`: `string` ; `size?`: `number` ; `type`: `string`  }[] |
| `vertex` | `string` |

#### Overrides

MaterialPluginBase.getUniforms

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:71](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L71)

___

### hardBindForSubMesh

▸ **hardBindForSubMesh**(`uniformBuffer`, `scene`, `engine`, `subMesh`): `void`

Binds the material data (this function is called even if mustRebind() returns false)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uniformBuffer` | `UniformBuffer` | defines the Uniform buffer to fill in. |
| `scene` | `Scene` | defines the scene the material belongs to. |
| `engine` | `Engine` | defines the engine the material belongs to. |
| `subMesh` | `SubMesh` | the submesh to bind data for |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.hardBindForSubMesh

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:80

___

### hasRenderTargetTextures

▸ **hasRenderTargetTextures**(): `boolean`

Gets a boolean indicating that current material needs to register RTT

#### Returns

`boolean`

true if this uses a render target otherwise false.

#### Inherited from

MaterialPluginBase.hasRenderTargetTextures

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:139

___

### hasTexture

▸ **hasTexture**(`texture`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `texture` | `BaseTexture` |

#### Returns

`boolean`

#### Overrides

MaterialPluginBase.hasTexture

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L35)

___

### isReadyForSubMesh

▸ **isReadyForSubMesh**(`defines`, `scene`, `engine`, `subMesh`): `boolean`

Specifies that the submesh is ready to be used.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defines` | `MaterialDefines` | the list of "defines" to update. |
| `scene` | `Scene` | defines the scene the material belongs to. |
| `engine` | `Engine` | the engine this scene belongs to. |
| `subMesh` | `SubMesh` | the submesh to check for readiness |

#### Returns

`boolean`

- boolean indicating that the submesh is ready or not.

#### Inherited from

MaterialPluginBase.isReadyForSubMesh

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:72

___

### parse

▸ **parse**(`source`, `scene`, `rootUrl`): `void`

Parses a plugin configuration from a serialized object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `any` | Serialized object. |
| `scene` | `Scene` | Defines the scene we are parsing for |
| `rootUrl` | `string` | Defines the rootUrl to load from |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.parse

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:210

___

### prepareDefines

▸ **prepareDefines**(`defines`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `defines` | `any` |

#### Returns

`void`

#### Overrides

MaterialPluginBase.prepareDefines

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/DVEPBRMaterialPlugin.ts#L49)

___

### prepareDefinesBeforeAttributes

▸ **prepareDefinesBeforeAttributes**(`defines`, `scene`, `mesh`): `void`

Sets the defines for the next rendering. Called before PrepareDefinesForAttributes is called.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defines` | `MaterialDefines` | the list of "defines" to update. |
| `scene` | `Scene` | defines the scene to the material belongs to. |
| `mesh` | `AbstractMesh` | the mesh being rendered |

#### Returns

`void`

#### Inherited from

MaterialPluginBase.prepareDefinesBeforeAttributes

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:121

___

### serialize

▸ **serialize**(): `any`

Serializes this plugin configuration.

#### Returns

`any`

- An object with the serialized config.

#### Inherited from

MaterialPluginBase.serialize

#### Defined in

node_modules/@babylonjs/core/Materials/materialPluginBase.d.ts:203
