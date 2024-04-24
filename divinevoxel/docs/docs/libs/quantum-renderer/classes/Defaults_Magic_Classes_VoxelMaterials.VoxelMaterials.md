---
id: "Defaults_Magic_Classes_VoxelMaterials.VoxelMaterials"
title: "Class: VoxelMaterials"
sidebar_label: "VoxelMaterials"
custom_edit_url: null
---

[Defaults/Magic/Classes/VoxelMaterials](../modules/Defaults_Magic_Classes_VoxelMaterials.md).VoxelMaterials

## Constructors

### constructor

• **new VoxelMaterials**(`engine`): [`VoxelMaterials`](Defaults_Magic_Classes_VoxelMaterials.VoxelMaterials.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`QuantumEngine`](Engine_QuantumEngine.QuantumEngine.md) |

#### Returns

[`VoxelMaterials`](Defaults_Magic_Classes_VoxelMaterials.VoxelMaterials.md)

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L24)

## Properties

### \_index

• **\_index**: `number` = `0`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L33)

___

### \_trueIndex

• **\_trueIndex**: `number` = `0`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L34)

___

### uniform

• **uniform**: [`UniformBuffer`](Core_Buffers_UniformBuffer.UniformBuffer.md)

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L16)

___

### view

• **view**: `Float32Array`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L22)

___

### MaxSize

▪ `Static` **MaxSize**: `number` = `255`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L17)

___

### StructNumberSize

▪ `Static` **StructNumberSize**: `number` = `8`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L18)

## Accessors

### byteSize

• `get` **byteSize**(): `number`

#### Returns

`number`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L19)

## Methods

### setColor

▸ **setColor**(`color`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `Object` |
| `color.a` | `number` |
| `color.b` | `number` |
| `color.g` | `number` |
| `color.r` | `number` |

#### Returns

`void`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L40)

___

### setEmissive

▸ **setEmissive**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L53)

___

### setIndex

▸ **setIndex**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L35)

___

### setMetallic

▸ **setMetallic**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L50)

___

### setRoughness

▸ **setRoughness**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L47)

___

### sync

▸ **sync**(): [`VoxelMaterials`](Defaults_Magic_Classes_VoxelMaterials.VoxelMaterials.md)

#### Returns

[`VoxelMaterials`](Defaults_Magic_Classes_VoxelMaterials.VoxelMaterials.md)

#### Defined in

[Defaults/Magic/Classes/VoxelMaterials.ts:56](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/quantum-renderer/src/Defaults/Magic/Classes/VoxelMaterials.ts#L56)
