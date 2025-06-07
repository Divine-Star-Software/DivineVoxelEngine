import { BinaryBuffer } from "../../../../Util/BinaryBuffer";
import {
  ArchivedAreaData,
  ArchivedAreaJSONData,
  ArchivedAreaSectorData,
  ArchivedAreaSectorJSONData,
  ArchivedAreaSectorPaletteData,
  ArchivedSectionData,
  ArchivedSectionJSONData,
  ArchivedSectionPaletteData,
  ArchivedSectionPaletteJSONData,
} from "../../Types/index";
import { lightSegments } from "../Shared/LightSegments";

async function ConvertSection(
  jsonSection: ArchivedSectionJSONData,
  parentObject: any,
  parentObjectKey: any
) {
  const section: ArchivedSectionData = {
    buffers: {},
  };
  if (jsonSection.flags) section.flags = jsonSection.flags;

  if (jsonSection.palettes) {
    const palettes: ArchivedSectionPaletteData = {};

    if (jsonSection.palettes.id)
      palettes.id = await BinaryBuffer.FromJSON(jsonSection.palettes.id);

    if (jsonSection.palettes.level)
      palettes.level = await BinaryBuffer.FromJSON(jsonSection.palettes.level);

    if (jsonSection.palettes.secondary)
      palettes.secondary = await BinaryBuffer.FromJSON(
        jsonSection.palettes.secondary
      );
    for (const segment of lightSegments) {
      if (jsonSection.palettes?.light?.[segment]) {
        palettes.light ??= {};
        palettes.light[segment] = await BinaryBuffer.FromJSON(
          jsonSection.palettes.light[segment]
        );
      }
    }
    section.palettes = palettes;
  }

  if (jsonSection.buffers.id) {
    section.buffers.id = await BinaryBuffer.FromJSON(jsonSection.buffers.id);
  }

  if (jsonSection.buffers.level) {
    section.buffers.level = await BinaryBuffer.FromJSON(
      jsonSection.buffers.level
    );
  }

  for (const segment of lightSegments) {
    if (jsonSection.buffers.light?.[segment]) {
      section.buffers.light ??= {};
      section.buffers.light[segment] = await BinaryBuffer.FromJSON(
        jsonSection.buffers.light[segment]
      );
    }
  }

  if (jsonSection.buffers.secondary) {
    section.buffers.secondary = await BinaryBuffer.FromJSON(
      jsonSection.buffers.secondary
    );
  }

  parentObject[parentObjectKey] = section;
}

async function ConvertSector(
  jsonSector: ArchivedAreaSectorJSONData,
  sectorArray: ArchivedAreaSectorData[],
  index: number
) {
  const palettes: ArchivedAreaSectorPaletteData = {
    id: jsonSector.palettes.id,
    voxelPalette: await BinaryBuffer.FromJSON(jsonSector.palettes.voxelPalette),
    light: {},
  };
  if (jsonSector.palettes.level) {
    palettes.level = await BinaryBuffer.FromJSON(jsonSector.palettes.level);
  }

  if (jsonSector.palettes.light) {
    palettes.light = {};
    for (const segment of lightSegments) {
      if (jsonSector.palettes.light[segment]) {
        palettes.light[segment] = await BinaryBuffer.FromJSON(
          jsonSector.palettes.light[segment]
        );
      }
    }
  }

  const sector: ArchivedAreaSectorData = {
    position: jsonSector.position,
    flags: jsonSector.flags,
    timestamps: jsonSector.timestamps,
    palettes,
    sections: [],
    duplicates: {
      sections: {},
    },
  };
  const proms: Promise<any>[] = [];

  for (let i = 0; i < jsonSector.sections.length; i++) {
    const section = jsonSector.sections[i];
    if (typeof section === "string") {
      sector.sections[i] = section;
      continue;
    }
    proms.push(ConvertSection(section, sector.sections, i));
  }

  for (const key in jsonSector.duplicates.sections) {
    const section = jsonSector.duplicates.sections[key];
    proms.push(ConvertSection(section, sector.duplicates.sections, key));
  }

  await Promise.all(proms);
  sectorArray[index] = sector;
}

export default async function ImportArchivedAreaJSON(
  data: ArchivedAreaJSONData
): Promise<ArchivedAreaData> {
  const archivedData: ArchivedAreaData = {
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
