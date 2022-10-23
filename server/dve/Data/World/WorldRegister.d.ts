import type { ChunkData, Column, WorldDimensions, Region } from "Meta/Data/WorldData.types";
export declare const WorldRegister: {
    dimensionRecord: Record<string, number>;
    dimensionMap: Record<number, string>;
    _dimensions: WorldDimensions;
    _cacheOn: boolean;
    _cache: Record<string, ChunkData>;
    cache: {
        enable(): void;
        disable(): void;
        _add(key: string, data: ChunkData): void;
        _get(key: string): ChunkData;
    };
    dimensions: {
        add(id: number | string): {};
        get(id: number | string): Record<string, Region>;
    };
    region: {
        add(dimensionId: string | number, x: number, y: number, z: number): Region;
        get(dimensionId: string | number, x: number, y: number, z: number): false | Region;
    };
    column: {
        add(dimensionId: string | number, x: number, z: number, y?: number): Column;
        get(dimensionId: string | number, x: number, z: number, y?: number): false | Column;
        fill(dimensionId: string | number, x: number, z: number, y?: number): void;
        height: {
            getRelative(dimensionId: string | number, x: number, z: number, y?: number): number;
            getAbsolute(dimensionId: string | number, x: number, z: number, y?: number): number;
        };
    };
    chunk: {
        add(dimensionId: string | number, x: number, y: number, z: number, sab: SharedArrayBuffer): ChunkData;
        get(dimensionId: string | number, x: number, y: number, z: number): false | ChunkData;
    };
};
