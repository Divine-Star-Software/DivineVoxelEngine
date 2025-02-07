import { StringPalette } from "../../../Util/StringPalette";
import { NumberPalette } from "../../../Util/NumberPalette";
import { LocationData } from "../../../Math";
import { WorldRegister } from "../../../World/WorldRegister";
import { Section, SectionData } from "../../../World/index";
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
import { setNibbleArrayIndex } from "../../../Util/Binary/BinaryArrays";
import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";
import {
  compareSection,
  lightSegments,
  lightSemgnetGet,
  uint16To4CharString,
} from "./Shared";

type ProcessedSection = ReturnType<typeof getProcessedSection>;

function getProcessedData<Buffer>(buffer: Buffer) {
  return {
    buffer,
    allTheSame: true,
    isPaletted: false,
    remapped: false,
    value: 0,
  };
}

const getProcessedSection = (section: Section) => {
  return {
    original: section,
    palettes: getSectionPalettes(),
    isBuriedAllTheSame: false,
    buriedValue: 0,
    isVoxelMapAllTheSame: false,
    voxelMapValue: 0,
    isDirtyMapAllTheSame: false,
    dirtyMapValue: 0,
    // ids
    ids: getProcessedData(new Uint16Array(section.ids.length)),
    // light
    light: {
      sun: getProcessedData(new Uint8Array(section.light.length)),
      red: getProcessedData(new Uint8Array(section.light.length)),
      green: getProcessedData(new Uint8Array(section.light.length)),
      blue: getProcessedData(new Uint8Array(section.light.length)),
    },
    // level
    level: getProcessedData(new Uint8Array(section.level.length)),
    // state
    state: getProcessedData(new Uint16Array(section.level.length)),
    // mod
    mod: getProcessedData(new Uint16Array(section.mod.length)),
    // secondary
    secondary: getProcessedData(new Uint16Array(section.mod.length)),
  };
};
function getLightPalette() {
  return {
    sun: new NumberPalette(),
    red: new NumberPalette(),
    green: new NumberPalette(),
    blue: new NumberPalette(),
  };
}
function getSectionPalettes() {
  return {
    ids: new NumberPalette(),
    level: new NumberPalette(),
    light: getLightPalette(),
    state: new NumberPalette(),
    mod: new NumberPalette(),
    secondaryId: new NumberPalette(),
    secondaryState: new NumberPalette(),
  };
}
type ColumnPalettes = ReturnType<typeof getColumnPalettes>;
function getColumnPalettes() {
  return {
    ids: new StringPalette(),
    level: new NumberPalette(),
    light: getLightPalette(),
    stateIdMap: <number[]>[],
    state: new NumberPalette(),
    modIdMap: <number[]>[],
    mod: new NumberPalette(),
    secondaryId: new StringPalette(),
    secondaryState: new NumberPalette(),
  };
}
function getLightBuffer(light: ArchivedLightSegments, buffer: Uint16Array) {
  const array = new Uint8Array(buffer.length / 2);
  for (let i = 0; i < buffer.length; i++) {
    let l = 0;
    if (light == "sun") l = lightData.getS(buffer[i]);
    if (light == "red") l = lightData.getR(buffer[i]);
    if (light == "green") l = lightData.getG(buffer[i]);
    if (light == "blue") l = lightData.getB(buffer[i]);
    setNibbleArrayIndex(array, i, l);
  }
  return array;
}

function GetArchivedSection(
  archiveSection: ProcessedSection,
  sectorPalettes: ColumnPalettes
): ArchivedSectionData {
  const palettes: ArchivedSectionData["palettes"] = {};
  if (archiveSection.ids.remapped)
    palettes.id = Uint16Array.from(archiveSection.palettes.ids._palette);

  if (archiveSection.level.remapped)
    palettes.level = Uint8Array.from(archiveSection.palettes.level._palette);

  if (archiveSection.light.sun.remapped) {
    palettes.light ??= {};
    palettes.light.sun = Uint8Array.from(
      archiveSection.palettes.light.sun._palette
    );
  }
  if (archiveSection.light.red.remapped) {
    palettes.light ??= {};
    palettes.light.red = Uint8Array.from(
      archiveSection.palettes.light.red._palette
    );
  }
  if (archiveSection.light.green.remapped) {
    palettes.light ??= {};
    palettes.light.green = Uint8Array.from(
      archiveSection.palettes.light.green._palette
    );
  }
  if (archiveSection.light.blue.remapped) {
    palettes.light ??= {};
    palettes.light.blue = Uint8Array.from(
      archiveSection.palettes.light.blue._palette
    );
  }
  if (archiveSection.state.remapped)
    palettes.state = Uint16Array.from(archiveSection.palettes.state._palette);
  if (archiveSection.mod.remapped)
    palettes.mod = Uint16Array.from(archiveSection.palettes.mod._palette);
  if (archiveSection.secondary.remapped) {
    palettes.secondaryId = Uint16Array.from(
      archiveSection.palettes.secondaryId._palette
    );
    palettes.secondaryState = Uint16Array.from(
      archiveSection.palettes.secondaryState._palette
    );
  }

  const buffers: ArchivedSectionData["buffers"] = <any>{};

  //id
  if (archiveSection.ids.allTheSame) {
    if (archiveSection.ids.buffer[0] !== 0) {
      buffers.id = archiveSection.ids.buffer[0];
    }
  } else if (archiveSection.ids.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.ids.remapped
        ? archiveSection.palettes.ids.size
        : sectorPalettes.ids.size
    )!;
    buffers.id = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(archiveSection.ids.buffer, "16-bit", type),
      type,
    });
  } else {
    buffers.id = BinaryBuffer.Create({
      buffer: archiveSection.ids.buffer,
    });
  }

  //level
  if (archiveSection.level.allTheSame) {
    if (archiveSection.level.buffer[0] !== 0) {
      buffers.level = archiveSection.level.buffer[0];
    }
  } else if (archiveSection.level.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.level.remapped
        ? archiveSection.palettes.level.size
        : sectorPalettes.level.size
    )!;
    buffers.level = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(archiveSection.level.buffer, "8-bit", type),
      type,
    });
  } else {
    buffers.level = BinaryBuffer.Create({
      buffer: archiveSection.original.level.slice(),
    });
  }

  for (const semgnet of lightSegments) {
    if (archiveSection.light[semgnet].allTheSame) {
      if (archiveSection.light[semgnet].value !== 0) {
        buffers.light ??= {};
        buffers.light[semgnet] = archiveSection.light[semgnet].value;
      }
    } else if (archiveSection.light[semgnet].isPaletted) {
      const type = BinaryBuffer.DetermineSubByteArray(
        archiveSection.light[semgnet].remapped
          ? archiveSection.palettes.light[semgnet].size
          : sectorPalettes.light[semgnet].size
      )!;
      buffers.light ??= {};
      buffers.light[semgnet] = BinaryBuffer.Create({
        buffer: BinaryBuffer.Convert(
          archiveSection.light[semgnet].buffer,
          "8-bit",
          type
        ),
        type,
      });
    } else {
      buffers.light ??= {};
      buffers.light[semgnet] = BinaryBuffer.Create({
        buffer: getLightBuffer(semgnet, archiveSection.original.light),
        type: "4-bit",
      });
    }
  }

  if (archiveSection.state.allTheSame) {
    if (archiveSection.state.buffer[0] !== 0) {
      buffers.state = archiveSection.state.buffer[0];
    }
  } else if (archiveSection.state.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.state.remapped
        ? archiveSection.palettes.state.size
        : sectorPalettes.state.size
    )!;
    buffers.state = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(archiveSection.state.buffer, "16-bit", type),
      type,
    });
  } else {
    buffers.state = BinaryBuffer.Create({
      buffer: archiveSection.state.buffer,
    });
  }

  if (archiveSection.mod.allTheSame) {
    if (archiveSection.mod.buffer[0] !== 0) {
      buffers.mod = archiveSection.mod.buffer[0];
    }
  } else if (archiveSection.mod.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.mod.remapped
        ? archiveSection.palettes.mod.size
        : sectorPalettes.mod.size
    )!;
    buffers.mod = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(archiveSection.mod.buffer, "16-bit", type),
      type,
    });
  } else {
    buffers.mod = BinaryBuffer.Create({
      buffer: archiveSection.mod.buffer,
    });
  }

  if (archiveSection.secondary.allTheSame) {
    if (archiveSection.secondary.buffer[0] !== 0) {
      buffers.secondary = archiveSection.secondary.buffer[0];
    }
  } else if (archiveSection.secondary.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.secondary.remapped
        ? Math.max(
            archiveSection.palettes.secondaryState.size,
            archiveSection.palettes.secondaryId.size
          )
        : Math.max(
            sectorPalettes.secondaryState.size,
            sectorPalettes.secondaryId.size
          )
    )!;
    buffers.secondary = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(
        archiveSection.secondary.buffer,
        "16-bit",
        type
      ),
      type,
    });
  } else {
    buffers.secondary = BinaryBuffer.Create({
      buffer: archiveSection.secondary.buffer,
    });
  }

  if (archiveSection.isBuriedAllTheSame) {
    if (archiveSection.buriedValue !== 0) {
      buffers.buried = archiveSection.buriedValue;
    }
  } else {
    buffers.buried = archiveSection.original.buried.slice();
  }

  if (archiveSection.isVoxelMapAllTheSame) {
    if (archiveSection.voxelMapValue !== 0) {
      buffers.voxelMap = archiveSection.voxelMapValue;
    }
  } else {
    buffers.voxelMap = archiveSection.original.voxelMap.slice();
  }

  if (archiveSection.isDirtyMapAllTheSame) {
    if (archiveSection.dirtyMapValue !== 0) {
      buffers.dirtyMap = archiveSection.dirtyMapValue;
    }
  } else {
    buffers.dirtyMap = archiveSection.original.dirtyMap.slice();
  }

  const flags = archiveSection.original.storeFlags();
  return {
    ...(Object.keys(flags).length ? { flags } : {}),
    ...(Object.keys(palettes).length ? { palettes } : {}),
    buffers,
  };
}

function RemoveDuplicates(data: ArchivedSectorData) {
  const duplicateSectionMap = new Map<
    ArchivedSectionData,
    [sectionIndex: number, duplicateIndex: number]
  >();

  let duplicateSections: ArchivedSectionData[] = [];

  for (let i = 0; i < data.sections.length; i++) {
    for (let j = 0; j < data.sections.length; j++) {
      const section1 = data.sections[i];
      const section2 = data.sections[j];
      if (i == j) continue;
      if (typeof section1 == "string" || typeof section2 == "string") continue;
      let index = -1;
      if (compareSection(section1, section2)) {
        if (duplicateSectionMap.has(section2)) {
          index = duplicateSectionMap.get(section2)![1];
        } else {
          let found = false;
          for (let k = 0; k < duplicateSections.length; k++) {
            if (compareSection(section1, duplicateSections[k])) {
              index = k;
              found = true;
            }
          }
          if (!found) {
            duplicateSections.push(section1);
            index = duplicateSections.length - 1;
          }
        }

        duplicateSectionMap.set(section1, [i, index]);
      }
    }
  }

  const sections: Record<string, ArchivedSectionData> = {};

  for (const [object, [sectionIndex, index]] of duplicateSectionMap) {
    const id = uint16To4CharString(index);
    if (!sections[id]) sections[id] = object;
    data.sections[sectionIndex] = id;
  }

  data.duplicates = {
    sections,
  };
}

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
      `Column at location ${location} does not exist when trying to arhicve it.`
    );

  const sectorPalettes = getColumnPalettes();

  const processedSections: ProcessedSection[] = [];
  for (const section of sector.sections) {
    const processedSection = getProcessedSection(section);

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
    const firstState = section.state[0];
    const firstMod = section.mod[0];
    const firstSecondary = section.secondary[0];

    const firstLightLevels: Record<ArchivedLightSegments, number> = {
      sun: lightData.getS(firstLight),
      red: lightData.getR(firstLight),
      green: lightData.getG(firstLight),
      blue: lightData.getB(firstLight),
    };

    const length = section.ids.length;
    for (let i = 0; i < length; i++) {
      const stringId = VoxelPalettesRegister.voxels.getStringId(section.ids[i]);

      const voxelId = !sectorPalettes.ids.isRegistered(stringId)
        ? sectorPalettes.ids.register(stringId)
        : sectorPalettes.ids.getNumberId(stringId);
      processedSection.ids.value = voxelId;
      if (!processedSection.palettes.ids.isRegistered(voxelId))
        processedSection.palettes.ids.register(voxelId);

      const secondaryId =
        VoxelTagsRegister.VoxelTags[section.ids[i]]["dve_can_have_secondary"] &&
        VoxelPalettesRegister.voxels.getStringId(section.secondary[i]);

      const voxelSecondary = secondaryId
        ? !sectorPalettes.secondaryId.isRegistered(secondaryId)
          ? sectorPalettes.secondaryId.register(secondaryId)
          : sectorPalettes.secondaryId.getNumberId(secondaryId)
        : !sectorPalettes.secondaryState.isRegistered(section.secondary[i])
          ? sectorPalettes.secondaryState.register(section.secondary[i])
          : sectorPalettes.secondaryState.getId(section.secondary[i]);

      if (
        VoxelTagsRegister.VoxelTags[section.ids[i]]["dve_can_have_secondary"]
      ) {
        if (!processedSection.palettes.secondaryId.isRegistered(voxelSecondary))
          processedSection.palettes.secondaryId.register(voxelSecondary);
      } else {
        if (
          !processedSection.palettes.secondaryState.isRegistered(voxelSecondary)
        )
          processedSection.palettes.secondaryState.register(voxelSecondary);
      }

      const voxelLevel = !sectorPalettes.level.isRegistered(section.level[i])
        ? sectorPalettes.level.register(section.level[i])
        : sectorPalettes.level.getId(section.level[i]);
      if (!processedSection.palettes.level.isRegistered(section.level[i]))
        processedSection.palettes.level.register(section.level[i]);

      let voxelState = -1;
      if (!sectorPalettes.state.isRegistered(section.state[i])) {
        voxelState = sectorPalettes.state.register(section.state[i]);
        sectorPalettes.stateIdMap[voxelState] = secondaryId
          ? section.secondary[i]
          : section.ids[i];
      } else {
        voxelState = sectorPalettes.state.getId(section.state[i]);
      }
      if (!processedSection.palettes.state.isRegistered(voxelState))
        processedSection.palettes.state.register(voxelState);

      let voxelMod = -1;
      if (!sectorPalettes.mod.isRegistered(section.mod[i])) {
        voxelMod = sectorPalettes.mod.register(section.mod[i]);
        sectorPalettes.modIdMap[voxelMod] = secondaryId
          ? section.secondary[i]
          : section.ids[i];
      } else {
        voxelMod = sectorPalettes.mod.getId(section.mod[i]);
      }
      if (!processedSection.palettes.mod.isRegistered(voxelMod))
        processedSection.palettes.mod.register(voxelMod);

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
      if (section.state[i] != firstState)
        processedSection.state.allTheSame = false;
      if (section.mod[i] != firstMod) processedSection.mod.allTheSame = false;
      if (section.secondary[i] != firstSecondary)
        processedSection.secondary.allTheSame = false;

      processedSection.ids.buffer[i] = voxelId;
      processedSection.level.buffer[i] = voxelLevel;
      processedSection.state.buffer[i] = voxelState;
      processedSection.mod.buffer[i] = voxelMod;
      processedSection.secondary.buffer[i] = voxelSecondary;
    }

    processedSections.push(processedSection);
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
    archivedSection.ids.isPaletted =
      sectorPalettes.ids.size <= BinaryBuffer.BytePaletteMax ||
      archivedSection.palettes.ids.size <= BinaryBuffer.BytePaletteMax;
    archivedSection.ids.remapped =
      sectorPalettes.ids.size > BinaryBuffer.BytePaletteMax &&
      archivedSection.palettes.ids.size <= BinaryBuffer.BytePaletteMax &&
      !archivedSection.ids.allTheSame;

    //level
    archivedSection.level.isPaletted =
      sectorPalettes.level.size <= BinaryBuffer.NibblePaletteMax &&
      archivedSection.palettes.level.size <= BinaryBuffer.NibblePaletteMax;
    archivedSection.level.remapped =
      sectorPalettes.level.size > BinaryBuffer.NibblePaletteMax &&
      archivedSection.palettes.level.size <= BinaryBuffer.NibblePaletteMax &&
      !archivedSection.level.allTheSame;
    if (archivedSection.level.isPaletted && !archivedSection.level.remapped) {
      neededPalettes.level = true;
    }
    //state
    archivedSection.state.isPaletted =
      sectorPalettes.state.size <= BinaryBuffer.BytePaletteMax ||
      archivedSection.palettes.state.size <= BinaryBuffer.BytePaletteMax;
    archivedSection.state.remapped =
      sectorPalettes.state.size > BinaryBuffer.BytePaletteMax &&
      archivedSection.palettes.state.size <= BinaryBuffer.BytePaletteMax &&
      !archivedSection.state.allTheSame;

    //mod
    archivedSection.mod.isPaletted =
      sectorPalettes.mod.size <= BinaryBuffer.BytePaletteMax ||
      archivedSection.palettes.mod.size <= BinaryBuffer.BytePaletteMax;
    archivedSection.mod.remapped =
      sectorPalettes.mod.size > BinaryBuffer.BytePaletteMax &&
      archivedSection.palettes.mod.size <= BinaryBuffer.BytePaletteMax &&
      !archivedSection.mod.allTheSame;

    for (const semgnet of lightSegments) {
      archivedSection.light[semgnet].isPaletted =
        sectorPalettes.light[semgnet].size <=
          BinaryBuffer.HalfNibblePaletteMax ||
        archivedSection.palettes.light[semgnet].size <=
          BinaryBuffer.HalfNibblePaletteMax;
      archivedSection.light[semgnet].remapped =
        sectorPalettes.light[semgnet].size >
          BinaryBuffer.HalfNibblePaletteMax &&
        archivedSection.palettes.light[semgnet].size <=
          BinaryBuffer.HalfNibblePaletteMax &&
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
      (sectorPalettes.secondaryState.size <= BinaryBuffer.BytePaletteMax &&
        sectorPalettes.secondaryId.size <= BinaryBuffer.BytePaletteMax) ||
      (archivedSection.palettes.secondaryState.size <=
        BinaryBuffer.BytePaletteMax &&
        archivedSection.palettes.secondaryId.size <=
          BinaryBuffer.BytePaletteMax);
    archivedSection.secondary.remapped =
      Math.max(
        sectorPalettes.secondaryState.size,
        sectorPalettes.secondaryId.size
      ) > BinaryBuffer.BytePaletteMax &&
      Math.max(
        archivedSection.palettes.secondaryId.size,
        archivedSection.palettes.secondaryState.size
      ) <= BinaryBuffer.BytePaletteMax &&
      !archivedSection.secondary.allTheSame;

    if (
      !archivedSection.ids.remapped &&
      !archivedSection.light.sun.remapped &&
      !archivedSection.light.red.remapped &&
      !archivedSection.light.green.remapped &&
      !archivedSection.light.blue.remapped &&
      !archivedSection.secondary.remapped &&
      !archivedSection.mod.remapped &&
      !archivedSection.level.remapped
    )
      continue;
    const length = archivedSection.original.ids.length;
    for (let i = 0; i < length; i++) {
      if (archivedSection.ids.remapped)
        archivedSection.ids.buffer[i] = archivedSection.palettes.ids.getId(
          archivedSection.ids.buffer[i]
        );

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

      if (archivedSection.state.remapped)
        archivedSection.state.buffer[i] = archivedSection.palettes.state.getId(
          sectorPalettes.state.getId(archivedSection.state.buffer[i])
        );
      if (archivedSection.mod.remapped)
        archivedSection.mod.buffer[i] = archivedSection.palettes.mod.getId(
          sectorPalettes.mod.getId(archivedSection.mod.buffer[i])
        );

      if (archivedSection.secondary.remapped)
        archivedSection.secondary.buffer[i] = VoxelTagsRegister.VoxelTags[
          archivedSection.original.ids[i]
        ]["dve_can_have_secondary"]
          ? archivedSection.palettes.secondaryId.getId(
              archivedSection.secondary.buffer[i]
            )
          : archivedSection.palettes.secondaryState.getId(
              archivedSection.secondary.buffer[i]
            );
    }
  }

  const stateMap: ArchivedSectorData["palettes"]["stateMap"] = {};
  for (let i = 0; i < sectorPalettes.state._palette.length; i++) {
    const state = sectorPalettes.state._palette[i];
    const voxelId = VoxelPalettesRegister.voxels.getStringId(
      sectorPalettes.stateIdMap[i]
    );
    if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
    const schema = SchemaRegister.getVoxelSchemas(voxelId);
    stateMap[i] = schema.state.getStateObject(state);
  }

  const modMap: ArchivedSectorData["palettes"]["modMap"] = {};
  for (let i = 0; i < sectorPalettes.mod._palette.length; i++) {
    const mod = sectorPalettes.mod._palette[i];
    const voxelId = VoxelPalettesRegister.voxels.getStringId(
      sectorPalettes.modIdMap[i]
    );
    if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
    const schema = SchemaRegister.getVoxelSchemas(voxelId);
    modMap[i] = schema.mod.getStateObject(mod);
  }

  const sections: ArchivedSectionData[] = [];
  for (const section of processedSections) {
    sections.push(GetArchivedSection(section, sectorPalettes));
  }

  const palettes: ArchivedSectorData["palettes"] = {
    id: sectorPalettes.ids._palette,
    stateMap,
    modMap,
    state: new Uint16Array(sectorPalettes.state._palette),
    mod: new Uint16Array(sectorPalettes.mod._palette),
    light: {},

    secondaryId: sectorPalettes.secondaryId._palette,
    secondaryState: new Uint16Array(sectorPalettes.secondaryState._palette),
  };
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
    location: [...archiveData.location],
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
