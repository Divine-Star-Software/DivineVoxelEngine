export type ObjectCollectionGroupData = {
  id: string;
  name: string;
};

export type ObjectCollectionInputs =
  | ObjectCollectionColorInput
  | ObjectCollectionRangeInput
  | ObjectCollectionFloatInput
  | ObjectCollectionVec2Input
  | ObjectCollectionVec3Input
  | ObjectCollectionIntInput
  | ObjectCollectionStringInput
  | ObjectCollectionSelectInput
  | ObjectCollectionFilePathInput
  | ObjectCollectionPasswordInput;
export type ObjectCollectionVec2Input = {
  type: "vec2";
  valueType: "position" | "dimension";
} & ObjectCollectionInputBase<[x: number, z: number]>;
export type ObjectCollectionVec3Input = {
  type: "vec3";
  valueType: "position" | "dimension";
} & ObjectCollectionInputBase<[x: number, y: number, z: number]>;
export type ObjectCollectionRangeInput = {
  type: "range";
  min: number;
  max: number;
  step: number;
} & ObjectCollectionInputBase<number>;
export type ObjectCollectionStringInput = {
  type: "string";
  min: number;
  max: number;
} & ObjectCollectionInputBase<string>;
export type ObjectCollectionPasswordInput = {
  type: "password";
  min: number;
  max: number;
} & ObjectCollectionInputBase<string>;
export type ObjectCollectionSelectInput = {
  type: "select";
  options: [title: string, value: string][];
} & ObjectCollectionInputBase<string>;
export type ObjectCollectionFloatInput = {
  type: "float";
  min: number;
  max: number;
} & ObjectCollectionInputBase<number>;
export type ObjectCollectionIntInput = {
  type: "int";
  min: number;
  max: number;
} & ObjectCollectionInputBase<number>;
export type ObjectCollectionColorInput = {
  type: "color";
} & ObjectCollectionInputBase<string>;
export type ObjectCollectionFilePathInput = {
  type: "file-path";
  acceptedFileExtensions: string[];
} & ObjectCollectionInputBase<string>;
export type ObjectCollectionInputBase<T> = {
  default: T;
  mode?: string;
  required?: boolean;
  validator?: string;
  onUpdate?: (newValue: T) => void;
  beforeStore?: (newValue: T) => any;
};
export type ObjectCollectionDataTypes =
  | "string"
  | "number"
  | "vec3"
  | "boolean"
  | "json";

export type ObjectCollectionCondition = {
  id: string;
  value: any;
  mode: "equals" | "not-equals" | "contains";
};
export type ObjectCollectionConditionTypes = {
  type: "enable";
  conditions: ObjectCollectionCondition[];
};
export type ObjectCollectionData<T =  ObjectCollectionInputs> = {
  id: string;
  groupId: string;
  name: string;
  input?: T;
  //storeAs: ObjectCollectionDataTypes;
  editable?: boolean;
  conditions?: ObjectCollectionConditionTypes[];
};

export type StoredCollection = [string, any][];
