import type { ColliderManager } from "../ColliderManager";
//default colliders
import { BoxCollider } from "../default/Box/Box.collider.js";
import { StairCollider } from "../default/Stair/Stair.collider.js";
export function RegisterDefaultColliders(colliders: typeof ColliderManager) {
 colliders.registerCollider(BoxCollider);
 colliders.registerCollider(StairCollider);
}
