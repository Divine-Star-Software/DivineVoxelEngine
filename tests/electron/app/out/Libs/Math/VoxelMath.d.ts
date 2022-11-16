import { BoundingBox, BoundingBoxData } from "./Classes/BoundingBox.js";
import { Plane } from "./Classes/Plane.js";
import { SimpleBoundingBox } from "./Classes/SimpleBoundingBox.js";
import { Vector3 } from "./Classes/Vector3.js";
import { DimensionsVector3 } from "./Types/Math.types.js";
/**# Voxel Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
export declare const VoxelMath: {
    visitAll: (startPoint: import("../../Meta/Util.types.js").Vector3, endPoint: import("../../Meta/Util.types.js").Vector3, visitor?: (x: number, y: number, z: number) => boolean) => number[];
    getVector3(x: number, y: number, z: number): Vector3;
    getPlane(pv1: Vector3, pv2: Vector3, pv3: Vector3, pv4: Vector3): Plane;
    getSimpleBoundingBox(origin: Vector3, dimensions: DimensionsVector3): SimpleBoundingBox;
    getBoundingBox(data: BoundingBoxData): BoundingBox;
    convertToOriginGridSpace(position: number[]): number[];
    distance2D(x1: number, x2: number, y1: number, y2: number): number;
    distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
};
export declare type VoxelMath = typeof VoxelMath;
