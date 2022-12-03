export declare type DBTTagTypes = "number" | "boolean";
export declare type NumberTypes = "8ui" | "8i" | "16ui" | "16i" | "32ui" | "32i" | "32f" | "64f" | "64i" | "64ui";
export declare type DBTBooleanTag = {
    id: string;
    type: "boolean";
    defaultValue?: boolean;
};
export declare type DBTNumberTag = {
    id: string;
    type: "number";
    range: [min: number, max: number];
    defaultValue?: number;
};
export declare type DBTTypedNumberTag = {
    id: string;
    type: "typed-number";
    numberType: NumberTypes;
    defaultValue?: number;
};
export declare type DBTTagNodes = DBTBooleanTag | DBTNumberTag | DBTTypedNumberTag;
export declare type DBTSchema = Map<string, DBTTagNodes>;
