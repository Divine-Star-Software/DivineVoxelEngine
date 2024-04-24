---
id: "Pipelines_Ray_RayPipeline.RayPipeline"
title: "Class: RayPipeline"
sidebar_label: "RayPipeline"
custom_edit_url: null
---

[Pipelines/Ray/RayPipeline](../modules/Pipelines_Ray_RayPipeline.md).RayPipeline

## Constructors

### constructor

• **new RayPipeline**(`canvas`): [`RayPipeline`](Pipelines_Ray_RayPipeline.RayPipeline.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` \| `OffscreenCanvas` |

#### Returns

[`RayPipeline`](Pipelines_Ray_RayPipeline.RayPipeline.md)

#### Defined in

[Pipelines/Ray/RayPipeline.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L15)

## Properties

### bindGroup

• **bindGroup**: `GPUBindGroup`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L9)

___

### engine

• **engine**: [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md)

#### Defined in

[Pipelines/Ray/RayPipeline.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L6)

___

### outputTexture

• **outputTexture**: [`Texture`](Core_Textures_Texture.Texture.md)

#### Defined in

[Pipelines/Ray/RayPipeline.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L12)

___

### quadVertexBuffer

• **quadVertexBuffer**: `GPUBuffer`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L7)

___

### rayScene

• **rayScene**: [`RaySceneCompute`](Pipelines_Ray_RaySceneCompute.RaySceneCompute.md)

#### Defined in

[Pipelines/Ray/RayPipeline.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L14)

___

### renderPipeline

• **renderPipeline**: `GPURenderPipeline`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L8)

## Methods

### \_renderPass

▸ **_renderPass**(): `void`

#### Returns

`void`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:179](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L179)

___

### createOutputTexture

▸ **createOutputTexture**(): `void`

#### Returns

`void`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:160](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L160)

___

### init

▸ **init**(`rayScene`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rayScene` | [`RaySceneCompute`](Pipelines_Ray_RaySceneCompute.RaySceneCompute.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Pipelines/Ray/RayPipeline.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L21)

___

### initBuffers

▸ **initBuffers**(): `void`

#### Returns

`void`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L29)

___

### initMaterial

▸ **initMaterial**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[Pipelines/Ray/RayPipeline.ts:51](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L51)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[Pipelines/Ray/RayPipeline.ts:150](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Pipelines/Ray/RayPipeline.ts#L150)
