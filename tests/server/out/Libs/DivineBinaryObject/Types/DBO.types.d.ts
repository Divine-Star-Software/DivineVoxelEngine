export declare type DBObject = Record<string, DBOElement>;
export declare type DBOPrimitive = "8i" | "8ui" | "16i" | "16ui" | "32f" | "32i" | "32ui" | "64f" | "bigi" | "bigui";
export declare type DBOARich = "fixed-typed-array" | "fixed-string" | "string" | "string-array" | "fixed-string-array" | "typed-array" | "json" | "mmd";
export declare type DBOElement = {
    type: DBOPrimitive | DBOARich;
    listType?: DBOPrimitive;
    length?: number;
    value: string | number | number[] | string[];
};
