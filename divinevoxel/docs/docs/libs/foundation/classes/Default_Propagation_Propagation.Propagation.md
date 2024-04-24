---
id: "Default_Propagation_Propagation.Propagation"
title: "Class: Propagation"
sidebar_label: "Propagation"
custom_edit_url: null
---

[Default/Propagation/Propagation](../modules/Default_Propagation_Propagation.md).Propagation

## Hierarchy

- [`DVEPropagation`](Interfaces_Propagation_DVEPropagation.DVEPropagation.md)

  ↳ **`Propagation`**

## Constructors

### constructor

• **new Propagation**(): [`Propagation`](Default_Propagation_Propagation.Propagation.md)

#### Returns

[`Propagation`](Default_Propagation_Propagation.Propagation.md)

#### Inherited from

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[constructor](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#constructor)

## Methods

### explosion

▸ **explosion**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`number`, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `Vec3Array` ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[explosion](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#explosion)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L17)

___

### flowRemove

▸ **flowRemove**(`tasks`, `rebuild?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> | `undefined` |
| `rebuild` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[flowRemove](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#flowremove)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L24)

___

### flowUpdate

▸ **flowUpdate**(`tasks`, `rebuild?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `flow`: \{ `remove`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `noRemoveMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  } ; `update`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `queue`: `FlowVec3Array`  }  } ; `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> | `undefined` |
| `rebuild` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[flowUpdate](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#flowupdate)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L21)

___

### rgbRemove

▸ **rgbRemove**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[rgbRemove](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#rgbremove)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L35)

___

### rgbUpdate

▸ **rgbUpdate**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[rgbUpdate](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#rgbupdate)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L32)

___

### sunRemove

▸ **sunRemove**(`tasks`, `clearUpdateMap?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> | `undefined` |
| `clearUpdateMap` | `boolean` | `false` |

#### Returns

`void`

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[sunRemove](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#sunremove)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L43)

___

### sunUpdate

▸ **sunUpdate**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<`any`, \{ `rgb`: \{ `map`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `remove`: `number`[] ; `update`: `number`[]  } ; `sun`: \{ `remove`: `number`[] ; `remvoeMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md) ; `update`: `number`[] ; `updateMap`: [`VisitedMap`](Util_VisistedMap.VisitedMap.md)  }  }\> |

#### Returns

`void`

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[sunUpdate](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#sunupdate)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L39)

___

### worldSun

▸ **worldSun**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `Request`\<``null``, \{ `sun`: `number`[]  }\> |

#### Returns

`void`

#### Overrides

[DVEPropagation](Interfaces_Propagation_DVEPropagation.DVEPropagation.md).[worldSun](Interfaces_Propagation_DVEPropagation.DVEPropagation.md#worldsun)

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Propagation.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Propagation.ts#L28)
