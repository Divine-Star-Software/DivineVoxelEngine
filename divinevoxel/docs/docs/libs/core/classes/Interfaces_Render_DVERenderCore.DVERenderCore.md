---
id: "Interfaces_Render_DVERenderCore.DVERenderCore"
title: "Class: DVERenderCore"
sidebar_label: "DVERenderCore"
custom_edit_url: null
---

[Interfaces/Render/DVERenderCore](../modules/Interfaces_Render_DVERenderCore.md).DVERenderCore

## Hierarchy

- [`DVECore`](Interfaces_DVECore.DVECore.md)

  ↳ **`DVERenderCore`**

## Constructors

### constructor

• **new DVERenderCore**(): [`DVERenderCore`](Interfaces_Render_DVERenderCore.DVERenderCore.md)

#### Returns

[`DVERenderCore`](Interfaces_Render_DVERenderCore.DVERenderCore.md)

#### Inherited from

[DVECore](Interfaces_DVECore.DVECore.md).[constructor](Interfaces_DVECore.DVECore.md#constructor)

## Properties

### data

• `Abstract` **data**: [`DVEDataCore`](Interfaces_Data_DVEDataCore.DVEDataCore.md)

#### Overrides

[DVECore](Interfaces_DVECore.DVECore.md).[data](Interfaces_DVECore.DVECore.md#data)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderCore.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderCore.ts#L8)

___

### renderer

• `Abstract` **renderer**: [`DVERenderer`](Interfaces_Render_DVERenderer.DVERenderer.md)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderCore.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderCore.ts#L9)

___

### threads

• `Abstract` **threads**: [`RenderThreadManager`](Interfaces_Render_Threads_RenderThreads.RenderThreadManager.md)

#### Overrides

[DVECore](Interfaces_DVECore.DVECore.md).[threads](Interfaces_DVECore.DVECore.md#threads)

#### Defined in

[divinevoxel/core/src/Interfaces/Render/DVERenderCore.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Render/DVERenderCore.ts#L7)

## Methods

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[DVECore](Interfaces_DVECore.DVECore.md).[init](Interfaces_DVECore.DVECore.md#init)

#### Defined in

[divinevoxel/core/src/Interfaces/DVECore.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/DVECore.ts#L8)
