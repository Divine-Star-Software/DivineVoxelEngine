import { Vec3Array } from "@amodx/math";
export interface VoxelStateStringSchemaData {
  name: string;
  type: "string";
  values: string[];
}
export interface VoxelStateNumberSchemaData {
  name: string;
  type: "number";
  maxValue: number;
}

export interface SameVoxelRelationsConditionData {
  type: "same-voxel";
  direction: Vec3Array;
}

export interface AnyVoxelRelationsConditionData {
  type: "any-voxel";
  direction: Vec3Array;
}

export type VoxelStateRelationsConditionData =
  | SameVoxelRelationsConditionData
  | AnyVoxelRelationsConditionData;

export interface VoxelModelRelationsSchemaData {
  name: string;
  conditions: VoxelStateRelationsConditionData[];
}
export type BinarySchemaNodeData = {
  id: string;
  type: "binary";
  valuePalette?:string[];
  index: number;
  mask: number;
};
export type VoxelRelationsScehmaNodeData = {
  id: string;
  type: "relation";
  conditions: VoxelStateRelationsConditionData[];
};

export type VoxelModelStateSchemaData =
  | BinarySchemaNodeData
  | VoxelRelationsScehmaNodeData;

export enum StateCompareOperations {
  Equals,
  NotEquals,
  GreaterThan,
  LessThan,
}

export enum StateLogiceOperations {
  And,
  Or,
}

export const StateCompareOperationsMap: Record<string, StateCompareOperations> =
  {
    "=": StateCompareOperations.Equals,
    "!=": StateCompareOperations.NotEquals,
    ">": StateCompareOperations.GreaterThan,
    "<": StateCompareOperations.LessThan,
  };

export const StateLogicOperationsMap: Record<string, StateLogiceOperations> = {
  "&&": StateLogiceOperations.And,
  "||": StateLogiceOperations.Or,
};

export type StateLogicNode = [
  schemaId: number,
  operation: StateCompareOperations,
  value: number
];
export type StateLogicStatement = (StateLogicNode | StateLogiceOperations)[];

