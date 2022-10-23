export declare type ChunkData = {
    buffer: SharedArrayBuffer;
    data: DataView;
    segement1: Uint32Array;
    segement2: Uint32Array;
};
export declare type Column = {
    data: DataView;
    buffer: SharedArrayBuffer;
    chunks: Record<string, ChunkData>;
};
export declare type Region = {
    columns: Record<string, Column>;
};
export declare type WorldDimensions = Record<string, Record<string, Region>>;
export declare type AddVoxelData = {
    id: string;
    dimension: string | number;
    position: [number, number, number];
    state?: number;
    shapeState?: number;
    secondaryVoxelId?: string;
    secondaryState?: number;
    update?: boolean;
    build?: boolean;
};
export declare type VoxelPalette = Record<number, string>;
export declare type VoxelPaletteMap = Record<string, number>;
