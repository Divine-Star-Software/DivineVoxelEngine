---
id: "Default_Builder_Rules_Overrides_OverridesManager"
title: "Module: Default/Builder/Rules/Overrides/OverridesManager"
sidebar_label: "Default/Builder/Rules/Overrides/OverridesManager"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### OverrideManager

• `Const` **OverrideManager**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `overrides` | `Record`\<[`OverrideTypes`](Default_Builder_Types_Override_types.md#overridetypes), `Map`\<`string`, `Map`\<`string`, `RunOverrideFunction`\>\>\> |
| `hasOverride` | (`type`: [`OverrideTypes`](Default_Builder_Types_Override_types.md#overridetypes), `shapeId`: `string`, `neighborShapeId`: `string`) => `boolean` |
| `registerOverride` | (`type`: [`OverrideTypes`](Default_Builder_Types_Override_types.md#overridetypes), `subjectId`: `string`, `neighborShapeId`: `string`, `run`: `RunOverrideFunction`) => `void` |
| `runOverride` | (`type`: [`OverrideTypes`](Default_Builder_Types_Override_types.md#overridetypes), `firstId`: `string`, `secondOverride`: `string`, `data`: [`FaceDataOverride`](Default_Builder_Types_Override_types.md#facedataoverride)) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Rules/Overrides/OverridesManager.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Rules/Overrides/OverridesManager.ts#L8)
