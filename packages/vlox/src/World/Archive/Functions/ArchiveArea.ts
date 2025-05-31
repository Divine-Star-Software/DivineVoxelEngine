import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectorData,
} from "../Types/index";
import { WorldRegister } from "../../../World/WorldRegister";
import { getBaseData } from "./Shared";
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
    ...getBaseData(
      WorldRegister.dimensions.get(archiveData.dimension)?.id || "main"
    ),
    sectors,
  };
}
