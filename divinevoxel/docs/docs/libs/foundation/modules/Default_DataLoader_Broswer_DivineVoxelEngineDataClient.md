---
id: "Default_DataLoader_Broswer_DivineVoxelEngineDataClient"
title: "Module: Default/DataLoader/Broswer/DivineVoxelEngineDataClient"
sidebar_label: "Default/DataLoader/Broswer/DivineVoxelEngineDataClient"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### DVEDBrowser

• `Const` **DVEDBrowser**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$INIT` | () => `Promise`\<`void`\> |
| `deleteWorldDataBase` | (`dbName`: `string`) => `Promise`\<`void`\> |
| `getWorldDataBase` | (`dbName`: `string`, `dimension`: `string`) => `Promise`\<\{ `column`: \{ `_getKey`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `string` ; `get`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `Promise`\<``false`` \| `ArrayBuffer`\> ; `set`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `data`: `ArrayBuffer`) => `Promise`\<`void`\>  } ; `columnTimestamp`: \{ `_getKey`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `string` ; `get`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `Promise`\<`number` \| ``false``\> ; `set`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `timeStamp`: `number`) => `Promise`\<`void`\>  } ; `database`: `DataBase` ; `dimension`: `string` = ""; `regionHeader`: \{ `_getKey`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `string` ; `get`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes)) => `Promise`\<``false`` \| `ArrayBuffer`\> ; `set`: (`key`: `string`, `type`: [`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `data`: `ArrayBuffer`) => `Promise`\<`void`\>  } ; `typeStores`: `Record`\<[`DVEDDataTypes`](Default_DataLoader_Types_DVED_types.md#dveddatatypes), `ObjectStore`\<`any`\>\> ; `setDataBase`: (`database`: `DataBase`) => `void` ; `setDimension`: (`dimensionId`: `string`) => `Promise`\<`void`\>  }\> |

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/DivineVoxelEngineDataClient.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/DivineVoxelEngineDataClient.ts#L4)
