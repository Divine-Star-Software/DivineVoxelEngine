//objects
import { VoxelMath } from "../Libs/Math/VoxelMath.js";
import { CollisionsHanlder } from "./Collisions/CollisionsHandler.js";
import { EntityBase } from "./Entities/Entity.base.js";
import { ColliderManager } from "./Colliders/ColliderManager.js";
import { RegisterDefaultColliders } from "./Colliders/Functions/RegisterDefaultColliders.js";
import { WorldPainter } from "../Data/World/WorldPainter.js";
import { DataTool } from "../Tools/Data/DataTool.js";
export const DVEPH = {
    math: VoxelMath,
    collisions: CollisionsHanlder,
    colliders: ColliderManager,
    wroldData: WorldPainter,
    _dataTool: new DataTool(),
    voxelManager: null,
    $INIT(manager) {
        RegisterDefaultColliders(this.colliders);
        this.voxelManager = manager;
    },
    getCollider(x, y, z, dimension = 0) {
        if (!this.voxelManager) {
            throw new Error("Voxel manager must be set for DVEP.");
        }
        if (!this._dataTool.loadIn(x, y, z))
            return false;
        if (!this._dataTool.isRenderable())
            return false;
        if (this._dataTool.getSubstance() == "fluid")
            return false;
        const voxelData = this.voxelManager.getVoxelData(this._dataTool.getStringId());
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
