---
id: "Default_Builder_Constructors_Voxel_VoxelConstructors"
title: "Module: Default/Builder/Constructors/Voxel/VoxelConstructors"
sidebar_label: "Default/Builder/Constructors/Voxel/VoxelConstructors"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### VoxelConstructors

• `Const` **VoxelConstructors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `constructors` | [`UtilMap`](../classes/Util_UtilMap.UtilMap.md)\<`string`, [`VoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)\> |
| `defaults` | \{ `box`: \{ `pillar`: (`id`: `string`, `textures`: [`PillarBoxVoxelConstructorData`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata)) => [`PillarBoxVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md) ; `simple`: (`id`: `string`, `textures`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)\>) => [`SimpleBoxVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)  } ; `crossedPanel`: \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => [`SimpleCrossedPanelVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Panel_SimpleCrossedPanel_constructor.SimpleCrossedPanelVoxelConstructor.md)  } ; `liquid`: \{ `simple`: (`id`: `string`, `textures`: [[`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)]) => [`SimpleLiquidConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)  } ; `panel`: \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => [`SimplePanelVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Panel_SimplePanel_constructor.SimplePanelVoxelConstructor.md)  } ; `stair`: \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => [`SimpleStairVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)  }  } |
| `defaults.box` | \{ `pillar`: (`id`: `string`, `textures`: [`PillarBoxVoxelConstructorData`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata)) => [`PillarBoxVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md) ; `simple`: (`id`: `string`, `textures`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)\>) => [`SimpleBoxVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)  } |
| `defaults.box.pillar` | [object Object] |
| `defaults.box.simple` | [object Object] |
| `defaults.crossedPanel` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => [`SimpleCrossedPanelVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Panel_SimpleCrossedPanel_constructor.SimpleCrossedPanelVoxelConstructor.md)  } |
| `defaults.crossedPanel.simple` | [object Object] |
| `defaults.liquid` | \{ `simple`: (`id`: `string`, `textures`: [[`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)]) => [`SimpleLiquidConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)  } |
| `defaults.liquid.simple` | [object Object] |
| `defaults.panel` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => [`SimplePanelVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Panel_SimplePanel_constructor.SimplePanelVoxelConstructor.md)  } |
| `defaults.panel.simple` | [object Object] |
| `defaults.stair` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata)) => [`SimpleStairVoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)  } |
| `defaults.stair.simple` | [object Object] |
| `get` | (`id`: `string`) => [`VoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md) |
| `registerVoxel` | (`voxel`: [`VoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md) \| [`VoxelConstructor`](../classes/Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)[]) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/VoxelConstructors.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Constructors/Voxel/VoxelConstructors.ts#L20)
