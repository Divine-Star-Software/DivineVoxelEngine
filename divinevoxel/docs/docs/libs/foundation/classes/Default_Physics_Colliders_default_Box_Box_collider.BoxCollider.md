---
id: "Default_Physics_Colliders_default_Box_Box_collider.BoxCollider"
title: "Class: BoxCollider"
sidebar_label: "BoxCollider"
custom_edit_url: null
---

[Default/Physics/Colliders/default/Box/Box.collider](../modules/Default_Physics_Colliders_default_Box_Box_collider.md).BoxCollider

## Hierarchy

- [`Collider`](Default_Physics_Classes_Collider.Collider.md)

  ↳ **`BoxCollider`**

## Constructors

### constructor

• **new BoxCollider**(): [`BoxCollider`](Default_Physics_Colliders_default_Box_Box_collider.BoxCollider.md)

#### Returns

[`BoxCollider`](Default_Physics_Colliders_default_Box_Box_collider.BoxCollider.md)

#### Overrides

[Collider](Default_Physics_Classes_Collider.Collider.md).[constructor](Default_Physics_Classes_Collider.Collider.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts#L9)

## Properties

### flags

• **flags**: `Object` = `{}`

#### Overrides

[Collider](Default_Physics_Classes_Collider.Collider.md).[flags](Default_Physics_Classes_Collider.Collider.md#flags)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts#L7)

___

### id

• **id**: `string` = `"#dve_box"`

#### Overrides

[Collider](Default_Physics_Classes_Collider.Collider.md).[id](Default_Physics_Classes_Collider.Collider.md#id)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts#L5)

___

### isSolid

• **isSolid**: `boolean` = `true`

#### Overrides

[Collider](Default_Physics_Classes_Collider.Collider.md).[isSolid](Default_Physics_Classes_Collider.Collider.md#issolid)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts#L6)

___

### nodes

• **nodes**: [`CollisionNode`](Default_Physics_Classes_CollisionNode.CollisionNode.md)[] = `[]`

#### Inherited from

[Collider](Default_Physics_Classes_Collider.Collider.md).[nodes](Default_Physics_Classes_Collider.Collider.md#nodes)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L16)

## Methods

### addNode

▸ **addNode**(`name`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `boundingBox` | [`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[Collider](Default_Physics_Classes_Collider.Collider.md).[addNode](Default_Physics_Classes_Collider.Collider.md#addnode)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L21)

___

### getNodes

▸ **getNodes**(`dataTool`): [`CollisionNode`](Default_Physics_Classes_CollisionNode.CollisionNode.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataTool` | [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md) |

#### Returns

[`CollisionNode`](Default_Physics_Classes_CollisionNode.CollisionNode.md)[]

#### Overrides

[Collider](Default_Physics_Classes_Collider.Collider.md).[getNodes](Default_Physics_Classes_Collider.Collider.md#getnodes)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Colliders/default/Box/Box.collider.ts#L13)

___

### hasFlag

▸ **hasFlag**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Inherited from

[Collider](Default_Physics_Classes_Collider.Collider.md).[hasFlag](Default_Physics_Classes_Collider.Collider.md#hasflag)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L27)

___

### createBBox

▸ **createBBox**(`width?`, `height?`, `depth?`): [`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `width` | `number` | `1` |
| `height` | `number` | `width` |
| `depth` | `number` | `width` |

#### Returns

[`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md)

#### Inherited from

[Collider](Default_Physics_Classes_Collider.Collider.md).[createBBox](Default_Physics_Classes_Collider.Collider.md#createbbox)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L7)
