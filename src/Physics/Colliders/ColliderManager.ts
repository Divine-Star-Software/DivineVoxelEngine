import type { ColliderObject } from "Meta/Physics/Collider.type";

export const ColliderManager = {
 colliders: <Record<string, ColliderObject>>{},

 registerCollider(collider: ColliderObject) {
  this.colliders[collider.id] = collider;
 },

 getCollider(id: string) {
  const collider = this.colliders[id];
  if (!collider) {
   throw new Error(`Collider with ${id} does not exists.`);
  }
  return collider;
 },
};
