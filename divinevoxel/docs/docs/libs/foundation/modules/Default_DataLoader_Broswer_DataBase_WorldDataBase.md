---
id: "Default_DataLoader_Broswer_DataBase_WorldDataBase"
title: "Module: Default/DataLoader/Broswer/DataBase/WorldDataBase"
sidebar_label: "Default/DataLoader/Broswer/DataBase/WorldDataBase"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### WorldDataBase

• `Const` **WorldDataBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `column` | \{ `_getKey`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `string` ; `get`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `Promise`\<``false`` \| `ArrayBuffer`\> ; `set`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `data`: `ArrayBuffer`) => `Promise`\<`void`\>  } |
| `column._getKey` | [object Object] |
| `column.get` | [object Object] |
| `column.set` | [object Object] |
| `columnTimestamp` | \{ `_getKey`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `string` ; `get`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `Promise`\<`number` \| ``false``\> ; `set`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `timeStamp`: `number`) => `Promise`\<`void`\>  } |
| `columnTimestamp._getKey` | [object Object] |
| `columnTimestamp.get` | [object Object] |
| `columnTimestamp.set` | [object Object] |
| `database` | `DataBase` |
| `dimension` | `string` |
| `regionHeader` | \{ `_getKey`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `string` ; `get`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `Promise`\<``false`` \| `ArrayBuffer`\> ; `set`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `data`: `ArrayBuffer`) => `Promise`\<`void`\>  } |
| `regionHeader._getKey` | [object Object] |
| `regionHeader.get` | [object Object] |
| `regionHeader.set` | [object Object] |
| `typeStores` | `Record`\<[`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `ObjectStore`\<`any`\>\> |
| `setDataBase` | (`database`: `DataBase`) => `void` |
| `setDimension` | (`dimensionId`: `string`) => `Promise`\<`void`\> |

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DataBase/WorldDataBase.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DataBase/WorldDataBase.ts#L4)
