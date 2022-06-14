import { Vector3 } from "./Vector3";
export declare type PlaneConstrucotrData = {
    v1: Vector3;
    v2: Vector3;
    v3: Vector3;
    v4: Vector3;
};
export declare class Plane {
    v1: Vector3;
    v2: Vector3;
    v3: Vector3;
    v4: Vector3;
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    minY: number;
    maxY: number;
    constructor(data: PlaneConstrucotrData);
    _compareVales(v1: Vector3, v2: Vector3, axis: "x" | "y" | "z", minProperty: "minX" | "minY" | "minZ", maxProperty: "maxX" | "maxY" | "maxZ"): void;
    _minMaxCompare(v1: Vector3, v2: Vector3): void;
}
