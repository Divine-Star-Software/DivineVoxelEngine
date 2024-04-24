---
id: "Default_Builder_Tools_VoxelTemplateDataTool.VoxelTemplateDataTool"
title: "Class: VoxelTemplateDataTool"
sidebar_label: "VoxelTemplateDataTool"
custom_edit_url: null
---

[Default/Builder/Tools/VoxelTemplateDataTool](../modules/Default_Builder_Tools_VoxelTemplateDataTool.md).VoxelTemplateDataTool

## Constructors

### constructor

• **new VoxelTemplateDataTool**(): [`VoxelTemplateDataTool`](Default_Builder_Tools_VoxelTemplateDataTool.VoxelTemplateDataTool.md)

#### Returns

[`VoxelTemplateDataTool`](Default_Builder_Tools_VoxelTemplateDataTool.VoxelTemplateDataTool.md)

## Properties

### \_active

• **\_active**: `boolean` = `false`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L6)

___

### \_ao

• **\_ao**: `QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:33](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L33)

___

### \_aos

• **\_aos**: `Record`\<`DirectionNames`, `QuadVertexData`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L23)

___

### \_faces

• **\_faces**: `Record`\<`DirectionNames`, `number`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L7)

___

### \_level

• **\_level**: `QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L32)

___

### \_light

• **\_light**: `QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L31)

___

### \_lights

• **\_lights**: `Record`\<`DirectionNames`, `QuadVertexData`\>

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L15)

## Methods

### isAcive

▸ **isAcive**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L34)

___

### isFaceExposed

▸ **isFaceExposed**(`face`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `face` | `DirectionNames` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:177](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L177)

___

### load

▸ **load**(`template`, `index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | `Uint32Array` |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L40)

___

### setActive

▸ **setActive**(`active`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelTemplateDataTool.ts#L37)
