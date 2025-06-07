import {
  BinaryBuffer,
  BinaryBufferCompresedTypes,
} from "../../../../Util/BinaryBuffer";
import {
  ArchivedAreaData,
  ArchivedAreaJSONData,
  ArchivedAreaSectorData,
  ArchivedAreaSectorJSONData,
  ArchivedAreaSectorPaletteJSONData,
  ArchivedSectionData,
  ArchivedSectionJSONData,
  ArchivedSectionPaletteJSONData,
} from "../../Types/index";
import { lightSegments } from "../Shared/LightSegments";

async function ConvertSection(
  section: ArchivedSectionData,
  parentObject: any,
  parentObjectKey: any
) {
  const jsonSection: ArchivedSectionJSONData = {
    buffers: {},
  };
  if (section.flags) jsonSection.flags = section.flags;
  if (section.palettes) {
    const palettes: ArchivedSectionPaletteJSONData = {};
    if (section.palettes.id)
      palettes.id = await BinaryBuffer.ToJSON(section.palettes.id);
    if (section.palettes.level)
      palettes.level = await BinaryBuffer.ToJSON(section.palettes.level);
    if (section.palettes.secondary)
      palettes.secondary = await BinaryBuffer.ToJSON(
        section.palettes.secondary
      );
    for (const segment of lightSegments) {
      if (section.palettes?.light?.[segment]) {
        palettes.light ??= {};
        palettes.light[segment] = await BinaryBuffer.ToJSON(
          section.palettes.light[segment]
        );
      }
    }

    jsonSection.palettes = palettes;
  }

  if (section.buffers.id) {
    jsonSection.buffers.id = await BinaryBuffer.ToJSON(
      section.buffers.id,
      BinaryBufferCompresedTypes.Gzip
    );
  }

  if (section.buffers.level) {
    jsonSection.buffers.level = await BinaryBuffer.ToJSON(
      section.buffers.level,
      BinaryBufferCompresedTypes.Gzip
    );
  }

  for (const segment of lightSegments) {
    if (section.buffers.light?.[segment]) {
      jsonSection.buffers.light ??= {};
      jsonSection.buffers.light[segment] = await BinaryBuffer.ToJSON(
        section.buffers.light[segment],
        BinaryBufferCompresedTypes.Gzip
      );
    }
  }

  if (section.buffers.secondary) {
    jsonSection.buffers.secondary = await BinaryBuffer.ToJSON(
      section.buffers.secondary,
      BinaryBufferCompresedTypes.Gzip
    );
  }

  parentObject[parentObjectKey] = jsonSection;
}

async function ConvertSector(
  sector: ArchivedAreaSectorData,
  sectorArray: ArchivedAreaSectorJSONData[],
  index: number
) {
  const palettes: ArchivedAreaSectorPaletteJSONData = {
    id: sector.palettes.id,
    voxelPalette: await BinaryBuffer.ToJSON(sector.palettes.voxelPalette),
    light: {},
  };
  if (sector.palettes.level) {
    palettes.level = await BinaryBuffer.ToJSON(sector.palettes.level);
  }

  if (sector.palettes.light) {
    palettes.light = {};
    for (const segment of lightSegments) {
      if (sector.palettes.light[segment]) {
        palettes.light[segment] = await BinaryBuffer.ToJSON(
          sector.palettes.light[segment]
        );
      }
    }
  }

  const jsonSector: ArchivedAreaSectorJSONData = {
    position: sector.position,
    flags: sector.flags,
    timestamps: sector.timestamps,
    palettes,
    sections: [],
    duplicates: {
      sections: {},
    },
  };
  const proms: Promise<any>[] = [];

  for (let i = 0; i < sector.sections.length; i++) {
    const section = sector.sections[i];
    if (typeof section === "string") {
      jsonSector.sections[i] = section;
      continue;
    }
    proms.push(ConvertSection(section, jsonSector.sections, i));
  }

  for (const key in sector.duplicates.sections) {
    const section = sector.duplicates.sections[key];
    proms.push(ConvertSection(section, jsonSector.duplicates.sections, key));
  }

  await Promise.all(proms);
  sectorArray[index] = jsonSector;
}

export default async function ExportArchivedAreaJSON(
  data: ArchivedAreaData
): Promise<ArchivedAreaJSONData> {
  const archivedData: ArchivedAreaJSONData = {
    dimension: data.dimension,
    engineVersion: data.engineVersion,
    formatVersion: data.formatVersion,
    dataKey: data.dataKey,
    palettes: data.palettes,
    sectors: [],
  };

  const proms: Promise<any>[] = [];
  for (let i = 0; i < data.sectors.length; i++) {
    proms.push(ConvertSector(data.sectors[i], archivedData.sectors, i));
  }

  await Promise.all(proms);

  return archivedData;
}
