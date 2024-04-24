---
id: "Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor"
title: "Class: PillarBoxVoxelConstructor"
sidebar_label: "PillarBoxVoxelConstructor"
custom_edit_url: null
---

[Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor](../modules/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md).PillarBoxVoxelConstructor

## Hierarchy

- [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)

  ↳ **`PillarBoxVoxelConstructor`**

## Constructors

### constructor

• **new PillarBoxVoxelConstructor**(`id`, `textureData`): [`PillarBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `textureData` | [`PillarBoxVoxelConstructorData`](../modules/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata) |

#### Returns

[`PillarBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md)

#### Overrides

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[constructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts#L25)

## Properties

### id

• **id**: `string`

#### Inherited from

[VoxelConstructor](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md).[id](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md#id)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts#L26)

___

### textureData

• **textureData**: [`PillarBoxVoxelConstructorData`](../modules/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts#L27)

___

### textures

• **textures**: [top: number, bottom: number, sideMiddle: number, sideBottom: number, sideTop: number, sideFloat: number]

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts#L17)

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

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts:89](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts#L89)

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

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.ts#L31)
