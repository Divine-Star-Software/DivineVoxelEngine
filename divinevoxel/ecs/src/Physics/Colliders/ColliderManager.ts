import type { Collider } from "../Classes/Collider";

export const ColliderManager = {
  colliders: <Record<string, Collider>>{},

  registerCollider(collider: Collider | Collider[]) {
    if (Array.isArray(collider)) {
      return collider.forEach((_) => (this.colliders[_.id] = _));
    }
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
