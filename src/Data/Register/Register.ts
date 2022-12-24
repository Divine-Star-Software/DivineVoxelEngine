import { VoxelSubstanceMap, VoxelSubstanceRecord } from "./VoxelRecords.js";
export const Register = {
 voxels: {
  substanceMap: VoxelSubstanceMap,
  substanceRecord: VoxelSubstanceRecord,
  materialMap : <Record<number,string>>{},
  colliderMap : <Record<number,string>>{}
 },
};
