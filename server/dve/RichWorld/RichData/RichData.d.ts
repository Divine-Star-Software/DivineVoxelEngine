import type { RichChunk } from "Meta/index";
import type { RichWorldRegion } from "Meta/World/WorldData/World.types";
export declare const RichData: {
    worldBounds: {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __worldColumnPosition: {
            x: number;
            z: number;
            y: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        syncBoundsWithArrays(): void;
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
        isPositonInBounds(x: number, y: number, z: number): boolean;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("Meta/index").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("Meta/index").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index").Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getRichPositionKey(x: number, y: number, z: number): string;
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKey(x: number, z: number, y?: number): string;
        getWorldColumnPosition(x: number, z: number, y?: number): {
            x: number;
            z: number;
            y: number;
        };
    };
    richRegions: Record<string, RichWorldRegion>;
    initalData: Record<string, any>;
    getRegion(x: number, y: number, z: number): false | RichWorldRegion;
    getChunk(x: number, y: number, z: number): false | RichChunk;
    addRegion(x: number, y: number, z: number): false | RichWorldRegion;
    addChunk(x: number, y: number, z: number): RichChunk;
    setData(x: number, y: number, z: number, data: any): void;
    getData<T>(x: number, y: number, z: number): false | T;
    removeData(x: number, y: number, z: number): void;
    registerInitalDataForVoxel(voxelId: string, data: any): void;
    hasInitalData(voxelId: string): boolean;
    setInitalData(voxelId: string, x: number, y: number, z: number): void;
};
