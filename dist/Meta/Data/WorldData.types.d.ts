export type ChunkData = {
    buffer: SharedArrayBuffer;
    data: DataView;
};
export type Column = {
    data: DataView;
    buffer: SharedArrayBuffer;
    chunks: Map<number, ChunkData>;
};
export type Region = {
    buffer: SharedArrayBuffer;
    data: DataView;
    columns: Map<number, Column>;
};
export type WorldDimensions = Map<string, Map<string, Region>>;
export type AddVoxelData = {
    id: string;
    state: number;
    shapeState: number;
    level: number;
    levelState: number;
    secondaryVoxelId: string;
    secondaryState: number;
};
export type VoxelPalette = string[];
export type VoxelPaletteMap = Record<string, number>;
