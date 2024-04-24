---
id: "Math_Functions_VisitAll"
title: "Module: Math/Functions/VisitAll"
sidebar_label: "Math/Functions/VisitAll"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### VisitAll

▸ **VisitAll**(`startPoint`, `endPoint`, `visitor?`): `number`[]

# Visit All
---
Given a starting point and an end point it will visit all voxels that are between them.

#### Parameters

| Name | Type |
| :------ | :------ |
| `startPoint` | [`Position3Matrix`](Math_Types_Math_types.md#position3matrix) |
| `endPoint` | [`Position3Matrix`](Math_Types_Math_types.md#position3matrix) |
| `visitor` | (`x`: `number`, `y`: `number`, `z`: `number`) => `boolean` |

#### Returns

`number`[]

an array of numbers with a stride of 3 for positions

#### Defined in

[divinevoxel/core/src/Math/Functions/VisitAll.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Math/Functions/VisitAll.ts#L11)
