---
id: "Default_Builder_Tools_MeshBuilderTool.QuadUVTool"
title: "Class: QuadUVTool<T>"
sidebar_label: "QuadUVTool"
custom_edit_url: null
---

[Default/Builder/Tools/MeshBuilderTool](../modules/Default_Builder_Tools_MeshBuilderTool.md).QuadUVTool

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md) |

## Constructors

### constructor

• **new QuadUVTool**\<`T`\>(`quad`, `attributeId`): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `quad` | `T` |
| `attributeId` | `string` |

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L141)

## Properties

### \_data

• **\_data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number`[] |
| `width` | `number`[] |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:125](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L125)

___

### \_fliped

• **\_fliped**: `boolean` = `false`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:129](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L129)

___

### \_rotation

• **\_rotation**: [`TextureRotations`](../modules/Default_Builder_Types_Geometry_types.md#texturerotations) = `0`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:140](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L140)

___

### advancedUVs

• **advancedUVs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `he1` | `number` |
| `he2` | `number` |
| `hs1` | `number` |
| `hs2` | `number` |
| `we1` | `number` |
| `we2` | `number` |
| `ws1` | `number` |
| `ws2` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:130](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L130)

___

### attributeId

• **attributeId**: `string`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L141)

___

### quad

• **quad**: `T`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L141)

___

### uvs

• **uvs**: `Object` = `QuadUVs`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `advancedUVs` | `Record`\<`UVFaceTypes`, (`uv`: `number`, `data`: [`AdvancedUVs`](../modules/Default_Builder_Types_Geometry_types.md#advanceduvs), `uvs`: `number`[], `flipped`: `boolean`) => `void`\> |
| `uvFunctions` | `Record`\<`DirectionNames`, (`data`: [`AddQuadUVsData`](../modules/Default_Builder_Types_Geometry_types.md#addquaduvsdata)) => `void`\> |
| `uvRotations` | `Record`\<`UVFaceTypes`, `Record`\<[`TextureRotations`](../modules/Default_Builder_Types_Geometry_types.md#texturerotations), (`uv`: `number`, `ws`: `number`, `we`: `number`, `hs`: `number`, `he`: `number`, `flipped`: `boolean`, `uvs`: `number`[]) => `void`\>\> |
| `addAdvancedUVs` | (`direction`: `DirectionNames`, `uv`: `number`, `uvs`: `number`[], `data`: [`AdvancedUVs`](../modules/Default_Builder_Types_Geometry_types.md#advanceduvs), `flipped`: `boolean`) => `void` |
| `addUVs` | (`data`: [`AddQuadUVsData`](../modules/Default_Builder_Types_Geometry_types.md#addquaduvsdata)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:124](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L124)

## Methods

### add

▸ **add**(`textureId`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `textureId` | `number` |

#### Returns

`T`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:185](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L185)

___

### addAdvancedUVs

▸ **addAdvancedUVs**(`textureId`): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `textureId` | `number` |

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:174](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L174)

___

### clear

▸ **clear**(): `T`

#### Returns

`T`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:197](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L197)

___

### resetAdvancedUVs

▸ **resetAdvancedUVs**(): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:143](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L143)

___

### setFlipped

▸ **setFlipped**(`flipped`): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `flipped` | `boolean` |

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:155](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L155)

___

### setHeight

▸ **setHeight**(`start`, `end`): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `end` | `number` |

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:164](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L164)

___

### setRoation

▸ **setRoation**(`rotation`): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | [`TextureRotations`](../modules/Default_Builder_Types_Geometry_types.md#texturerotations) |

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:169](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L169)

___

### setWidth

▸ **setWidth**(`start`, `end`): [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `end` | `number` |

#### Returns

[`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<`T`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:159](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L159)
