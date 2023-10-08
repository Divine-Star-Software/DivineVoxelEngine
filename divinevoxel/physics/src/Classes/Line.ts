import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
export class Line {
  start = new Vector3(0, 0, 0);
  end = new Vector3(1, 1, 1);

  update(start: Vector3, end: Vector3) {
    this.start.updateFromVec3(start);
    this.end.updateFromVec3(end);
    return this;
  }
}
