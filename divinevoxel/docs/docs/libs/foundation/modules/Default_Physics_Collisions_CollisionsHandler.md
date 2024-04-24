---
id: "Default_Physics_Collisions_CollisionsHandler"
title: "Module: Default/Physics/Collisions/CollisionsHandler"
sidebar_label: "Default/Physics/Collisions/CollisionsHandler"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### CollisionsHanlder

• `Const` **CollisionsHanlder**: `Object`

# CollisionsHanlder
Handles collision handling for physics nodes.
***

The swept AABB code was adapted from this article:
https://luisreis.net/blog/aabb_collision_handling/

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aabb` | \{ `delta`: `Vector3` ; `dimensions`: `Vector3` ; `line`: [`Line`](../classes/Default_Physics_Classes_Line.Line.md) ; `plane`: [`Plane`](../classes/Default_Physics_Classes_Plane.Plane.md) ; `results`: [`CollisionResult`](../classes/Default_Physics_Classes_CollisionResult.CollisionResult.md) ; `start`: `Vector3`  } |
| `aabb.delta` | `Vector3` |
| `aabb.dimensions` | `Vector3` |
| `aabb.line` | [`Line`](../classes/Default_Physics_Classes_Line.Line.md) |
| `aabb.plane` | [`Plane`](../classes/Default_Physics_Classes_Plane.Plane.md) |
| `aabb.results` | [`CollisionResult`](../classes/Default_Physics_Classes_CollisionResult.CollisionResult.md) |
| `aabb.start` | `Vector3` |
| `get COLLISION_CHECK_POSITION_OFFSET()` | `number` |
| `between` | (`x`: `number`, `a`: `number`, `b`: `number`) => `boolean` |
| `processSwpetAABB` | (`node`: [`PhysicsNode`](../classes/Default_Physics_Nodes_PhysicsNodes.PhysicsNode.md)) => `void` |
| `sweepAABBN` | (`physicsNodePosition`: `Vector3`, `boundingBox`: [`BoundingBox`](../classes/Default_Physics_Classes_BoundingBox.BoundingBox.md), `collisionNode`: [`CollisionNode`](../classes/Default_Physics_Classes_CollisionNode.CollisionNode.md), `velocity`: `Vector3`) => \{ `hitDepth`: `number` = 1; `nx`: `number` = 0; `ny`: `number` = 0; `nz`: `number` = 0 } |

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Collisions/CollisionsHandler.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Collisions/CollisionsHandler.ts#L17)
