---
id: "Default_Shaders_Types_Shader_types"
title: "Module: Default/Shaders/Types/Shader.types"
sidebar_label: "Default/Shaders/Types/Shader.types"
custom_edit_url: null
---

## Type Aliases

### DVEFogTypes

Ƭ **DVEFogTypes**: ``"exponential"`` \| ``"volumetric"`` \| ``"animated-volumetric"``

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/Types/Shader.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/Types/Shader.types.ts#L3)

___

### DVERenderEffectsOptions

Ƭ **DVERenderEffectsOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `floraEffects` | `boolean` |
| `liquidEffects` | `boolean` |

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/Types/Shader.types.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/Types/Shader.types.ts#L13)

___

### RenderFogOptions

Ƭ **RenderFogOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `color` | `Vec3Array` |
| `density` | `number` |
| `mode` | [`DVEFogTypes`](Default_Shaders_Types_Shader_types.md#dvefogtypes) |
| `volumetricOptions` | \{ `heightFactor`: `number`  } |
| `volumetricOptions.heightFactor` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Shaders/Types/Shader.types.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Shaders/Types/Shader.types.ts#L4)
