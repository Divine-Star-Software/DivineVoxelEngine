---
id: "Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool"
title: "Class: QuadBuilderTool"
sidebar_label: "QuadBuilderTool"
custom_edit_url: null
---

[Default/Builder/Tools/MeshBuilderTool](../modules/Default_Builder_Tools_MeshBuilderTool.md).QuadBuilderTool

## Constructors

### constructor

• **new QuadBuilderTool**(): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

## Properties

### \_cachedPosition

• **\_cachedPosition**: `Position3Matrix`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L39)

___

### \_dimension

• **\_dimension**: `Dimension2Matrix`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L40)

___

### \_direction

• **\_direction**: `DirectionNames` = `"top"`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L37)

___

### \_fliped

• **\_fliped**: `boolean` = `false`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L36)

___

### \_position

• **\_position**: `Position3Matrix`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L38)

___

### \_transform

• **\_transform**: [`QuadTransforms`](../modules/Default_Builder_Types_Geometry_types.md#quadtransforms)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L41)

___

### builder

• **builder**: `Object` = `QuadBuilder`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultTransform` | [`QuadTransforms`](../modules/Default_Builder_Types_Geometry_types.md#quadtransforms) |
| `faceFunctions` | `Record`\<`DirectionNames`, (`origin`: `Position3Matrix`, `tool`: `MesherDataTool`, `transform`: [`QuadTransforms`](../modules/Default_Builder_Types_Geometry_types.md#quadtransforms), `flip?`: `boolean`) => `void`\> |
| `height` | `number` |
| `width` | `number` |
| `create` | (`tool`: `MesherDataTool`, `direction`: `DirectionNames`, `origin`: `Position3Matrix`, `dimensions`: [`QuadDimensions`](../modules/Default_Builder_Types_Geometry_types.md#quaddimensions), `flip`: `boolean`, `transform?`: [`QuadTransforms`](../modules/Default_Builder_Types_Geometry_types.md#quadtransforms)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L29)

___

### tool

• **tool**: `MesherDataTool`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L28)

___

### uvs

• **uvs**: [`QuadUVTool`](Default_Builder_Tools_MeshBuilderTool.QuadUVTool.md)\<[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L30)

## Methods

### clear

▸ **clear**(): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:107](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L107)

___

### clearTransform

▸ **clearTransform**(): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:80](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L80)

___

### create

▸ **create**(): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L96)

___

### setDimensions

▸ **setDimensions**(`width`, `height`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L47)

___

### setDirection

▸ **setDirection**(`direction`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `DirectionNames` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:91](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L91)

___

### setFlipped

▸ **setFlipped**(`flipped`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `flipped` | `boolean` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:87](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L87)

___

### setMesherTool

▸ **setMesherTool**(`tool`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tool` | `MesherDataTool` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L32)

___

### setPosition

▸ **setPosition**(`x?`, `y?`, `z?`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L52)

___

### setTransform

▸ **setTransform**(`vertex`, `x?`, `y?`, `z?`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `vertex` | [`QuadVertexes`](../modules/Default_Builder_Types_Geometry_types.md#quadvertexes) | `undefined` |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L73)

___

### updatePosition

▸ **updatePosition**(`x?`, `y?`, `z?`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L61)

___

### updatePositionInPlace

▸ **updatePositionInPlace**(`x?`, `y?`, `z?`): [`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |

#### Returns

[`QuadBuilderTool`](Default_Builder_Tools_MeshBuilderTool.QuadBuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/MeshBuilderTool.ts#L67)
