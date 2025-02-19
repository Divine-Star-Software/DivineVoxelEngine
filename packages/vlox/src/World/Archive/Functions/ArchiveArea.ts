import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectorData,
} from "../Archive.types";
import { WorldRegister } from "../../../World/WorldRegister";
import { EngineSettings } from "../../../Settings/EngineSettings";
type RunData = {
  dimension: number;
  sectors: ArchivedSectorData[];
  version?: number;
};

function SectorToArchivedAreaSector(
  sector: ArchivedSectorData
): ArchivedAreaSectorData {
  return {
    position: sector.position,
    flags: sector.flags,
    timestamps: sector.timestamps,
    buffers: sector.buffers,
    palettes: sector.palettes,
    sections: sector.sections,
    duplicates: sector.duplicates,
  };
}

export default function CreateArchiveArea(
  archiveData: RunData
): ArchivedAreaData {
  const sectors: ArchivedAreaSectorData[] = [];
  for (const sector of archiveData.sectors) {
    sectors.push(SectorToArchivedAreaSector(sector));
  }

  return {
    dimension:
      WorldRegister.dimensions.get(archiveData.dimension)?.id || "main",
    version: "",
    vloxVersion: EngineSettings.version,
    sectors,
  };
}
