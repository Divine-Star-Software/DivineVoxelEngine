import { VoxelModelRelationsConditionData } from "../VoxelModel.types";

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
  conditions: VoxelModelRelationsConditionData[];
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

