import { BoundingBox, BoundingBoxData } from "./Classes/BoundingBox.js";
import { Plane } from "./Classes/Plane.js";
import { SimpleBoundingBox } from "./Classes/SimpleBoundingBox.js";
import { Vector3 } from "./Classes/Vector3.js";
import { VisitAll } from "./Functions/VisitAll.js";
import { DimensionsVector3 } from "./Types/Math.types.js";
/**# Divine Voxel Engine Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
export const DVEM = {
 /** # Visit All
  * ---
  * Given a starting point and an end point it will visit all voxels that are between them.
  * @param startPoint
  * @param endPoint
  * @param visitor
  * @returns an array of numbers with a stride of 3 for positions
  */
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
};

export type DivineVoxelEngineMath = typeof DVEM;

DVEM.visitAll;
