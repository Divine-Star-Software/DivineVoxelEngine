import type { InterCommPortTypes } from "Meta/Comms/InterComm.types";
/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export declare const MatrixCentralHub: {
    chunkReader: {
        chunkByteSize: number;
        indexSizes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number;
            voxelStateData: number;
        };
        indexes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number;
            voxelStateData: number;
        };
        byteLengths: {
            heightMapData: number;
            voxelData: number;
            voxelStateData: number;
        };
        syncSettings(): void;
        _getVoxelDataIndex(x: number, y: number, z: number): number;
        _getVoxelStateDataIndex(x: number, y: number, z: number): number;
        _chunkPositon: {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(chunk: DataView): {
            x: number;
            y: number;
            z: number;
        };
        setChunkPosition(chunk: DataView, position: import("../../Meta/Util.types.js").Position3Matrix): void;
        getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
        hmBounds: {
            x: number;
            y: number;
            z: number;
        };
        _getHeightMapIndex(x: number, y: number, z: number): number;
        getHeightMapIndex(x: number, y: number, z: number): number;
        getVoxelData(chunkData: DataView, x: number, y: number, z: number, secondary?: boolean): number;
        setVoxelData(chunkData: DataView, x: number, y: number, z: number, data: number, secondary?: boolean): void;
        getVoxelDataUseObj(chunkData: DataView, position: import("../../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
        setVoxelDataUseObj(chunkData: DataView, position: import("../../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
        getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
        setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
        getChunkMinData(chunkData: DataView): number;
        setChunkMinData(chunkData: DataView, data: number): void;
        getChunkMaxData(chunkData: DataView): number;
        setChunkMaxData(chunkData: DataView, data: number): void;
    };
    threads: Record<string, InterCommPortTypes>;
    _threadMessageFunctions: Record<string, (data: any, event: MessageEvent) => void>;
    registerThread(threadId: string, thread: InterCommPortTypes): void;
    syncChunk(x: number, y: number, z: number): false | undefined;
    syncChunkInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    releaseChunk(x: number, y: number, z: number): void;
    releaseChunkInThread(threadId: string, x: number, y: number, z: number): void;
    syncRegion(x: number, y: number, z: number): false | undefined;
    syncRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    releaseRegion(x: number, y: number, z: number): false | undefined;
    releaseRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    syncVoxelPalette(): void;
    syncVoxelPaletteInThread(threadId: string): void;
    syncVoxelData(): void;
    syncVoxelDataInThread(threadId: string): void;
};
