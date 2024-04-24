---
id: "Core_Bind_BindGroup.BindGroup"
title: "Class: BindGroup"
sidebar_label: "BindGroup"
custom_edit_url: null
---

[Core/Bind/BindGroup](../modules/Core_Bind_BindGroup.md).BindGroup

## Constructors

### constructor

• **new BindGroup**(`enigne`): [`BindGroup`](Core_Bind_BindGroup.BindGroup.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enigne` | [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md) |

#### Returns

[`BindGroup`](Core_Bind_BindGroup.BindGroup.md)

#### Defined in

[Core/Bind/BindGroup.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L96)

## Properties

### \_bindGroup

• **\_bindGroup**: `GPUBindGroup`

#### Defined in

[Core/Bind/BindGroup.ts:92](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L92)

___

### \_buffers

• **\_buffers**: `Map`\<`string`, `BoundStorageBuffer`\>

#### Defined in

[Core/Bind/BindGroup.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L88)

___

### \_mapped

• **\_mapped**: `BoundItem`[] = `[]`

#### Defined in

[Core/Bind/BindGroup.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L93)

___

### \_samplers

• **\_samplers**: `Map`\<`string`, `BoundSampler`\>

#### Defined in

[Core/Bind/BindGroup.ts:90](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L90)

___

### \_textures

• **\_textures**: `Map`\<`string`, `BoundTexture`\>

#### Defined in

[Core/Bind/BindGroup.ts:89](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L89)

___

### \_uniforms

• **\_uniforms**: `Map`\<`string`, `BoundUniformBuffer`\>

#### Defined in

[Core/Bind/BindGroup.ts:91](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L91)

___

### enigne

• **enigne**: [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md)

#### Defined in

[Core/Bind/BindGroup.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L96)

___

### index

• **index**: `number` = `0`

#### Defined in

[Core/Bind/BindGroup.ts:94](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L94)

## Methods

### addBuffer

▸ **addBuffer**(`buffer`, `description`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | [`StorageBuffer`](Core_Buffers_StorageBuffer.StorageBuffer.md) |
| `description` | `GPUBindGroupLayoutEntry` |

#### Returns

`void`

#### Defined in

[Core/Bind/BindGroup.ts:150](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L150)

___

### addSampler

▸ **addSampler**(`sampler`, `description`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sampler` | [`TextureSampler`](Core_Textures_TextureSampler.TextureSampler.md) |
| `description` | `GPUBindGroupLayoutEntry` |

#### Returns

`void`

#### Defined in

[Core/Bind/BindGroup.ts:162](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L162)

___

### addTexture

▸ **addTexture**(`texture`, `description`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `texture` | [`Texture`](Core_Textures_Texture.Texture.md) |
| `description` | `GPUBindGroupLayoutEntry` |

#### Returns

`void`

#### Defined in

[Core/Bind/BindGroup.ts:156](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L156)

___

### addUniform

▸ **addUniform**(`buffer`, `description`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | [`UniformBuffer`](Core_Buffers_UniformBuffer.UniformBuffer.md) |
| `description` | `GPUBindGroupLayoutEntry` |

#### Returns

`void`

#### Defined in

[Core/Bind/BindGroup.ts:144](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L144)

___

### createBindGroup

▸ **createBindGroup**(`layout`): `GPUBindGroup`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layout` | `GPUBindGroupLayout` |

#### Returns

`GPUBindGroup`

#### Defined in

[Core/Bind/BindGroup.ts:131](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L131)

___

### createGroupCode

▸ **createGroupCode**(): `string`

#### Returns

`string`

#### Defined in

[Core/Bind/BindGroup.ts:139](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L139)

___

### getLayout

▸ **getLayout**(): `GPUBindGroupLayoutDescriptor`

#### Returns

`GPUBindGroupLayoutDescriptor`

#### Defined in

[Core/Bind/BindGroup.ts:125](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L125)

___

### mapLayOut

▸ **mapLayOut**(): `BoundItem`[]

#### Returns

`BoundItem`[]

#### Defined in

[Core/Bind/BindGroup.ts:98](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Core/Bind/BindGroup.ts#L98)
