import { TypedNode } from "Libs/DivineBinaryObject/Classes/TypedNode";
export declare type RichDataSchema = Record<string, Record<string, TypedNode<any>>>;
export declare type RichChunk = RichDataSchema;
export declare type RichColumn = TypedNode<{
    chunks: Record<number, TypedNode<RichChunk>>;
    data: TypedNode<RichDataSchema>;
}>;
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
