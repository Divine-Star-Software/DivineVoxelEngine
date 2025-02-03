import { LocationData } from "Math/index.js";
import { EngineSettingsData } from "../../../Settings/EngineSettings.types";
import { CachedVoxelModelData } from "../../../Cache/Cache.types";
import { CompiledVoxelData } from "../../../Voxels/Types/VoxelModelCompiledData.types";
export type DataSyncData = {
  settings: EngineSettingsData;
  voxels: CompiledVoxelData;
  modelData?: CachedVoxelModelData;
  threads: {
    nexus: boolean;
  };

};
export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];
