import { Plane } from "./Plane.js";
export declare type BoundingBoxData = {
    topPlane: Plane;
    bottomPlane: Plane;
    northPlane: Plane;
    southPlane: Plane;
    eastPlane: Plane;
    westPlane: Plane;
};
export declare class BoundingBox {
    topPlane: Plane;
    bottomPlane: Plane;
    northPlane: Plane;
    southPlane: Plane;
    eastPlane: Plane;
    westPlane: Plane;
    bounds: {
        minX: number;
        maxX: number;
        minZ: number;
        maxZ: number;
        minY: number;
        maxY: number;
    };
    constructor(data: BoundingBoxData);
    _doMinMaxCheck(plane: Plane): void;
}
