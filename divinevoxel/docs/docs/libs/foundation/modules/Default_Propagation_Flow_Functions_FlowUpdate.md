---
id: "Default_Propagation_Flow_Functions_FlowUpdate"
title: "Module: Default/Propagation/Flow/Functions/FlowUpdate"
sidebar_label: "Default/Propagation/Flow/Functions/FlowUpdate"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### FlowUpdate

▸ **FlowUpdate**(`tasks`, `rebuild?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](../classes/Util_VisistedMap.VisitedMap.md)  }  }\> | `undefined` |
| `rebuild` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Flow/Functions/FlowUpdate.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Flow/Functions/FlowUpdate.ts#L5)
