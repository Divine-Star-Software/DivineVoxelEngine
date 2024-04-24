---
id: "Interfaces_World_Data_DataTagBuilders.DataTagBuilders"
title: "Class: DataTagBuilders"
sidebar_label: "DataTagBuilders"
custom_edit_url: null
---

[Interfaces/World/Data/DataTagBuilders](../modules/Interfaces_World_Data_DataTagBuilders.md).DataTagBuilders

## Constructors

### constructor

• **new DataTagBuilders**(): [`DataTagBuilders`](Interfaces_World_Data_DataTagBuilders.DataTagBuilders.md)

#### Returns

[`DataTagBuilders`](Interfaces_World_Data_DataTagBuilders.DataTagBuilders.md)

## Properties

### substances

• **substances**: `Object` = `SubstanceDataGenerator`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `palette` | \{ `_count`: `number` = 0; `_map`: `Record`\<`string`, `number`\> ; `_palette`: `string`[] ; `get`: () => `string`[] ; `getMap`: () => `Record`\<`string`, `number`\> ; `register`: (`sustance`: [`SubstanceData`](../modules/Types_Substances_types.md#substancedata)) => `void`  } |
| `palette._count` | `number` |
| `palette._map` | `Record`\<`string`, `number`\> |
| `palette._palette` | `string`[] |
| `palette.get` | [object Object] |
| `palette.getMap` | [object Object] |
| `palette.register` | [object Object] |
| `$generate` | () => `void` |

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataTagBuilders.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataTagBuilders.ts#L6)

___

### voxels

• **voxels**: typeof [`VoxelDataGenerator`](Interfaces_World_Data_Generators_VoxelDataGenerator.VoxelDataGenerator.md) = `VoxelDataGenerator`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/DataTagBuilders.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/DataTagBuilders.ts#L5)
