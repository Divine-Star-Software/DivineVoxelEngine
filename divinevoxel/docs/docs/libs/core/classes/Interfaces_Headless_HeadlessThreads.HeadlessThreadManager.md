---
id: "Interfaces_Headless_HeadlessThreads.HeadlessThreadManager"
title: "Class: HeadlessThreadManager"
sidebar_label: "HeadlessThreadManager"
custom_edit_url: null
---

[Interfaces/Headless/HeadlessThreads](../modules/Interfaces_Headless_HeadlessThreads.md).HeadlessThreadManager

## Hierarchy

- [`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)

  ↳ **`HeadlessThreadManager`**

## Constructors

### constructor

• **new HeadlessThreadManager**(): [`HeadlessThreadManager`](Interfaces_Headless_HeadlessThreads.HeadlessThreadManager.md)

#### Returns

[`HeadlessThreadManager`](Interfaces_Headless_HeadlessThreads.HeadlessThreadManager.md)

#### Overrides

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[constructor](Interfaces_Classes_ThreadManager.ThreadManager.md#constructor)

#### Defined in

[divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts#L12)

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

### construcotrs

• **construcotrs**: `CommManager`

#### Defined in

[divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts#L5)

___

### parent

• **parent**: `CommBase` = `ThreadComm.parent`

#### Defined in

[divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts#L9)

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

• `Abstract` **state**: [`ThreadState`](Interfaces_Classes_ThreadState.ThreadState.md)\<[`ThreadManager`](Interfaces_Classes_ThreadManager.ThreadManager.md)\>

#### Inherited from

[ThreadManager](Interfaces_Classes_ThreadManager.ThreadManager.md).[state](Interfaces_Classes_ThreadManager.ThreadManager.md#state)

#### Defined in

[divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Classes/ThreadManager.ts#L13)

___

### world

• **world**: `CommBase`

#### Defined in

[divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Headless/HeadlessThreads.ts#L10)

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
