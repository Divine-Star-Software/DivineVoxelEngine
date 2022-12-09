export type RichChunk = Record<string, any>;

export type RichColumn = {
 chunks: Record<string, RichChunk>;
};

export type RichRegion = {
 columns: Record<string, RichColumn>;
};
export type RichWorldDimensions = Record<string, Record<string, RichRegion>>;

export type SetRichVoxel = [
 id: string,
 dimesnion: string,
 x: number,
 y: number,
 z: number
];
