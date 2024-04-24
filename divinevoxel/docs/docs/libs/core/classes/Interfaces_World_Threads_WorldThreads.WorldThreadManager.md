---
id: "Interfaces_World_Threads_WorldThreads.WorldThreadManager"
title: "Class: WorldThreadManager"
sidebar_label: "WorldThreadManager"
custom_edit_url: null
---

[Interfaces/World/Threads/WorldThreads](../modules/Interfaces_World_Threads_WorldThreads.md).WorldThreadManager

## Hierarchy

- [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)

  ↳ **`WorldThreadManager`**

## Constructors

### constructor

• **new WorldThreadManager**(): [`WorldThreadManager`](Interfaces_World_Threads_WorldThreads.WorldThreadManager.md)

#### Returns

[`WorldThreadManager`](Interfaces_World_Threads_WorldThreads.WorldThreadManager.md)

#### Overrides

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[constructor](Interfaces_Classes_ThreadManager.ThreadManager.md#constructor)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts#L14)

## Properties

### commMap

• **commMap**: `Map`\<`string`, `CommBase` \| `CommManager`\>

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[commMap](Interfaces_Classes_ThreadManager.ThreadManager.md#commmap)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L10)

___

### comms

• **comms**: (`CommBase` \| `CommManager`)[] = `[]`

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[comms](Interfaces_Classes_ThreadManager.ThreadManager.md#comms)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L11)

___

### constructors

• **constructors**: `CommManager`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts#L8)

___

### parent

• **parent**: `CommBase` = `ThreadComm.parent`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts#L12)

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)\> |
| `setPorts` | `AsyncPipeline`\<[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)\> |

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[pipelines](Interfaces_Classes_ThreadManager.ThreadManager.md#pipelines)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L6)

___

### state

• `Abstract` **state**: [`WorldThreadState`](Interfaces_World_Threads_WorldThreadState.WorldThreadState.md)

#### Overrides

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[state](Interfaces_Classes_ThreadManager.ThreadManager.md#state)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Threads/WorldThreads.ts#L7)

## Methods

### addComm

▸ **addComm**(`comm`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comm` | `CommBase` \| `CommManager` |

#### Returns

`void`

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[addComm](Interfaces_Classes_ThreadManager.ThreadManager.md#addcomm)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L35)

___

### getComm

▸ **getComm**(`id`): `CommBase` \| `CommManager`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`CommBase` \| `CommManager`

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[getComm](Interfaces_Classes_ThreadManager.ThreadManager.md#getcomm)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L39)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[init](Interfaces_Classes_ThreadManager.ThreadManager.md#init)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L14)

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

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[setCommPort](Interfaces_Classes_ThreadManager.ThreadManager.md#setcommport)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L18)
