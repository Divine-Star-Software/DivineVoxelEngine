import { VoxelSubstanceTags } from "../Data/VoxelTag.types";

export interface VoxelSubstanceDataProperties extends Partial<VoxelSubstanceTags> {
  [key: string]: any;
}

export type VoxelSubstanceData = {
  id: string;
  properties: VoxelSubstanceDataProperties;
};
