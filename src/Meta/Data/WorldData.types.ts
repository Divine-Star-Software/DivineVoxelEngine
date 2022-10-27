export type ChunkData = {
 buffer: SharedArrayBuffer;
 data: DataView;
 segement1: Uint32Array;
 segement2: Uint32Array;
};

export type Column = {
 data: DataView;
 buffer: SharedArrayBuffer;
 chunks: Map<string, ChunkData>;
};

export type Region = {
 columns: Map<string, Column>;
};
export type WorldDimensions = Map<string, Map<string, Region>>;

export type AddVoxelData = {
 id: string;
 dimension: string | number;
 position: [number, number, number];
 state: number;
 shapeState: number;
 level: number;
 levelState: number;
 secondaryVoxelId: string;
 secondaryState: number;
};

export type VoxelPalette = Record<number, string>;
export type VoxelPaletteMap = Record<string, number>;
