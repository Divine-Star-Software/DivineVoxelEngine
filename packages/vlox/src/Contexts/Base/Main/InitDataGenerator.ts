import { DataSyncData } from "../Remote/DataSync.types";
import { DataGeneratorData } from "./DataGenerator.types";
import { InitalizeChunkTags } from "../../../World/Chunk/ChunkStruct.js";
import { InitalizeColumnTags } from "../../../World/Column/ColumnStruct.js";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { Chunk, Column } from "../../../World";
import { InitVoxelData } from "../../../Voxels/InitVoxelData";

export default function InitDataGenerator(
  data: DataGeneratorData
): DataSyncData {
  InitalizeChunkTags();
  InitalizeColumnTags();

  const voxels = InitVoxelData(data);

  return {
    settings: EngineSettings.settings,
    threads: data.threads,
    voxels,
    worldData: {
      chunkStruct: Chunk.StateStruct.structData,
      columnStruct: Column.StateStruct.structData,
    },
  };
}
