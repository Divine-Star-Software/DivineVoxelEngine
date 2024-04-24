---
id: "Data_Voxel_VoxelPalette"
title: "Module: Data/Voxel/VoxelPalette"
sidebar_label: "Data/Voxel/VoxelPalette"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### VoxelPaletteReader

• `Const` **VoxelPaletteReader**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_map` | `Map`\<`string`, `number`\> |
| `_palette` | [`VoxelPalette`](Types_Voxel_types.md#voxelpalette) |
| `id` | \{ `baseNumeric`: (`id`: `number`) => `number` ; `getPaletteId`: (`voxelId`: `string`, `voxelState`: `number`) => `number` ; `numberFromString`: (`id`: `string`) => `undefined` \| `number` ; `stringFromNumber`: (`id`: `number`) => `string`  } |
| `id.baseNumeric` | [object Object] |
| `id.getPaletteId` | [object Object] |
| `id.numberFromString` | [object Object] |
| `id.stringFromNumber` | [object Object] |
| `setVoxelPalette` | (`voxelPalette`: [`VoxelPalette`](Types_Voxel_types.md#voxelpalette), `voxelPaletteMap`: [`VoxelPaletteMap`](Types_Voxel_types.md#voxelpalettemap)) => `void` |

#### Defined in

[divinevoxel/core/src/Data/Voxel/VoxelPalette.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Data/Voxel/VoxelPalette.ts#L3)
