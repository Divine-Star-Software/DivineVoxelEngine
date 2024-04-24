---
id: "Default_Tools_Brush_Brush.BrushTool"
title: "Class: BrushTool"
sidebar_label: "BrushTool"
custom_edit_url: null
---

[Default/Tools/Brush/Brush](../modules/Default_Tools_Brush_Brush.md).BrushTool

## Hierarchy

- [`LocationBoundTool`](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md)

  ↳ **`BrushTool`**

  ↳↳ [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

  ↳↳ [`AdvancedBrush`](Default_Tools_Brush_AdvancedBrushTool.AdvancedBrush.md)

## Constructors

### constructor

• **new BrushTool**(): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[constructor](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#constructor)

## Properties

### \_dt

• **\_dt**: [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L22)

___

### \_update

• **\_update**: `boolean` = `true`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L19)

___

### \_worldPainter

• **\_worldPainter**: [`WorldPainter`](Data_World_WorldPainter.WorldPainter.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L20)

___

### data

• **data**: [`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L9)

___

### location

• **location**: `LocationData`

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[location](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

LocationBoundTool.dimension

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L6)

• `set` **dimension**(`dimension`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimension` | `string` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.dimension

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundTool.x

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L13)

• `set` **x**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.x

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundTool.y

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L20)

• `set` **y**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.y

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundTool.z

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L27)

• `set` **z**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.z

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L30)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:71](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L71)

___

### erase

▸ **erase**(): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:128](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L128)

___

### getData

▸ **getData**(): [`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)

#### Returns

[`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:119](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L119)

___

### getLocation

▸ **getLocation**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[getLocation](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#getlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L39)

___

### getRaw

▸ **getRaw**(): `RawVoxelData`

#### Returns

`RawVoxelData`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:98](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L98)

___

### getXYZ

▸ **getXYZ**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[getXYZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): `Vec3Array`

#### Returns

`Vec3Array`

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[getXYZAsArray](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#getxyzasarray)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L43)

___

### paint

▸ **paint**(): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:123](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L123)

___

### setData

▸ **setData**(`data`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`\<[`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)\> |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L24)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Overrides

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setDimension](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L40)

___

### setId

▸ **setId**(`id`, `state?`, `shapeState?`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `state` | `number` | `0` |
| `shapeState` | `number` | `0` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L33)

___

### setLevel

▸ **setLevel**(`level`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L62)

___

### setLevelState

▸ **setLevelState**(`levelState`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `levelState` | `number` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L67)

___

### setLocation

▸ **setLocation**(`location`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setLocation](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setRaw

▸ **setRaw**(`data`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `RawVoxelData` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:84](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L84)

___

### setSecondaryId

▸ **setSecondaryId**(`id`, `state?`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `state` | `number` | `0` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L46)

___

### setShapeState

▸ **setShapeState**(`state`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L57)

___

### setState

▸ **setState**(`state`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L52)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXYZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)

___

### start

▸ **start**(): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:133](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L133)

___

### stop

▸ **stop**(): [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Returns

[`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:138](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L138)
