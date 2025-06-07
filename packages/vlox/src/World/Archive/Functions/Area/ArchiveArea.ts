import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectorData,
  ArchiveAreaPalettesData,
  ArchivedAreaSectorPaletteData,
} from "../../Types/index";
import { WorldRegister } from "../../../WorldRegister";
import { getBaseData } from "../Shared/index";
type RunData = {
  dimension: number;
  sectors: ArchivedSectorData[];
  version?: number;
};

function SectorToArchivedAreaSector(
  sector: ArchivedSectorData
): ArchivedAreaSectorData {
  const palettes: ArchivedAreaSectorPaletteData = {
    id: [],
    voxelPalette: sector.palettes.voxelPalette,
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

  for (let i = 0; i < sector.palettes.voxels.length; i++) {
    palettes.id.push(sector.palettes.voxels[i].id);
  }

  return {
    position: sector.position,
    flags: sector.flags,
    timestamps: sector.timestamps,
    palettes,
    sections: sector.sections,
    duplicates: sector.duplicates,
  };
}

export default function CreateArchiveArea(
  archiveData: RunData
): ArchivedAreaData {
  const sectors: ArchivedAreaSectorData[] = [];
  const palettes: ArchiveAreaPalettesData = {
    voxelSchemas: {},
    voxelStateSchemas: {},
  };
  for (const sector of archiveData.sectors) {
    for (const key in sector.palettes.stateSchemas) {
      palettes.voxelStateSchemas[key] = sector.palettes.stateSchemas[key];
    }
    for (let i = 0; i < sector.palettes.voxels.length; i++) {
      const voxelData = sector.palettes.voxels[i];
      palettes.voxelSchemas[voxelData.id] = {};
      if (voxelData.modSchema)
        palettes.voxelSchemas[voxelData.id]!.modSchema = voxelData.modSchema;
      if (voxelData.stateSchemaId)
        palettes.voxelSchemas[voxelData.id]!.stateSchemaId =
          voxelData.stateSchemaId;
    }
    sectors.push(SectorToArchivedAreaSector(sector));
  }

  return {
    ...getBaseData(
      WorldRegister.dimensions.get(archiveData.dimension)?.id || "main"
    ),
    palettes,
    sectors,
  };
}
