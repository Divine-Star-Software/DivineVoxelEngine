---
id: "Core_Buffers_UniformBuffer.UniformBuffer"
title: "Class: UniformBuffer"
sidebar_label: "UniformBuffer"
custom_edit_url: null
---

[Core/Buffers/UniformBuffer](../modules/Core_Buffers_UniformBuffer.md).UniformBuffer

## Constructors

### constructor

• **new UniformBuffer**(`engine`, `name`, `size`, `shaderDefine`): [`UniformBuffer`](Core_Buffers_UniformBuffer.UniformBuffer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md) |
| `name` | `string` |
| `size` | `number` |
| `shaderDefine` | `string` |

#### Returns

[`UniformBuffer`](Core_Buffers_UniformBuffer.UniformBuffer.md)

#### Defined in

[Core/Buffers/UniformBuffer.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L5)

## Properties

### \_buffer

• **\_buffer**: `GPUBuffer`

#### Defined in

[Core/Buffers/UniformBuffer.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L4)

___

### engine

• **engine**: [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md)

#### Defined in

[Core/Buffers/UniformBuffer.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L6)

___

### name

• **name**: `string`

#### Defined in

[Core/Buffers/UniformBuffer.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L7)

___

### shaderDefine

• **shaderDefine**: `string`

#### Defined in

[Core/Buffers/UniformBuffer.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L9)

___

### size

• **size**: `number`

#### Defined in

[Core/Buffers/UniformBuffer.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L8)

## Methods

### write

▸ **write**(`buffer`, `offeset?`): [`UniformBuffer`](Core_Buffers_UniformBuffer.UniformBuffer.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buffer` | `BufferSource` \| `SharedArrayBuffer` | `undefined` |
| `offeset` | `number` | `0` |

#### Returns

[`UniformBuffer`](Core_Buffers_UniformBuffer.UniformBuffer.md)

#### Defined in

[Core/Buffers/UniformBuffer.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/UniformBuffer.ts#L18)
