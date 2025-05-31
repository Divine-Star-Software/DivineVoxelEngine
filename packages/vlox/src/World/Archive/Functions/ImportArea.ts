import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectorData,
} from "../Types/index";

export function CreateSectorFromArea(
  area: ArchivedAreaData,
  sector: ArchivedAreaSectorData
): ArchivedSectorData {
  return {
    dimension: area.dimension,
    formatVersion: area.engineVersion,
    engineVersion: area.engineVersion,
    dataKey: area.dataKey,
    position: sector.position,
    flags: sector.flags,
    timestamps: sector.timestamps,
    duplicates: sector.duplicates,
    palettes: sector.palettes,
    sections: sector.sections,
  };
}

export function* CreateSectorsFromArea(
  area: ArchivedAreaData
): Generator<ArchivedSectorData> {
  for (const sector of area.sectors) {
    yield CreateSectorFromArea(area, sector);
  }
}
