export declare type ChunkData = {
    buffer: SharedArrayBuffer;
    data: DataView;
};
export declare type WorldColumn = {
    data: DataView;
    buffer: SharedArrayBuffer;
    chunks: Record<string, ChunkData>;
};
export declare type WorldRegion = {
    columns: Record<string, WorldColumn>;
};
export declare type WorldDimensions = Record<string, Record<string, WorldRegion>>;
export declare type AddVoxelData = {
    id: string;
    position: [number, number, number];
    state?: number;
    shapeState?: number;
    dimension?: string | number;
    secondaryVoxelId?: number;
    secondaryState?: number;
};
export declare type VoxelPalette = Record<number, string>;
export declare type VoxelPaletteMap = Record<string, number>;
