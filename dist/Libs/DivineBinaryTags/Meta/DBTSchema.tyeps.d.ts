export declare type DBTTagTypes = "number" | "boolean";
export declare type NumberTypes = "8ui" | "8i" | "16ui" | "16i" | "32ui" | "32i" | "32f" | "64f" | "64i" | "64ui";
export declare type DBTBooleanTag = {
    id: string;
    type: "boolean";
};
export declare type DBTNumberTag = {
    id: string;
    type: "number";
    range: [min: number, max: number];
};
export declare type DBTTypedNumberTag = {
    id: string;
    type: "typed-number";
    numberType: NumberTypes;
};
export declare type DBTTypedNumberArrayTag = {
    id: string;
    type: "typed-number-array";
    numberType: NumberTypes;
    length: number;
};
export declare type DBTHeaderTag = {
    id: string;
    type: "header";
    numberType: NumberTypes;
};
export declare type DBTTagNodes = DBTBooleanTag | DBTNumberTag | DBTTypedNumberTag | DBTTypedNumberArrayTag | DBTHeaderTag;
export declare type DBTSchema = Map<string, DBTTagNodes>;
