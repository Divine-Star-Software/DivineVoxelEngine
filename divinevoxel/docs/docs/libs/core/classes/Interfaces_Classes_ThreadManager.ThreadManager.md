---
id: "Interfaces_Classes_ThreadManager.ThreadManager"
title: "Class: ThreadManager"
sidebar_label: "ThreadManager"
custom_edit_url: null
---

[Interfaces/Classes/ThreadManager](../modules/Interfaces_Classes_ThreadManager.md).ThreadManager

## Hierarchy

- **`ThreadManager`**

  ↳ [`HeadlessThreadManager`](Interfaces_Headless_HeadlessThreads.HeadlessThreadManager.md)

  ↳ [`ConstructorThreadManager`](Interfaces_Constructor_Threads_ConstrcutorTheads.ConstructorThreadManager.md)

  ↳ [`RenderThreadManager`](Interfaces_Render_Threads_RenderThreads.RenderThreadManager.md)

  ↳ [`WorldThreadManager`](Interfaces_World_Threads_WorldThreads.WorldThreadManager.md)

## Constructors

### constructor

• **new ThreadManager**(): [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)

#### Returns

[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)

## Properties

### commMap

• **commMap**: `Map`\<`string`, `CommBase` \| `CommManager`\>

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L10)

___

### comms

• **comms**: (`CommBase` \| `CommManager`)[] = `[]`

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L11)

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)\> |
| `setPorts` | `AsyncPipeline`\<[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)\> |

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L6)

___

### state

• `Abstract` **state**: [`ThreadState`](Interfaces_Classes_ThreadState.ThreadState.md)\<[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)\>

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L13)

## Methods

### addComm

▸ **addComm**(`comm`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comm` | `CommBase` \| `CommManager` |

#### Returns

`void`

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

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L39)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

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

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L18)
