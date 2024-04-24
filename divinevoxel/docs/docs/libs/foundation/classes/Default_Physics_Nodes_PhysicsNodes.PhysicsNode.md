---
id: "Default_Physics_Nodes_PhysicsNodes.PhysicsNode"
title: "Class: PhysicsNode"
sidebar_label: "PhysicsNode"
custom_edit_url: null
---

[Default/Physics/Nodes/PhysicsNodes](../modules/Default_Physics_Nodes_PhysicsNodes.md).PhysicsNode

# Physics Node
Holds the most basic information for a physics based object.

## Constructors

### constructor

• **new PhysicsNode**(): [`PhysicsNode`](Default_Physics_Nodes_PhysicsNodes.PhysicsNode.md)

#### Returns

[`PhysicsNode`](Default_Physics_Nodes_PhysicsNodes.PhysicsNode.md)

## Properties

### \_\_delta

• **\_\_delta**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L22)

___

### \_\_previousPosiiton

• **\_\_previousPosiiton**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L21)

___

### acceleration

• **acceleration**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L24)

___

### boundingBox

• **boundingBox**: [`BoundingBox`](Default_Physics_Classes_BoundingBox.BoundingBox.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L30)

___

### dataTool

• **dataTool**: [`PhysicsDataTool`](Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L32)

___

### delta

• **delta**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:29](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L29)

___

### direction

• **direction**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L28)

___

### doCollision

• **doCollision**: `ColliderHanlder`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L34)

___

### position

• **position**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L27)

___

### probe

• **probe**: [`PhysicsProbe`](Default_Physics_Tools_Data_PhysicsProbe.PhysicsProbe.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:31](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L31)

___

### velocity

• **velocity**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L25)

## Methods

### applyForces

▸ **applyForces**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L55)

___

### calculateFinalDirection

▸ **calculateFinalDirection**(`forwardDirection`, `sideDirection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `forwardDirection` | `Vector3` |
| `sideDirection` | `Vector3` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:61](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L61)

___

### setCollisionHanlder

▸ **setCollisionHanlder**(`handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `ColliderHanlder` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L36)

___

### setLocation

▸ **setLocation**(`location`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:40](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L40)

___

### setPosition

▸ **setPosition**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L46)

___

### syncPosition

▸ **syncPosition**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Position3Matrix` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Nodes/PhysicsNodes.ts#L49)
