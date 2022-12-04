import { Vector3 } from "Meta/Util.types.js";
export declare const ChunkSpace: {
    syncSettings(): void;
    hmBounds: {
        x: number;
        y: number;
        z: number;
    };
    getHeightMapIndex(x: number, y: number, z: number): number;
    getVoxelDataIndex(x: number, y: number, z: number): number;
    getHeightMapIndexUseObj(pos: Vector3): number;
    getVoxelDataIndexUseObj(pos: Vector3): number;
};
