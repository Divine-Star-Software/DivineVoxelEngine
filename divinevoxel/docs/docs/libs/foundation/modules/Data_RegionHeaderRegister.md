---
id: "Data_RegionHeaderRegister"
title: "Module: Data/RegionHeaderRegister"
sidebar_label: "Data/RegionHeaderRegister"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### RegionHeaderRegister

• `Const` **RegionHeaderRegister**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_headers` | `RegionHeaderData` |
| `add` | (`location`: `LocationData`, `buffer`: `SharedArrayBuffer`) => `void` |
| `get` | (`location`: `LocationData`) => `undefined` \| ``false`` \| \{ `buffer`: `SharedArrayBuffer` ; `data`: `DataView`  } |
| `isStored` | (`location`: `LocationData`) => ``-1`` \| ``0`` \| ``1`` |
| `remove` | (`location`: `LocationData`) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Data/RegionHeaderRegister.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/RegionHeaderRegister.ts#L18)

___

### RegionHeaderTags

• `Const` **RegionHeaderTags**: `RemoteTagManager`

#### Defined in

[divinevoxel/foundation/src/Data/RegionHeaderRegister.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/RegionHeaderRegister.ts#L5)
