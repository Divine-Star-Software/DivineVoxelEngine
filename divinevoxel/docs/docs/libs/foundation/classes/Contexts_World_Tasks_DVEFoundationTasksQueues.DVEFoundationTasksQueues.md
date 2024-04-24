---
id: "Contexts_World_Tasks_DVEFoundationTasksQueues.DVEFoundationTasksQueues"
title: "Class: DVEFoundationTasksQueues"
sidebar_label: "DVEFoundationTasksQueues"
custom_edit_url: null
---

[Contexts/World/Tasks/DVEFoundationTasksQueues](../modules/Contexts_World_Tasks_DVEFoundationTasksQueues.md).DVEFoundationTasksQueues

## Constructors

### constructor

• **new DVEFoundationTasksQueues**(): [`DVEFoundationTasksQueues`](Contexts_World_Tasks_DVEFoundationTasksQueues.DVEFoundationTasksQueues.md)

#### Returns

[`DVEFoundationTasksQueues`](Contexts_World_Tasks_DVEFoundationTasksQueues.DVEFoundationTasksQueues.md)

## Properties

### \_queueMap

• **\_queueMap**: `Map`\<`string` \| `number`, `number`\>

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L43)

___

### buildChunk

• **buildChunk**: `QueueManager`\<[`PriorityTask`](../modules/Types_Tasks_types.md#prioritytask)\<[`BuildTasks`](../modules/Types_Tasks_types.md#buildtasks)\>\>

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:95](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L95)

___

### decorate

• **decorate**: `QueueManager`\<[`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:97](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L97)

___

### generate

• **generate**: `QueueManager`\<[`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:96](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L96)

___

### propagation

• **propagation**: `QueueManager`\<[`UpdateTasks`](../modules/Types_Tasks_types.md#updatetasks)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:94](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L94)

___

### worldSun

• **worldSun**: `QueueManager`\<[`UpdateTasks`](../modules/Types_Tasks_types.md#updatetasks)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L93)

## Methods

### addQueue

▸ **addQueue**(`queueKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `queueKey` | `string` \| `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L44)

___

### filterOldQueues

▸ **filterOldQueues**(`maxTime?`): `void`

# Filter Old Queues
---
Will remove queues older then 10 minutes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `maxTime` | `number` | `600000` | Max time in miliseconds. |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:84](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L84)

___

### filterQueues

▸ **filterQueues**(`filter`): `void`

# Filter Queues
---
Go through each current queue. IF the passed fucntion returns false it will remove that queue.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`queueKey`: `string` \| `number`) => `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:72](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L72)

___

### init

▸ **init**(`dve`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dve` | [`DVEFWorldCore`](Contexts_World_DVEFWorldCore.DVEFWorldCore.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L14)

___

### removeQueue

▸ **removeQueue**(`queueKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `queueKey` | `string` \| `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts:57](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/World/Tasks/DVEFoundationTasksQueues.ts#L57)
