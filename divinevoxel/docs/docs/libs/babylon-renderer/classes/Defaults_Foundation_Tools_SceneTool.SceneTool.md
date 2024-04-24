---
id: "Defaults_Foundation_Tools_SceneTool.SceneTool"
title: "Class: SceneTool"
sidebar_label: "SceneTool"
custom_edit_url: null
---

[Defaults/Foundation/Tools/SceneTool](../modules/Defaults_Foundation_Tools_SceneTool.md).SceneTool

## Constructors

### constructor

• **new SceneTool**(): [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md)

#### Returns

[`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts#L5)

## Properties

### fog

• **fog**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `color` | `Vec3Array` |
| `denisty` | `number` |
| `heightFactor` | `number` |
| `mode` | `DVEFogTypes` |
| `setColor` | (`r`: `number`, `g`: `number`, `b`: `number`) => [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md) |
| `setDensity` | (`v`: `number`) => [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md) |
| `setHeightFactor` | (`v`: `number`) => [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md) |
| `setMode` | (`mode`: `DVEFogTypes`) => [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md) |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts#L7)

___

### levels

• **levels**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseLevel` | `number` |
| `setBase` | (`v`: `number`) => [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md) |
| `setSun` | (`v`: `number`) => [`SceneTool`](Defaults_Foundation_Tools_SceneTool.SceneTool.md) |
| `sunLevel` | `number` |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts#L37)

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `doAO` | (`v`: `boolean`) => \{ isDoingColor: boolean; doColor: (v: boolean) =\> ...; isDoingAO: boolean; doAO: (v: boolean) =\> ...; isDoingSun: boolean; doSun: (v: boolean) =\> ...; isDoingRGB: boolean; doRGB: (v: boolean) =\> ...; isDoingEffects: boolean; doEffects: (v: boolean) =\> ...; } |
| `doColor` | (`v`: `boolean`) => \{ isDoingColor: boolean; doColor: (v: boolean) =\> ...; isDoingAO: boolean; doAO: (v: boolean) =\> ...; isDoingSun: boolean; doSun: (v: boolean) =\> ...; isDoingRGB: boolean; doRGB: (v: boolean) =\> ...; isDoingEffects: boolean; doEffects: (v: boolean) =\> ...; } |
| `doEffects` | (`v`: `boolean`) => \{ isDoingColor: boolean; doColor: (v: boolean) =\> ...; isDoingAO: boolean; doAO: (v: boolean) =\> ...; isDoingSun: boolean; doSun: (v: boolean) =\> ...; isDoingRGB: boolean; doRGB: (v: boolean) =\> ...; isDoingEffects: boolean; doEffects: (v: boolean) =\> ...; } |
| `doRGB` | (`v`: `boolean`) => \{ isDoingColor: boolean; doColor: (v: boolean) =\> ...; isDoingAO: boolean; doAO: (v: boolean) =\> ...; isDoingSun: boolean; doSun: (v: boolean) =\> ...; isDoingRGB: boolean; doRGB: (v: boolean) =\> ...; isDoingEffects: boolean; doEffects: (v: boolean) =\> ...; } |
| `doSun` | (`v`: `boolean`) => \{ isDoingColor: boolean; doColor: (v: boolean) =\> ...; isDoingAO: boolean; doAO: (v: boolean) =\> ...; isDoingSun: boolean; doSun: (v: boolean) =\> ...; isDoingRGB: boolean; doRGB: (v: boolean) =\> ...; isDoingEffects: boolean; doEffects: (v: boolean) =\> ...; } |
| `isDoingAO` | `boolean` |
| `isDoingColor` | `boolean` |
| `isDoingEffects` | `boolean` |
| `isDoingRGB` | `boolean` |
| `isDoingSun` | `boolean` |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts:51](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/SceneTool.ts#L51)
