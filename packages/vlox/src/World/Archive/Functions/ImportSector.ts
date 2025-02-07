import { SectionData, Sector, SectorData } from "../../index";
import { ArchivedSectionData, ArchivedSectorData } from "../Archive.types";
import { NumberPalette } from "../../../Util/NumberPalette";
import { StringPalette } from "../../../Util/StringPalette";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";
import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";
import { lightSegments, lightSemgnetSet } from "./Shared";

type RunData = {
  version?: number;
  loadColumnState?: (data: Record<string, any>, sector: SectorData) => void;
  loadSectionState?: (
    keys: string[],
    data: any[],
    section: SectionData
  ) => void;
};

type ImportedSectorData = ReturnType<typeof getImportedSectorData>;
type ImportedSectionData = ReturnType<typeof getImportedSectionData>;

const getImportedSectorData = (sector: ArchivedSectorData) => {
  return {
    sector,
    idPalette: new StringPalette(sector.palettes.id),
    secondaryId: new StringPalette(sector.palettes.secondaryId),
    levelPalette: sector.palettes.level
      ? new NumberPalette(sector.palettes.level)
      : undefined,
    lightPalette: {
      sun: sector.palettes.light.sun
        ? new NumberPalette(sector.palettes.light.sun)
        : null,
      red: sector.palettes.light.red
        ? new NumberPalette(sector.palettes.light.red)
        : null,
      green: sector.palettes.light.green
        ? new NumberPalette(sector.palettes.light.green)
        : null,
      blue: sector.palettes.light.blue
        ? new NumberPalette(sector.palettes.light.blue)
        : null,
    },
    statePalette: new NumberPalette(sector.palettes.state),
    modPalette: new NumberPalette(sector.palettes.mod),
    secondaryState: new NumberPalette(sector.palettes.secondaryState),
  };
};
const getImportedSectionData = (section: ArchivedSectionData) => {
  return {
    section,
    buffers: {
      ids: !section.buffers.id
        ? new BinaryBuffer({ buffer: 0 })
        : typeof section.buffers.id == "number"
          ? new BinaryBuffer({ buffer: section.buffers.id })
          : new BinaryBuffer(section.buffers.id),
      level: !section.buffers.level
        ? new BinaryBuffer({ buffer: 0 })
        : typeof section.buffers.level == "number"
          ? new BinaryBuffer({ buffer: section.buffers.level })
          : new BinaryBuffer(section.buffers.level),

      light: {
        sun: !section.buffers.light?.sun
          ? new BinaryBuffer({ buffer: 0 })
          : typeof section.buffers.light.sun == "number"
            ? new BinaryBuffer({ buffer: section.buffers.light.sun })
            : new BinaryBuffer(section.buffers.light.sun),
        red: !section.buffers.light?.red
          ? new BinaryBuffer({ buffer: 0 })
          : typeof section.buffers.light.red == "number"
            ? new BinaryBuffer({ buffer: section.buffers.light.red })
            : new BinaryBuffer(section.buffers.light.red),
        green: !section.buffers.light?.green
          ? new BinaryBuffer({ buffer: 0 })
          : typeof section.buffers.light.green == "number"
            ? new BinaryBuffer({ buffer: section.buffers.light.green })
            : new BinaryBuffer(section.buffers.light.green),
        blue: !section.buffers.light?.blue
          ? new BinaryBuffer({ buffer: 0 })
          : typeof section.buffers.light.blue == "number"
            ? new BinaryBuffer({ buffer: section.buffers.light.blue })
            : new BinaryBuffer(section.buffers.light.blue),
      },
      state: !section.buffers.state
        ? new BinaryBuffer({ buffer: 0 })
        : typeof section.buffers.state == "number"
          ? new BinaryBuffer({ buffer: section.buffers.state })
          : new BinaryBuffer(section.buffers.state),
      mod: !section.buffers.mod
        ? new BinaryBuffer({ buffer: 0 })
        : typeof section.buffers.mod == "number"
          ? new BinaryBuffer({ buffer: section.buffers.mod })
          : new BinaryBuffer(section.buffers.mod),
      secondary: !section.buffers.secondary
        ? new BinaryBuffer({ buffer: 0 })
        : typeof section.buffers.secondary == "number"
          ? new BinaryBuffer({ buffer: section.buffers.secondary })
          : new BinaryBuffer(section.buffers.secondary),
    },
    idPalette: section.palettes?.id
      ? new NumberPalette(section.palettes?.id)
      : undefined,
    lightPalette: {
      sun: section.palettes?.light?.sun
        ? new NumberPalette(section.palettes?.light?.sun)
        : null,
      red: section.palettes?.light?.red
        ? new NumberPalette(section.palettes?.light?.red)
        : null,
      green: section.palettes?.light?.green
        ? new NumberPalette(section.palettes?.light?.green)
        : null,
      blue: section.palettes?.light?.blue
        ? new NumberPalette(section.palettes?.light?.blue)
        : null,
    },
    levelPalette: section.palettes?.level
      ? new NumberPalette(section.palettes?.level)
      : undefined,
    statePalette: section.palettes?.state
      ? new NumberPalette(section.palettes?.state)
      : undefined,
    modPalette: section.palettes?.mod
      ? new NumberPalette(section.palettes?.mod)
      : undefined,
    secondaryState: section.palettes?.secondaryState
      ? new NumberPalette(section.palettes?.secondaryState)
      : undefined,
    secondaryId: section.palettes?.secondaryId
      ? new NumberPalette(section.palettes?.secondaryId)
      : undefined,
  };
};
const getId = (
  value: number,
  importedSector: ImportedSectorData,
  importedSection: ImportedSectionData
): number => {
  if (importedSection.buffers.ids.type == "value") {
    return VoxelPalettesRegister.voxels.getNumberId(
      importedSector.idPalette.getStringId(value)
    );
  }
  if (importedSection.idPalette) {
    return VoxelPalettesRegister.voxels.getNumberId(
      importedSector.idPalette.getStringId(
        importedSection.idPalette.getValue(value)
      )
    );
  }
  return VoxelPalettesRegister.voxels.getNumberId(
    importedSector.idPalette.getStringId(value)
  );
};

const getLight = (
  index: number,
  importedSector: ImportedSectorData,
  importedSection: ImportedSectionData
): number => {
  let finalLight = 0;
  for (let l = 0; l < lightSegments.length; l++) {
    const segment = lightSegments[l];
    let value = 0;
    if (importedSection.buffers.light[segment].type == "value") {
      value = importedSection.buffers.light[segment].getValue(index);
    } else {
      if (importedSection.buffers.light[segment].type == "4-bit") {
        value = importedSection.buffers.light[segment].getValue(index);
      } else {
        if (importedSection.lightPalette[segment]) {
          value = importedSection.lightPalette[segment].getValue(
            importedSection.buffers.light[segment].getValue(index)
          );
        } else if (importedSector.lightPalette[segment]) {
          value = importedSector.lightPalette[segment].getValue(
            importedSection.buffers.light[segment].getValue(index)
          );
        }
      }
    }

    finalLight = lightSemgnetSet[segment](value, finalLight);
  }

  return finalLight;
};
const getLevel = (
  value: number,
  importedSector: ImportedSectorData,
  importedSection: ImportedSectionData
): number => {
  if (importedSection.levelPalette) {
    return importedSection.levelPalette.getValue(value);
  }
  if (importedSector.levelPalette) {
    return importedSector.levelPalette.getValue(value);
  }
  return value;
};

const getState = (
  voxelId: number,
  value: number,
  processedState: Record<number, number>,
  importedSector: ImportedSectorData,
  importedSection: ImportedSectionData
): number => {
  const voxelStringId = VoxelPalettesRegister.voxels.getStringId(voxelId);
  if (!SchemaRegister.hasVoxelSchema(voxelStringId)) return value;
  let stateId = -1;
  if (
    importedSection.section.buffers.state instanceof Uint16Array ||
    typeof importedSection.section.buffers.state == "number"
  ) {
    stateId = value;
  }

  if (importedSection.statePalette) {
    stateId = importedSection.statePalette.getValue(value);
  } else if (importedSector.statePalette) {
    stateId = value;
  }

  if (processedState[stateId] !== undefined) return processedState[stateId];

  value = SchemaRegister.getVoxelSchemas(voxelStringId)!.state.fromStateObject(
    importedSector.sector.palettes.stateMap[stateId]
  );
  processedState[stateId] = value;
  return value;
};

const getMod = (
  voxelId: number,
  value: number,
  processedMod: Record<number, number>,
  importedSector: ImportedSectorData,
  importedSection: ImportedSectionData
): number => {
  const voxelStringId = VoxelPalettesRegister.voxels.getStringId(voxelId);
  if (!SchemaRegister.hasVoxelSchema(voxelStringId)) return value;
  let modId = -1;
  if (
    importedSection.section.buffers.state instanceof Uint16Array ||
    typeof importedSection.section.buffers.state == "number"
  ) {
    modId = value;
  }

  if (importedSection.modPalette) {
    modId = importedSection.modPalette.getValue(value);
  } else if (importedSector.modPalette) {
    modId = value;
  }

  if (processedMod[modId] !== undefined) return processedMod[modId];

  value = SchemaRegister.getVoxelSchemas(voxelStringId)!.mod.fromStateObject(
    importedSector.sector.palettes.modMap[modId]
  );
  processedMod[modId] = value;
  return value;
};

const getSecondary = (
  voxelId: number,
  value: number,
  importedSector: ImportedSectorData,
  importedSection: ImportedSectionData
): number => {
  if (VoxelTagsRegister.VoxelTags[voxelId]["dve_can_have_secondary"]) {
    if (importedSection.secondaryId) {
      return VoxelPalettesRegister.voxels.getNumberId(
        importedSector.secondaryId!.getStringId(
          importedSection.secondaryId.getValue(value)
        )
      );
    }
    return VoxelPalettesRegister.voxels.getNumberId(
      importedSector.sector.palettes.secondaryId![value]
    );
  }

  if (typeof importedSection.section.buffers.secondary == "number") {
    return value;
  }
  if (importedSection.secondaryState && importedSector.secondaryState) {
    return importedSector.secondaryState.getValue(
      importedSection.secondaryState.getValue(value)
    );
  }
  if (importedSector.secondaryState) {
    return importedSector.secondaryState.getId(value);
  }
  return value;
};

export default function ImportSector(
  archivedSector: ArchivedSectorData,
  archiveData: RunData
): SectorData {
  const sector = new Sector(Sector.CreateNew(), [
    archivedSector.location[1],
    archivedSector.location[2],
    archivedSector.location[3],
  ]);

  sector.loadFlags(archivedSector.flags);
  sector.loadTimestamps(archivedSector.timestamps);

  const importedSector = getImportedSectorData(archivedSector);
  const processedState: Record<number, number> = {};
  const processedMod: Record<number, number> = {};

  for (
    let sectionIndex = 0;
    sectionIndex < archivedSector.sections.length;
    sectionIndex++
  ) {
    const archivedSectionValue = archivedSector.sections[sectionIndex];
    const archivedSection =
      typeof archivedSectionValue == "string"
        ? archivedSector.duplicates?.sections?.[archivedSectionValue]!
        : archivedSectionValue;
    const importedSection = getImportedSectionData(archivedSection);
    const section = sector.sections[sectionIndex];
    archivedSection.flags && section.loadFlags(archivedSection.flags);

    if (!ArrayBuffer.isView(archivedSection.buffers.buried)) {
      for (let i = 0; i < section.buried.length; i++) {
        section.buried[i] = archivedSection.buffers.buried || 0;
      }
    } else {
      for (let i = 0; i < section.buried.length; i++) {
        section.buried[i] = archivedSection.buffers.buried[i];
      }
    }
    if (!ArrayBuffer.isView(archivedSection.buffers.voxelMap)) {
      for (let i = 0; i < section.voxelMap.length; i++) {
        section.voxelMap[i] = archivedSection.buffers.voxelMap || 0;
      }
    } else {
      for (let i = 0; i < section.voxelMap.length; i++) {
        section.voxelMap[i] = archivedSection.buffers.voxelMap[i];
      }
    }
    if (!ArrayBuffer.isView(archivedSection.buffers.dirtyMap)) {
      for (let i = 0; i < section.dirtyMap.length; i++) {
        section.dirtyMap[i] = archivedSection.buffers.dirtyMap || 0;
      }
    } else {
      for (let i = 0; i < section.dirtyMap.length; i++) {
        section.dirtyMap[i] = archivedSection.buffers.dirtyMap[i];
      }
    }

    for (let i = 0; i < section.ids.length; i++) {
      section.ids[i] = getId(
        importedSection.buffers.ids.getValue(i),
        importedSector,
        importedSection
      );

      section.level[i] = getLevel(
        importedSection.buffers.level.getValue(i),
        importedSector,
        importedSection
      );

      section.light[i] = getLight(i, importedSector, importedSection);

      section.secondary[i] = getSecondary(
        section.ids[i],
        importedSection.buffers.secondary.getValue(i),
        importedSector,
        importedSection
      );

      let secondary =
        VoxelTagsRegister.VoxelTags[section.ids[i]]["dve_can_have_secondary"] &&
        section.secondary[i] > 0;

      section.state[i] = getState(
        secondary ? section.secondary[i] : section.ids[i],
        importedSection.buffers.state.getValue(i),
        processedState,
        importedSector,
        importedSection
      );

      section.mod[i] = getMod(
        secondary ? section.secondary[i] : section.ids[i],
        importedSection.buffers.mod.getValue(i),
        processedMod,
        importedSector,
        importedSection
      );
    }

    sector.sections[sectionIndex] = section;
  }

  sector.setBitFlag(Sector.FlagIds.isStored, true);
  return sector;
}
