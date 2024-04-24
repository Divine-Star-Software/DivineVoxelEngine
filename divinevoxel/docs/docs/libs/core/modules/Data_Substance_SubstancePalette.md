---
id: "Data_Substance_SubstancePalette"
title: "Module: Data/Substance/SubstancePalette"
sidebar_label: "Data/Substance/SubstancePalette"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### SubstancePaletteReader

• `Const` **SubstancePaletteReader**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_map` | `Map`\<`string`, `number`\> |
| `_palette` | `string`[] |
| `id` | \{ `numberFromString`: (`id`: `string`) => `number` ; `stringFromNumber`: (`id`: `number`) => `string`  } |
| `id.numberFromString` | [object Object] |
| `id.stringFromNumber` | [object Object] |
| `setPalette` | (`palette`: `string`[], `map`: `Record`\<`string`, `number`\>) => `void` |

#### Defined in

[divinevoxel/core/src/Data/Substance/SubstancePalette.ts:1](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Data/Substance/SubstancePalette.ts#L1)
