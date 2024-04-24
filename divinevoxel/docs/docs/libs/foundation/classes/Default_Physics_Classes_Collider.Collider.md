---
id: "Default_Physics_Classes_Collider.Collider"
title: "Class: Collider"
sidebar_label: "Collider"
custom_edit_url: null
---

[Default/Physics/Classes/Collider](../modules/Default_Physics_Classes_Collider.md).Collider

## Hierarchy

- **`Collider`**

  ↳ [`BoxCollider`](Default_Physics_Colliders_default_Box_Box_collider.BoxCollider.md)

  ↳ [`ClimableBoxCollider`](Default_Physics_Colliders_default_Box_ClimableBox_collider.ClimableBoxCollider.md)

  ↳ [`StairCollider`](Default_Physics_Colliders_default_Stair_Stair_collider.StairCollider.md)

## Constructors

### constructor

• **new Collider**(): [`Collider`](Default_Physics_Classes_Collider.Collider.md)

#### Returns

[`Collider`](Default_Physics_Classes_Collider.Collider.md)

## Properties

### flags

• `Abstract` **flags**: `Record`\<`string`, `number`\>

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L19)

___

### id

• `Abstract` **id**: `string`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L17)

___

### isSolid

• `Abstract` **isSolid**: `boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L18)

___

### nodes

• **nodes**: [`CollisionNode`](Default_Physics_Classes_CollisionNode.CollisionNode.md)[] = `[]`

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

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L25)

___

### hasFlag

▸ **hasFlag**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

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

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Collider.ts#L7)
