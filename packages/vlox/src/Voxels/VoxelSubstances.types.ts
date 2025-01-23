export enum SubstanceStructIds {
  parent = "dve_parent_substance",
  isSolid = "dve_is_solid",
  isTransparent = "dve_is_transparent",
  isLiquid = "dve_is_liquid",
  flowRate = "dve_flow_rate",
  isWindAffected = "dve_is_wind_affected",
}

export interface VoxelSubstanceDataProperties {
  [key: string]: any;
  [SubstanceStructIds.parent]?: string;
  [SubstanceStructIds.isTransparent]?: boolean;
  [SubstanceStructIds.isSolid]?: boolean;
  [SubstanceStructIds.isLiquid]?: boolean;
  [SubstanceStructIds.flowRate]?: number;
  [SubstanceStructIds.isWindAffected]?: boolean;
}

export type VoxelSubstanceData = {
  id: string;
  properties: VoxelSubstanceDataProperties;
};
