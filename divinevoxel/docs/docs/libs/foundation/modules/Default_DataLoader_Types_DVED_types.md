---
id: "Default_DataLoader_Types_DVED_types"
title: "Module: Default/DataLoader/Types/DVED.types"
sidebar_label: "Default/DataLoader/Types/DVED.types"
custom_edit_url: null
---

## Type Aliases

### DVEDDataTypes

Ƭ **DVEDDataTypes**: ``"world-data"`` \| ``"rich-data"`` \| ``"entities"`` \| ``"dbo"``

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Types/DVED.types.ts:1](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Types/DVED.types.ts#L1)

___

### DVEDSyncFile

Ƭ **DVEDSyncFile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | (`byteStart`: `number`, `byteLength`: `number`) => `boolean` |
| `close` | () => `void` |
| `delete` | () => `boolean` |
| `getPath` | () => `string` |
| `getSize` | () => `number` |
| `move` | (`newPath`: `string`) => `boolean` |
| `reOpen` | () => `boolean` |
| `read` | (`byteStart`: `number`, `byteLength`: `number`) => ``false`` \| `ArrayBuffer` |
| `rename` | (`newPath`: `string`) => `boolean` |
| `write` | (`byteStart`: `number`, `data`: `ArrayBuffer`) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Types/DVED.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Types/DVED.types.ts#L3)
