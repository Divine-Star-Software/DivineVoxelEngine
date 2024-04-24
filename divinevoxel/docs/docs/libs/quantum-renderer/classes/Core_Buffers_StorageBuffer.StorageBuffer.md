---
id: "Core_Buffers_StorageBuffer.StorageBuffer"
title: "Class: StorageBuffer"
sidebar_label: "StorageBuffer"
custom_edit_url: null
---

[Core/Buffers/StorageBuffer](../modules/Core_Buffers_StorageBuffer.md).StorageBuffer

## Constructors

### constructor

• **new StorageBuffer**(`engine`, `name`, `size`, `shaderDefine`): [`StorageBuffer`](Core_Buffers_StorageBuffer.StorageBuffer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md) |
| `name` | `string` |
| `size` | `number` |
| `shaderDefine` | `string` |

#### Returns

[`StorageBuffer`](Core_Buffers_StorageBuffer.StorageBuffer.md)

#### Defined in

[Core/Buffers/StorageBuffer.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L5)

## Properties

### \_buffer

• **\_buffer**: `GPUBuffer`

#### Defined in

[Core/Buffers/StorageBuffer.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L4)

___

### engine

• **engine**: [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md)

#### Defined in

[Core/Buffers/StorageBuffer.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L6)

___

### name

• **name**: `string`

#### Defined in

[Core/Buffers/StorageBuffer.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L7)

___

### shaderDefine

• **shaderDefine**: `string`

#### Defined in

[Core/Buffers/StorageBuffer.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L9)

___

### size

• **size**: `number`

#### Defined in

[Core/Buffers/StorageBuffer.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L8)

## Methods

### write

▸ **write**(`buffer`, `offeset?`): [`StorageBuffer`](Core_Buffers_StorageBuffer.StorageBuffer.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buffer` | `BufferSource` \| `SharedArrayBuffer` | `undefined` |
| `offeset` | `number` | `0` |

#### Returns

[`StorageBuffer`](Core_Buffers_StorageBuffer.StorageBuffer.md)

#### Defined in

[Core/Buffers/StorageBuffer.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Buffers/StorageBuffer.ts#L18)
