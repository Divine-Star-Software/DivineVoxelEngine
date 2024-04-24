---
id: "Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler"
title: "Class: DataHandler"
sidebar_label: "DataHandler"
custom_edit_url: null
---

[Contexts/DataLoader/DataHandler/DataHandlerBase](../modules/Contexts_DataLoader_DataHandler_DataHandlerBase.md).DataHandler

## Hierarchy

- **`DataHandler`**

  ↳ [`DefaultDataHandler`](Default_DataLoader_Broswer_DataHandler.DefaultDataHandler.md)

## Constructors

### constructor

• **new DataHandler**(): [`DataHandler`](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md)

#### Returns

[`DataHandler`](Contexts_DataLoader_DataHandler_DataHandlerBase.DataHandler.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L7)

## Properties

### dataType

• **dataType**: [`DataLoaderSegments`](../modules/Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadersegments) = `"world-data"`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L13)

___

### mode

• **mode**: ``"server"`` \| ``"indexdb"`` \| ``"both"`` = `"indexdb"`

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

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L27)

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

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L28)

___

### getColumn

▸ **getColumn**(`location`): `Promise`\<`SharedArrayBuffer` \| `ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`SharedArrayBuffer` \| `ArrayBuffer`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L20)

___

### getRegionHeader

▸ **getRegionHeader**(`location`): `Promise`\<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`Promise`\<`ArrayBuffer`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L18)

___

### saveColumn

▸ **saveColumn**(`location`, `columnBuffer`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |
| `columnBuffer` | `SharedArrayBuffer` \| `ArrayBuffer` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L23)

___

### setDataType

▸ **setDataType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`DataLoaderSegments`](../modules/Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadersegments) |

#### Returns

`void`

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

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/DataHandler/DataHandlerBase.ts#L19)
