import { BoundsObject, DimensionsVector3 } from "Math/Types/Math.types";
import { Position3Matrix } from "Math/Types/Math.types";
import { Vector3 } from "./Vector3.js";
export declare class SimpleBoundingBox {
    origin: Vector3;
    dimensions: DimensionsVector3;
    bounds: {
        minX: number;
        maxX: number;
        minZ: number;
        maxZ: number;
        minY: number;
        maxY: number;
    };
    checkBounds: {
        minX: number;
        maxX: number;
        minZ: number;
        maxZ: number;
        minY: number;
        maxY: number;
    };
    checkOrigin: Vector3;
    _voxelCheckMap: Record<string, boolean>;
    _voxelCheckPoints: number[][];
    _voxelBottomCheckPoints: number[][];
    _voxelOriginPoints: number[][];
    constructor(origin: Vector3, dimensions: DimensionsVector3);
    _updateBounds(): void;
    _updateCheckBounds(): void;
    updateOrigin(x: number, y: number, z: number): void;
    setOriginToCheckOrigin(): void;
    setCheckOrigin(x: number, y: number, z: number): void;
    getCurrentOriginPoints(): number[][];
    getVoxelCheckPoints(): number[][];
    getVoxelBottomCheckPoints(): number[][];
    _getPositionKey(x: number, y: number, z: number): string;
    isPointInsideBox(point: Position3Matrix): boolean;
    doesBoxIntersect(testBox: BoundsObject): boolean;
}
