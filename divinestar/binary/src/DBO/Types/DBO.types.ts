export type DBObject = Record<string, DBOElement>;
export type DBOPrimitive =
  | "8i"
  | "8ui"
  | "8uic"
  | "16i"
  | "16ui"
  | "32f"
  | "32i"
  | "32ui"
  | "64f"
  | "bigi"
  | "bigui";

export type DBOARich =
  | "fixed-typed-array"
  | "fixed-string"
  | "string"
  | "string-array"
  | "fixed-string-array"
  | "typed-array"
  | "json"
  | "boolean"
  | "undefined"
  | "DBO";

export type DBOElement = {
  type: DBOPrimitive | DBOARich;
  listType?: DBOPrimitive;
  length?: number;
  value: string | number | number[] | string[];
};

export type TypedArrays =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export type TypedArrayClasses =
  | typeof Int8Array
  | typeof Uint8Array
  | typeof Uint8ClampedArray
  | typeof Int16Array
  | typeof Uint16Array
  | typeof Int32Array
  | typeof Uint32Array
  | typeof Float32Array
  | typeof Float64Array
  | typeof BigInt64Array
  | typeof BigUint64Array;

export type DBOMarks =
  | "start"
  | "end"
  | "name"
  | "object"
  | "object-start"
  | "object-end"
  | "array"
  | "array-start"
  | "array-end"
  | DBOPrimitive
  | DBOARich;
