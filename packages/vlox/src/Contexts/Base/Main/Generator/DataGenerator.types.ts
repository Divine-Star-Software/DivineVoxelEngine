import { DataSyncData } from "../../Remote/Sync/DataSync.types"
import { VoxelSubstanceData } from "../../../../Voxels/VoxelSubstances.types";
import { VoxelData } from "../../../../Voxels/Voxel.types";
import { CachedVoxelModelData } from "../../../../Cache/Cache.types";
import { VoxelMaterialData } from "Voxels";

export type DataGeneratorData = {


  voxels: VoxelData[];
  materials?: VoxelMaterialData[];
  substances?: VoxelSubstanceData[];
  threads: DataSyncData["threads"];
  voxelModels?:CachedVoxelModelData;
};
