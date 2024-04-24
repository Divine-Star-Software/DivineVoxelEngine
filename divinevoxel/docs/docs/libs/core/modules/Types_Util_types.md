---
id: "Types_Util_types"
title: "Module: Types/Util.types"
sidebar_label: "Types/Util.types"
custom_edit_url: null
---

## Type Aliases

### DirectionNames

Ƭ **DirectionNames**: ``"top"`` \| ``"bottom"`` \| `Exclude`\<[`CompassDirectionNames`](Math_Types_Math_types.md#compassdirectionnames), ``"north-west"`` \| ``"north-east"`` \| ``"south-west"`` \| ``"south-east"``\>

#### Defined in

[divinevoxel/core/src/Types/Util.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Util.types.ts#L3)

___

### RecursivePartial

Ƭ **RecursivePartial**\<`T`\>: \{ [P in keyof T]?: RecursivePartial\<T[P]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[divinevoxel/core/src/Types/Util.types.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Util.types.ts#L11)
