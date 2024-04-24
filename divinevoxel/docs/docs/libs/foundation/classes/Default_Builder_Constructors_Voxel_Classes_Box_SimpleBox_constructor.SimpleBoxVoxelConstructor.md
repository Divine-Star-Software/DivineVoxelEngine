---
id: "Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor"
title: "Class: SimpleBoxVoxelConstructor"
sidebar_label: "SimpleBoxVoxelConstructor"
custom_edit_url: null
---

[Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor](../modules/Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.md).SimpleBoxVoxelConstructor

## Hierarchy

- [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)

  ↳ **`SimpleBoxVoxelConstructor`**

## Constructors

### constructor

• **new SimpleBoxVoxelConstructor**(`id`, `textureData`): [`SimpleBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `textureData` | [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)\> |

#### Returns

[`SimpleBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)

#### Overrides

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[constructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts#L12)

## Properties

### id

• **id**: `string`

#### Inherited from

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[id](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#id)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts#L13)

___

### textureData

• **textureData**: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts#L14)

___

### textures

• **textures**: `number`[] = `[]`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts#L11)

## Methods

### onTexturesRegistered

▸ **onTexturesRegistered**(`textureManager`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `textureManager` | `Object` | `undefined` |
| `textureManager.data` | [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap) | `undefined` |
| `textureManager.textureDataHasBeenSet` | `boolean` | `false` |
| `textureManager.getTextureUV` | (`data`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` | `undefined` |
| `textureManager.isReady` | () => `boolean` | `undefined` |
| `textureManager.releaseTextureData` | () => `void` | `undefined` |
| `textureManager.setTextureIndex` | (`data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap)) => `void` | `undefined` |

#### Returns

`void`

#### Overrides

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[onTexturesRegistered](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#ontexturesregistered)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts#L48)

___

### process

▸ **process**(`tool`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md) |

#### Returns

`void`

#### Overrides

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[process](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#process)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.ts#L20)
