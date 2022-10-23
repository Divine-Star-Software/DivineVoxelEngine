export type ChunkData = {
 buffer: SharedArrayBuffer;
 data: DataView;
 segement1 :  Uint32Array;
 segement2 :  Uint32Array;
};

export type Column = {
 data: DataView;
 buffer: SharedArrayBuffer;
 chunks: Record<string, ChunkData>;
};

export type Region = {
 columns: Record<string, Column>;
};
export type WorldDimensions = Record<string, Record<string, Region>>;

export type AddVoxelData = {
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

export type VoxelPalette = Record<number, string>;
export type VoxelPaletteMap = Record<string, number>;
