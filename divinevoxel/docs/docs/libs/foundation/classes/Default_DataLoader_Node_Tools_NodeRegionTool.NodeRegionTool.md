---
id: "Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool"
title: "Class: NodeRegionTool"
sidebar_label: "NodeRegionTool"
custom_edit_url: null
---

[Default/DataLoader/Node/Tools/NodeRegionTool](../modules/Default_DataLoader_Node_Tools_NodeRegionTool.md).NodeRegionTool

## Constructors

### constructor

• **new NodeRegionTool**(): [`NodeRegionTool`](Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md)

#### Returns

[`NodeRegionTool`](Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md)

## Properties

### dataType

• **dataType**: [`DVEDDataTypes`](../modules/Default_DataLoader_Types_DVED_types.md#dveddatatypes) = `"world-data"`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L16)

___

### dimension

• **dimension**: `string` = `""`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L12)

___

### fileName

• **fileName**: `string` = `""`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L15)

___

### location

• **location**: `LocationData`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L11)

___

### path

• **path**: `string` = `""`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L14)

___

### previousDimension

• **previousDimension**: `string` = `""`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L13)

## Methods

### \_dimensionPath

▸ **_dimensionPath**(`dataPath?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dataPath` | `string` | `""` |

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L50)

___

### \_getDataPath

▸ **_getDataPath**(`dataType`, `fileName?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dataType` | [`DVEDDataTypes`](../modules/Default_DataLoader_Types_DVED_types.md#dveddatatypes) | `undefined` |
| `fileName` | `string` | `""` |

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:54](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L54)

___

### \_getSwapPath

▸ **_getSwapPath**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L46)

___

### \_setFileName

▸ **_setFileName**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:58](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L58)

___

### copyToNewfile

▸ **copyToNewfile**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:94](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L94)

___

### createRegion

▸ **createRegion**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:75](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L75)

___

### getAllColumns

▸ **getAllColumns**(): ``false`` \| `IterableIterator`\<[`number`, `ArrayBuffer`]\>

#### Returns

``false`` \| `IterableIterator`\<[`number`, `ArrayBuffer`]\>

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L88)

___

### getColumnDataLength

▸ **getColumnDataLength**(): `number` \| ``false``

#### Returns

`number` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:129](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L129)

___

### getColumnTimestamp

▸ **getColumnTimestamp**(): `number` \| ``false``

#### Returns

`number` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:107](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L107)

___

### getCurrentPath

▸ **getCurrentPath**(): `string`

#### Returns

`string`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L42)

___

### getHeader

▸ **getHeader**(): ``false`` \| `ArrayBuffer`

#### Returns

``false`` \| `ArrayBuffer`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:140](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L140)

___

### getSectorIndex

▸ **getSectorIndex**(): `number` \| ``false``

#### Returns

`number` \| ``false``

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:118](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L118)

___

### loadColumn

▸ **loadColumn**(): ``false`` \| `ArrayBuffer`

#### Returns

``false`` \| `ArrayBuffer`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:151](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L151)

___

### regionExists

▸ **regionExists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L69)

___

### regionHasColumn

▸ **regionHasColumn**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:82](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L82)

___

### saveColumn

▸ **saveColumn**(`buffer`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `string` \| `ArrayBuffer` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:159](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L159)

___

### setDataType

▸ **setDataType**(`dataTypes`): [`NodeRegionTool`](Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataTypes` | [`DVEDDataTypes`](../modules/Default_DataLoader_Types_DVED_types.md#dveddatatypes) |

#### Returns

[`NodeRegionTool`](Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L18)

___

### setLocation

▸ **setLocation**(`location`): [`NodeRegionTool`](Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`NodeRegionTool`](Default_DataLoader_Node_Tools_NodeRegionTool.NodeRegionTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/Tools/NodeRegionTool.ts#L24)
