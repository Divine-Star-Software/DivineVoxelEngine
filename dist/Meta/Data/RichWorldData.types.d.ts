export type RichDataSchema = Record<string, Record<string, any>>;
export type RichColumn = {
    data: RichDataSchema;
};
export type RichRegion = {
    columns: Map<string, RichColumn>;
};
export type RichWorldDimensions = Map<string, Map<string, RichRegion>>;
export type SetRichVoxel = [
    id: string,
    dimesnion: string,
    x: number,
    y: number,
    z: number
];
