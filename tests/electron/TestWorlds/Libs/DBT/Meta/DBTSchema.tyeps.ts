export type DBTTagTypes = "number" | "boolean";

export type NumberTypes =
  | "8ui"
  | "8i"
  | "16ui"
  | "16i"
  | "32ui"
  | "32i"
  | "32f"
  | "64f"
  | "64i"
  | "64ui";
export type DBTBooleanTag = {
  id: string;
  type: "boolean";
};
export type DBTNumberTag = {
  id: string;
  type: "number";
  range: [min: number, max: number];
};
export type DBTTypedNumberTag = {
  id: string;
  type: "typed-number";
  numberType: NumberTypes;
};
export type DBTTypedNumberArrayTag = {
  id: string;
  type: "typed-number-array";
  numberType: NumberTypes;
  length: number;
};

export type DBTHeaderTag = {
  id: string;
  type: "header";
  numberType: NumberTypes;
};


export type DBTTagNodes =
  | DBTBooleanTag
  | DBTNumberTag
  | DBTTypedNumberTag
  | DBTTypedNumberArrayTag
  | DBTHeaderTag;

export type DBTSchema = Map<string, DBTTagNodes>;
