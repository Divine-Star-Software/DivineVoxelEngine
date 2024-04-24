---
id: "Interfaces_Classes_ThreadState.ThreadState"
title: "Class: ThreadState<Threads>"
sidebar_label: "ThreadState"
custom_edit_url: null
---

[Interfaces/Classes/ThreadState](../modules/Interfaces_Classes_ThreadState.md).ThreadState

## Type parameters

| Name | Type |
| :------ | :------ |
| `Threads` | extends [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md) = [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md) |

## Hierarchy

- **`ThreadState`**

  ↳ [`ConstructorThreadState`](Interfaces_Constructor_Threads_ConstructorThreadState.ConstructorThreadState.md)

  ↳ [`WorldThreadState`](Interfaces_World_Threads_WorldThreadState.WorldThreadState.md)

## Constructors

### constructor

• **new ThreadState**\<`Threads`\>(`threads`): [`ThreadState`](Interfaces_Classes_ThreadState.ThreadState.md)\<`Threads`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Threads` | extends [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md) = [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `threads` | `Threads` |

#### Returns

[`ThreadState`](Interfaces_Classes_ThreadState.ThreadState.md)\<`Threads`\>

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadState.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadState.ts#L5)

## Properties

### settingsSynced

• **settingsSynced**: `boolean` = `false`

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadState.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadState.ts#L4)

___

### threads

• **threads**: `Threads`

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadState.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadState.ts#L5)

## Methods

### isReady

▸ **isReady**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadState.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadState.ts#L6)
