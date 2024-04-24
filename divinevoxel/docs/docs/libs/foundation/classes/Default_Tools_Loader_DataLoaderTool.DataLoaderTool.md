---
id: "Default_Tools_Loader_DataLoaderTool.DataLoaderTool"
title: "Class: DataLoaderTool"
sidebar_label: "DataLoaderTool"
custom_edit_url: null
---

[Default/Tools/Loader/DataLoaderTool](../modules/Default_Tools_Loader_DataLoaderTool.md).DataLoaderTool

## Hierarchy

- [`LocationBoundTool`](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md)

  ↳ **`DataLoaderTool`**

## Constructors

### constructor

• **new DataLoaderTool**(): [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Returns

[`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Overrides

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[constructor](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L27)

## Properties

### \_enabled

• **\_enabled**: `boolean` = `true`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L24)

___

### dataComm

• **dataComm**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L25)

___

### location

• **location**: `LocationData`

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[location](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### mode

• **mode**: ``"server"`` \| ``"indexdb"`` \| ``"both"`` = `"server"`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L23)

___

### columnDataTool

▪ `Static` **columnDataTool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L17)

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

### \_runTask

▸ **_runTask**(`id`, `location`, `onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `location` | `LocationData` |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L48)

___

### allColumns

▸ **allColumns**(`run`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | (`column`: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:284](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L284)

___

### columnExists

▸ **columnExists**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | (`exists`: `boolean`) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:155](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L155)

___

### columnExistsAsync

▸ **columnExistsAsync**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:195](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L195)

___

### columnTimestamp

▸ **columnTimestamp**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | (`timestamp`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:203](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L203)

___

### columnTimestampAsync

▸ **columnTimestampAsync**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:210](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L210)

___

### getAllUnStoredColumns

▸ **getAllUnStoredColumns**(`run`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | (`dimension`: `string`, `x`: `number`, `y`: `number`, `z`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:296](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L296)

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

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:54](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L54)

___

### loadColumn

▸ **loadColumn**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:132](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L132)

___

### loadColumnAsync

▸ **loadColumnAsync**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:138](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L138)

___

### loadIfExists

▸ **loadIfExists**(`onDone?`): ``false`` \| `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | (`loaded`: `boolean`) => `void` |

#### Returns

``false`` \| `void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:109](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L109)

___

### loadRegion

▸ **loadRegion**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L73)

___

### loadRegionAsync

▸ **loadRegionAsync**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:80](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L80)

___

### loadRegionHeader

▸ **loadRegionHeader**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | (`success`: `boolean`) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:175](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L175)

___

### loadRegionHeaderAsync

▸ **loadRegionHeaderAsync**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:187](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L187)

___

### saveColumn

▸ **saveColumn**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L88)

___

### saveColumnAsync

▸ **saveColumnAsync**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:124](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L124)

___

### saveColumnIfNotStored

▸ **saveColumnIfNotStored**(`onDone?`): `boolean` \| `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | (`saved`: `boolean`) => `void` |

#### Returns

`boolean` \| `void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:95](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L95)

___

### saveRegion

▸ **saveRegion**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:58](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L58)

___

### saveRegionAsync

▸ **saveRegionAsync**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L65)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setDimension](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L34)

___

### setLocation

▸ **setLocation**(`location`): [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setLocation](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXYZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`DataLoaderTool`](Default_Tools_Loader_DataLoaderTool.DataLoaderTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)

___

### unLoadAllColumns

▸ **unLoadAllColumns**(`onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:258](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L258)

___

### unLoadAllColumnsAsync

▸ **unLoadAllColumnsAsync**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:251](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L251)

___

### unLoadAllOutsideRadius

▸ **unLoadAllOutsideRadius**(`radius`, `run?`, `onDone?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `radius` | `number` |
| `run` | (`column`: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)) => `boolean` |
| `onDone?` | `Function` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:218](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L218)

___

### unLoadColumn

▸ **unLoadColumn**(`onDone`): ``false`` \| `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onDone` | (`done`: `boolean`) => `void` |

#### Returns

``false`` \| `void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:146](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L146)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/DataLoaderTool.ts#L18)
