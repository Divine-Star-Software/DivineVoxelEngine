---
id: "Default_DataLoader_Broswer_WorldData"
title: "Module: Default/DataLoader/Broswer/WorldData"
sidebar_label: "Default/DataLoader/Broswer/WorldData"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### WorldData

• `Const` **WorldData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dataType` | [`DataLoaderSegments`](Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadersegments) |
| `columnExists` | (`location`: `LocationData`) => `Promise`\<`boolean`\> |
| `columnTimestamp` | (`location`: `LocationData`) => `Promise`\<`number`\> |
| `loadColumn` | (`location`: `LocationData`) => `Promise`\<`ArrayBufferLike`\> |
| `loadRegionHeader` | (`location`: `LocationData`) => `Promise`\<`ArrayBuffer`\> |
| `saveColumn` | (`location`: `LocationData`, `buffer`: `ArrayBuffer`) => `Promise`\<`boolean`\> |
| `setPath` | (`id`: `string`) => `Promise`\<`boolean`\> |
| `setType` | (`data`: [`DataLoaderSegments`](Contexts_DataLoader_DataHandler_DataHandlerBase.md#dataloadersegments)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Broswer/WorldData.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Broswer/WorldData.ts#L6)
