---
id: "Default_DataLoader_Node_System_RegionSystem"
title: "Module: Default/DataLoader/Node/System/RegionSystem"
sidebar_label: "Default/DataLoader/Node/System/RegionSystem"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### RegionSystem

• `Const` **RegionSystem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columnLength` | \{ `get`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number`) => `number` \| ``false`` ; `set`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number`, `length`: `number`) => `boolean`  } |
| `columnLength.get` | [object Object] |
| `columnLength.set` | [object Object] |
| `sectorIndex` | \{ `get`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number`) => `number` \| ``false`` ; `set`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number`, `sectorIndex`: `number`) => `boolean`  } |
| `sectorIndex.get` | [object Object] |
| `sectorIndex.set` | [object Object] |
| `sectors` | \{ `get`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `sectorIndex`: `number`, `length`: `number`) => ``false`` \| `ArrayBuffer` ; `set`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `sectorIndex`: `number`, `data`: `ArrayBuffer`) => `boolean`  } |
| `sectors.get` | [object Object] |
| `sectors.set` | [object Object] |
| `timeStamp` | \{ `get`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number`) => `number` \| ``false`` ; `set`: (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number`, `timeStamp`: `number`) => `boolean`  } |
| `timeStamp.get` | [object Object] |
| `timeStamp.set` | [object Object] |
| `_getAllColumns` | (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile)) => `IterableIterator`\<[`number`, `ArrayBuffer`]\> |
| `_getIndex` | (`index`: `number` \| `LocationData`) => `number` |
| `_getTagIndex` | (`id`: `string`, `index`: `number`) => `number` |
| `_processInput` | (`buffer`: `string` \| `ArrayBuffer`) => `ArrayBufferLike` |
| `_rebuild` | (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `swapFile`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `newColumnIndex`: `number`, `newColumnData`: `ArrayBuffer`) => `void` |
| `getHeader` | (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile)) => ``false`` \| `ArrayBuffer` |
| `loadColumn` | (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number` \| `LocationData`) => ``false`` \| `ArrayBuffer` |
| `saveColumn` | (`file`: [`DVEDSyncFile`](Default_DataLoader_Types_DVED_types.md#dvedsyncfile), `index`: `number` \| `LocationData`, `data`: `string` \| `ArrayBuffer`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/DataLoader/Node/System/RegionSystem.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/DataLoader/Node/System/RegionSystem.ts#L9)
