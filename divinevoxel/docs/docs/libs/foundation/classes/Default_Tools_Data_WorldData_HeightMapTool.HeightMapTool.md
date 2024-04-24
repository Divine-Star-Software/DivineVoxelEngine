---
id: "Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool"
title: "Class: HeightMapTool"
sidebar_label: "HeightMapTool"
custom_edit_url: null
---

[Default/Tools/Data/WorldData/HeightMapTool](../modules/Default_Tools_Data_WorldData_HeightMapTool.md).HeightMapTool

## Hierarchy

- [`LocationBoundTool`](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md)

  ↳ **`HeightMapTool`**

## Constructors

### constructor

• **new HeightMapTool**(): [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Returns

[`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[constructor](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#constructor)

## Properties

### chunk

• **chunk**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_c` | `DataView` |
| `_y` | `number` |
| `loadInAt` | (`x`: `number`, `y`: `number`, `z`: `number`) => `undefined` \| ``false`` |
| `getMinMax` | () => `number`[] |
| `hasVoxels` | () => `boolean` |
| `isDirty` | () => `boolean` |
| `loadInAtLocation` | (`location`: `LocationData`) => `undefined` \| ``false`` |
| `setChunk` | (`chunk`: [`Chunk`](Data_World_Classes_Chunk.Chunk.md)) => `void` |
| `setDirty` | (`isDirty`: `boolean`) => `number` \| `void` |
| `setHasVoxels` | (`hasVoxels`: `boolean`) => `number` \| `void` |
| `setY` | (`y`: `number`) => \{ \_c: DataView; \_y: number; loadInAt: (x: number, y: number, z: number) =\> false \| undefined; loadInAtLocation(location: LocationData): false \| undefined; ... 6 more ...; setDirty(isDirty: boolean): number \| void; } |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/HeightMapTool.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/HeightMapTool.ts#L18)

___

### column

• **column**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getAbsolute` | (`location`: `LocationData`) => `number` |
| `getRelative` | (`location`: `LocationData`) => `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/HeightMapTool.ts:91](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/HeightMapTool.ts#L91)

___

### location

• **location**: `LocationData`

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[location](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### \_chunkTool

▪ `Static` **\_chunkTool**: [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/WorldData/HeightMapTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/WorldData/HeightMapTool.ts#L16)

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

### setDimension

▸ **setDimension**(`dimensionId`): [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setDimension](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L34)

___

### setLocation

▸ **setLocation**(`location`): [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setLocation](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXYZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Inherited from

[LocationBoundTool](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md).[setXZ](Default_Tools_Classes_LocationBoundTool.LocationBoundTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)
