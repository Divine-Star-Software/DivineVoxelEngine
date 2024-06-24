---
id: "Contexts_RichWorld_Threads_RichWorldThreads.RichWorldThreads"
title: "Class: RichWorldThreads"
sidebar_label: "RichWorldThreads"
custom_edit_url: null
---

[Contexts/RichWorld/Threads/RichWorldThreads](../modules/Contexts_RichWorld_Threads_RichWorldThreads.md).RichWorldThreads

## Hierarchy

- `ThreadManager`

  ↳ **`RichWorldThreads`**

## Constructors

### constructor

• **new RichWorldThreads**(): [`RichWorldThreads`](Contexts_RichWorld_Threads_RichWorldThreads.RichWorldThreads.md)

#### Returns

[`RichWorldThreads`](Contexts_RichWorld_Threads_RichWorldThreads.RichWorldThreads.md)

#### Inherited from

ThreadManager.constructor

## Properties

### ConstructorComm

• **ConstructorComm**: `ThreadPool`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts#L15)

___

### DataComm

• **DataComm**: `Thread`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts#L14)

___

### NexusComm

• **NexusComm**: `Thread`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts#L13)

___

### commMap

• **commMap**: `Map`\<`string`, `Thread` \| `ThreadPool`\>

#### Inherited from

ThreadManager.commMap

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:9

___

### comms

• **comms**: (`Thread` \| `ThreadPool`)[]

#### Inherited from

ThreadManager.comms

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:10

___

### parent

• **parent**: `Thread` = `Threads.parent`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts#L11)

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<`ThreadManager`\> |
| `setPorts` | `AsyncPipeline`\<`ThreadManager`\> |

#### Inherited from

ThreadManager.pipelines

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:5

___

### state

• **state**: [`RichWorldThreadState`](Contexts_RichWorld_Threads_RichWorldThreadState.RichWorldThreadState.md)

#### Overrides

ThreadManager.state

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts#L10)

___

### world

• **world**: `Thread`

#### Defined in

[divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/RichWorld/Threads/RichWorldThreads.ts#L12)

## Methods

### addComm

▸ **addComm**(`comm`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comm` | `Thread` \| `ThreadPool` |

#### Returns

`void`

#### Inherited from

ThreadManager.addComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:14

___

### getComm

▸ **getComm**(`id`): `Thread` \| `ThreadPool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Thread` \| `ThreadPool`

#### Inherited from

ThreadManager.getComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:15

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

ThreadManager.init

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:12

___

### setCommPort

▸ **setCommPort**(`id`, `ports`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ports` | `CommPortTypes` \| `CommPortTypes`[] |

#### Returns

`void`

#### Inherited from

ThreadManager.setCommPort

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:13
