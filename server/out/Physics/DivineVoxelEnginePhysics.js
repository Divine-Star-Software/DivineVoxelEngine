//matrix
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//objects
import { DVEM } from "../Math/DivineVoxelEngineMath.js";
import { CollisionsHanlder } from "./Collisions/CollisionsHandler.js";
import { EntityBase } from "./Entities/Entity.base.js";
import { ColliderManager } from "./Colliders/ColliderManager.js";
import { RegisterDefaultColliders } from "./Colliders/Functions/RegisterDefaultColliders.js";
export const DVEPH = {
    math: DVEM,
    collisions: CollisionsHanlder,
    colliders: ColliderManager,
    worldMatrix: WorldMatrix,
    $INIT() {
        RegisterDefaultColliders(this.colliders);
    },
    getCollider(x, y, z) {
        const voxelData = WorldMatrix.getVoxelData(x, y, z);
        if (!voxelData)
            return false;
        if (!voxelData.physics) {
            return this.colliders.getCollider("Box");
        }
        if (!voxelData.physics.checkCollisions)
            return false;
        return this.colliders.getCollider(voxelData.physics.collider);
    },
    createEntityObject(base) {
        const newBase = Object.create(EntityBase);
        const assignedBase = Object.assign(newBase, base);
        return assignedBase;
    },
};
