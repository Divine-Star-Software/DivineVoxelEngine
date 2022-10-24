import type { EntityObject } from "Meta/Physics/Entity.type.js";
import type { ColliderObject } from "Meta/Physics/Collider.type.js";
import { EntityBase } from "./Entities/Entity.base.js";
import type { VoxelManager } from "Data/Voxel/VoxelManager.js";
import { DataTool } from "../Tools/Data/DataTool.js";
export declare const DVEPH: {
    math: {
        visitAll: (startPoint: import("../Meta/Util.types.js").Position3Matrix, endPoint: import("../Meta/Util.types.js").Position3Matrix, visitor?: (x: number, y: number, z: number) => boolean) => number[];
        getVector3(x: number, y: number, z: number): import("../Libs/Math/Classes/Vector3.js").Vector3;
        getPlane(pv1: import("../Libs/Math/Classes/Vector3.js").Vector3, pv2: import("../Libs/Math/Classes/Vector3.js").Vector3, pv3: import("../Libs/Math/Classes/Vector3.js").Vector3, pv4: import("../Libs/Math/Classes/Vector3.js").Vector3): import("../Libs/Math/Classes/Plane.js").Plane;
        getSimpleBoundingBox(origin: import("../Libs/Math/Classes/Vector3.js").Vector3, dimensions: import("../Libs/Math/Types/Math.types.js").DimensionsVector3): import("../Libs/Math/Classes/SimpleBoundingBox.js").SimpleBoundingBox;
        getBoundingBox(data: import("../Libs/Math/Classes/BoundingBox.js").BoundingBoxData): import("../Libs/Math/Classes/BoundingBox.js").BoundingBox;
        convertToOriginGridSpace(position: number[]): number[];
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
        voxelPalette: import("../Meta/Data/WorldData.types.js").VoxelPalette;
        voxelPaletteMap: import("../Meta/Data/WorldData.types.js").VoxelPaletteMap;
        setCurrentDimension(id: string | number): void;
        setVoxelPalette(voxelPalette: import("../Meta/Data/WorldData.types.js").VoxelPalette, voxelPaletteMap: import("../Meta/Data/WorldData.types.js").VoxelPaletteMap): void;
        rawData: {
            get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
            set(dimensionId: string | number, x: number, y: number, z: number, data: number, secondary?: boolean): number;
        };
        util: {
            isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
        };
        voxel: {
            _air: [string, number];
            _barrier: [string, number];
            air: {
                isAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): true | undefined;
                set(dimensionId: string | number, x: number, y: number, z: number, light?: number, secondary?: boolean): void;
            };
            barrier: {
                isAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): true | undefined;
                set(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): void;
            };
            get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): false | [string, number];
            getData(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): false | {
                substance: import("../Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
            };
            id: {
                string(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): string | -1;
                stateNumeric(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                baseNumeric(id: number): number;
                baseNumericAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                stringFromNumber(id: number): string;
                numberFromString(id: string): number;
                getPaletteId(voxelId: string, voxelState: number): number;
            };
            data: {
                shapeId: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                    get(id: number): number;
                };
                substance: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): import("../Meta/index.js").VoxelSubstanceType;
                    get(id: number): import("../Meta/index.js").VoxelSubstanceType;
                };
                shapeState: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, state: number): number;
                    setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                };
                state: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, state: number): number;
                    setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                };
                lightSource: {
                    trueAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): boolean;
                    true(voxelId: number): boolean;
                };
                level: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, level: number): number;
                    setAt(dimensionId: string | number, x: number, y: number, z: number, level: number): void;
                    state: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                        get(data: number): number;
                        set(data: number, level: number): number;
                        setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                    };
                };
            };
        };
        heightMap: {
            update: {
                add(dimensionId: string | number, substance: import("../Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number): void;
                remove(dimensionId: string | number, substance: import("../Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number): void;
            };
        };
        paint: {
            getVoxelBrush(): void;
            voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
            voxelAsync(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
            __paint(dimension: string | number, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, chunk: import("../Meta/Data/WorldData.types.js").ChunkData, update?: boolean): false | undefined;
            erease(dimensionId: string | number, x: number, y: number, z: number): void;
            _worldGen: {
                getPaletteId(voxelId: string, voxelState: number): number;
            };
        };
        light: {
            get(dimesnionId: string | number, x: number, y: number, z: number): number;
            set(dimesnionId: string | number, x: number, y: number, z: number, lightValue: number): -1 | undefined;
            red: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
            green: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
            blue: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
            sun: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
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
    createEntityObject<T>(base: T): T & {
        active: boolean;
        position: import("../Libs/Math/Classes/Vector3.js").Vector3;
        direction: import("../Libs/Math/Classes/Vector3.js").Vector3;
        previousPosiiton: import("../Libs/Math/Classes/Vector3.js").Vector3;
        hitBox: {
            w: number;
            h: number;
            d: number;
        };
        speed: number;
        velocity: import("../Libs/Math/Classes/Vector3.js").Vector3;
        onGround: boolean;
        veloctiy: import("../Libs/Math/Classes/Vector3.js").Vector3;
        boundingBox: {
            w: number;
            h: number;
            d: number;
        };
        doCollision(x: number, y: number, z: number, colliderName: string, collisionData: {
            h: number;
            nx: number;
            ny: number;
            nz: number;
        }): void;
        setPosition(x: number, y: number, z: number): void;
        syncPosition(position: Float32Array): void;
        cachePosition(): void;
        setVelocity(x: number, y: number, z: number): void;
        applyVelocity(): void;
        beforeUpdate(): void;
        afterUpdate(): void;
        update(): void;
    } & EntityObject;
};
export declare type DivineVoxelEnginePhysics = typeof DVEPH;
