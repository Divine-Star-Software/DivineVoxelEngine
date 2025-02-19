import { LocationData } from "../../../Math";
import { WorldRegister } from "../../../World/WorldRegister";
import {
  ArchivedLightSegments,
  ArchivedSectionData,
  ArchivedSectorData,
} from "../Archive.types";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";
import { VoxelLightData } from "../../../Voxels/Cursor/VoxelLightData";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";
import { lightSegments, lightSemgnetGet } from "./Shared";
import { ProcessedSection, SectorPalette } from "../Classes/ArchiveClasses";
import { CreateArchivedSection } from "./CreateArchivedSection";
import { RemoveDuplicates } from "./RemoveDuplicates";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";

type ArchiveSectorProps = {
  location: LocationData;
};
const lightData = new VoxelLightData();

export default function ArchiveSector(
  archiveData: ArchiveSectorProps
): ArchivedSectorData {
  const sector = WorldRegister.sectors.get(
    archiveData.location[0],
    archiveData.location[1],
    archiveData.location[2],
    archiveData.location[3]
  );

  if (!sector)
    throw new Error(
      `Sector at location ${location} does not exist when trying to arhicve it.`
    );

  const sectorPalettes = new SectorPalette();

  const processedSections: ProcessedSection[] = [];
  for (
    let sectionIndex = 0;
    sectionIndex < sector.sections.length;
    sectionIndex++
  ) {
    const section = sector.sections[sectionIndex];
    const processedSection = new ProcessedSection(section);

    {
      let value = section.buried[0];
      processedSection.isBuriedAllTheSame = true;
      for (let i = 0; i < section.buried.length; i++) {
        if (value != section.buried[i]) {
          processedSection.isBuriedAllTheSame = false;
          break;
        }
      }
      processedSection.buriedValue = value;
    }

    {
      let value = section.voxelMap[0];
      processedSection.isVoxelMapAllTheSame = true;
      for (let i = 0; i < section.voxelMap.length; i++) {
        if (value != section.voxelMap[i]) {
          processedSection.isVoxelMapAllTheSame = false;
          break;
        }
      }
      processedSection.voxelMapValue = value;
    }

    {
      let value = section.dirtyMap[0];
      processedSection.isDirtyMapAllTheSame = true;
      for (let i = 0; i < section.dirtyMap.length; i++) {
        if (value != section.dirtyMap[i]) {
          processedSection.isDirtyMapAllTheSame = false;
          break;
        }
      }
      processedSection.dirtyMapValue = value;
    }

    const firstId = section.ids[0];
    const firstLight = section.light[0];
    const firstLevel = section.level[0];
    const firstSecondary = section.secondary[0];

    const firstLightLevels: Record<ArchivedLightSegments, number> = {
      sun: lightData.getS(firstLight),
      red: lightData.getR(firstLight),
      green: lightData.getG(firstLight),
      blue: lightData.getB(firstLight),
    };

    const length = section.ids.length;
    for (let i = 0; i < length; i++) {
      const voxelId = sectorPalettes.voxels.register(section.ids[i]);

      processedSection.voxels.value = voxelId;
      if (!processedSection.palettes.voxels.isRegistered(voxelId))
        processedSection.palettes.voxels.register(voxelId);

      let voxelSecondary = 0;
      if (
        VoxelTagsRegister.VoxelTags[
          VoxelPalettesRegister.voxels[section.ids[i]][0]
        ]["dve_can_have_secondary"]
      ) {
        voxelSecondary = sectorPalettes.voxels.register(section.secondary[i]);
        if (
          !processedSection.palettes.secondaryVoxels.isRegistered(
            voxelSecondary
          )
        )
          processedSection.palettes.secondaryVoxels.register(voxelSecondary);
      }

      const voxelLevel = !sectorPalettes.level.isRegistered(section.level[i])
        ? sectorPalettes.level.register(section.level[i])
        : sectorPalettes.level.getId(section.level[i]);
      if (!processedSection.palettes.level.isRegistered(section.level[i]))
        processedSection.palettes.level.register(section.level[i]);

      for (let l = 0; l < lightSegments.length; l++) {
        const segment = lightSegments[l];
        const light = lightSemgnetGet[segment](section.light[i]);
        if (light != firstLightLevels[segment])
          processedSection.light[segment].allTheSame = false;
        processedSection.light[segment].value = light;
        const voxelLight = !sectorPalettes.light[segment].isRegistered(light)
          ? sectorPalettes.light[segment].register(light)
          : sectorPalettes.light[segment].getId(light);
        if (!processedSection.palettes.light[segment].isRegistered(light))
          processedSection.palettes.light[segment].register(light);
        processedSection.light[segment].buffer[i] = voxelLight;
      }

      if (section.ids[i] != firstId) processedSection.voxels.allTheSame = false;

      if (section.level[i] != firstLevel)
        processedSection.level.allTheSame = false;

      if (section.secondary[i] != firstSecondary)
        processedSection.secondaryVoxels.allTheSame = false;

      processedSection.voxels.buffer[i] = voxelId;
      processedSection.level.buffer[i] = voxelLevel;

      processedSection.secondaryVoxels.buffer[i] = voxelSecondary;
    }

    processedSections[sectionIndex] = processedSection;
  }

  let neededPalettes = {
    level: false,
    light: {
      sun: false,
      red: false,
      green: false,
      blue: false,
    },
  };

  for (const archivedSection of processedSections) {
    //ids
    archivedSection.voxels.isPaletted =
      sectorPalettes.voxels.size <= BinaryBuffer.ByteArrayMax ||
      archivedSection.palettes.voxels.size <= BinaryBuffer.ByteArrayMax;
    archivedSection.voxels.remapped =
      sectorPalettes.voxels.size > BinaryBuffer.ByteArrayMax &&
      archivedSection.palettes.voxels.size <= BinaryBuffer.ByteArrayMax &&
      !archivedSection.voxels.allTheSame;

    //level
    archivedSection.level.isPaletted =
      sectorPalettes.level.size <= BinaryBuffer.NibbleArrayMax &&
      archivedSection.palettes.level.size <= BinaryBuffer.NibbleArrayMax;
    archivedSection.level.remapped =
      sectorPalettes.level.size > BinaryBuffer.NibbleArrayMax &&
      archivedSection.palettes.level.size <= BinaryBuffer.NibbleArrayMax &&
      !archivedSection.level.allTheSame;
    if (archivedSection.level.isPaletted && !archivedSection.level.remapped) {
      neededPalettes.level = true;
    }

    for (const semgnet of lightSegments) {
      archivedSection.light[semgnet].isPaletted =
        sectorPalettes.light[semgnet].size <= BinaryBuffer.HalfNibbleArrayMax ||
        archivedSection.palettes.light[semgnet].size <=
          BinaryBuffer.HalfNibbleArrayMax;
      archivedSection.light[semgnet].remapped =
        sectorPalettes.light[semgnet].size > BinaryBuffer.HalfNibbleArrayMax &&
        archivedSection.palettes.light[semgnet].size <=
          BinaryBuffer.HalfNibbleArrayMax &&
        !archivedSection.light[semgnet].allTheSame;
      if (
        archivedSection.light[semgnet].isPaletted &&
        !archivedSection.light[semgnet].remapped
      ) {
        neededPalettes.light[semgnet] = true;
      }
    }

    //secondary
    archivedSection.secondaryVoxels.isPaletted =
      sectorPalettes.voxels.size <= BinaryBuffer.ByteArrayMax ||
      archivedSection.palettes.secondaryVoxels.size <=
        BinaryBuffer.ByteArrayMax;
    archivedSection.secondaryVoxels.remapped =
      sectorPalettes.voxels.size > BinaryBuffer.ByteArrayMax &&
      archivedSection.palettes.secondaryVoxels.size <=
        BinaryBuffer.ByteArrayMax &&
      !archivedSection.secondaryVoxels.allTheSame;

    if (
      !archivedSection.voxels.remapped &&
      !archivedSection.light.sun.remapped &&
      !archivedSection.light.red.remapped &&
      !archivedSection.light.green.remapped &&
      !archivedSection.light.blue.remapped &&
      !archivedSection.secondaryVoxels.remapped &&
      !archivedSection.level.remapped
    )
      continue;
    const length = archivedSection.original.ids.length;
    for (let i = 0; i < length; i++) {
      let secondary = false;
      if (
        VoxelTagsRegister.VoxelTags[
          VoxelPalettesRegister.voxels[archivedSection.original.ids[i]][0]
        ]["dve_can_have_secondary"] &&
        archivedSection.original.secondary[i] !== 0
      ) {
        secondary = true;
      }
      let voxelId = archivedSection.voxels.buffer[i];

      if (archivedSection.voxels.remapped)
        archivedSection.voxels.buffer[i] =
          archivedSection.palettes.voxels.getId(voxelId);

      for (let l = 0; l < lightSegments.length; l++) {
        const segment = lightSegments[l];
        if (archivedSection.light[segment].remapped) {
          archivedSection.light[segment].buffer[i] =
            archivedSection.palettes.light[segment].getId(
              lightSemgnetGet[segment](archivedSection.original.light[i])
            );
        }
      }

      if (archivedSection.level.remapped)
        archivedSection.level.buffer[i] = archivedSection.palettes.level.getId(
          archivedSection.original.level[i]
        );

      if (archivedSection.secondaryVoxels.remapped) {
        if (secondary) {
          archivedSection.secondaryVoxels.buffer[i] =
            archivedSection.palettes.secondaryVoxels.getId(voxelId);
        }
      }
    }
  }

  const palettes: ArchivedSectorData["palettes"] = {
    id: sectorPalettes.voxels.ids._palette,
    light: {},
    voxelPalette: new Uint16Array(sectorPalettes.voxels.voxelPalette),
    stateSchemaPalette: sectorPalettes.voxels.statePalette,
    modSchemaPaette: sectorPalettes.voxels.modPalette,
  };

  const sections: ArchivedSectionData[] = [];
  for (
    let sectionIndex = 0;
    sectionIndex < processedSections.length;
    sectionIndex++
  ) {
    sections[sectionIndex] = CreateArchivedSection(
      processedSections[sectionIndex],
      sectorPalettes
    );
  }

  if (neededPalettes.level) {
    palettes.level = new Uint8Array(sectorPalettes.level._palette);
  }
  for (const segment of lightSegments) {
    if (neededPalettes.light[segment]) {
      palettes.light[segment] = new Uint8Array(
        sectorPalettes.light[segment]._palette
      );
    }
  }

  const archivedSector: ArchivedSectorData = {
    version: "",
    vloxVersion: EngineSettings.version,
    dimension: WorldRegister.dimensions.get(archiveData.location[0])!.id,
    position: [
      archiveData.location[1],
      archiveData.location[2],
      archiveData.location[3],
    ],
    flags: sector.storeFlags(),
    timestamps: sector.storeTimestamps(),
    buffers: {},
    palettes,
    duplicates: {},
    sections,
  };

  RemoveDuplicates(archivedSector);

  return archivedSector;
}
