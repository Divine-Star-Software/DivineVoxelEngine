import { BoundingBox, BoundingBoxData } from "./Classes/BoundingBox.js";
import { Plane } from "./Classes/Plane.js";
import { SimpleBoundingBox } from "./Classes/SimpleBoundingBox.js";
import { Vector3 } from "./Classes/Vector3.js";
import { VisitAll } from "./Functions/VisitAll.js";
import { DimensionsVector3 } from "./Types/Math.types.js";
/**# Voxel Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
export const VoxelMath = {
 visitAll: VisitAll,

 getVector3(x: number, y: number, z: number) {
  return new Vector3(x, y, z);
 },

 getPlane(pv1: Vector3, pv2: Vector3, pv3: Vector3, pv4: Vector3) {
  return new Plane({
   v1: pv1,
   v2: pv2,
   v3: pv3,
   v4: pv4,
  });
 },

 getSimpleBoundingBox(origin: Vector3, dimensions: DimensionsVector3) {
  return new SimpleBoundingBox(origin, dimensions);
 },

 getBoundingBox(data: BoundingBoxData) {
  return new BoundingBox(data);
 },

 convertToOriginGridSpace(position: number[]) {
  position[0] = Math.round(position[0]) + 0.5;
  position[1] = Math.round(position[1]) + 0.5;
  position[2] = Math.round(position[2]) + 0.5;
  return position;
 },

 distance2D(x1: number, x2: number, y1: number, y2: number) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
 },

 distance3D(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
 ) {
  const a = x2 - x1;
  const b = y2 - y1;
  const c = z2 - z1;

  return Math.sqrt(a * a + b * b + c * c);
 },
};

export type VoxelMath = typeof VoxelMath;
