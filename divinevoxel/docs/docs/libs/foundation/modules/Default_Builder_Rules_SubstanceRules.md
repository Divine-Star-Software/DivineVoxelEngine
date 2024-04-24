---
id: "Default_Builder_Rules_SubstanceRules"
title: "Module: Default/Builder/Rules/SubstanceRules"
sidebar_label: "Default/Builder/Rules/SubstanceRules"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### SubstanceRules

• `Const` **SubstanceRules**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `parents` | `Map`\<`string`, `string`\> |
| `rules` | `Map`\<`string`, `Map`\<`string`, `boolean`\>\> |
| `$BuildRules` | () => `void` |
| `exposedCheck` | (`subject`: `string`, `neightborVoxel`: `string`) => `boolean` |
| `getSubstanceParent` | (`id`: `string`) => `string` |
| `registerSubstance` | (`id`: `string`, `substanceCulls?`: `string`[], `parentId?`: `string`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Rules/SubstanceRules.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Rules/SubstanceRules.ts#L7)
