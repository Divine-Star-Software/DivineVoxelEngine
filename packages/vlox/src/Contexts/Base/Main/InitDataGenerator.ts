import { DataSyncData } from "../Remote/DataSync.types";
import { DataGeneratorData } from "./DataGenerator.types";
import { InitalizeSectionTags } from "../../../World/Section/SectionStruct.js";
import { InitalizeSectorTags } from "../../../World/Sector/SectorStruct.js";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { Section, Sector } from "../../../World";
import { InitVoxelData } from "../../../Voxels/InitVoxelData";

export default function InitDataGenerator(
  data: DataGeneratorData
): DataSyncData {
  InitalizeSectionTags();
  InitalizeSectorTags();

  const voxels = InitVoxelData(data);

  return {
    settings: EngineSettings.settings,
    threads: data.threads,
    voxels,
    worldData: {
      sectionStruct: Section.StateStruct.structData,
      sectorStruct: Sector.StateStruct.structData,
    },
  };
}
