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
