---
id: "Default_Tools_Tasks_TasksTool.TaskTool"
title: "Class: TaskTool"
sidebar_label: "TaskTool"
custom_edit_url: null
---

[Default/Tools/Tasks/TasksTool](../modules/Default_Tools_Tasks_TasksTool.md).TaskTool

## Constructors

### constructor

• **new TaskTool**(): [`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Returns

[`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L32)

## Properties

### \_data

• **\_data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dimension` | `string` |
| `queue` | `string` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L25)

___

### \_priority

• **\_priority**: [`Priorities`](../modules/Types_Tasks_types.md#priorities) = `0`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L31)

___

### \_thread

• **\_thread**: `string` = `""`

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L30)

___

### anaylzer

• **anaylzer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `update` | \{ `run`: (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `update.run` | (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:174](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L174)

___

### build

• **build**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunk` | \{ `deferred`: \{ `run`: (`buildTasks`: [`BuildTasks`](../modules/Types_Tasks_types.md#buildtasks), `onDone`: (`data`: `any`) => `void`) => `void`  } ; `queued`: \{ `add`: (`location`: `LocationData`) => `void` ; `run`: (`onDone`: `Function`) => `void` ; `runAndAwait`: () => `Promise`\<`void`\>  }  } |
| `chunk.deferred` | \{ `run`: (`buildTasks`: [`BuildTasks`](../modules/Types_Tasks_types.md#buildtasks), `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `chunk.deferred.run` | (`buildTasks`: [`BuildTasks`](../modules/Types_Tasks_types.md#buildtasks), `onDone`: (`data`: `any`) => `void`) => `void` |
| `chunk.queued` | \{ `add`: (`location`: `LocationData`) => `void` ; `run`: (`onDone`: `Function`) => `void` ; `runAndAwait`: () => `Promise`\<`void`\>  } |
| `chunk.queued.add` | (`location`: `LocationData`) => `void` |
| `chunk.queued.run` | (`onDone`: `Function`) => `void` |
| `chunk.queued.runAndAwait` | () => `Promise`\<`void`\> |
| `column` | \{ `deferred`: \{ `run`: (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void`  } ; `queued`: {} = \{} } |
| `column.deferred` | \{ `run`: (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `column.deferred.run` | (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void` |
| `column.queued` | {} |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:99](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L99)

___

### decorate

• **decorate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deferred` | \{ `run`: (`location`: `LocationData`, `data`: `any`, `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `deferred.run` | (`location`: `LocationData`, `data`: `any`, `onDone`: (`data`: `any`) => `void`) => `void` |
| `queued` | \{ `add`: (`data`: [`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks)) => `Promise`\<`void`\> ; `run`: (`onDone`: `Function`) => `void` ; `runAndAwait`: () => `Promise`\<`void`\>  } |
| `queued.add` | (`data`: [`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks)) => `Promise`\<`void`\> |
| `queued.run` | (`onDone`: `Function`) => `void` |
| `queued.runAndAwait` | () => `Promise`\<`void`\> |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:243](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L243)

___

### explosion

• **explosion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `run` | (`location`: `LocationData`, `radius`: `number`, `onDone`: (`data`: `any`) => `void`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:158](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L158)

___

### generate

• **generate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deferred` | \{ `run`: (`location`: `LocationData`, `data`: `any`, `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `deferred.run` | [object Object] |
| `queued` | \{ `add`: (`data`: [`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks)) => `void` ; `run`: (`onDone`: `Function`) => `void` ; `runAndAwait`: () => `Promise`\<`void`\>  } |
| `queued.add` | (`data`: [`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks)) => `void` |
| `queued.run` | (`onDone`: `Function`) => `void` |
| `queued.runAndAwait` | () => `Promise`\<`void`\> |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:217](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L217)

___

### propagation

• **propagation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deferred` | \{ `run`: (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `deferred.run` | (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void` |
| `queued` | \{ `add`: (`location`: `LocationData`) => `void` ; `run`: (`onDone`: `Function`) => `void` ; `runAndAwait`: () => `Promise`\<`void`\>  } |
| `queued.add` | (`location`: `LocationData`) => `void` |
| `queued.run` | (`onDone`: `Function`) => `void` |
| `queued.runAndAwait` | () => `Promise`\<`void`\> |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:188](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L188)

___

### voxelUpdate

• **voxelUpdate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `erase` | \{ `run`: (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`, `mode`: [`TaskRunModes`](../modules/Default_Tools_Tasks_TasksTool.md#taskrunmodes)) => `void`  } |
| `erase.run` | (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`, `mode`: [`TaskRunModes`](../modules/Default_Tools_Tasks_TasksTool.md#taskrunmodes)) => `void` |
| `paint` | \{ `run`: (`location`: `LocationData`, `raw`: `RawVoxelData`, `onDone`: (`data`: `any`) => `void`, `mode`: [`TaskRunModes`](../modules/Default_Tools_Tasks_TasksTool.md#taskrunmodes)) => `void`  } |
| `paint.run` | (`location`: `LocationData`, `raw`: `RawVoxelData`, `onDone`: (`data`: `any`) => `void`, `mode`: [`TaskRunModes`](../modules/Default_Tools_Tasks_TasksTool.md#taskrunmodes)) => `void` |
| `update` | \{ `run`: (`location`: `LocationData`, `raw`: `RawVoxelData`, `onDone`: (`data`: `any`) => `void`, `mode`: [`TaskRunModes`](../modules/Default_Tools_Tasks_TasksTool.md#taskrunmodes)) => `void`  } |
| `update.run` | (`location`: `LocationData`, `raw`: `RawVoxelData`, `onDone`: (`data`: `any`) => `void`, `mode`: [`TaskRunModes`](../modules/Default_Tools_Tasks_TasksTool.md#taskrunmodes)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:50](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L50)

___

### worldSun

• **worldSun**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deferred` | \{ `run`: (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void`  } |
| `deferred.run` | (`location`: `LocationData`, `onDone`: (`data`: `any`) => `void`) => `void` |
| `queued` | \{ `add`: (`location`: `LocationData`) => `void` ; `run`: (`onDone`: `Function`) => `void` ; `runAndAwait`: () => `Promise`\<`void`\>  } |
| `queued.add` | (`location`: `LocationData`) => `void` |
| `queued.run` | (`onDone`: `Function`) => `void` |
| `queued.runAndAwait` | () => `Promise`\<`void`\> |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:269](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L269)

## Methods

### setFocalPoint

▸ **setFocalPoint**(`location`): [`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

[`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L41)

___

### setPriority

▸ **setPriority**(`priority`): [`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `priority` | [`Priorities`](../modules/Types_Tasks_types.md#priorities) |

#### Returns

[`TaskTool`](Default_Tools_Tasks_TasksTool.TaskTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Tasks/TasksTool.ts#L36)
