export const ColliderManager = {
    colliders: {},
    registerCollider(collider) {
        this.colliders[collider.id] = collider;
    },
    getCollider(id) {
        const collider = this.colliders[id];
        if (!collider) {
            throw new Error(`Collider with ${id} does not exists.`);
        }
        return collider;
    },
};
