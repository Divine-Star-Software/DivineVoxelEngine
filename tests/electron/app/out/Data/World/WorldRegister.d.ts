import type { ChunkData, Column, WorldDimensions, Region } from "Meta/Data/WorldData.types";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const WorldRegister: {
    _dimensions: WorldDimensions;
    _cacheOn: boolean;
    _chunkCache: Map<string, ChunkData>;
    _columnCache: Map<string, Column>;
    cache: {
        enable(): void;
        disable(): void;
        _addChunk(key: string, data: ChunkData): void;
        _addColumn(key: string, data: Column): void;
        _getChunk(key: string): ChunkData | undefined;
        _getColumn(key: string): Column | undefined;
    };
    dimensions: {
        add(id: number | string): Map<any, any>;
        get(id: number | string): Map<string, Region> | undefined;
    };
    region: {
        add(location: LocationData, sab: SharedArrayBuffer): Region;
        _getRegionData(sab: SharedArrayBuffer): Region;
        get(location: LocationData): false | Region;
        remove(location: LocationData): boolean;
    };
    column: {
        add(location: LocationData, sab: SharedArrayBuffer): Column | undefined;
        _getColumnData(sab: SharedArrayBuffer): Column;
        get(location: LocationData): false | Column;
        remove(location: LocationData): boolean;
        fill(location: LocationData): void;
        height: {
            getRelative(location: LocationData): number;
            getAbsolute(location: LocationData): number;
        };
    };
    chunk: {
        add(location: LocationData, sab: SharedArrayBuffer): ChunkData | undefined;
        _getChunkData(sab: SharedArrayBuffer): ChunkData;
        addFromServer(chunkBuffer: ArrayBuffer): ChunkData | undefined;
        get(location: LocationData): false | ChunkData | undefined;
        remove(location: LocationData): boolean;
    };
};
