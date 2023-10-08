import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
import { BoundingBox } from "./BoundingBox.js";
import { CollisionResult } from "./CollisionResult.js";

export class CollisionNode {
  results = new CollisionResult();
  position = new Vector3(0, 0, 0);

  constructor(public name: string, public boundingBox: BoundingBox) {}
}
