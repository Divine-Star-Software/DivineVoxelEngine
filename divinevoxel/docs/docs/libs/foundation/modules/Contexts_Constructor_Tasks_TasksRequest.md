---
id: "Contexts_Constructor_Tasks_TasksRequest"
title: "Module: Contexts/Constructor/Tasks/TasksRequest"
sidebar_label: "Contexts/Constructor/Tasks/TasksRequest"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### ExplosionTaskRequests

Ƭ **ExplosionTaskRequests**: `ReturnType`\<typeof [`getExplosionRequests`](Contexts_Constructor_Tasks_TasksRequest.md#getexplosionrequests)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts:275](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts#L275)

___

### FlowTaskRequests

Ƭ **FlowTaskRequests**: `ReturnType`\<typeof [`getFlowUpdateRequest`](Contexts_Constructor_Tasks_TasksRequest.md#getflowupdaterequest)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts:281](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts#L281)

___

### LightTaskRequest

Ƭ **LightTaskRequest**: `ReturnType`\<typeof [`getLightUpdateRequest`](Contexts_Constructor_Tasks_TasksRequest.md#getlightupdaterequest)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts:284](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts#L284)

___

### VoxelUpdateTaskRequest

Ƭ **VoxelUpdateTaskRequest**: `ReturnType`\<typeof [`getVoxelUpdateRequests`](Contexts_Constructor_Tasks_TasksRequest.md#getvoxelupdaterequests)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts:278](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts#L278)

___

### WorldSunTaskRequest

Ƭ **WorldSunTaskRequest**: `ReturnType`\<typeof [`getWorldSunRequests`](Contexts_Constructor_Tasks_TasksRequest.md#getworldsunrequests)\>

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts:287](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts#L287)

## Variables

### TasksRequest

• `Const` **TasksRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getExplosionRequests` | (`origin`: `LocationData`, `radius`: `number`, `buildQueue`: `string`, `originThread`: `string`) => `Request`\<`number`, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `Vec3Array` ; `rgb`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md)  }  }\> |
| `getFlowUpdateRequest` | (`origin`: `LocationData`, `buildQueue`: `string`, `originThread`: `string`) => `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md)  }  }\> |
| `getLightUpdateRequest` | (`origin`: `LocationData`, `buildQueue`: `string`, `originThread`: `string`) => `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md)  }  }\> |
| `getVoxelUpdateRequests` | (`origin`: `LocationData`, `buildQueue`: `string`, `originThread`: `string`) => `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md)  }  }\> |
| `getWorldSunRequests` | (`origin`: `LocationData`, `buildQueue`: `string`, `originThread`: `string`) => `Request`\<``null``, \{ `sun`: `number`[]  }\> |

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts:207](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/Tasks/TasksRequest.ts#L207)
