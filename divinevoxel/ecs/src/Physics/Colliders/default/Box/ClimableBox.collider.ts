import type { PhysicsDataTool } from "../../../Tools/Data/PhysicsDataTool";
import { Collider } from "../../../Classes/Collider.js";
import { DVPFlags } from "../../../../Constants/Flags.js";

export class ClimableBoxCollider extends Collider {
  id = "#dve_climable_box";
  isSolid = false;
  flags = {
    [DVPFlags.climbable] : 1
  };

  constructor() {
    super();
    this.addNode("main", Collider.createBBox());
  }
  getNodes(dataTool: PhysicsDataTool) {
    this.nodes[0].position.set(dataTool.x, dataTool.y, dataTool.z);
    return this.nodes;
  }
}
