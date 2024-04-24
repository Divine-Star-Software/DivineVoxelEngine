---
id: "Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool"
title: "Class: PhysicsDataTool"
sidebar_label: "PhysicsDataTool"
custom_edit_url: null
---

[Default/Physics/Tools/Data/PhysicsDataTool](../modules/Default_Physics_Tools_Data_PhysicsDataTool.md).PhysicsDataTool

## Hierarchy

- [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

  ↳ **`PhysicsDataTool`**

## Constructors

### constructor

• **new PhysicsDataTool**(): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[constructor](Default_Tools_Data_DataTool.DataTool.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L13)

## Properties

### \_\_secondary

• **\_\_secondary**: `boolean` = `false`

## secondary
If the data tool is processing secondary voxoels

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[__secondary](Default_Tools_Data_DataTool.DataTool.md#__secondary)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L65)

___

### \_c

• **\_c**: `SharedArrayBuffer` \| `ArrayBuffer` \| `DataView`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_c](Default_Tools_Data_DataTool.DataTool.md#_c)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L10)

___

### \_chunkTool

• **\_chunkTool**: [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_chunkTool](Default_Tools_Data_DataTool.DataTool.md#_chunktool)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L50)

___

### \_dimensionRegister

• **\_dimensionRegister**: [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_dimensionRegister](Default_Tools_Data_DataTool.DataTool.md#_dimensionregister)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L11)

___

### \_loadedIn

• **\_loadedIn**: `boolean` = `false`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_loadedIn](Default_Tools_Data_DataTool.DataTool.md#_loadedin)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L53)

___

### \_mode

• **\_mode**: [`DataToolModes`](../enums/Default_Tools_Data_DataTool.DataToolModes.md) = `DataToolModes.WORLD`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_mode](Default_Tools_Data_DataTool.DataTool.md#_mode)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:54](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L54)

___

### \_substanceTool

• **\_substanceTool**: [`SubstanceDataTool`](Default_Tools_Data_SubstanceDataTool.SubstanceDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_substanceTool](Default_Tools_Data_DataTool.DataTool.md#_substancetool)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:51](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L51)

___

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseId` | `number` |
| `id` | `number` |
| `raw` | `RawVoxelData` |
| `secondaryBaseId` | `number` |
| `secondaryId` | `number` |

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[data](Default_Tools_Data_DataTool.DataTool.md#data)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L55)

___

### location

• **location**: `LocationData`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[location](Default_Tools_Data_DataTool.DataTool.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### tags

• **tags**: `VDTags` = `VoxelTags`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[tags](Default_Tools_Data_DataTool.DataTool.md#tags)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L67)

___

### Modes

▪ `Static` **Modes**: typeof [`DataToolModes`](../enums/Default_Tools_Data_DataTool.DataToolModes.md) = `DataToolModes`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[Modes](Default_Tools_Data_DataTool.DataTool.md#modes)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L46)

___

### \_columntool

▪ `Static` **\_columntool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_columntool](Default_Tools_Data_DataTool.DataTool.md#_columntool)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L49)

___

### \_dtutil

▪ `Static` **\_dtutil**: [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_dtutil](Default_Tools_Data_DataTool.DataTool.md#_dtutil)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L47)

___

### \_heightMapTool

▪ `Static` **\_heightMapTool**: [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_heightMapTool](Default_Tools_Data_DataTool.DataTool.md#_heightmaptool)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L48)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

DataTool.dimension

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

DataTool.dimension

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

DataTool.x

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

DataTool.x

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

DataTool.y

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

DataTool.y

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

DataTool.z

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

DataTool.z

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L30)

## Methods

### \_\_process

▸ **__process**(): `void`

#### Returns

`void`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[__process](Default_Tools_Data_DataTool.DataTool.md#__process)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:120](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L120)

___

### \_getBaseId

▸ **_getBaseId**(`id`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[_getBaseId](Default_Tools_Data_DataTool.DataTool.md#_getbaseid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:101](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L101)

___

### checkCollisions

▸ **checkCollisions**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[checkCollisions](Default_Tools_Data_DataTool.DataTool.md#checkcollisions)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:323](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L323)

___

### clear

▸ **clear**(): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[clear](Default_Tools_Data_DataTool.DataTool.md#clear)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:74](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L74)

___

### commit

▸ **commit**(`heightMapUpdate?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `heightMapUpdate` | `number` | `0` |

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[commit](Default_Tools_Data_DataTool.DataTool.md#commit)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:159](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L159)

___

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getArrayTagValue](Default_Tools_Data_DataTool.DataTool.md#getarraytagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L26)

___

### getAsArrayBuffer

▸ **getAsArrayBuffer**(): `ArrayBuffer`

#### Returns

`ArrayBuffer`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getAsArrayBuffer](Default_Tools_Data_DataTool.DataTool.md#getasarraybuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L45)

___

### getBuffer

▸ **getBuffer**(): `ArrayBuffer`

#### Returns

`ArrayBuffer`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getBuffer](Default_Tools_Data_DataTool.DataTool.md#getbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L40)

___

### getBufferSize

▸ **getBufferSize**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getBufferSize](Default_Tools_Data_DataTool.DataTool.md#getbuffersize)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L52)

___

### getCollider

▸ **getCollider**(): `string`

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getCollider](Default_Tools_Data_DataTool.DataTool.md#getcollider)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:313](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L313)

___

### getColliderObj

▸ **getColliderObj**(): ``false`` \| [`Collider`](Default_Physics_Classes_Collider.Collider.md)

#### Returns

``false`` \| [`Collider`](Default_Physics_Classes_Collider.Collider.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Tools/Data/PhysicsDataTool.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Tools/Data/PhysicsDataTool.ts#L5)

___

### getHardness

▸ **getHardness**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getHardness](Default_Tools_Data_DataTool.DataTool.md#gethardness)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:307](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L307)

___

### getId

▸ **getId**(`base?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `base` | `boolean` | `false` |

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getId](Default_Tools_Data_DataTool.DataTool.md#getid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:369](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L369)

___

### getLevel

▸ **getLevel**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getLevel](Default_Tools_Data_DataTool.DataTool.md#getlevel)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:236](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L236)

___

### getLevelState

▸ **getLevelState**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getLevelState](Default_Tools_Data_DataTool.DataTool.md#getlevelstate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:243](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L243)

___

### getLight

▸ **getLight**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getLight](Default_Tools_Data_DataTool.DataTool.md#getlight)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:207](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L207)

___

### getLightSourceValue

▸ **getLightSourceValue**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getLightSourceValue](Default_Tools_Data_DataTool.DataTool.md#getlightsourcevalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:278](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L278)

___

### getLocation

▸ **getLocation**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getLocation](Default_Tools_Data_DataTool.DataTool.md#getlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L39)

___

### getMaterial

▸ **getMaterial**(): `string`

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getMaterial](Default_Tools_Data_DataTool.DataTool.md#getmaterial)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:297](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L297)

___

### getRaw

▸ **getRaw**(): `RawVoxelData`

#### Returns

`RawVoxelData`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getRaw](Default_Tools_Data_DataTool.DataTool.md#getraw)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L110)

___

### getShapeId

▸ **getShapeId**(): `string`

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getShapeId](Default_Tools_Data_DataTool.DataTool.md#getshapeid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:262](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L262)

___

### getShapeState

▸ **getShapeState**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getShapeState](Default_Tools_Data_DataTool.DataTool.md#getshapestate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:250](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L250)

___

### getState

▸ **getState**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getState](Default_Tools_Data_DataTool.DataTool.md#getstate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:338](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L338)

___

### getStringId

▸ **getStringId**(): `string`

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getStringId](Default_Tools_Data_DataTool.DataTool.md#getstringid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:392](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L392)

___

### getSubstance

▸ **getSubstance**(): `string`

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getSubstance](Default_Tools_Data_DataTool.DataTool.md#getsubstance)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:284](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L284)

___

### getSubstnaceData

▸ **getSubstnaceData**(): [`SubstanceDataTool`](Default_Tools_Data_SubstanceDataTool.SubstanceDataTool.md)

#### Returns

[`SubstanceDataTool`](Default_Tools_Data_SubstanceDataTool.SubstanceDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getSubstnaceData](Default_Tools_Data_DataTool.DataTool.md#getsubstnacedata)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:105](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L105)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getTagValue](Default_Tools_Data_DataTool.DataTool.md#gettagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L17)

___

### getTemplateSubstance

▸ **getTemplateSubstance**(): `string`

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getTemplateSubstance](Default_Tools_Data_DataTool.DataTool.md#gettemplatesubstance)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:331](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L331)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getXYZ](Default_Tools_Data_DataTool.DataTool.md#getxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): `Vec3Array`

#### Returns

`Vec3Array`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[getXYZAsArray](Default_Tools_Data_DataTool.DataTool.md#getxyzasarray)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L43)

___

### hasRGBLight

▸ **hasRGBLight**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[hasRGBLight](Default_Tools_Data_DataTool.DataTool.md#hasrgblight)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:197](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L197)

___

### hasSecondaryVoxel

▸ **hasSecondaryVoxel**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[hasSecondaryVoxel](Default_Tools_Data_DataTool.DataTool.md#hassecondaryvoxel)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:257](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L257)

___

### hasSunLight

▸ **hasSunLight**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[hasSunLight](Default_Tools_Data_DataTool.DataTool.md#hassunlight)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:202](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L202)

___

### isAir

▸ **isAir**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isAir](Default_Tools_Data_DataTool.DataTool.md#isair)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:357](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L357)

___

### isBarrier

▸ **isBarrier**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isBarrier](Default_Tools_Data_DataTool.DataTool.md#isbarrier)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:365](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L365)

___

### isLightSource

▸ **isLightSource**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isLightSource](Default_Tools_Data_DataTool.DataTool.md#islightsource)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:272](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L272)

___

### isOpaque

▸ **isOpaque**(): `undefined` \| ``true``

#### Returns

`undefined` \| ``true``

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isOpaque](Default_Tools_Data_DataTool.DataTool.md#isopaque)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:231](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L231)

___

### isRenderable

▸ **isRenderable**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isRenderable](Default_Tools_Data_DataTool.DataTool.md#isrenderable)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:400](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L400)

___

### isRich

▸ **isRich**(): `number`

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isRich](Default_Tools_Data_DataTool.DataTool.md#isrich)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:344](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L344)

___

### isSameVoxel

▸ **isSameVoxel**(`cx`, `cy`, `cz`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cx` | `number` |
| `cy` | `number` |
| `cz` | `number` |

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[isSameVoxel](Default_Tools_Data_DataTool.DataTool.md#issamevoxel)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:404](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L404)

___

### isSolid

▸ **isSolid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Tools/Data/PhysicsDataTool.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Tools/Data/PhysicsDataTool.ts#L10)

___

### loadIn

▸ **loadIn**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[loadIn](Default_Tools_Data_DataTool.DataTool.md#loadin)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:132](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L132)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[loadInAt](Default_Tools_Data_DataTool.DataTool.md#loadinat)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[loadInAtLocation](Default_Tools_Data_DataTool.DataTool.md#loadinatlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L70)

___

### loadInRaw

▸ **loadInRaw**(`rawData`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawData` | `RawVoxelData` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[loadInRaw](Default_Tools_Data_DataTool.DataTool.md#loadinraw)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:114](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L114)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[loadInVec3](Default_Tools_Data_DataTool.DataTool.md#loadinvec3)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[loadInVec3Array](Default_Tools_Data_DataTool.DataTool.md#loadinvec3array)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L62)

___

### setAir

▸ **setAir**(): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setAir](Default_Tools_Data_DataTool.DataTool.md#setair)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:352](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L352)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setArrayTagValue](Default_Tools_Data_DataTool.DataTool.md#setarraytagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L30)

___

### setBarrier

▸ **setBarrier**(): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setBarrier](Default_Tools_Data_DataTool.DataTool.md#setbarrier)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:360](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L360)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setBuffer](Default_Tools_Data_DataTool.DataTool.md#setbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L35)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` \| `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setDimension](Default_Tools_Data_DataTool.DataTool.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:87](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L87)

___

### setId

▸ **setId**(`id`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setId](Default_Tools_Data_DataTool.DataTool.md#setid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:377](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L377)

___

### setLevel

▸ **setLevel**(`level`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setLevel](Default_Tools_Data_DataTool.DataTool.md#setlevel)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:239](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L239)

___

### setLevelState

▸ **setLevelState**(`state`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setLevelState](Default_Tools_Data_DataTool.DataTool.md#setlevelstate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:246](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L246)

___

### setLight

▸ **setLight**(`light`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `light` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setLight](Default_Tools_Data_DataTool.DataTool.md#setlight)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:226](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L226)

___

### setLocation

▸ **setLocation**(`location`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setLocation](Default_Tools_Data_DataTool.DataTool.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setMode

▸ **setMode**(`mode`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | [`DataToolModes`](../enums/Default_Tools_Data_DataTool.DataToolModes.md) |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setMode](Default_Tools_Data_DataTool.DataTool.md#setmode)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L69)

___

### setSecondary

▸ **setSecondary**(`enable`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enable` | `boolean` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setSecondary](Default_Tools_Data_DataTool.DataTool.md#setsecondary)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:92](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L92)

___

### setShapeState

▸ **setShapeState**(`state`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setShapeState](Default_Tools_Data_DataTool.DataTool.md#setshapestate)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:253](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L253)

___

### setStringId

▸ **setStringId**(`id`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setStringId](Default_Tools_Data_DataTool.DataTool.md#setstringid)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:389](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L389)

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

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setTagValue](Default_Tools_Data_DataTool.DataTool.md#settagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L21)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setXYZ](Default_Tools_Data_DataTool.DataTool.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[setXZ](Default_Tools_Data_DataTool.DataTool.md#setxz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L60)

___

### GetVoxelIDFromNumber

▸ **GetVoxelIDFromNumber**(`id`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`string`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[GetVoxelIDFromNumber](Default_Tools_Data_DataTool.DataTool.md#getvoxelidfromnumber)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L42)

___

### GetVoxelIDFromString

▸ **GetVoxelIDFromString**(`id`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`number`

#### Inherited from

[DataTool](Default_Tools_Data_DataTool.DataTool.md).[GetVoxelIDFromString](Default_Tools_Data_DataTool.DataTool.md#getvoxelidfromstring)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L39)
