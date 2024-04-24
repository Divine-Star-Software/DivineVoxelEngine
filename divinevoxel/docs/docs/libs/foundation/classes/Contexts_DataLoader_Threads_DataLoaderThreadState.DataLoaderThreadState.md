---
id: "Contexts_DataLoader_Threads_DataLoaderThreadState.DataLoaderThreadState"
title: "Class: DataLoaderThreadState"
sidebar_label: "DataLoaderThreadState"
custom_edit_url: null
---

[Contexts/DataLoader/Threads/DataLoaderThreadState](../modules/Contexts_DataLoader_Threads_DataLoaderThreadState.md).DataLoaderThreadState

## Hierarchy

- `ThreadState`\<[`DataLoaderThreads`](Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads.md)\>

  ↳ **`DataLoaderThreadState`**

## Constructors

### constructor

• **new DataLoaderThreadState**(`threads`): [`DataLoaderThreadState`](Contexts_DataLoader_Threads_DataLoaderThreadState.DataLoaderThreadState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `threads` | [`DataLoaderThreads`](Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads.md) |

#### Returns

[`DataLoaderThreadState`](Contexts_DataLoader_Threads_DataLoaderThreadState.DataLoaderThreadState.md)

#### Overrides

ThreadState\&lt;DataLoaderThreads\&gt;.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreadState.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreadState.ts#L6)

## Properties

### \_settingsSynced

• **\_settingsSynced**: `boolean` = `false`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreadState.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreadState.ts#L4)

___

### settingsSynced

• **settingsSynced**: `boolean`

#### Inherited from

ThreadState.settingsSynced

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadState.d.ts:4

___

### threads

• **threads**: [`DataLoaderThreads`](Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads.md)

#### Inherited from

ThreadState.threads

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadState.d.ts:3

## Methods

### isReady

▸ **isReady**(): `boolean`

#### Returns

`boolean`

#### Overrides

ThreadState.isReady

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreadState.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreadState.ts#L10)
