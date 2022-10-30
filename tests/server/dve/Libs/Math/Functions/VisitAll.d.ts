import type { Position3Matrix } from "Meta/Util.types";
/** # Visit All
 * ---
 * Given a starting point and an end point it will visit all voxels that are between them.
 * @param startPoint
 * @param endPoint
 * @param visitor
 * @returns an array of numbers with a stride of 3 for positions
 */
export declare const VisitAll: (startPoint: Position3Matrix, endPoint: Position3Matrix, visitor?: (x: number, y: number, z: number) => boolean) => number[];
