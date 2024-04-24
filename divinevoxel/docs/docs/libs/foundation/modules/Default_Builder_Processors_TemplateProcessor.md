---
id: "Default_Builder_Processors_TemplateProcessor"
title: "Module: Default/Builder/Processors/TemplateProcessor"
sidebar_label: "Default/Builder/Processors/TemplateProcessor"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### TemplateProcessor

• `Const` **TemplateProcessor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_states` | \{ `foundVoxel`: `boolean` = false } |
| `_states.foundVoxel` | `boolean` |
| `nLocation` | `LocationData` |
| `relative` | \{ `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } |
| `relative.x` | `number` |
| `relative.y` | `number` |
| `relative.z` | `number` |
| `_process` | (`index`: `number`, `template`: `Uint32Array`) => `void` |
| `build` | (`location`: `LocationData`, `template`: `Uint32Array`, `startIndex`: `Vec3Array`, `templateIndex`: `Flat3DIndex`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Processors/TemplateProcessor.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Processors/TemplateProcessor.ts#L17)
