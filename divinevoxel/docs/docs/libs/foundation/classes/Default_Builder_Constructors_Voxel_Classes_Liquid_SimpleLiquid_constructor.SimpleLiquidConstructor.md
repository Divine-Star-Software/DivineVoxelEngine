---
id: "Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor"
title: "Class: SimpleLiquidConstructor"
sidebar_label: "SimpleLiquidConstructor"
custom_edit_url: null
---

[Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor](../modules/Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.md).SimpleLiquidConstructor

## Hierarchy

- [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)

  ↳ **`SimpleLiquidConstructor`**

## Constructors

### constructor

• **new SimpleLiquidConstructor**(`id`, `textureData`): [`SimpleLiquidConstructor`](Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `textureData` | [[`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)] |

#### Returns

[`SimpleLiquidConstructor`](Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)

#### Overrides

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[constructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts#L10)

## Properties

### id

• **id**: `string`

#### Inherited from

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[id](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#id)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts#L11)

___

### textureData

• **textureData**: [[`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)]

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts#L12)

___

### textures

• **textures**: `number`[] = `[]`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts#L9)

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

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts#L45)

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

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.ts#L16)
