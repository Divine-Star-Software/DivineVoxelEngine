---
id: "Defaults_Foundation_Tools_EntityTool.EntityTool"
title: "Class: EntityTool"
sidebar_label: "EntityTool"
custom_edit_url: null
---

[Defaults/Foundation/Tools/EntityTool](../modules/Defaults_Foundation_Tools_EntityTool.md).EntityTool

## Constructors

### constructor

• **new EntityTool**(`mesh`): [`EntityTool`](Defaults_Foundation_Tools_EntityTool.EntityTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Mesh` |

#### Returns

[`EntityTool`](Defaults_Foundation_Tools_EntityTool.EntityTool.md)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L11)

## Properties

### \_bufferIds

• **\_bufferIds**: `string`[] = `[]`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L10)

___

### \_instanceAmount

• **\_instanceAmount**: `number` = `0`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L6)

___

### \_instances

• **\_instances**: [`EntityInstance`](Defaults_Foundation_Tools_EntityInstance.EntityInstance.md)[] = `[]`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L8)

___

### \_matrixArray

• **\_matrixArray**: `MatrixArray`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L7)

___

### \_usedInstances

• **\_usedInstances**: `Set`\<[`EntityInstance`](Defaults_Foundation_Tools_EntityInstance.EntityInstance.md)\>

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L9)

___

### mesh

• **mesh**: `Mesh`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L11)

## Methods

### addBuffer

▸ **addBuffer**(`id`, `buffer`, `stride?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `buffer` | `Float32Array` |
| `stride?` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L13)

___

### getInstance

▸ **getInstance**(): ``false`` \| [`EntityInstance`](Defaults_Foundation_Tools_EntityInstance.EntityInstance.md)

#### Returns

``false`` \| [`EntityInstance`](Defaults_Foundation_Tools_EntityInstance.EntityInstance.md)

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L36)

___

### returnAll

▸ **returnAll**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:54](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L54)

___

### returnInstance

▸ **returnInstance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | [`EntityInstance`](Defaults_Foundation_Tools_EntityInstance.EntityInstance.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L46)

___

### setInstanceAmount

▸ **setInstanceAmount**(`amount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L18)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/EntityTool.ts#L61)
