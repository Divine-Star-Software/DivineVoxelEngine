---
id: "Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush"
title: "Class: WorldGenBrush"
sidebar_label: "WorldGenBrush"
custom_edit_url: null
---

[Contexts/Constructor/Tools/WorldGenBrush](../modules/Contexts_Constructor_Tools_WorldGenBrush.md).WorldGenBrush

## Hierarchy

- [`BrushTool`](Default_Tools_Brush_Brush.BrushTool.md)

  ↳ **`WorldGenBrush`**

## Constructors

### constructor

• **new WorldGenBrush**(): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Overrides

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[constructor](Default_Tools_Brush_Brush.BrushTool.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L15)

## Properties

### \_dt

• **\_dt**: [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[_dt](Default_Tools_Brush_Brush.BrushTool.md#_dt)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L22)

___

### \_update

• **\_update**: `boolean` = `true`

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[_update](Default_Tools_Brush_Brush.BrushTool.md#_update)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L19)

___

### \_worldPainter

• **\_worldPainter**: [`WorldPainter`](Data_World_WorldPainter.WorldPainter.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[_worldPainter](Default_Tools_Brush_Brush.BrushTool.md#_worldpainter)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L20)

___

### data

• **data**: [`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[data](Default_Tools_Brush_Brush.BrushTool.md#data)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L9)

___

### location

• **location**: `LocationData`

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[location](Default_Tools_Brush_Brush.BrushTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### requestsId

• **requestsId**: ``""``

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L18)

___

### richData

• **richData**: [`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L22)

___

### tasks

• **tasks**: `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L20)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

BrushTool.dimension

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

BrushTool.dimension

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

BrushTool.x

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

BrushTool.x

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

BrushTool.y

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

BrushTool.y

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

BrushTool.z

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

BrushTool.z

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L30)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[clear](Default_Tools_Brush_Brush.BrushTool.md#clear)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:71](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L71)

___

### erase

▸ **erase**(): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[erase](Default_Tools_Brush_Brush.BrushTool.md#erase)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:128](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L128)

___

### erease

▸ **erease**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L48)

___

### getData

▸ **getData**(): [`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)

#### Returns

[`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[getData](Default_Tools_Brush_Brush.BrushTool.md#getdata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:119](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L119)

___

### getLocation

▸ **getLocation**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[getLocation](Default_Tools_Brush_Brush.BrushTool.md#getlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L39)

___

### getRaw

▸ **getRaw**(): `RawVoxelData`

#### Returns

`RawVoxelData`

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[getRaw](Default_Tools_Brush_Brush.BrushTool.md#getraw)

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

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[getXYZ](Default_Tools_Brush_Brush.BrushTool.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): `Vec3Array`

#### Returns

`Vec3Array`

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[getXYZAsArray](Default_Tools_Brush_Brush.BrushTool.md#getxyzasarray)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L43)

___

### paint

▸ **paint**(): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Overrides

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[paint](Default_Tools_Brush_Brush.BrushTool.md#paint)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L24)

___

### runUpdates

▸ **runUpdates**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L69)

___

### setData

▸ **setData**(`data`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`\<[`AddVoxelData`](../modules/Data_Types_WorldData_types.md#addvoxeldata)\> |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setData](Default_Tools_Brush_Brush.BrushTool.md#setdata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L24)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setDimension](Default_Tools_Brush_Brush.BrushTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L40)

___

### setId

▸ **setId**(`id`, `state?`, `shapeState?`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `state` | `number` | `0` |
| `shapeState` | `number` | `0` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setId](Default_Tools_Brush_Brush.BrushTool.md#setid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L33)

___

### setLevel

▸ **setLevel**(`level`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setLevel](Default_Tools_Brush_Brush.BrushTool.md#setlevel)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L62)

___

### setLevelState

▸ **setLevelState**(`levelState`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `levelState` | `number` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setLevelState](Default_Tools_Brush_Brush.BrushTool.md#setlevelstate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L67)

___

### setLocation

▸ **setLocation**(`location`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setLocation](Default_Tools_Brush_Brush.BrushTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setRaw

▸ **setRaw**(`data`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `RawVoxelData` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setRaw](Default_Tools_Brush_Brush.BrushTool.md#setraw)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:84](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L84)

___

### setSecondaryId

▸ **setSecondaryId**(`id`, `state?`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `state` | `number` | `0` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setSecondaryId](Default_Tools_Brush_Brush.BrushTool.md#setsecondaryid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L46)

___

### setShapeState

▸ **setShapeState**(`state`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setShapeState](Default_Tools_Brush_Brush.BrushTool.md#setshapestate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L57)

___

### setState

▸ **setState**(`state`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setState](Default_Tools_Brush_Brush.BrushTool.md#setstate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L52)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setXYZ](Default_Tools_Brush_Brush.BrushTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[setXZ](Default_Tools_Brush_Brush.BrushTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)

___

### start

▸ **start**(): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[start](Default_Tools_Brush_Brush.BrushTool.md#start)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:133](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L133)

___

### stop

▸ **stop**(): [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Returns

[`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md)

#### Inherited from

[BrushTool](Default_Tools_Brush_Brush.BrushTool.md).[stop](Default_Tools_Brush_Brush.BrushTool.md#stop)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts:138](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Brush/Brush.ts#L138)

___

### worldAlloc

▸ **worldAlloc**(`start`, `end`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `Vec3Array` |
| `end` | `Vec3Array` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:75](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L75)

___

### worldDealloc

▸ **worldDealloc**(`start`, `end`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `Vec3Array` |
| `end` | `Vec3Array` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tools/WorldGenBrush.ts#L88)
