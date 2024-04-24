---
id: "Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads"
title: "Class: DataLoaderThreads"
sidebar_label: "DataLoaderThreads"
custom_edit_url: null
---

[Contexts/DataLoader/Threads/DataLoaderThreads](../modules/Contexts_DataLoader_Threads_DataLoaderThreads.md).DataLoaderThreads

## Hierarchy

- `ThreadManager`

  ↳ **`DataLoaderThreads`**

## Constructors

### constructor

• **new DataLoaderThreads**(): [`DataLoaderThreads`](Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads.md)

#### Returns

[`DataLoaderThreads`](Contexts_DataLoader_Threads_DataLoaderThreads.DataLoaderThreads.md)

#### Inherited from

ThreadManager.constructor

## Properties

### Richworld

• **Richworld**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts#L11)

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

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts#L10)

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

• **state**: [`DataLoaderThreadState`](Contexts_DataLoader_Threads_DataLoaderThreadState.DataLoaderThreadState.md)

#### Overrides

ThreadManager.state

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts#L13)

___

### world

• **world**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Threads/DataLoaderThreads.ts#L12)

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
