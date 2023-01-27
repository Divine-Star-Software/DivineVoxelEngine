export declare type ChunkData = {
    buffer: SharedArrayBuffer;
    data: DataView;
};
export declare type Column = {
    data: DataView;
    buffer: SharedArrayBuffer;
    chunks: Map<number, ChunkData>;
};
export declare type Region = {
    buffer: SharedArrayBuffer;
    data: DataView;
    columns: Map<number, Column>;
};
export declare type WorldDimensions = Map<string, Map<string, Region>>;
export declare type AddVoxelData = {
    id: string;
    state: number;
    shapeState: number;
    level: number;
    levelState: number;
    secondaryVoxelId: string;
    secondaryState: number;
};
export declare type VoxelPalette = string[];
export declare type VoxelPaletteMap = Record<string, number>;
