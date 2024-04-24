---
id: "Data_Register_MappedDataRegister"
title: "Module: Data/Register/MappedDataRegister"
sidebar_label: "Data/Register/MappedDataRegister"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### MappedDataRegister

• `Const` **MappedDataRegister**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `objectMaps` | \{ `segments`: `Map`\<`string`, `Map`\<`string`, `Record`\<`number`, `any`\>\>\> ; `get`: (`segment`: `string`, `id`: `string`, `index`: `number`) => `any` ; `sync`: (`data`: [`RegisterObjectMapSync`](Types_DataSync_types.md#registerobjectmapsync)) => `void`  } |
| `objectMaps.segments` | `Map`\<`string`, `Map`\<`string`, `Record`\<`number`, `any`\>\>\> |
| `objectMaps.get` | [object Object] |
| `objectMaps.sync` | [object Object] |
| `stringMaps` | \{ `segments`: `Map`\<`string`, `Map`\<`string`, `string`[]\>\> ; `get`: (`segment`: `string`, `id`: `string`, `index`: `number`) => `string` ; `sync`: (`data`: [`RegisterStringMapSync`](Types_DataSync_types.md#registerstringmapsync)) => `void`  } |
| `stringMaps.segments` | `Map`\<`string`, `Map`\<`string`, `string`[]\>\> |
| `stringMaps.get` | [object Object] |
| `stringMaps.sync` | [object Object] |

#### Defined in

[divinevoxel/core/src/Data/Register/MappedDataRegister.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Data/Register/MappedDataRegister.ts#L6)
