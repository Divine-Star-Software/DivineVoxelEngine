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
  defaultValue?: boolean;
};
export type DBTNumberTag = {
  id: string;
  type: "number";
  range: [min: number, max: number];
  defaultValue?: number;
};
export type DBTTypedNumberTag = {
  id: string;
  type: "typed-number";
  numberType: NumberTypes;
  defaultValue?: number;
};

export type DBTTagNodes = DBTBooleanTag | DBTNumberTag | DBTTypedNumberTag;

export type DBTSchema = Map<string, DBTTagNodes>;
