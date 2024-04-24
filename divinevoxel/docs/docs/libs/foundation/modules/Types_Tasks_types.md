---
id: "Types_Tasks_types"
title: "Module: Types/Tasks.types"
sidebar_label: "Types/Tasks.types"
custom_edit_url: null
---

## Type Aliases

### AddToRebuildQueue

Ƭ **AddToRebuildQueue**: [location: LocationData, buildQueue: string, priority: Priorities]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L36)

___

### AnaylzerTask

Ƭ **AnaylzerTask**: [location: LocationData, buildQueue: string, originThread: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L30)

___

### BuildTasks

Ƭ **BuildTasks**: [location: LocationData, LOD: number]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L44)

___

### ExplosionTasks

Ƭ **ExplosionTasks**: [location: LocationData, radius: number, buildQueue: string, originThread: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L48)

___

### GenerateTasks

Ƭ **GenerateTasks**: [location: LocationData, data: any]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L46)

___

### GetRichDataTasks

Ƭ **GetRichDataTasks**: [location: LocationData, segment: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L65)

___

### LightUpdateTask

Ƭ **LightUpdateTask**: [`number`, `number`, `number`]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L16)

___

### LoadRegionHeadertasks

Ƭ **LoadRegionHeadertasks**: [location: LocationData, data: SharedArrayBuffer]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L60)

___

### LoadWorldDataTasks

Ƭ **LoadWorldDataTasks**: [location: LocationData, data: SharedArrayBuffer]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L55)

___

### Priorities

Ƭ **Priorities**: ``0`` \| ``1`` \| ``2`` \| ``3``

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L4)

___

### PriorityTask

Ƭ **PriorityTask**\<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `priority` | [`Priorities`](Types_Tasks_types.md#priorities) |

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L5)

___

### RequestFlowUpdateQueueData

Ƭ **RequestFlowUpdateQueueData**: \{ `flow`: \{ `rmeove`: `number`[][] ; `update`: `number`[][]  }  } & [`RequestLightUpdateQueueData`](Types_Tasks_types.md#requestlightupdatequeuedata)

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:88](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L88)

___

### RequestLightUpdateQueueData

Ƭ **RequestLightUpdateQueueData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rgb` | \{ `rmeove`: `number`[][] ; `update`: `number`[][]  } |
| `rgb.rmeove` | `number`[][] |
| `rgb.update` | `number`[][] |
| `sun` | \{ `rmeove`: `number`[][] ; `update`: `number`[][]  } |
| `sun.rmeove` | `number`[][] |
| `sun.update` | `number`[][] |

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:77](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L77)

___

### RequestsVoxelUpdateQueuesData

Ƭ **RequestsVoxelUpdateQueuesData**: \{ `flow`: \{ `rmeove`: `number`[][] ; `update`: `number`[][]  }  } & [`RequestLightUpdateQueueData`](Types_Tasks_types.md#requestlightupdatequeuedata)

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:95](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L95)

___

### RunRebuildTasks

Ƭ **RunRebuildTasks**: [buildQueue: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L42)

___

### SetRichColumnTasks

Ƭ **SetRichColumnTasks**: [location: LocationData, objectBuffer: ArrayBuffer]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:72](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L72)

___

### SetRichDataTasks

Ƭ **SetRichDataTasks**: [location: LocationData, segment: string, objectBuffer: ArrayBuffer]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L66)

___

### UpdateTasks

Ƭ **UpdateTasks**: [location: LocationData, buildQueue: string, originThread: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L18)

___

### VoxelUpdateTasks

Ƭ **VoxelUpdateTasks**: [location: LocationData, raw: RawVoxelData, buildQueue: string, originThread: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L23)

___

### WorldLockTasks

Ƭ **WorldLockTasks**: [dimension: string, start: Vec3Array, end: Vec3Array]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L10)

___

### WorldSunTask

Ƭ **WorldSunTask**: [location: LocationData, originThread: string]

#### Defined in

[divinevoxel/foundation/src/Types/Tasks.types.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Types/Tasks.types.ts#L17)
