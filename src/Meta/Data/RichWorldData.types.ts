export type RichChunk = Record<string, any>;

export type RichColumn = {
 chunks: Record<string, RichChunk>;
};

export type RichRegion = {
 columns: Record<string, RichColumn>;
};
export type RichWorldDimensions = Record<string, Record<string, RichRegion>>;
