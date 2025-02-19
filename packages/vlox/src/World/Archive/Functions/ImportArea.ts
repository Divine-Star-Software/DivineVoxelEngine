import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectorData,
} from "../Archive.types";

export function CreateSectorFromArea(
  area: ArchivedAreaData,
  sector: ArchivedAreaSectorData
): ArchivedSectorData {
  return {
    version: area.version,
    vloxVersion: area.vloxVersion,
    dimension: area.dimension,
    position: sector.position,
    flags: sector.flags,
    timestamps: sector.timestamps,
    duplicates: sector.duplicates,
    palettes: sector.palettes,
    buffers: sector.buffers,
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
