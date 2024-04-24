---
id: "Meshing_Classes_VertexData.QuadVertexData"
title: "Class: QuadVertexData"
sidebar_label: "QuadVertexData"
custom_edit_url: null
---

[Meshing/Classes/VertexData](../modules/Meshing_Classes_VertexData.md).QuadVertexData

## Constructors

### constructor

• **new QuadVertexData**(): [`QuadVertexData`](Meshing_Classes_VertexData.QuadVertexData.md)

#### Returns

[`QuadVertexData`](Meshing_Classes_VertexData.QuadVertexData.md)

## Properties

### vertices

• **vertices**: `Record`\<[`QuadVerticies`](../enums/Meshing_Geometry_types.QuadVerticies.md), `number`\>

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L4)

## Methods

### add

▸ **add**(`v1`, `v2`, `v3`, `v4`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `number` |
| `v2` | `number` |
| `v3` | `number` |
| `v4` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:56](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L56)

___

### addAll

▸ **addAll**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L49)

___

### addToVertex

▸ **addToVertex**(`vertex`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertex` | [`QuadVerticies`](../enums/Meshing_Geometry_types.QuadVerticies.md) |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L18)

___

### forEach

▸ **forEach**(`run`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | (`vertex`: [`QuadVerticies`](../enums/Meshing_Geometry_types.QuadVerticies.md), `value`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:125](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L125)

___

### getAsArray

▸ **getAsArray**(): `number`[]

#### Returns

`number`[]

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L11)

___

### getVertex

▸ **getVertex**(`vertex`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertex` | [`QuadVerticies`](../enums/Meshing_Geometry_types.QuadVerticies.md) |

#### Returns

`number`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L24)

___

### isAllEqualTo

▸ **isAllEqualTo**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:85](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L85)

___

### isAllGreaterThan

▸ **isAllGreaterThan**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:101](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L101)

___

### isAllLessThan

▸ **isAllLessThan**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:117](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L117)

___

### isEqualTo

▸ **isEqualTo**(`v1`, `v2`, `v3`, `v4`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `number` |
| `v2` | `number` |
| `v3` | `number` |
| `v4` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:77](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L77)

___

### isGreaterThan

▸ **isGreaterThan**(`v1`, `v2`, `v3`, `v4`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `number` |
| `v2` | `number` |
| `v3` | `number` |
| `v4` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:93](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L93)

___

### isLessThan

▸ **isLessThan**(`v1`, `v2`, `v3`, `v4`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `number` |
| `v2` | `number` |
| `v3` | `number` |
| `v4` | `number` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:109](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L109)

___

### set

▸ **set**(`v1`, `v2`, `v3`, `v4`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `number` |
| `v2` | `number` |
| `v3` | `number` |
| `v4` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L35)

___

### setAll

▸ **setAll**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L28)

___

### setFromQuadData

▸ **setFromQuadData**(`vertexData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertexData` | [`QuadVertexData`](Meshing_Classes_VertexData.QuadVertexData.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L42)

___

### setVertex

▸ **setVertex**(`vertex`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertex` | [`QuadVerticies`](../enums/Meshing_Geometry_types.QuadVerticies.md) |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L15)

___

### subtract

▸ **subtract**(`v1`, `v2`, `v3`, `v4`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v1` | `number` |
| `v2` | `number` |
| `v3` | `number` |
| `v4` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:70](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L70)

___

### subtractAll

▸ **subtractAll**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:63](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L63)

___

### subtractFromVertex

▸ **subtractFromVertex**(`vertex`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertex` | [`QuadVerticies`](../enums/Meshing_Geometry_types.QuadVerticies.md) |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Meshing/Classes/VertexData.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Classes/VertexData.ts#L21)
