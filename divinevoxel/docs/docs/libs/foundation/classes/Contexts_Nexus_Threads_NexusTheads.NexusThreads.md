---
id: "Contexts_Nexus_Threads_NexusTheads.NexusThreads"
title: "Class: NexusThreads"
sidebar_label: "NexusThreads"
custom_edit_url: null
---

[Contexts/Nexus/Threads/NexusTheads](../modules/Contexts_Nexus_Threads_NexusTheads.md).NexusThreads

## Hierarchy

- `ThreadManager`

  ↳ **`NexusThreads`**

## Constructors

### constructor

• **new NexusThreads**(): [`NexusThreads`](Contexts_Nexus_Threads_NexusTheads.NexusThreads.md)

#### Returns

[`NexusThreads`](Contexts_Nexus_Threads_NexusTheads.NexusThreads.md)

#### Inherited from

ThreadManager.constructor

## Properties

### ConstructorComm

• **ConstructorComm**: `CommManager`

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts#L19)

___

### DataComm

• **DataComm**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts#L18)

___

### NexusComm

• **NexusComm**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts#L17)

___

### commMap

• **commMap**: `Map`\<`string`, `CommBase` \| `CommManager`\>

#### Inherited from

ThreadManager.commMap

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:9

___

### comms

• **comms**: (`CommBase` \| `CommManager`)[]

#### Inherited from

ThreadManager.comms

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:10

___

### parent

• **parent**: `CommBase` = `ThreadComm.parent`

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts#L15)

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

• **state**: [`NexusThreadState`](Contexts_Nexus_Threads_NexusThreadState.NexusThreadState.md)

#### Overrides

ThreadManager.state

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts#L14)

___

### world

• **world**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Nexus/Threads/NexusTheads.ts#L16)

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

ThreadManager.addComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:14

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
