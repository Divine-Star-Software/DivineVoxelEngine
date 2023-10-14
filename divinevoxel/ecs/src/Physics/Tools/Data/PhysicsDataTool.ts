import { DVP } from "../../DivineVoxelPhysics.js";
import { DataTool } from "@divinevoxel/core/Tools/Data/DataTool.js";

export class PhysicsDataTool extends DataTool {
  getColliderObj() {
    if (!this.checkCollisions()) return false;
    let collider = this.getCollider();
    return DVP.colliders.getCollider(collider != "none" ? collider : "Box");
  }
  isSolid() {
    return !this.isAir() && this.getSubstance() != "#dve_liquid";
  }
}
