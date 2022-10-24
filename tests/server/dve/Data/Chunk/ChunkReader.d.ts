import { Position3Matrix } from "Meta/Util.types.js";
import { ChunkData } from "Meta/Data/WorldData.types.js";
export declare const ChunkReader: {
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
    setChunkPosition(chunk: DataView, position: Position3Matrix): void;
    getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
    hmBounds: {
        x: number;
        y: number;
        z: number;
    };
    _getHeightMapIndex(x: number, y: number, z: number): number;
    getHeightMapIndex(x: number, y: number, z: number): number;
    getVoxelData(chunkData: ChunkData, x: number, y: number, z: number, secondary?: boolean): number;
    setVoxelData(chunkData: ChunkData, x: number, y: number, z: number, data: number, secondary?: boolean): number;
    getVoxelDataUseObj(chunkData: ChunkData, position: Position3Matrix, secondary?: boolean): number;
    setVoxelDataUseObj(chunkData: ChunkData, position: Position3Matrix, data: number, secondary?: boolean): number;
    getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
    setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
    getChunkMinData(chunkData: DataView): number;
    setChunkMinData(chunkData: DataView, data: number): void;
    getChunkMaxData(chunkData: DataView): number;
    setChunkMaxData(chunkData: DataView, data: number): void;
};
