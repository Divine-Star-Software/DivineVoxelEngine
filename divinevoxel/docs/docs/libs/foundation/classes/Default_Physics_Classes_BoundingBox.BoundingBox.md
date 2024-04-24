---
id: "Default_Physics_Classes_BoundingBox.BoundingBox"
title: "Class: BoundingBox"
sidebar_label: "BoundingBox"
custom_edit_url: null
---

[Default/Physics/Classes/BoundingBox](../modules/Default_Physics_Classes_BoundingBox.md).BoundingBox

## Constructors

### constructor

• **new BoundingBox**(`width?`, `height?`, `depth?`): [`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `width` | `number` | `1` |
| `height` | `number` | `width` |
| `depth` | `number` | `width` |

#### Returns

[`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L15)

## Properties

### \_full

• **\_full**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `d` | `number` |
| `h` | `number` |
| `w` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L12)

___

### \_half

• **\_half**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `d` | `number` |
| `h` | `number` |
| `w` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L13)

___

### bounds

• **bounds**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxX` | `number` |
| `maxY` | `number` |
| `maxZ` | `number` |
| `minX` | `number` |
| `minY` | `number` |
| `minZ` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L4)

___

### position

• **position**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L14)

## Accessors

### depth

• `get` **depth**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:48](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L48)

• `set` **depth**(`depth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:59](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L59)

___

### halfDepth

• `get` **halfDepth**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L69)

___

### halfHeight

• `get` **halfHeight**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:66](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L66)

___

### halfWidth

• `get` **halfWidth**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:63](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L63)

___

### height

• `get` **height**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:45](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L45)

• `set` **height**(`height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L55)

___

### width

• `get` **width**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:42](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L42)

• `set` **width**(`width`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:51](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L51)

## Methods

### doesIntersect

▸ **doesIntersect**(`boundingBox`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `boundingBox` | [`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md) |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:84](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L84)

___

### pointIsInside

▸ **pointIsInside**(`point`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | `Position3Matrix` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:73](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L73)

___

### query

▸ **query**(): `Generator`\<`Vec3Array`, `any`, `unknown`\>

#### Returns

`Generator`\<`Vec3Array`, `any`, `unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:95](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L95)

___

### setPosition

▸ **setPosition**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Vector3` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L32)

___

### update

▸ **update**(`width`, `height`, `depth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |
| `depth` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/BoundingBox.ts#L27)
