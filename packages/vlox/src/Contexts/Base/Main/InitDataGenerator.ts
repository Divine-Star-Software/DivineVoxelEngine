import { DataSyncData } from "../Remote/DataSync.types";
import { DataGeneratorData } from "./DataGenerator.types";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { InitVoxelData } from "../../../Voxels/InitVoxelData";

export default function InitDataGenerator(
  data: DataGeneratorData
): DataSyncData {
  const voxels = InitVoxelData(data);

  return {
    settings: EngineSettings.settings,
    threads: data.threads,
    voxels,
  };
}
