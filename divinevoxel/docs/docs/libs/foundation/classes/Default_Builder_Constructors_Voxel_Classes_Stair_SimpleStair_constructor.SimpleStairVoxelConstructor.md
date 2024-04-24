---
id: "Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor"
title: "Class: SimpleStairVoxelConstructor"
sidebar_label: "SimpleStairVoxelConstructor"
custom_edit_url: null
---

[Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor](../modules/Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.md).SimpleStairVoxelConstructor

## Hierarchy

- [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)

  ↳ **`SimpleStairVoxelConstructor`**

## Constructors

### constructor

• **new SimpleStairVoxelConstructor**(`id`, `textureData`): [`SimpleStairVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `textureData` | [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata) |

#### Returns

[`SimpleStairVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)

#### Overrides

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[constructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts#L10)

## Properties

### id

• **id**: `string`

#### Inherited from

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[id](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#id)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts#L10)

___

### texture

• **texture**: `number` = `0`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts#L9)

___

### textureData

• **textureData**: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts#L10)

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

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts#L42)

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

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.ts#L13)
