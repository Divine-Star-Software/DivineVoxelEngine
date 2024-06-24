---
id: "Contexts_World_DVEFWorldThreads.DVEFWorldThreads"
title: "Class: DVEFWorldThreads"
sidebar_label: "DVEFWorldThreads"
custom_edit_url: null
---

[Contexts/World/DVEFWorldThreads](../modules/Contexts_World_DVEFWorldThreads.md).DVEFWorldThreads

## Hierarchy

- `WorldThreadManager`

  ↳ **`DVEFWorldThreads`**

## Constructors

### constructor

• **new DVEFWorldThreads**(`core`): [`DVEFWorldThreads`](Contexts_World_DVEFWorldThreads.DVEFWorldThreads.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `core` | [`DVEFWorldCore`](Contexts_World_DVEFWorldCore.DVEFWorldCore.md) |

#### Returns

[`DVEFWorldThreads`](Contexts_World_DVEFWorldThreads.DVEFWorldThreads.md)

#### Overrides

WorldThreadManager.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts#L11)

## Properties

### commMap

• **commMap**: `Map`\<`string`, `Thread` \| `ThreadPool`\>

#### Inherited from

WorldThreadManager.commMap

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:9

___

### comms

• **comms**: (`Thread` \| `ThreadPool`)[]

#### Inherited from

WorldThreadManager.comms

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:10

___

### constructors

• **constructors**: `ThreadPool`

#### Inherited from

WorldThreadManager.constructors

#### Defined in

divinevoxel/core/dist/Interfaces/World/Threads/WorldThreads.d.ts:6

___

### core

• **core**: [`DVEFWorldCore`](Contexts_World_DVEFWorldCore.DVEFWorldCore.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts#L11)

___

### dataLoader

• **dataLoader**: `Thread`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts#L8)

___

### nexus

• **nexus**: `Thread`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts#L9)

___

### parent

• **parent**: `Thread`

#### Inherited from

WorldThreadManager.parent

#### Defined in

divinevoxel/core/dist/Interfaces/World/Threads/WorldThreads.d.ts:7

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<`ThreadManager`\> |
| `setPorts` | `AsyncPipeline`\<`ThreadManager`\> |

#### Inherited from

WorldThreadManager.pipelines

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:5

___

### richWorld

• **richWorld**: `Thread`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts#L7)

___

### state

• **state**: [`DVEFWorldThreadState`](Contexts_World_DVEFWorldThreadState.DVEFWorldThreadState.md)

#### Overrides

WorldThreadManager.state

#### Defined in

[divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/DVEFWorldThreads.ts#L6)

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

WorldThreadManager.addComm

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

WorldThreadManager.getComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:15

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

WorldThreadManager.init

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

WorldThreadManager.setCommPort

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:13
