import { LocationData } from "../../../Math";
import { WorldRegister } from "../../../World/WorldRegister";
import {
  ArchivedLightSegments,
  ArchivedSectionData,
  ArchivedSectorData,
} from "../Archive.types";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";
import { VoxelLightData } from "../../../Voxels/Cursor/VoxelLightData";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";
import { lightSegments, lightSemgnetGet } from "./Shared";
import {
  ProcessedSection,
  SectorPalette,
  VoxelStateObjectMap,
} from "../Classes/ArchiveClasses";
import { CreateArchivedSection } from "./CreateArchivedSection";
import { RemoveDuplicates } from "./RemoveDuplicates";
import { NumberPalette } from "../../../Util/NumberPalette";

type ArchiveColumnProps = {
  location: LocationData;
};
const lightData = new VoxelLightData();

export default function ArchiveSector(
  archiveData: ArchiveColumnProps
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
      const stringId = VoxelPalettesRegister.voxelIds.getStringId(section.ids[i]);

      const voxelId = !sectorPalettes.ids.isRegistered(stringId)
        ? sectorPalettes.ids.register(stringId)
        : sectorPalettes.ids.getNumberId(stringId);

      processedSection.ids.value = voxelId;
      if (!processedSection.palettes.ids.isRegistered(voxelId))
        processedSection.palettes.ids.register(voxelId);

      const secondaryId =
        VoxelTagsRegister.VoxelTags[section.ids[i]]["dve_can_have_secondary"] &&
        VoxelPalettesRegister.voxelIds.getStringId(section.secondary[i]);

      const voxelSecondary = secondaryId
        ? !sectorPalettes.secondaryId.isRegistered(secondaryId)
          ? sectorPalettes.secondaryId.register(secondaryId)
          : sectorPalettes.secondaryId.getNumberId(secondaryId)
        : !sectorPalettes.secondaryValue.isRegistered(section.secondary[i])
          ? sectorPalettes.secondaryValue.register(section.secondary[i])
          : sectorPalettes.secondaryValue.getId(section.secondary[i]);

      if (
        VoxelTagsRegister.VoxelTags[section.ids[i]]["dve_can_have_secondary"]
      ) {
        if (!processedSection.palettes.secondaryId.isRegistered(voxelSecondary))
          processedSection.palettes.secondaryId.register(voxelSecondary);
      } else {
        if (
          !processedSection.palettes.secondaryValue.isRegistered(voxelSecondary)
        )
          processedSection.palettes.secondaryValue.register(voxelSecondary);
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

      if (section.ids[i] != firstId) processedSection.ids.allTheSame = false;

      if (section.level[i] != firstLevel)
        processedSection.level.allTheSame = false;
 
      if (section.secondary[i] != firstSecondary)
        processedSection.secondary.allTheSame = false;

      processedSection.ids.buffer[i] = voxelId;
      processedSection.level.buffer[i] = voxelLevel;

      processedSection.secondary.buffer[i] = voxelSecondary;
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

  for (const state of sectorPalettes.stateMap) {
    if (!state) continue;
    if (state.palette.size > sectorPalettes.maxStatePaletteSize)
      sectorPalettes.maxStatePaletteSize = state.palette.size;
  }

  for (const mod of sectorPalettes.modMap) {
    if (!mod) continue;
    if (mod.palette.size > sectorPalettes.maxModPaletteSize)
      sectorPalettes.maxModPaletteSize = mod.palette.size;
  }
  for (const archivedSection of processedSections) {
    for (const stateId in archivedSection.palettes.state) {
      const state = archivedSection.palettes.state[stateId];
      if (!state) continue;
      if (state.size > archivedSection.palettes.maxStatePaletteSize)
        archivedSection.palettes.maxStatePaletteSize = state.size;
    }
    for (const modId in archivedSection.palettes.mod) {
      const mod = archivedSection.palettes.state[modId];
      if (!mod) continue;
      if (mod.size > archivedSection.palettes.maxModPaletteSize)
        archivedSection.palettes.maxModPaletteSize = mod.size;
    }
    //ids
    archivedSection.ids.isPaletted =
      sectorPalettes.ids.size <= BinaryBuffer.ByteArrayMax ||
      archivedSection.palettes.ids.size <= BinaryBuffer.ByteArrayMax;
    archivedSection.ids.remapped =
      sectorPalettes.ids.size > BinaryBuffer.ByteArrayMax &&
      archivedSection.palettes.ids.size <= BinaryBuffer.ByteArrayMax &&
      !archivedSection.ids.allTheSame;

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
    archivedSection.secondary.isPaletted =
      (sectorPalettes.secondaryValue.size <= BinaryBuffer.ByteArrayMax &&
        sectorPalettes.secondaryId.size <= BinaryBuffer.ByteArrayMax) ||
      (archivedSection.palettes.secondaryValue.size <=
        BinaryBuffer.ByteArrayMax &&
        archivedSection.palettes.secondaryId.size <= BinaryBuffer.ByteArrayMax);
    archivedSection.secondary.remapped =
      Math.max(
        sectorPalettes.secondaryValue.size,
        sectorPalettes.secondaryId.size
      ) > BinaryBuffer.ByteArrayMax &&
      Math.max(
        archivedSection.palettes.secondaryId.size,
        archivedSection.palettes.secondaryValue.size
      ) <= BinaryBuffer.ByteArrayMax &&
      !archivedSection.secondary.allTheSame;

    if (
      !archivedSection.ids.remapped &&
      !archivedSection.light.sun.remapped &&
      !archivedSection.light.red.remapped &&
      !archivedSection.light.green.remapped &&
      !archivedSection.light.blue.remapped &&
      !archivedSection.secondary.remapped &&
      !archivedSection.level.remapped
    )
      continue;
    const length = archivedSection.original.ids.length;
    for (let i = 0; i < length; i++) {
      let secondary = false;
      if (
        VoxelTagsRegister.VoxelTags[archivedSection.original.ids[i]][
          "dve_can_have_secondary"
        ] &&
        archivedSection.original.secondary[i] !== 0
      ) {
        secondary = true;
      }
      let stateId = !secondary
        ? archivedSection.ids.buffer[i]
        : archivedSection.secondary.buffer[i];
        
      if (archivedSection.ids.remapped)
        archivedSection.ids.buffer[i] =
          archivedSection.palettes.ids.getId(stateId);

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

      if (archivedSection.secondary.remapped)
        archivedSection.secondary.buffer[i] = secondary
          ? archivedSection.palettes.secondaryId.getId(
              archivedSection.secondary.buffer[i]
            )
          : archivedSection.palettes.secondaryValue.getId(
              archivedSection.secondary.buffer[i]
            );
    }
  }

  const palettes: ArchivedSectorData["palettes"] = {
    id: sectorPalettes.ids._palette,
    stateMap: [],
    secondaryStateMap: [],
    modMap: [],
    secondaryModMap: [],
    light: {},
    secondaryId: sectorPalettes.secondaryId._palette,
    secondaryValue: new Uint16Array(sectorPalettes.secondaryValue._palette),
  };

  const stateMap = palettes.stateMap;
  for (let i = 0; i < sectorPalettes.stateMap.length; i++) {
    const states = sectorPalettes.stateMap[i]?.palette;
    if (!states) continue;
    const voxelId = sectorPalettes.ids._palette[i];
    if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
    const schema = SchemaRegister.getVoxelSchemas(voxelId);
    const voxelStates: any[][] = [];
    stateMap[i] = voxelStates;
    for (let k = 0; k < states._palette.length; k++) {
      voxelStates[k] = schema.state.getStateObject(states._palette[k]);
    }
  }

  const secondaryStateMap = palettes.secondaryStateMap;
  for (let i = 0; i < sectorPalettes.secondaryStateMap.length; i++) {
    const states = sectorPalettes.secondaryStateMap[i]?.palette;
    if (!states) continue;
    const voxelId = sectorPalettes.secondaryId._palette[i];
    if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
    const schema = SchemaRegister.getVoxelSchemas(voxelId);
    const voxelStates: any[][] = [];
    secondaryStateMap[i] = voxelStates;
    for (let k = 0; k < states._palette.length; k++) {
      voxelStates[k] = schema.state.getStateObject(states._palette[k]);
    }
  }

  const modMap = palettes.modMap;
  for (let i = 0; i < sectorPalettes.modMap.length; i++) {
    const mods = sectorPalettes.modMap[i]?.palette;
    if (!mods) continue;
    const voxelId = sectorPalettes.ids._palette[i];
    if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
    const schema = SchemaRegister.getVoxelSchemas(voxelId);
    const voxelMods: any[][] = [];
    modMap[i] = voxelMods;
    for (let k = 0; k < mods._palette.length; k++) {
      voxelMods[k] = schema.mod.getStateObject(mods._palette[k]);
    }
  }

  const secondaryModMap = palettes.modMap;
  for (let i = 0; i < sectorPalettes.secondaryModMap.length; i++) {
    const mods = sectorPalettes.secondaryModMap[i]?.palette;
    if (!mods) continue;
    const voxelId = sectorPalettes.secondaryId._palette[i];
    if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
    const schema = SchemaRegister.getVoxelSchemas(voxelId);
    const voxelMods: any[][] = [];
    secondaryModMap[i] = voxelMods;
    for (let k = 0; k < mods._palette.length; k++) {
      voxelMods[k] = schema.mod.getStateObject(mods._palette[k]);
    }
  }

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
    location: [
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
