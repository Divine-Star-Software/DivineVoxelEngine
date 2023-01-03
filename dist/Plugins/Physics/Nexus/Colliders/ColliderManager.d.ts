import type { ColliderObject } from "Plugins/Physics/Types/Physics/Collider.type";
export declare const ColliderManager: {
    colliders: Record<string, ColliderObject>;
    registerCollider(collider: ColliderObject): void;
    getCollider(id: string): ColliderObject;
};
