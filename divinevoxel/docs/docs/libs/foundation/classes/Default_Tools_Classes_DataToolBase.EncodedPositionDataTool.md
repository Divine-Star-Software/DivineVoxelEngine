---
id: "Default_Tools_Classes_DataToolBase.EncodedPositionDataTool"
title: "Class: EncodedPositionDataTool"
sidebar_label: "EncodedPositionDataTool"
custom_edit_url: null
---

[Default/Tools/Classes/DataToolBase](../modules/Default_Tools_Classes_DataToolBase.md).EncodedPositionDataTool

## Hierarchy

- [`DataToolBase`](Default_Tools_Classes_DataToolBase.DataToolBase.md)

  ↳ **`EncodedPositionDataTool`**

  ↳↳ [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

  ↳↳ [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

  ↳↳ [`RegionDataTool`](Default_Tools_Data_WorldData_RegionDataTool.RegionDataTool.md)

## Constructors

### constructor

• **new EncodedPositionDataTool**(): [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Returns

[`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Overrides

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[constructor](Default_Tools_Classes_DataToolBase.DataToolBase.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:79](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L79)

## Properties

### \_c

• **\_c**: `SharedArrayBuffer` \| `ArrayBuffer` \| `DataView`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[_c](Default_Tools_Classes_DataToolBase.DataToolBase.md#_c)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L10)

___

### \_dimensionRegister

• **\_dimensionRegister**: [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[_dimensionRegister](Default_Tools_Classes_DataToolBase.DataToolBase.md#_dimensionregister)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L11)

___

### location

• **location**: `LocationData`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[location](Default_Tools_Classes_DataToolBase.DataToolBase.md#location)

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:77](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L77)

___

### tags

• **tags**: `RemoteTagManager`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[tags](Default_Tools_Classes_DataToolBase.DataToolBase.md#tags)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L9)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

DataToolBase.dimension

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

DataToolBase.dimension

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

DataToolBase.x

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

DataToolBase.x

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

DataToolBase.y

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

DataToolBase.y

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

DataToolBase.z

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

DataToolBase.z

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getArrayTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#getarraytagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L26)

___

### getAsArrayBuffer

▸ **getAsArrayBuffer**(): `ArrayBuffer`

#### Returns

`ArrayBuffer`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getAsArrayBuffer](Default_Tools_Classes_DataToolBase.DataToolBase.md#getasarraybuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L45)

___

### getBuffer

▸ **getBuffer**(): `ArrayBuffer`

#### Returns

`ArrayBuffer`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getBuffer](Default_Tools_Classes_DataToolBase.DataToolBase.md#getbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L40)

___

### getBufferSize

▸ **getBufferSize**(): `number`

#### Returns

`number`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getBufferSize](Default_Tools_Classes_DataToolBase.DataToolBase.md#getbuffersize)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L52)

___

### getDimensionId

▸ **getDimensionId**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:104](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L104)

___

### getLocation

▸ **getLocation**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getLocation](Default_Tools_Classes_DataToolBase.DataToolBase.md#getlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L39)

___

### getLocationData

▸ **getLocationData**(): `LocationData`

#### Returns

`LocationData`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L110)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#gettagvalue)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getXYZ](Default_Tools_Classes_DataToolBase.DataToolBase.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): `Vec3Array`

#### Returns

`Vec3Array`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getXYZAsArray](Default_Tools_Classes_DataToolBase.DataToolBase.md#getxyzasarray)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L43)

___

### loadIn

▸ **loadIn**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[loadIn](Default_Tools_Classes_DataToolBase.DataToolBase.md#loadin)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:56](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L56)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[loadInAt](Default_Tools_Classes_DataToolBase.DataToolBase.md#loadinat)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[loadInAtLocation](Default_Tools_Classes_DataToolBase.DataToolBase.md#loadinatlocation)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[loadInVec3](Default_Tools_Classes_DataToolBase.DataToolBase.md#loadinvec3)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[loadInVec3Array](Default_Tools_Classes_DataToolBase.DataToolBase.md#loadinvec3array)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L62)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setArrayTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#setarraytagvalue)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setBuffer](Default_Tools_Classes_DataToolBase.DataToolBase.md#setbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L35)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setDimension](Default_Tools_Classes_DataToolBase.DataToolBase.md#setdimension)

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:97](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L97)

___

### setLocation

▸ **setLocation**(`location`): [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setLocation](Default_Tools_Classes_DataToolBase.DataToolBase.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:90](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L90)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#settagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L21)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setXYZ](Default_Tools_Classes_DataToolBase.DataToolBase.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setXZ](Default_Tools_Classes_DataToolBase.DataToolBase.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)
