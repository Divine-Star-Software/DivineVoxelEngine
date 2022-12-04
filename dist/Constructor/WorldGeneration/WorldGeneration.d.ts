import type { WorldGenInterface } from "Meta/Interfaces/WorldGen/WorldGen.types";
import type { VoxelData } from "Meta/index.js";
import type { Vector3 } from "Meta/Util.types.js";
import { ChunkData } from "Meta/Data/WorldData.types.js";
export declare const WorldGeneration: {
    worldGen: WorldGenInterface | null;
    worldBounds: {
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        _hashMask(n: number): number;
        hash(x: number, y: number, z: number): number;
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionColumnWidth: number;
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
        __columnPosition: {
            x: number;
            z: number;
            y: number;
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
        getChunkKey(chunkPOS: Vector3): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: Vector3): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: Vector3): {
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
        _columnIndexPosition: {
            x: number;
            y: number;
            z: number;
        };
        getColumnIndex(x: number, z: number, y: number): number;
        getChunkColumnIndex(y: number): number;
        getColumnKey(x: number, z: number, y?: number): string;
        getColumnPosition(x: number, z: number, y?: number): {
            x: number;
            z: number;
            y: number;
        };
    };
    setWorldGen(worldGen: WorldGenInterface): void;
    generate(x: number, z: number, data: any): Promise<void>;
    __handleHeightMapUpdateForVoxelAdd(voxelPOS: Vector3, voxelData: VoxelData, chunk: ChunkData): void;
    getVoxelPaletteId(voxelId: string, voxelStateId: number): void;
    _paintVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): void;
    _addToRGBLightUpdateQue(voxelData: VoxelData, x: number, y: number, z: number): void;
    paintVoxel(voxelId: string, voxelState: number, shapeState: number, x: number, y: number, z: number): Promise<void>;
};
export declare type DivineVoxelEngineWorldGeneration = typeof WorldGeneration;
