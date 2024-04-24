---
id: "Pipelines_Ray_RaySceneCompute.RaySceneCompute"
title: "Class: RaySceneCompute"
sidebar_label: "RaySceneCompute"
custom_edit_url: null
---

[Pipelines/Ray/RaySceneCompute](../modules/Pipelines_Ray_RaySceneCompute.md).RaySceneCompute

## Constructors

### constructor

• **new RaySceneCompute**(`pipeline`): [`RaySceneCompute`](Pipelines_Ray_RaySceneCompute.RaySceneCompute.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipeline` | [`RayPipeline`](Pipelines_Ray_RayPipeline.RayPipeline.md) |

#### Returns

[`RaySceneCompute`](Pipelines_Ray_RaySceneCompute.RaySceneCompute.md)

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L24)

## Properties

### \_initalized

• **\_initalized**: `boolean` = `false`

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L22)

___

### bindGroup

• **bindGroup**: [`BindGroup`](Core_Bind_BindGroup.BindGroup.md)

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L21)

___

### computePipeline

• `Private` **computePipeline**: `GPUComputePipeline`

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L20)

___

### pipeline

• **pipeline**: [`RayPipeline`](Pipelines_Ray_RayPipeline.RayPipeline.md)

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L24)

## Methods

### compute

▸ **compute**(): `void`

#### Returns

`void`

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:102](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L102)

___

### init

▸ **init**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `RaySceneComputeInitData` |

#### Returns

`void`

#### Defined in

[Pipelines/Ray/RaySceneCompute.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RaySceneCompute.ts#L26)
