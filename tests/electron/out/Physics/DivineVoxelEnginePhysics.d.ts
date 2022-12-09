import type { ColliderObject } from "Meta/Interfaces/Physics/Collider.type.js";
import { EntityBase } from "./Entities/Entity.base.js";
import type { VoxelManager } from "Data/Voxel/VoxelManager.js";
import { DataTool } from "../Tools/Data/DataTool.js";
export declare const DVEPH: {
    math: {
        visitAll: (startPoint: import("../Meta/Util.types.js").Vector3, endPoint: import("../Meta/Util.types.js").Vector3, visitor?: (x: number, y: number, z: number) => boolean) => number[];
        getVector3(x: number, y: number, z: number): import("../Libs/Math/Classes/Vector3.js").Vector3;
        getPlane(pv1: import("../Libs/Math/Classes/Vector3.js").Vector3, pv2: import("../Libs/Math/Classes/Vector3.js").Vector3, pv3: import("../Libs/Math/Classes/Vector3.js").Vector3, pv4: import("../Libs/Math/Classes/Vector3.js").Vector3): import("../Libs/Math/Classes/Plane.js").Plane;
        getSimpleBoundingBox(origin: import("../Libs/Math/Classes/Vector3.js").Vector3, dimensions: import("../Libs/Math/Types/Math.types.js").DimensionsVector3): import("../Libs/Math/Classes/SimpleBoundingBox.js").SimpleBoundingBox;
        getBoundingBox(data: import("../Libs/Math/Classes/BoundingBox.js").BoundingBoxData): import("../Libs/Math/Classes/BoundingBox.js").BoundingBox;
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
    wroldData: {
        _currentionDimension: string;
        util: {
            isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
        };
        paint: {
            _dt: DataTool;
            voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
            voxelAsync(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
            __paint(dimension: string, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
            erease(dimensionId: string | number, x: number, y: number, z: number): void;
        };
    };
    _dataTool: DataTool;
    voxelManager: {
        voxelData: Record<string, import("../Meta/index.js").VoxelData>;
        _onRegister: (data: import("../Meta/index.js").VoxelData) => void;
        getVoxelData(id: string): import("../Meta/index.js").VoxelData;
        registerVoxelData(data: import("../Meta/index.js").VoxelData): void;
        onRegister(func: (data: import("../Meta/index.js").VoxelData) => void): void;
    } | null;
    $INIT(manager: typeof VoxelManager): void;
    getCollider(x: number, y: number, z: number, dimension?: number): false | ColliderObject;
    createEntityObject(): EntityBase;
};
export declare type DivineVoxelEnginePhysics = typeof DVEPH;
