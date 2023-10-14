import type { PhysicsDataTool } from "../../../Tools/Data/PhysicsDataTool";
import { Collider } from "../../../Classes/Collider.js";

export class StairCollider extends Collider {
  id = "#dve_stair";
  isSolid = true;
  flags = {};

  constructor() {
    super();
    this.addNode("stair-bottom", Collider.createBBox(1, 0.5, 1));
    this.addNode("stair-top", Collider.createBBox(1, 0.5, 0.5));
  }
  getNodes(dataTool: PhysicsDataTool) {
    this.nodes[0].position.set(dataTool.x, dataTool.y, dataTool.z);
    this.nodes[1].position.set(
      dataTool.x,
      dataTool.y + 0.5,
      dataTool.z
    );
    return this.nodes;
  }
}
