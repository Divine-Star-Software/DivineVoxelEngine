import type { PhysicsDataTool } from "../Tools/Data/PhysicsDataTool";
import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
import { BoundingBox } from "./BoundingBox.js";
import { CollisionNode } from "./CollisionNode.js";

export abstract class Collider {
  static createBBox(
    width: number = 1,
    height: number = width,
    depth: number = width
  ) {
    const bbox = new BoundingBox(width, height, depth);
    bbox.setPosition(new Vector3(0, 0, 0));
    return bbox;
  }
  nodes: CollisionNode[] = [];
  abstract id: string;
  abstract isSolid: boolean;
  abstract flags: Record<string, number>;

  addNode(name: string, boundingBox: BoundingBox) {
    this.nodes.push(new CollisionNode(name, boundingBox));
  }

  abstract getNodes(dataTool: PhysicsDataTool): CollisionNode[];

  hasFlag(id: string) {
    return this.flags[id] !== undefined;
  }
}
