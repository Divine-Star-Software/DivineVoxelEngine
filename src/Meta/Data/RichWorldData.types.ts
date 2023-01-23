import { TypedNode } from "Libs/DivineBinaryObject/Classes/TypedNode";

export type RichDataSchema = Record<string, Record<string, TypedNode<any>>>;

export type RichChunk = RichDataSchema;

export type RichColumn = TypedNode<{
 chunks: Record<number, TypedNode<RichChunk>>;
 data: TypedNode<RichDataSchema>;
}>;

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
