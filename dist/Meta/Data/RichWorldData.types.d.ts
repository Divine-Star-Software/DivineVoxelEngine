export declare type RichDataSchema = Record<string, Record<string, any>>;
export declare type RichColumn = {
    data: RichDataSchema;
};
export declare type RichRegion = {
    columns: Map<string, RichColumn>;
};
export declare type RichWorldDimensions = Map<string, Map<string, RichRegion>>;
export declare type SetRichVoxel = [
    id: string,
    dimesnion: string,
    x: number,
    y: number,
    z: number
];
