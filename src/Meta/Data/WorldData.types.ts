export type ChunkData = {
 buffer: SharedArrayBuffer;
 data: DataView;
};

export type WorldColumn = {
 data: DataView;
 buffer: SharedArrayBuffer;
 chunks: Record<string, ChunkData>;
};

export type WorldRegion = {
 columns: Record<string, WorldColumn>;
};
export type WorldDimensions = Record<string, Record<string, WorldRegion>>;

export type AddVoxelData = {
 id: string;
 position: [number, number, number];
 state?: number;
 shapeState?: number;
 dimension?: string | number;
 secondaryVoxelId?: number;
 secondaryState?: number;
};

export type VoxelPalette = Record<number, string>;
export type VoxelPaletteMap = Record<string, number>;
