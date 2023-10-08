import type { PhysicsDataTool } from "Tools/Data/PhysicsDataTool";
import { Collider } from "../../../Classes/Collider.js";

export class BoxCollider extends Collider {
  id = "#dve_box";
  isSolid = true;
  flags ={};

  constructor() {
    super();
    this.addNode("main", Collider.createBBox());
  }
  getNodes(dataTool: PhysicsDataTool) {
    this.nodes[0].position.set(dataTool.x, dataTool.y, dataTool.z);
    return this.nodes;
  }
}
