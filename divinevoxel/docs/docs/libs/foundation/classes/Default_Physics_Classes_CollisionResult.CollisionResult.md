---
id: "Default_Physics_Classes_CollisionResult.CollisionResult"
title: "Class: CollisionResult"
sidebar_label: "CollisionResult"
custom_edit_url: null
---

[Default/Physics/Classes/CollisionResult](../modules/Default_Physics_Classes_CollisionResult.md).CollisionResult

## Constructors

### constructor

• **new CollisionResult**(): [`CollisionResult`](Default_Physics_Classes_CollisionResult.CollisionResult.md)

#### Returns

[`CollisionResult`](Default_Physics_Classes_CollisionResult.CollisionResult.md)

## Properties

### faceHit

• **faceHit**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | () => `boolean` |
| `east` | () => `boolean` |
| `north` | () => `boolean` |
| `south` | () => `boolean` |
| `top` | () => `boolean` |
| `west` | () => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L32)

___

### normalHit

• **normalHit**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | () => `number` |
| `y` | () => `number` |
| `z` | () => `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L40)

___

### raw

• **raw**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hitDepth` | `number` |
| `nx` | `number` |
| `ny` | `number` |
| `nz` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L2)

## Methods

### collided

▸ **collided**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L29)

___

### loadIn

▸ **loadIn**(`results`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | [`CollisionResult`](Default_Physics_Classes_CollisionResult.CollisionResult.md) |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L16)

___

### reset

▸ **reset**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L23)

___

### update

▸ **update**(`h`, `nx`, `ny`, `nz`): [`CollisionResult`](Default_Physics_Classes_CollisionResult.CollisionResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | `number` |
| `nx` | `number` |
| `ny` | `number` |
| `nz` | `number` |

#### Returns

[`CollisionResult`](Default_Physics_Classes_CollisionResult.CollisionResult.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/CollisionResult.ts#L9)
