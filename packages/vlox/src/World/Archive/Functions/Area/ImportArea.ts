import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectorData,
  ArchivedSectorPaletteData,
} from "../../Types/index";

export function CreateSectorFromArea(
  area: ArchivedAreaData,
  sector: ArchivedAreaSectorData
): ArchivedSectorData {
  const palettes: ArchivedSectorPaletteData = {
    voxels: [],
    voxelPalette: sector.palettes.voxelPalette,
    stateSchemas: {},
    ...(sector.palettes.level ? { level: sector.palettes.level } : {}),
    ...(sector.palettes.light
      ? {
          light: {
            ...(sector.palettes.light.sun
              ? { sun: sector.palettes.light.sun }
              : {}),
            ...(sector.palettes.light.red
              ? { red: sector.palettes.light.red }
              : {}),
            ...(sector.palettes.light.green
              ? { green: sector.palettes.light.green }
              : {}),
            ...(sector.palettes.light.blue
              ? { blue: sector.palettes.light.blue }
              : {}),
          },
        }
      : {}),
  };

  for (let i = 0; i < sector.palettes.id.length; i++) {
    const id = sector.palettes.id[i];
    const schemas = area.palettes.voxelSchemas[id];
    palettes.voxels.push({
      id,
      ...(schemas?.modSchema ? { modSchema: schemas.modSchema } : {}),
      ...(schemas?.stateSchemaId
        ? { stateSchemaId: schemas.stateSchemaId }
        : {}),
    });
    if (schemas?.stateSchemaId) {
      palettes.stateSchemas[schemas!.stateSchemaId] =
        area.palettes.voxelStateSchemas[schemas.stateSchemaId];
    }
  }

  // console.warn("imported sector", sector.palettes, palettes);

  return {
    dimension: area.dimension,
    formatVersion: area.engineVersion,
    engineVersion: area.engineVersion,
    dataKey: area.dataKey,
    position: sector.position,
    flags: sector.flags,
    timestamps: sector.timestamps,
    duplicates: sector.duplicates,
    palettes,
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
