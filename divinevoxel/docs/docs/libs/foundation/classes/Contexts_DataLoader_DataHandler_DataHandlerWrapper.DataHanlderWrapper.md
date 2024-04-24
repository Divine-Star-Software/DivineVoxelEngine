---
id: "Contexts_DataLoader_DataHandler_DataHandlerWrapper.DataHanlderWrapper"
title: "Class: DataHanlderWrapper"
sidebar_label: "DataHanlderWrapper"
custom_edit_url: null
---

[Contexts/DataLoader/DataHandler/DataHandlerWrapper](../modules/Contexts_DataLoader_DataHandler_DataHandlerWrapper.md).DataHanlderWrapper

## Constructors

### constructor

• **new DataHanlderWrapper**(): [`DataHanlderWrapper`](Contexts_DataLoader_DataHandler_DataHandlerWrapper.DataHanlderWrapper.md)

#### Returns

[`DataHanlderWrapper`](Contexts_DataLoader_DataHandler_DataHandlerWrapper.DataHanlderWrapper.md)

## Properties

### columnDatatool

• **columnDatatool**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L18)

___

### handler

• **handler**: [`DataHandler`](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L20)

___

### richData

• **richData**: [`RichDataTool`](Default_Tools_Data_RichDataTool.RichDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L21)

___

### seralizer

• **seralizer**: [`WorldDataSerialize`](Contexts_DataLoader_Serializers_WorldDataSerializer.WorldDataSerialize.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L22)

___

### mode

▪ `Static` **mode**: [`DataLoaderModes`](../modules/Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadermodes) = `"indexdb"`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L19)

## Methods

### columnExists

▸ **columnExists**(`location`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:157](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L157)

___

### columnTimestamp

▸ **columnTimestamp**(`location`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:171](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L171)

___

### init

▸ **init**(`handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [`DataHandler`](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L23)

___

### loadColumn

▸ **loadColumn**(`location`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:86](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L86)

___

### loadRegionHeader

▸ **loadRegionHeader**(`location`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L28)

___

### saveColumn

▸ **saveColumn**(`location`): `Promise`\<`undefined` \| `boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`undefined` \| `boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L46)

___

### setPath

▸ **setPath**(`id`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:145](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L145)

___

### unLoadColumn

▸ **unLoadColumn**(`location`): `Promise`\<`undefined` \| ``true``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`undefined` \| ``true``\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts:120](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerWrapper.ts#L120)
