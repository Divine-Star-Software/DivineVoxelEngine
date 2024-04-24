---
id: "Default_IWG_World_Classes_Generator.Generator"
title: "Class: Generator"
sidebar_label: "Generator"
custom_edit_url: null
---

[Default/IWG/World/Classes/Generator](../modules/Default_IWG_World_Classes_Generator.md).Generator

# Infinite World Generator

## Hierarchy

- [`LocationBoundTool`](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md)

  ↳ **`Generator`**

## Constructors

### constructor

• **new Generator**(`data`): [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IWGGeneratorData`](../modules/Default_IWG_World_Types_IWG_types.md#iwggeneratordata) |

#### Returns

[`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Overrides

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[constructor](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L48)

## Properties

### \_\_build

• **\_\_build**: `boolean` = `true`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L36)

___

### \_activeColumns

• **\_activeColumns**: `Map`\<`string`, `number`[]\>

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L40)

___

### \_anaylzerDone

• **\_anaylzerDone**: `boolean` = `true`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L26)

___

### \_cachedPosition

• **\_cachedPosition**: `Vec3Array`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L35)

___

### \_searchQueue

• **\_searchQueue**: `number`[][] = `[]`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L37)

___

### \_visitedMap

• **\_visitedMap**: `Map`\<`string`, `boolean`\>

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L39)

___

### anaylzer

• **anaylzer**: [`AnaylzerTool`](Default_Tools_Anaylzer_AnaylzerTool.AnaylzerTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L27)

___

### builder

• **builder**: [`BuilderTool`](Default_Tools_Build_BuilderTool.BuilderTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L30)

___

### columnTool

• **columnTool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L28)

___

### data

• **data**: [`IWGGeneratorData`](../modules/Default_IWG_World_Types_IWG_types.md#iwggeneratordata)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L48)

___

### dataLoader

• **dataLoader**: ``null`` \| [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md) = `null`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L31)

___

### dveTasks

• **dveTasks**: [`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L33)

___

### location

• **location**: `LocationData`

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[location](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### nColumnTool

• **nColumnTool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L29)

___

### richData

• **richData**: [`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L32)

___

### tasks

• **tasks**: `Record`\<[`IWGTasksTypes`](../modules/Default_IWG_World_Types_IWG_types.md#iwgtaskstypes), `Map`\<`string`, [`IWGTasks`](Default_IWG_World_Classes_IWGTasks.IWGTasks.md)\>\>

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L42)

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

### \_logTasks

▸ **_logTasks**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:114](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L114)

___

### anaylzerUpdate

▸ **anaylzerUpdate**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:125](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L125)

___

### cancelWorldGenTasks

▸ **cancelWorldGenTasks**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:139](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L139)

___

### clearAll

▸ **clearAll**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L88)

___

### cullColumns

▸ **cullColumns**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:153](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L153)

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

### saveAllColumns

▸ **saveAllColumns**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:99](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L99)

___

### saveUpdate

▸ **saveUpdate**(`max?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `max` | `number` | `5` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L93)

___

### searchUpdate

▸ **searchUpdate**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:178](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L178)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Overrides

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setDimension](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:71](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L71)

___

### setLocation

▸ **setLocation**(`location`): [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setLocation](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXYZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)

___

### unLoadAllColumns

▸ **unLoadAllColumns**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:106](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L106)

___

### updateDimension

▸ **updateDimension**(`dimension`): [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimension` | `string` |

#### Returns

[`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:75](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L75)

___

### updateSettings

▸ **updateSettings**(`settings`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`IWGSettignsData`](../modules/Default_IWG_World_Types_IWG_types.md#iwgsettignsdata) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:145](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L145)

___

### worldGenUpdate

▸ **worldGenUpdate**(`max?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `max` | `number` | `5` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts:133](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Classes/Generator.ts#L133)
