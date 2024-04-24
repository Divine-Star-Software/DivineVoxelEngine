---
id: "Interfaces_Propagation_DVEPropagation.DVEPropagation"
title: "Class: DVEPropagation"
sidebar_label: "DVEPropagation"
custom_edit_url: null
---

[Interfaces/Propagation/DVEPropagation](../modules/Interfaces_Propagation_DVEPropagation.md).DVEPropagation

## Hierarchy

- **`DVEPropagation`**

  ↳ [`Propagation`](Default_Propagation_Propagation.Propagation.md)

## Constructors

### constructor

• **new DVEPropagation**(): [`DVEPropagation`](Interfaces_Propagation_DVEPropagation.DVEPropagation.md)

#### Returns

[`DVEPropagation`](Interfaces_Propagation_DVEPropagation.DVEPropagation.md)

## Methods

### explosion

▸ **explosion**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`number`, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `Vec3Array` ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L17)

___

### flowRemove

▸ **flowRemove**(`tasks`, `rebuild?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |
| `rebuild?` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L12)

___

### flowUpdate

▸ **flowUpdate**(`tasks`, `rebuild?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |
| `rebuild?` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L11)

___

### rgbRemove

▸ **rgbRemove**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L14)

___

### rgbUpdate

▸ **rgbUpdate**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L13)

___

### sunRemove

▸ **sunRemove**(`tasks`, `update?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |
| `update?` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L16)

___

### sunUpdate

▸ **sunUpdate**(`tasks`, `update?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |
| `update?` | `boolean` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L15)

___

### worldSun

▸ **worldSun**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `sun`: `number`[]  }\> |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Interfaces/Propagation/DVEPropagation.ts#L10)
