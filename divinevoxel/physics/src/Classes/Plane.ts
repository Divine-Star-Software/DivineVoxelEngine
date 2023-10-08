import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
import { Line } from "./Line.js";

export class Plane {
  dimensions = new Vector3(0, 0, 0);
  normal = new Vector3(0, 0, 0);

  update(dimensions: Vector3, normal: Vector3) {
    this.dimensions.updateFromVec3(dimensions);
    this.normal.updateFromVec3(normal);
    return this;
  }
  /**# Line To Plane
   * @returns  a value between 0 and 1.
   *
   * 1 meaning there was no collision
   * and 0.5 meaning there was collision at the halfway mark of the bouding box.
   *
   */
  lineToPlane(line: Line) {
    const NdotU =
      this.normal.x * line.end.x +
      this.normal.y * line.end.y +
      this.normal.z * line.end.z;
    return NdotU == 0
      ? Infinity
      : (this.normal.x * (this.dimensions.x - line.start.x) +
          this.normal.y * (this.dimensions.y - line.start.y) +
          this.normal.z * (this.dimensions.z - line.start.z)) /
          NdotU;
  }
}
