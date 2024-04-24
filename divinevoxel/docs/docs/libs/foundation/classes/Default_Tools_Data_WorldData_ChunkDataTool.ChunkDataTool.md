---
id: "Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool"
title: "Class: ChunkDataTool"
sidebar_label: "ChunkDataTool"
custom_edit_url: null
---

[Default/Tools/Data/WorldData/ChunkDataTool](../modules/Default_Tools_Data_WorldData_ChunkDataTool.md).ChunkDataTool

## Hierarchy

- [`EncodedPositionDataTool`](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md)

  ↳ **`ChunkDataTool`**

## Constructors

### constructor

• **new ChunkDataTool**(): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Overrides

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[constructor](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts#L11)

## Properties

### \_c

• **\_c**: `SharedArrayBuffer` \| `ArrayBuffer` \| `DataView`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[_c](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#_c)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L10)

___

### \_chunk

• **\_chunk**: [`Chunk`](Data_World_Classes_Chunk.Chunk.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts#L15)

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

### segments

• **segments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | \{ `get`: (`index`: `number`) => `number` ; `set`: (`index`: `number`, `value`: `number`) => `number`  } |
| `id.get` | (`index`: `number`) => `number` |
| `id.set` | (`index`: `number`, `value`: `number`) => `number` |
| `light` | \{ `get`: (`index`: `number`) => `number` ; `set`: (`index`: `number`, `value`: `number`) => `number`  } |
| `light.get` | (`index`: `number`) => `number` |
| `light.set` | (`index`: `number`, `value`: `number`) => `number` |
| `secondaryId` | \{ `get`: (`index`: `number`) => `number` ; `set`: (`index`: `number`, `value`: `number`) => `number`  } |
| `secondaryId.get` | (`index`: `number`) => `number` |
| `secondaryId.set` | (`index`: `number`, `value`: `number`) => `number` |
| `state` | \{ `get`: (`index`: `number`) => `number` ; `set`: (`index`: `number`, `value`: `number`) => `number`  } |
| `state.get` | (`index`: `number`) => `number` |
| `state.set` | (`index`: `number`, `value`: `number`) => `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts#L35)

___

### tags

• **tags**: `RemoteTagManager` = `Chunk.Tags`

#### Overrides

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[tags](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#tags)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts#L9)

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

### getDimensionId

▸ **getDimensionId**(): `string`

#### Returns

`string`

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[getDimensionId](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#getdimensionid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:104](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L104)

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

### loadIn

▸ **loadIn**(): `boolean`

#### Returns

`boolean`

#### Overrides

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[loadIn](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#loadin)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts#L17)

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

### setChunk

▸ **setChunk**(`chunk`): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | [`Chunk`](Data_World_Classes_Chunk.Chunk.md) |

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/ChunkDataTool.ts#L28)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

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

### setLocation

▸ **setLocation**(`location`): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setLocation](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setlocation)

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

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setPositionData](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setpositiondata)

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

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setTagValue](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#settagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L21)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setXYZ](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Inherited from

[EncodedPositionDataTool](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md).[setXZ](Default_Tools_Classes_DataToolBase.EncodedPositionDataTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)
