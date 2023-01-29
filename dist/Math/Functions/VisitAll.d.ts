import type { Vector3 } from "Meta/Util.types";
/** # Visit All
 * ---
 * Given a starting point and an end point it will visit all voxels that are between them.
 * @param startPoint
 * @param endPoint
 * @param visitor
 * @returns an array of numbers with a stride of 3 for positions
 */
export declare const VisitAll: (startPoint: Vector3, endPoint: Vector3, visitor?: (x: number, y: number, z: number) => boolean) => number[];
