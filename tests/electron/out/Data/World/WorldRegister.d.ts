import type { ChunkData, Column, WorldDimensions, Region } from "Meta/Data/WorldData.types";
export declare const WorldRegister: {
    _dimensions: WorldDimensions;
    _cacheOn: boolean;
    _chunkCache: Map<string, ChunkData>;
    _columnCache: Map<string, Column>;
    $INIT(): void;
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
        add(dimensionId: string, x: number, y: number, z: number, sab: SharedArrayBuffer): Region;
        _getRegionData(sab: SharedArrayBuffer): Region;
        get(dimensionId: string, x: number, y: number, z: number): false | Region;
    };
    column: {
        add(dimensionId: string, x: number, z: number, y: number | undefined, sab: SharedArrayBuffer): Column | undefined;
        _getColumnData(sab: SharedArrayBuffer): Column;
        get(dimensionId: string, x: number, z: number, y?: number): false | Column;
        fill(dimensionId: string, x: number, z: number, y?: number): void;
        height: {
            getRelative(dimensionId: string, x: number, z: number, y?: number): number;
            getAbsolute(dimensionId: string, x: number, z: number, y?: number): number;
        };
    };
    chunk: {
        add(dimensionId: string, x: number, y: number, z: number, sab: SharedArrayBuffer): ChunkData | undefined;
        _getChunkData(sab: SharedArrayBuffer): ChunkData;
        addFromServer(chunkBuffer: ArrayBuffer): ChunkData | undefined;
        get(dimensionId: string, x: number, y: number, z: number): false | ChunkData | undefined;
    };
};
