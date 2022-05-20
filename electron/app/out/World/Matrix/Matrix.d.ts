import type { ChunkData } from "Meta/Chunks/Chunk.types";
declare type MatrixRegionData = {
    threadsLoadedIn: Record<string, boolean>;
    chunks: MatrixChunkData;
};
declare type MatrixChunkData = Record<string, {
    chunkStates: Uint8Array;
    chunkStatesSAB: SharedArrayBuffer;
    chunkSAB: SharedArrayBuffer;
}>;
/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export declare const Matrix: {
    updateDieTime: number;
    worldBounds: {
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
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
        syncBoundsWithFlat3DArray(flat3dArray: {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            getValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            deleteUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        }): void;
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
        getChunkKey(chunkPOS: import("../../Meta/Util.types.js").PositionMatrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../../Meta/Util.types.js").PositionMatrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../../Meta/Util.types.js").PositionMatrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
    };
    regions: Record<string, MatrixRegionData>;
    isChunkInMatrix(x: number, y: number, z: number): boolean;
    isRegionInMatrix(x: number, y: number, z: number): boolean;
    isChunkLocked(x: number, y: number, z: number): boolean;
    lockChunk(x: number, y: number, z: number): boolean;
    unLockChunk(x: number, y: number, z: number): boolean;
    updateChunkData(x: number, y: number, z: number, run: (chunk: ChunkData) => {}): false | Promise<boolean>;
    releaseChunk(x: number, y: number, z: number): boolean | undefined;
    createMatrixChunkData(x: number, y: number, z: number): SharedArrayBuffer[] | false;
    getMatrixChunkData(x: number, y: number, z: number): false | {
        chunkStates: Uint8Array;
        chunkStatesSAB: SharedArrayBuffer;
        chunkSAB: SharedArrayBuffer;
    };
    getMatrixRegionData(x: number, y: number, z: number): false | MatrixRegionData;
    addRegionToMatrix(x: number, y: number, z: number): MatrixRegionData;
    removeRegionFromMatrix(x: number, y: number, z: number): false | undefined;
    deleteThreadFromRegion(threadId: string, x: number, y: number, z: number): false | undefined;
};
export {};
