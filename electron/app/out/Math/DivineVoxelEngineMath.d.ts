import { BoundingBox, BoundingBoxData } from "./Classes/BoundingBox.js";
import { Plane } from "./Classes/Plane.js";
import { SimpleBoundingBox } from "./Classes/SimpleBoundingBox.js";
import { Vector3 } from "./Classes/Vector3.js";
import { DimensionsVector3 } from "./Types/Math.types.js";
/**# Divine Voxel Engine Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
export declare const DVEM: {
    /** # Visit All
     * ---
     * Given a starting point and an end point it will visit all voxels that are between them.
     * @param startPoint
     * @param endPoint
     * @param visitor
     * @returns an array of numbers with a stride of 3 for positions
     */
    visitAll: (startPoint: import("../Meta/Util.types.js").Position3Matrix, endPoint: import("../Meta/Util.types.js").Position3Matrix, visitor?: (x: number, y: number, z: number) => boolean) => number[];
    getVector3(x: number, y: number, z: number): Vector3;
    getPlane(pv1: Vector3, pv2: Vector3, pv3: Vector3, pv4: Vector3): Plane;
    getSimpleBoundingBox(origin: Vector3, dimensions: DimensionsVector3): SimpleBoundingBox;
    getBoundingBox(data: BoundingBoxData): BoundingBox;
    convertToOriginGridSpace(position: number[]): number[];
};
export declare type DivineVoxelEngineMath = typeof DVEM;
