import { BoundsObject, DimensionsVector3 } from "Math/Types/Math.types";
import { Position3Matrix } from "Math/Types/Math.types";
import { Vector3 } from "./Vector3.js";
export declare class SimpleBoundingBox {
    origion: Vector3;
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
    checkOrigion: Vector3;
    _voxelCheckMap: Record<string, boolean>;
    _voxelCheckPoints: number[][];
    _voxelBottomCheckPoints: number[][];
    _voxelOrigionPoints: number[][];
    constructor(origion: Vector3, dimensions: DimensionsVector3);
    _updateBounds(): void;
    _updateCheckBounds(): void;
    updateOrigion(x: number, y: number, z: number): void;
    setOrigionToCheckOrigion(): void;
    setCheckOrigion(x: number, y: number, z: number): void;
    getCurrentOrigionPoints(): number[][];
    getVoxelCheckPoints(): number[][];
    getVoxelBottomCheckPoints(): number[][];
    _getPositionKey(x: number, y: number, z: number): string;
    isPointInsideBox(point: Position3Matrix): boolean;
    doesBoxIntersect(testBox: BoundsObject): boolean;
}
