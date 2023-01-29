import type { ColliderObject } from "Plugins/Physics/Types/Physics/Collider.type.js";
import { EntityBase } from "./Entities/Entity.base.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
export declare const DVP: {
    math: {
        visitAll: (startPoint: import("../../../Meta/Util.types.js").Vector3, endPoint: import("../../../Meta/Util.types.js").Vector3, visitor?: (x: number, y: number, z: number) => boolean) => number[];
        getVector3(x: number, y: number, z: number): import("../../../Math/Classes/Vector3.js").Vector3;
        getPlane(pv1: import("../../../Math/Classes/Vector3.js").Vector3, pv2: import("../../../Math/Classes/Vector3.js").Vector3, pv3: import("../../../Math/Classes/Vector3.js").Vector3, pv4: import("../../../Math/Classes/Vector3.js").Vector3): import("../../../Math/Classes/Plane.js").Plane;
        getSimpleBoundingBox(origin: import("../../../Math/Classes/Vector3.js").Vector3, dimensions: import("../../../Math/Types/Math.types.js").DimensionsVector3): import("../../../Math/Classes/SimpleBoundingBox.js").SimpleBoundingBox;
        getBoundingBox(data: import("../../../Math/Classes/BoundingBox.js").BoundingBoxData): import("../../../Math/Classes/BoundingBox.js").BoundingBox;
        convertToOriginGridSpace(position: number[]): number[];
        distance2D(x1: number, x2: number, y1: number, y2: number): number;
        distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    };
    collisions: {
        sweepAABB(ax: number, ay: number, az: number, ahx: number, ahy: number, ahz: number, bx: number, by: number, bz: number, bhx: number, bhy: number, bhz: number, dx: number, dy: number, dz: number): {
            h: number;
            nx: number;
            ny: number;
            nz: number;
        };
        lineToPlane(px: number, py: number, pz: number, ux: number, uy: number, uz: number, vx: number, vy: number, vz: number, nx: number, ny: number, nz: number): number;
        between(x: number, a: number, b: number): boolean;
    };
    colliders: {
        colliders: Record<string, ColliderObject>;
        registerCollider(collider: ColliderObject): void;
        getCollider(id: string): ColliderObject;
    };
    _dataTool: DataTool;
    getCollider(x: number, y: number, z: number, dimension?: number): false | ColliderObject;
    createEntityObject(): EntityBase;
};
export declare type DivineVoxelEnginePhysics = typeof DVP;
