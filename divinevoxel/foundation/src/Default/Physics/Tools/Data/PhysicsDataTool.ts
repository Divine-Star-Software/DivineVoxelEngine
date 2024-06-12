import { DVP } from "../../DivineVoxelPhysics.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";

export class PhysicsDataTool extends DataTool {
  getColliderObj() {
    if (!this.checkCollisions()) return false;
    let collider = this.getCollider();
    return DVP.colliders.getCollider(collider ? collider : "Box");
  }
  isSolid() {
    return !this.isAir() && this.getSubstanceStringId() != "#dve_liquid";
  }
}
