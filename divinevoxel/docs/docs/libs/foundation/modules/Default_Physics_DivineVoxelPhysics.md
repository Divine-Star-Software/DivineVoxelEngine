---
id: "Default_Physics_DivineVoxelPhysics"
title: "Module: Default/Physics/DivineVoxelPhysics"
sidebar_label: "Default/Physics/DivineVoxelPhysics"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### DivineVoxelEnginePhysics

Ƭ **DivineVoxelEnginePhysics**: typeof [`DVP`](Default_Physics_DivineVoxelPhysics.md#dvp)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/DivineVoxelPhysics.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/DivineVoxelPhysics.ts#L22)

## Variables

### DVP

• `Const` **DVP**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `colliders` | \{ `colliders`: `Record`\<`string`, [`Collider`](../classes/Default_Physics_Classes_Collider.Collider.md)\> ; `getCollider`: (`id`: `string`) => [`Collider`](../classes/Default_Physics_Classes_Collider.Collider.md) ; `registerCollider`: (`collider`: [`Collider`](../classes/Default_Physics_Classes_Collider.Collider.md) \| [`Collider`](../classes/Default_Physics_Classes_Collider.Collider.md)[]) => `void`  } |
| `colliders.colliders` | `Record`\<`string`, [`Collider`](../classes/Default_Physics_Classes_Collider.Collider.md)\> |
| `colliders.getCollider` | [object Object] |
| `colliders.registerCollider` | [object Object] |
| `collisions` | \{ `aabb`: \{ `delta`: `Vector3` ; `dimensions`: `Vector3` ; `line`: [`Line`](../classes/Default_Physics_Classes_Line.Line.md) ; `plane`: [`Plane`](../classes/Default_Physics_Classes_Plane.Plane.md) ; `results`: [`CollisionResult`](../classes/Default_Physics_Classes_CollisionResult.CollisionResult.md) ; `start`: `Vector3`  } ; `COLLISION_CHECK_POSITION_OFFSET`:  ; `between`: (`x`: `number`, `a`: `number`, `b`: `number`) => `boolean` ; `processSwpetAABB`: (`node`: [`PhysicsNode`](../classes/Default_Physics_Nodes_PhysicsNodes.PhysicsNode.md)) => `void` ; `sweepAABBN`: (`physicsNodePosition`: `Vector3`, `boundingBox`: [`BoundingBox`](../classes/Default_Physics_Classes_BoundingBox.BoundingBox.md), `collisionNode`: [`CollisionNode`](../classes/Default_Physics_Classes_CollisionNode.CollisionNode.md), `velocity`: `Vector3`) => \{ `hitDepth`: `number` = 1; `nx`: `number` = 0; `ny`: `number` = 0; `nz`: `number` = 0 }  } |
| `collisions.aabb` | \{ `delta`: `Vector3` ; `dimensions`: `Vector3` ; `line`: [`Line`](../classes/Default_Physics_Classes_Line.Line.md) ; `plane`: [`Plane`](../classes/Default_Physics_Classes_Plane.Plane.md) ; `results`: [`CollisionResult`](../classes/Default_Physics_Classes_CollisionResult.CollisionResult.md) ; `start`: `Vector3`  } |
| `collisions.aabb.delta` | `Vector3` |
| `collisions.aabb.dimensions` | `Vector3` |
| `collisions.aabb.line` | [`Line`](../classes/Default_Physics_Classes_Line.Line.md) |
| `collisions.aabb.plane` | [`Plane`](../classes/Default_Physics_Classes_Plane.Plane.md) |
| `collisions.aabb.results` | [`CollisionResult`](../classes/Default_Physics_Classes_CollisionResult.CollisionResult.md) |
| `collisions.aabb.start` | `Vector3` |
| `get COLLISION_CHECK_POSITION_OFFSET()` | `number` |
| `collisions.between` | [object Object] |
| `collisions.processSwpetAABB` | [object Object] |
| `collisions.sweepAABBN` | [object Object] |
| `constants` | \{ `flags`: \{ `climbable`: `string` = "#dve\_climbable" } = DVPFlags } |
| `constants.flags` | \{ `climbable`: `string` = "#dve\_climbable" } |
| `constants.flags.climbable` | `string` |
| `math` | \{ `visitAll`: (`startPoint`: `Position3Matrix`, `endPoint`: `Position3Matrix`, `visitor?`: (`x`: `number`, `y`: `number`, `z`: `number`) => `boolean`) => `number`[] ; `convertToOriginGridSpace`: (`position`: `number`[]) => `number`[] ; `distance2D`: (`x1`: `number`, `x2`: `number`, `y1`: `number`, `y2`: `number`) => `number` ; `distance3D`: (`x1`: `number`, `y1`: `number`, `z1`: `number`, `x2`: `number`, `y2`: `number`, `z2`: `number`) => `number` ; `getBoundingBox`: (`data`: `BoundingBoxData`) => `BoundingBox` ; `getPlane`: (`pv1`: `Vector3`, `pv2`: `Vector3`, `pv3`: `Vector3`, `pv4`: `Vector3`) => `Plane` ; `getSimpleBoundingBox`: (`origin`: `Vector3`, `dimensions`: `DimensionsVector3`) => `SimpleBoundingBox` ; `getVector3`: (`x`: `number`, `y`: `number`, `z`: `number`) => `Vector3`  } |
| `math.visitAll` | (`startPoint`: `Position3Matrix`, `endPoint`: `Position3Matrix`, `visitor?`: (`x`: `number`, `y`: `number`, `z`: `number`) => `boolean`) => `number`[] |
| `math.convertToOriginGridSpace` | [object Object] |
| `math.distance2D` | [object Object] |
| `math.distance3D` | [object Object] |
| `math.getBoundingBox` | [object Object] |
| `math.getPlane` | [object Object] |
| `math.getSimpleBoundingBox` | [object Object] |
| `math.getVector3` | [object Object] |
| `getDataTool` | () => [`PhysicsDataTool`](../classes/Default_Physics_Tools_Data_PhysicsDataTool.PhysicsDataTool.md) |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/DivineVoxelPhysics.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/DivineVoxelPhysics.ts#L9)
