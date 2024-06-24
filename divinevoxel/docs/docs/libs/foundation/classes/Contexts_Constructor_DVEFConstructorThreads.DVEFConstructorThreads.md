---
id: "Contexts_Constructor_DVEFConstructorThreads.DVEFConstructorThreads"
title: "Class: DVEFConstructorThreads"
sidebar_label: "DVEFConstructorThreads"
custom_edit_url: null
---

[Contexts/Constructor/DVEFConstructorThreads](../modules/Contexts_Constructor_DVEFConstructorThreads.md).DVEFConstructorThreads

## Hierarchy

- `ConstructorThreadManager`

  ↳ **`DVEFConstructorThreads`**

## Constructors

### constructor

• **new DVEFConstructorThreads**(): [`DVEFConstructorThreads`](Contexts_Constructor_DVEFConstructorThreads.DVEFConstructorThreads.md)

#### Returns

[`DVEFConstructorThreads`](Contexts_Constructor_DVEFConstructorThreads.DVEFConstructorThreads.md)

#### Overrides

ConstructorThreadManager.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorThreads.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorThreads.ts#L7)

## Properties

### commMap

• **commMap**: `Map`\<`string`, `Thread` \| `ThreadPool`\>

#### Inherited from

ConstructorThreadManager.commMap

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:9

___

### comms

• **comms**: (`Thread` \| `ThreadPool`)[]

#### Inherited from

ConstructorThreadManager.comms

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:10

___

### parent

• **parent**: `Thread`

#### Inherited from

ConstructorThreadManager.parent

#### Defined in

divinevoxel/core/dist/Interfaces/Constructor/Threads/ConstrcutorTheads.d.ts:6

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<`ThreadManager`\> |
| `setPorts` | `AsyncPipeline`\<`ThreadManager`\> |

#### Inherited from

ConstructorThreadManager.pipelines

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:5

___

### state

• **state**: [`DVEFConstructorThreadState`](Contexts_Constructor_DVEFConstructorThreadState.DVEFConstructorThreadState.md)

#### Overrides

ConstructorThreadManager.state

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorThreads.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorThreads.ts#L5)

___

### world

• **world**: `Thread`

#### Inherited from

ConstructorThreadManager.world

#### Defined in

divinevoxel/core/dist/Interfaces/Constructor/Threads/ConstrcutorTheads.d.ts:7

___

### instnace

▪ `Static` **instnace**: `ConstructorThreadManager`

#### Inherited from

ConstructorThreadManager.instnace

#### Defined in

divinevoxel/core/dist/Interfaces/Constructor/Threads/ConstrcutorTheads.d.ts:4

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

ConstructorThreadManager.addComm

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

ConstructorThreadManager.getComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:15

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

ConstructorThreadManager.init

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

ConstructorThreadManager.setCommPort

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:13
