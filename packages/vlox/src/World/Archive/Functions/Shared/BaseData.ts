import { WorldSpaces } from "../../../WorldSpaces";
import {
  ArchivedDataKey,
  BaseArchivedDataBase,
} from "../../Types/Archive.types";
import { EngineSettings } from "../../../../Settings/EngineSettings";
import { VoxelArchivePalette } from "../../../../Voxels/Archive/VoxelPaletteArechive";

export function getBaseData(dimension: string): BaseArchivedDataBase {
  return {
    dimension,
    formatVersion: "",
    engineVersion: EngineSettings.version,
    dataKey: {
      voxelPalette: VoxelArchivePalette.GetVoxelPaletteDataKey(),
      ...WorldSpaces.getDataKey(),
    },
  };
}
