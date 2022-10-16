import type { ChunkData, WorldColumn, WorldDimensions, WorldRegion } from "Meta/Data/WorldData.types";
export declare const WorldRegister: {
    dimensionRecord: Record<string, number>;
    dimensionMap: Record<number, string>;
    _dimensions: WorldDimensions;
    dimensions: {
        add(id: number | string): {};
        get(id: number | string): Record<string, WorldRegion>;
    };
    region: {
        add(dimensionId: string | number, x: number, y: number, z: number): WorldRegion;
        get(dimensionId: string | number, x: number, y: number, z: number): false | WorldRegion;
    };
    worldColumn: {
        add(dimensionId: string | number, x: number, z: number, y?: number): WorldColumn;
        get(dimensionId: string | number, x: number, z: number, y?: number): false | WorldColumn;
    };
    chunk: {
        add(dimensionId: string | number, x: number, y: number, z: number, sab: SharedArrayBuffer): void;
        get(dimensionId: string | number, x: number, y: number, z: number): false | ChunkData;
    };
};
