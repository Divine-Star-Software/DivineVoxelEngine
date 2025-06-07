import { LocationData } from "../../../../Math";
import { WorldRegister } from "../../../../World/WorldRegister";
import {
  ArchivedLightSegments,
  ArchivedSectionData,
  ArchivedSectorData,
} from "../../Types/index";
import { VoxelTagsRegister } from "../../../../Voxels/Data/VoxelTagsRegister";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData";
import {
  BinaryBuffer,
  BinaryBufferConstants,
  BinaryBufferFormat,
} from "../../../../Util/BinaryBuffer/index";
import { getBaseData, lightSegments, lightSemgnetGet } from "../Shared/index";
import { ProcessedSection, SectorPalette } from "../../Classes/ArchiveClasses";
import { CreateArchivedSection } from "./CreateArchivedSection";
import { RemoveDuplicateSections } from "./RemoveDuplicateSections";
import { VoxelPalettesRegister } from "../../../../Voxels/Data/VoxelPalettesRegister";

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
      sectorPalettes.voxels.size <= BinaryBufferConstants.ByteArrayMax ||
      archivedSection.palettes.voxels.size <=
        BinaryBufferConstants.ByteArrayMax;
    archivedSection.voxels.remapped =
      sectorPalettes.voxels.size > BinaryBufferConstants.ByteArrayMax &&
      archivedSection.palettes.voxels.size <=
        BinaryBufferConstants.ByteArrayMax &&
      !archivedSection.voxels.allTheSame;

    //level
    archivedSection.level.isPaletted =
      sectorPalettes.level.size <= BinaryBufferConstants.NibbleArrayMax &&
      archivedSection.palettes.level.size <=
        BinaryBufferConstants.NibbleArrayMax;
    archivedSection.level.remapped =
      sectorPalettes.level.size > BinaryBufferConstants.NibbleArrayMax &&
      archivedSection.palettes.level.size <=
        BinaryBufferConstants.NibbleArrayMax &&
      !archivedSection.level.allTheSame;
    if (archivedSection.level.isPaletted && !archivedSection.level.remapped) {
      neededPalettes.level = true;
    }

    for (const semgnet of lightSegments) {
      archivedSection.light[semgnet].isPaletted =
        sectorPalettes.light[semgnet].size <=
          BinaryBufferConstants.HalfNibbleArrayMax ||
        archivedSection.palettes.light[semgnet].size <=
          BinaryBufferConstants.HalfNibbleArrayMax;
      archivedSection.light[semgnet].remapped =
        sectorPalettes.light[semgnet].size >
          BinaryBufferConstants.HalfNibbleArrayMax &&
        archivedSection.palettes.light[semgnet].size <=
          BinaryBufferConstants.HalfNibbleArrayMax &&
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
      sectorPalettes.voxels.size <= BinaryBufferConstants.ByteArrayMax ||
      archivedSection.palettes.secondaryVoxels.size <=
        BinaryBufferConstants.ByteArrayMax;
    archivedSection.secondaryVoxels.remapped =
      sectorPalettes.voxels.size > BinaryBufferConstants.ByteArrayMax &&
      archivedSection.palettes.secondaryVoxels.size <=
        BinaryBufferConstants.ByteArrayMax &&
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
    ...sectorPalettes.voxels.toJSON(),
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

  if (
    neededPalettes.level &&
    !(sectorPalettes.level.size == 1 && sectorPalettes.level._palette[0] == 0)
  ) {
    palettes.level = BinaryBuffer.Create({
      format: BinaryBufferFormat.Uint8,
      buffer: new Uint8Array(sectorPalettes.level._palette).buffer,
    });
  }

  for (const segment of lightSegments) {
    if (neededPalettes.light[segment]) {
      if (
        sectorPalettes.light[segment].size == 1 &&
        sectorPalettes.light[segment]._palette[0] == 0
      )
        continue;
      palettes.light ??= {};
      palettes.light[segment] = BinaryBuffer.Create({
        format: BinaryBufferFormat.Uint8,
        buffer: new Uint8Array(sectorPalettes.light[segment]._palette).buffer,
      });
    }
  }

  const archivedSector: ArchivedSectorData = {
    ...getBaseData(
      WorldRegister.dimensions.get(archiveData.location[0])!.id || "main"
    ),
    position: {
      x: archiveData.location[1],
      y: archiveData.location[2],
      z: archiveData.location[3],
    },
    flags: sector.storeFlags(),
    timestamps: sector.storeTimestamps(),
    palettes,
    duplicates: {},
    sections,
  };

  RemoveDuplicateSections(archivedSector);

  return archivedSector;
}
