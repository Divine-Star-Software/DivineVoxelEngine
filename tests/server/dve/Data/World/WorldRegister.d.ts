import type { ChunkData, Column, WorldDimensions, Region } from "Meta/Data/WorldData.types";
export declare const WorldRegister: {
    _dimensions: WorldDimensions;
    _cacheOn: boolean;
    _cache: Map<string, ChunkData>;
    $INIT(): void;
    cache: {
        enable(): void;
        disable(): void;
        _add(key: string, data: ChunkData): void;
        _get(key: string): ChunkData | undefined;
    };
    dimensions: {
        add(id: number | string): Map<any, any>;
        get(id: number | string): Map<string, Region> | undefined;
    };
    region: {
        add(dimensionId: string | number, x: number, y: number, z: number): Region;
        get(dimensionId: string | number, x: number, y: number, z: number): false | Region;
    };
    column: {
        add(dimensionId: string | number, x: number, z: number, y?: number): Column;
        get(dimensionId: string | number, x: number, z: number, y?: number): false | Column | undefined;
        fill(dimensionId: string | number, x: number, z: number, y?: number): void;
        height: {
            getRelative(dimensionId: string | number, x: number, z: number, y?: number): number;
            getAbsolute(dimensionId: string | number, x: number, z: number, y?: number): number;
        };
    };
    chunk: {
        add(dimensionId: string | number, x: number, y: number, z: number, sab: SharedArrayBuffer): ChunkData;
        get(dimensionId: string | number, x: number, y: number, z: number): false | ChunkData | undefined;
    };
};
