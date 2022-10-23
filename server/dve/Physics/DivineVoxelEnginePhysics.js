//objects
import { DVEM } from "../Libs/Math/DivineVoxelEngineMath.js";
import { CollisionsHanlder } from "./Collisions/CollisionsHandler.js";
import { EntityBase } from "./Entities/Entity.base.js";
import { ColliderManager } from "./Colliders/ColliderManager.js";
import { RegisterDefaultColliders } from "./Colliders/Functions/RegisterDefaultColliders.js";
import { WorldData } from "../Data/World/WorldData.js";
export const DVEPH = {
    math: DVEM,
    collisions: CollisionsHanlder,
    colliders: ColliderManager,
    wroldData: WorldData,
    voxelManager: null,
    $INIT(manager) {
        RegisterDefaultColliders(this.colliders);
        this.voxelManager = manager;
    },
    getCollider(x, y, z, dimension = 0) {
        if (!this.voxelManager) {
            throw new Error("Voxel manager must be set for DVEP.");
        }
        const voxelId = WorldData.voxel.get(dimension, x, y, z);
        if (!voxelId)
            return false;
        const id = voxelId[0];
        if (id == "dve:air" || id == "dve:barrier")
            return false;
        const voxelData = this.voxelManager.getVoxelData(id);
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
