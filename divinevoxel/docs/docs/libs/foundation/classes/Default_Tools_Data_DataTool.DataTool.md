---
id: "Default_Tools_Data_DataTool.DataTool"
title: "Class: DataTool"
sidebar_label: "DataTool"
custom_edit_url: null
---

[Default/Tools/Data/DataTool](../modules/Default_Tools_Data_DataTool.md).DataTool

## Hierarchy

- [`DataToolBase`](Default_Tools_Classes_DataToolBase.DataToolBase.md)

  ↳ **`DataTool`**

  ↳↳ [`BuilderDataTool`](Default_Builder_Tools_BuilderDataTool.BuilderDataTool.md)

  ↳↳ [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

## Constructors

### constructor

• **new DataTool**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[constructor](Default_Tools_Classes_DataToolBase.DataToolBase.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L13)

## Properties

### \_\_secondary

• **\_\_secondary**: `boolean` = `false`

## secondary
If the data tool is processing secondary voxoels

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L65)

___

### \_c

• **\_c**: `SharedArrayBuffer` \| `ArrayBuffer` \| `DataView`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[_c](Default_Tools_Classes_DataToolBase.DataToolBase.md#_c)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L10)

___

### \_chunkTool

• **\_chunkTool**: [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L50)

___

### \_dimensionRegister

• **\_dimensionRegister**: [`DimensionsRegister`](Data_World_DimensionsRegister.DimensionsRegister.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[_dimensionRegister](Default_Tools_Classes_DataToolBase.DataToolBase.md#_dimensionregister)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L11)

___

### \_loadedIn

• **\_loadedIn**: `boolean` = `false`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L53)

___

### \_mode

• **\_mode**: [`DataToolModes`](../enums/Default_Tools_Data_DataTool.DataToolModes.md) = `DataToolModes.WORLD`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:54](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L54)

___

### \_substanceTool

• **\_substanceTool**: [`SubstanceDataTool`](Default_Tools_Data_SubstanceDataTool.SubstanceDataTool.md)

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L55)

___

### location

• **location**: `LocationData`

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[location](Default_Tools_Classes_DataToolBase.DataToolBase.md#location)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L4)

___

### tags

• **tags**: `VDTags` = `VoxelTags`

#### Overrides

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[tags](Default_Tools_Classes_DataToolBase.DataToolBase.md#tags)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L67)

___

### Modes

▪ `Static` **Modes**: typeof [`DataToolModes`](../enums/Default_Tools_Data_DataTool.DataToolModes.md) = `DataToolModes`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L46)

___

### \_columntool

▪ `Static` **\_columntool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L49)

___

### \_dtutil

▪ `Static` **\_dtutil**: [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L47)

___

### \_heightMapTool

▪ `Static` **\_heightMapTool**: [`HeightMapTool`](Default_Tools_Data_WorldData_HeightMapTool.HeightMapTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L48)

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

### \_\_process

▸ **__process**(): `void`

#### Returns

`void`

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:101](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L101)

___

### checkCollisions

▸ **checkCollisions**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:323](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L323)

___

### clear

▸ **clear**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

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

### getCollider

▸ **getCollider**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:313](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L313)

___

### getHardness

▸ **getHardness**(): `number`

#### Returns

`number`

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:369](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L369)

___

### getLevel

▸ **getLevel**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:236](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L236)

___

### getLevelState

▸ **getLevelState**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:243](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L243)

___

### getLight

▸ **getLight**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:207](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L207)

___

### getLightSourceValue

▸ **getLightSourceValue**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:278](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L278)

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

### getMaterial

▸ **getMaterial**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:297](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L297)

___

### getRaw

▸ **getRaw**(): `RawVoxelData`

#### Returns

`RawVoxelData`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L110)

___

### getShapeId

▸ **getShapeId**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:262](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L262)

___

### getShapeState

▸ **getShapeState**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:250](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L250)

___

### getState

▸ **getState**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:338](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L338)

___

### getStringId

▸ **getStringId**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:392](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L392)

___

### getSubstance

▸ **getSubstance**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:284](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L284)

___

### getSubstnaceData

▸ **getSubstnaceData**(): [`SubstanceDataTool`](Default_Tools_Data_SubstanceDataTool.SubstanceDataTool.md)

#### Returns

[`SubstanceDataTool`](Default_Tools_Data_SubstanceDataTool.SubstanceDataTool.md)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[getTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#gettagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L17)

___

### getTemplateSubstance

▸ **getTemplateSubstance**(): `string`

#### Returns

`string`

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

### hasRGBLight

▸ **hasRGBLight**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:197](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L197)

___

### hasSecondaryVoxel

▸ **hasSecondaryVoxel**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:257](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L257)

___

### hasSunLight

▸ **hasSunLight**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:202](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L202)

___

### isAir

▸ **isAir**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:357](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L357)

___

### isBarrier

▸ **isBarrier**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:365](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L365)

___

### isLightSource

▸ **isLightSource**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:272](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L272)

___

### isOpaque

▸ **isOpaque**(): `undefined` \| ``true``

#### Returns

`undefined` \| ``true``

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:231](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L231)

___

### isRenderable

▸ **isRenderable**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:400](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L400)

___

### isRich

▸ **isRich**(): `number`

#### Returns

`number`

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:404](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L404)

___

### loadIn

▸ **loadIn**(): `boolean`

#### Returns

`boolean`

#### Overrides

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[loadIn](Default_Tools_Classes_DataToolBase.DataToolBase.md#loadin)

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

### loadInRaw

▸ **loadInRaw**(`rawData`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawData` | `RawVoxelData` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

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

### setAir

▸ **setAir**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setArrayTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#setarraytagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L30)

___

### setBarrier

▸ **setBarrier**(): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setBuffer](Default_Tools_Classes_DataToolBase.DataToolBase.md#setbuffer)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L35)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` \| `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Overrides

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setDimension](Default_Tools_Classes_DataToolBase.DataToolBase.md#setdimension)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:87](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L87)

___

### setId

▸ **setId**(`id`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:377](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L377)

___

### setLevel

▸ **setLevel**(`level`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:239](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L239)

___

### setLevelState

▸ **setLevelState**(`state`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:246](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L246)

___

### setLight

▸ **setLight**(`light`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `light` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:226](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L226)

___

### setLocation

▸ **setLocation**(`location`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setLocation](Default_Tools_Classes_DataToolBase.DataToolBase.md#setlocation)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L65)

___

### setMode

▸ **setMode**(`mode`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | [`DataToolModes`](../enums/Default_Tools_Data_DataTool.DataToolModes.md) |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L69)

___

### setSecondary

▸ **setSecondary**(`enable`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enable` | `boolean` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:92](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L92)

___

### setShapeState

▸ **setShapeState**(`state`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:253](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L253)

___

### setStringId

▸ **setStringId**(`id`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

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

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setTagValue](Default_Tools_Classes_DataToolBase.DataToolBase.md#settagvalue)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/DataToolBase.ts#L21)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setXYZ](Default_Tools_Classes_DataToolBase.DataToolBase.md#setxyz)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Classes/LocationBoundTool.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`DataTool`](Default_Tools_Data_DataTool.DataTool.md)

#### Inherited from

[DataToolBase](Default_Tools_Classes_DataToolBase.DataToolBase.md).[setXZ](Default_Tools_Classes_DataToolBase.DataToolBase.md#setxz)

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

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Data/DataTool.ts#L39)
