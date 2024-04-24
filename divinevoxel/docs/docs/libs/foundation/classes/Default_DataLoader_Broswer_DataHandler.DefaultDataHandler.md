---
id: "Default_DataLoader_Broswer_DataHandler.DefaultDataHandler"
title: "Class: DefaultDataHandler"
sidebar_label: "DefaultDataHandler"
custom_edit_url: null
---

[Default/DataLoader/Broswer/DataHandler](../modules/Default_DataLoader_Broswer_DataHandler.md).DefaultDataHandler

## Hierarchy

- [`DataHandler`](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md)

  ↳ **`DefaultDataHandler`**

## Constructors

### constructor

• **new DefaultDataHandler**(): [`DefaultDataHandler`](Default_DataLoader_Broswer_DataHandler.DefaultDataHandler.md)

#### Returns

[`DefaultDataHandler`](Default_DataLoader_Broswer_DataHandler.DefaultDataHandler.md)

#### Inherited from

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[constructor](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L7)

## Properties

### dataType

• **dataType**: [`DataLoaderSegments`](../modules/Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadersegments) = `"world-data"`

#### Inherited from

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[dataType](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#datatype)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L13)

___

### mode

• **mode**: ``"server"`` \| ``"indexdb"`` \| ``"both"`` = `"indexdb"`

#### Inherited from

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[mode](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#mode)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L6)

## Methods

### columnExists

▸ **columnExists**(`location`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[columnExists](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#columnexists)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L30)

___

### columnHasSegment

▸ **columnHasSegment**(`location`, `segment`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |
| `segment` | ``"rich-data"`` \| ``"dbo"`` \| ``"entities"`` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L42)

___

### columnTimestamp

▸ **columnTimestamp**(`location`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`number`\>

#### Overrides

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[columnTimestamp](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#columntimestamp)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L37)

___

### getColumn

▸ **getColumn**(`location`): `Promise`\<`ArrayBufferLike`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`ArrayBufferLike`\>

#### Overrides

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[getColumn](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#getcolumn)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L14)

___

### getRegionHeader

▸ **getRegionHeader**(`location`): `Promise`\<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`ArrayBuffer`\>

#### Overrides

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[getRegionHeader](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#getregionheader)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L9)

___

### saveColumn

▸ **saveColumn**(`location`, `buffer`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |
| `buffer` | `ArrayBuffer` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[saveColumn](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#savecolumn)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L19)

___

### setDataType

▸ **setDataType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`DataLoaderSegments`](../modules/Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadersegments) |

#### Returns

`void`

#### Inherited from

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[setDataType](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#setdatatype)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L14)

___

### setMode

▸ **setMode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | ``"server"`` \| ``"indexdb"`` \| ``"both"`` |

#### Returns

`void`

#### Inherited from

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[setMode](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#setmode)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L10)

___

### setPath

▸ **setPath**(`id`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[DataHandler](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md).[setPath](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md#setpath)

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataHandler.ts#L24)
