---
id: "Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor"
title: "Class: VoxelConstructor"
sidebar_label: "VoxelConstructor"
custom_edit_url: null
---

[Default/Builder/Constructors/Voxel/Classes/VoxelConstructor](../modules/Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.md).VoxelConstructor

## Hierarchy

- **`VoxelConstructor`**

  ↳ [`PillarBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md)

  ↳ [`SimpleBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)

  ↳ [`SimpleLiquidConstructor`](Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)

  ↳ [`SimpleCrossedPanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimpleCrossedPanel_constructor.SimpleCrossedPanelVoxelConstructor.md)

  ↳ [`SimplePanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimplePanel_constructor.SimplePanelVoxelConstructor.md)

  ↳ [`SimpleStairVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)

## Constructors

### constructor

• **new VoxelConstructor**(): [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)

#### Returns

[`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)

## Properties

### id

• **id**: `string`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor.ts#L5)

## Methods

### onTexturesRegistered

▸ **onTexturesRegistered**(`textures`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `textures` | `Object` | `undefined` |
| `textures.data` | [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap) | `undefined` |
| `textures.textureDataHasBeenSet` | `boolean` | `false` |
| `textures.getTextureUV` | (`data`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` | `undefined` |
| `textures.isReady` | () => `boolean` | `undefined` |
| `textures.releaseTextureData` | () => `void` | `undefined` |
| `textures.setTextureIndex` | (`data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap)) => `void` | `undefined` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor.ts#L7)

___

### process

▸ **process**(`tool`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/VoxelConstructor.ts#L6)
