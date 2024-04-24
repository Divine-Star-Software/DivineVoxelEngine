---
id: "Default_Builder_Builder.DVEDefaultBuilder"
title: "Class: DVEDefaultBuilder"
sidebar_label: "DVEDefaultBuilder"
custom_edit_url: null
---

[Default/Builder/Builder](../modules/Default_Builder_Builder.md).DVEDefaultBuilder

## Hierarchy

- [`DVEBuilder`](Interfaces_Builder_DVEBuilder.DVEBuilder.md)

  ↳ **`DVEDefaultBuilder`**

## Constructors

### constructor

• **new DVEDefaultBuilder**(`data`): [`DVEDefaultBuilder`](Default_Builder_Builder.DVEDefaultBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVEDefaultBuilderInitData`](../modules/Default_Builder_Builder.md#dvedefaultbuilderinitdata) |

#### Returns

[`DVEDefaultBuilder`](Default_Builder_Builder.DVEDefaultBuilder.md)

#### Overrides

[DVEBuilder](Interfaces_Builder_DVEBuilder.DVEBuilder.md).[constructor](Interfaces_Builder_DVEBuilder.DVEBuilder.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L29)

## Properties

### chunkProcessor

• **chunkProcessor**: [`ChunkProcessor`](Default_Builder_Processors_ChunkProcessor.ChunkProcessor.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L24)

___

### constructors

• **constructors**: `Object` = `VoxelConstructors`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `constructors` | [`UtilMap`](Util_UtilMap.UtilMap.md)\<`string`, [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)\> |
| `defaults` | \{ `box`: \{ `pillar`: (`id`: `string`, `textures`: [`PillarBoxVoxelConstructorData`](../modules/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata)) => [`PillarBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md) ; `simple`: (`id`: `string`, `textures`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)\>) => [`SimpleBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)  } ; `crossedPanel`: \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimpleCrossedPanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimpleCrossedPanel_constructor.SimpleCrossedPanelVoxelConstructor.md)  } ; `liquid`: \{ `simple`: (`id`: `string`, `textures`: [[`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)]) => [`SimpleLiquidConstructor`](Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)  } ; `panel`: \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimplePanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimplePanel_constructor.SimplePanelVoxelConstructor.md)  } ; `stair`: \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimpleStairVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)  }  } |
| `defaults.box` | \{ `pillar`: (`id`: `string`, `textures`: [`PillarBoxVoxelConstructorData`](../modules/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata)) => [`PillarBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md) ; `simple`: (`id`: `string`, `textures`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)\>) => [`SimpleBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)  } |
| `defaults.box.pillar` | [object Object] |
| `defaults.box.simple` | [object Object] |
| `defaults.crossedPanel` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimpleCrossedPanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimpleCrossedPanel_constructor.SimpleCrossedPanelVoxelConstructor.md)  } |
| `defaults.crossedPanel.simple` | [object Object] |
| `defaults.liquid` | \{ `simple`: (`id`: `string`, `textures`: [[`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)]) => [`SimpleLiquidConstructor`](Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)  } |
| `defaults.liquid.simple` | [object Object] |
| `defaults.panel` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimplePanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimplePanel_constructor.SimplePanelVoxelConstructor.md)  } |
| `defaults.panel.simple` | [object Object] |
| `defaults.stair` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimpleStairVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)  } |
| `defaults.stair.simple` | [object Object] |
| `get` | (`id`: `string`) => [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md) |
| `registerVoxel` | (`voxel`: [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md) \| [`VoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_VoxelConstructor.VoxelConstructor.md)[]) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L22)

___

### nodes

• **nodes**: `Object` = `NodeBuilderManager`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `builders` | `Map`\<`string`, [`NodeBuilder`](Default_Builder_Nodes_Classes_NodeBuilder.NodeBuilder.md)\> |
| `buildNode` | (`data`: [`BuildNodeMesh`](../modules/Default_Builder_Tasks_BuidlerTasks_types.md#buildnodemesh)) => ``false`` \| [[`SetNodeMesh`](../modules/Default_Builder_Tasks_BuidlerTasks_types.md#setnodemesh), `ArrayBuffer`[]] |
| `registerBuilder` | (`builder`: [`NodeBuilder`](Default_Builder_Nodes_Classes_NodeBuilder.NodeBuilder.md)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L25)

___

### observers

• **observers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `texturesRegistered` | `Observable`\<\{ `data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap) ; `textureDataHasBeenSet`: `boolean` = false; `getTextureUV`: (`data`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` ; `isReady`: () => `boolean` ; `releaseTextureData`: () => `void` ; `setTextureIndex`: (`data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap)) => `void`  }\> |

#### Inherited from

[DVEBuilder](Interfaces_Builder_DVEBuilder.DVEBuilder.md).[observers](Interfaces_Builder_DVEBuilder.DVEBuilder.md#observers)

#### Defined in

[divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Builder/DVEBuilder.ts#L6)

___

### overrides

• **overrides**: `Object` = `OverrideManager`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `overrides` | `Record`\<[`OverrideTypes`](../modules/Default_Builder_Types_Override_types.md#overridetypes), `Map`\<`string`, `Map`\<`string`, `RunOverrideFunction`\>\>\> |
| `hasOverride` | (`type`: [`OverrideTypes`](../modules/Default_Builder_Types_Override_types.md#overridetypes), `shapeId`: `string`, `neighborShapeId`: `string`) => `boolean` |
| `registerOverride` | (`type`: [`OverrideTypes`](../modules/Default_Builder_Types_Override_types.md#overridetypes), `subjectId`: `string`, `neighborShapeId`: `string`, `run`: `RunOverrideFunction`) => `void` |
| `runOverride` | (`type`: [`OverrideTypes`](../modules/Default_Builder_Types_Override_types.md#overridetypes), `firstId`: `string`, `secondOverride`: `string`, `data`: [`FaceDataOverride`](../modules/Default_Builder_Types_Override_types.md#facedataoverride)) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L26)

___

### renderedSubstances

• **renderedSubstances**: `Object` = `RenderedSubstances`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meshers` | [`UtilMap`](Util_UtilMap.UtilMap.md)\<`string`, [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)\> |
| `add` | (`id`: `string`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L27)

___

### textureManager

• **textureManager**: `Object` = `TextureRegister`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap) |
| `textureDataHasBeenSet` | `boolean` |
| `getTextureUV` | (`data`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), `overlay`: `boolean`) => `number` |
| `isReady` | () => `boolean` |
| `releaseTextureData` | () => `void` |
| `setTextureIndex` | (`data`: [`TextureTypeUVMap`](../modules/Textures_Texture_types.md#texturetypeuvmap)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L23)

___

### instance

▪ `Static` **instance**: [`DVEDefaultBuilder`](Default_Builder_Builder.DVEDefaultBuilder.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L18)

## Accessors

### defaults

• `get` **defaults**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `box` | \{ `pillar`: (`id`: `string`, `textures`: [`PillarBoxVoxelConstructorData`](../modules/Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.md#pillarboxvoxelconstructordata)) => [`PillarBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_PillarBox_constructor.PillarBoxVoxelConstructor.md) ; `simple`: (`id`: `string`, `textures`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata) \| `Record`\<`DirectionNames`, [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)\>) => [`SimpleBoxVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Box_SimpleBox_constructor.SimpleBoxVoxelConstructor.md)  } |
| `box.pillar` | [object Object] |
| `box.simple` | [object Object] |
| `crossedPanel` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimpleCrossedPanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimpleCrossedPanel_constructor.SimpleCrossedPanelVoxelConstructor.md)  } |
| `crossedPanel.simple` | [object Object] |
| `liquid` | \{ `simple`: (`id`: `string`, `textures`: [[`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata), [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)]) => [`SimpleLiquidConstructor`](Default_Builder_Constructors_Voxel_Classes_Liquid_SimpleLiquid_constructor.SimpleLiquidConstructor.md)  } |
| `liquid.simple` | [object Object] |
| `panel` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimplePanelVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Panel_SimplePanel_constructor.SimplePanelVoxelConstructor.md)  } |
| `panel.simple` | [object Object] |
| `stair` | \{ `simple`: (`id`: `string`, `texture`: [`ConstructorTextureData`](../modules/Textures_Constructor_types.md#constructortexturedata)) => [`SimpleStairVoxelConstructor`](Default_Builder_Constructors_Voxel_Classes_Stair_SimpleStair_constructor.SimpleStairVoxelConstructor.md)  } |
| `stair.simple` | [object Object] |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L19)

## Methods

### buildChunk

▸ **buildChunk**(`location`, `LOD?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `location` | `LocationData` | `undefined` |
| `LOD` | `number` | `1` |

#### Returns

`boolean`

#### Overrides

[DVEBuilder](Interfaces_Builder_DVEBuilder.DVEBuilder.md).[buildChunk](Interfaces_Builder_DVEBuilder.DVEBuilder.md#buildchunk)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L61)

___

### init

▸ **init**(): `void`

#### Returns

`void`

#### Overrides

[DVEBuilder](Interfaces_Builder_DVEBuilder.DVEBuilder.md).[init](Interfaces_Builder_DVEBuilder.DVEBuilder.md#init)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Builder.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Builder.ts#L38)
