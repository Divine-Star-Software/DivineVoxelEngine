import { Vec3Array } from "@amodx/math";

/**
 * Binary State
 */
export type VoxelBinaryStateSchemaNode = {
  name: string;
  bitIndex: number;
  bitSize: number;
  values?: string[];
};

/**
 * Relational
 */
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

export interface VoxelModelRelationsSchemaNodes {
  name: string;
  conditions: VoxelStateRelationsConditionData[];
}

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
  value: number,
];
export type StateLogicStatement = (StateLogicNode | StateLogiceOperations)[];

/**
 * Voxel State
 */

export type VoxelStateSchemaData = {
  binary: VoxelBinaryStateSchemaNode[];
  relational: VoxelModelRelationsSchemaNodes[];
};
