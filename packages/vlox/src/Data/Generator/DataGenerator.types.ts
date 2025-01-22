import { DataSyncData } from "../Types/DataSync.types"
import { SubstanceData } from "../Types/Substances.types";
import { VoxelData } from "../../VoxelData/Voxel.types";
import { CachedVoxelModelData } from "../../Cache/Cache.types";

export type DataGeneratorData = {

  materials: {id:string}[];
  voxels: VoxelData[];
  substances: SubstanceData[];
  threads: DataSyncData["threads"];
  voxelModels?:CachedVoxelModelData;
};
