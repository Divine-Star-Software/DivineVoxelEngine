---
id: "Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool"
title: "Class: ColumnDataTool"
sidebar_label: "ColumnDataTool"
custom_edit_url: null
---

[Default/Tools/Data/WorldData/ColumnDataTool](../modules/Default_Tools_Data_WorldData_ColumnDataTool.md).ColumnDataTool

## Hierarchy

- [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

  ↳ **`ColumnDataTool`**

## Constructors

### constructor

• **new ColumnDataTool**(): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[constructor](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:79](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L79)

## Properties

### \_c

• **\_c**: `SharedArrayBuffer` \| `ArrayBuffer` \| `DataView`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[_c](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#_c)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L10)

___

### \_column

• **\_column**: [`Column`](Data_World_Classes_Column.Column.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L8)

___

### \_dimensionRegister

• **\_dimensionRegister**: [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[_dimensionRegister](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#_dimensionregister)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L11)

___

### location

• **location**: `LocationData`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[location](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### position

• **position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[position](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#position)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:77](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L77)

___

### tags

• **tags**: `RemoteTagManager` = `Column.Tags`

#### Overrides

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[tags](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#tags)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L7)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

EncodedPositionDataTool.dimension

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

EncodedPositionDataTool.dimension

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

EncodedPositionDataTool.x

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

EncodedPositionDataTool.x

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

EncodedPositionDataTool.y

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

EncodedPositionDataTool.y

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

EncodedPositionDataTool.z

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

EncodedPositionDataTool.z

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L30)

## Methods

### getArrayTagValue

▸ **getArrayTagValue**(`id`, `index`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `index` | `number` |

#### Returns

`number`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getArrayTagValue](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getarraytagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L26)

___

### getAsArrayBuffer

▸ **getAsArrayBuffer**(): `ArrayBuffer`

#### Returns

`ArrayBuffer`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getAsArrayBuffer](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getasarraybuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L45)

___

### getBuffer

▸ **getBuffer**(): `ArrayBuffer`

#### Returns

`ArrayBuffer`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getBuffer](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L40)

___

### getBufferSize

▸ **getBufferSize**(): `number`

#### Returns

`number`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getBufferSize](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getbuffersize)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L52)

___

### getBufferSizeForWholeColumn

▸ **getBufferSizeForWholeColumn**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L34)

___

### getColumn

▸ **getColumn**(): [`Column`](Data_World_Classes_Column.Column.md)

#### Returns

[`Column`](Data_World_Classes_Column.Column.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L26)

___

### getDimensionId

▸ **getDimensionId**(): `string`

#### Returns

`string`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getDimensionId](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getdimensionid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:104](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L104)

___

### getLastAnalyzerUpdateTimestamp

▸ **getLastAnalyzerUpdateTimestamp**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:76](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L76)

___

### getLastSaveTimestamp

▸ **getLastSaveTimestamp**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:68](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L68)

___

### getLocation

▸ **getLocation**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getLocation](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L39)

___

### getLocationData

▸ **getLocationData**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getLocationData](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getlocationdata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L110)

___

### getNumChunks

▸ **getNumChunks**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L30)

___

### getPositionData

▸ **getPositionData**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getPositionData](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getpositiondata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:83](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L83)

___

### getTagValue

▸ **getTagValue**(`id`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`number`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getTagValue](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#gettagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L17)

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

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getXYZ](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): `Vec3Array`

#### Returns

`Vec3Array`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getXYZAsArray](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getxyzasarray)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L43)

___

### hasEntityData

▸ **hasEntityData**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:92](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L92)

___

### hasRichData

▸ **hasRichData**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:84](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L84)

___

### isDirty

▸ **isDirty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L60)

___

### isPersistent

▸ **isPersistent**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L52)

___

### isStored

▸ **isStored**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L38)

___

### loadIn

▸ **loadIn**(): `boolean`

#### Returns

`boolean`

#### Overrides

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[loadIn](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#loadin)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L10)

___

### loadInAt

▸ **loadInAt**(`x`, `y`, `z`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`boolean`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[loadInAt](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#loadinat)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:58](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L58)

___

### loadInAtLocation

▸ **loadInAtLocation**(`location`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`boolean`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[loadInAtLocation](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#loadinatlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L70)

___

### loadInVec3

▸ **loadInVec3**(`vec3`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vec3` | `Position3Matrix` |

#### Returns

`boolean`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[loadInVec3](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#loadinvec3)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L66)

___

### loadInVec3Array

▸ **loadInVec3Array**(`vec3`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vec3` | `Vec3Array` |

#### Returns

`boolean`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[loadInVec3Array](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#loadinvec3array)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L62)

___

### markAsNotStored

▸ **markAsNotStored**(): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L42)

___

### markAsStored

▸ **markAsStored**(): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L47)

___

### setArrayTagValue

▸ **setArrayTagValue**(`id`, `index`, `value`): `number` \| `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `index` | `number` |
| `value` | `number` |

#### Returns

`number` \| `void`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setArrayTagValue](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setarraytagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L30)

___

### setBuffer

▸ **setBuffer**(`buffer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` \| `DataView` |

#### Returns

`void`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setBuffer](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L35)

___

### setColumn

▸ **setColumn**(`column`): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`Column`](Data_World_Classes_Column.Column.md) |

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L19)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setDimension](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L34)

___

### setDimensionId

▸ **setDimensionId**(`dimensionId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

`void`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setDimensionId](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setdimensionid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:97](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L97)

___

### setDirty

▸ **setDirty**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:64](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L64)

___

### setEntityData

▸ **setEntityData**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L96)

___

### setLastAnalyzerUpdateTimestamp

▸ **setLastAnalyzerUpdateTimestamp**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:80](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L80)

___

### setLastSaveTimestamp

▸ **setLastSaveTimestamp**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:72](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L72)

___

### setLocation

▸ **setLocation**(`location`): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setLocation](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setPersistence

▸ **setPersistence**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:56](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L56)

___

### setPositionData

▸ **setPositionData**(`x`, `y`, `z`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setPositionData](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setpositiondata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:90](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L90)

___

### setRichData

▸ **setRichData**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ColumnDataTool.ts#L88)

___

### setTagValue

▸ **setTagValue**(`id`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | `number` |

#### Returns

`boolean`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setTagValue](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#settagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L21)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setXYZ](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setXZ](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)
