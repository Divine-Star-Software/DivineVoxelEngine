import { Section, VoxelDataArrays, Sector, SectorData } from "../../index";
import { ArchivedSectionData, ArchivedSectorData } from "../Archive.types";
import { NumberPalette } from "../../../Util/NumberPalette";
import { StringPalette } from "../../../Util/StringPalette";
import { getPaletteArray } from "../../../Util/Binary/Palettes";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";

type RunData = {
  version?: number;
  loadColumnState?: (data: Record<string, any>, sector: SectorData) => void;
  loadSectionState?: (
    keys: string[],
    data: any[],
    section: VoxelDataArrays
  ) => void;
};

const updateSectionBuffers = (
  sector: ArchivedSectorData,
  section: ArchivedSectionData
) => {
  if (
    (sector.palettes.id.length <= 15 ||
      (section.palettes.id && section.palettes.id.length <= 15)) &&
    ArrayBuffer.isView(section.buffers.id)
  ) {
    section.buffers.id = getPaletteArray(
      Math.min(
        section.palettes.id?.length || Infinity,
        sector.palettes.id?.length || 0
      ),
      section.buffers.id as any
    ) as any;
  }
  if (
    ((section.palettes.light && section.palettes.light.length <= 15) ||
      (sector.palettes.light && sector.palettes.light.length <= 15)) &&
    ArrayBuffer.isView(section.buffers.light)
  ) {
    section.buffers.light = getPaletteArray(
      Math.min(
        section.palettes.light?.length || Infinity,
        sector.palettes.light?.length || 0
      ),
      section.buffers.light as any
    ) as any;
  }

  if (
    ((section.palettes.state && section.palettes.state.length <= 15) ||
      (sector.palettes.state && sector.palettes.state.length <= 15)) &&
    ArrayBuffer.isView(section.buffers.state)
  ) {
    section.buffers.state = getPaletteArray(
      Math.min(
        section.palettes.state?.length || Infinity,
        sector.palettes.state?.length || 0
      ),
      section.buffers.state as any
    ) as any;
  }

  if (
    ((section.palettes.mod && section.palettes.mod.length <= 15) ||
      (sector.palettes.mod && sector.palettes.mod.length <= 15)) &&
    ArrayBuffer.isView(section.buffers.mod)
  ) {
    section.buffers.mod = getPaletteArray(
      Math.min(
        section.palettes.mod?.length || Infinity,
        sector.palettes.mod?.length || 0
      ),
      section.buffers.mod as any
    ) as any;
  }

  if (
    ((section.palettes.secondaryState &&
      section.palettes.secondaryState.length <= 15) ||
      (sector.palettes.secondaryState &&
        sector.palettes.secondaryState.length <= 15)) &&
    ((section.palettes.secondaryId &&
      section.palettes.secondaryId.length <= 15) ||
      (sector.palettes.secondaryId &&
        sector.palettes.secondaryId.length <= 15)) &&
    ArrayBuffer.isView(section.buffers.secondary)
  ) {
    section.buffers.secondary = getPaletteArray(
      Math.max(
        Math.min(
          section.palettes.secondaryId?.length || Infinity,
          sector.palettes.secondaryId?.length || 0
        ),
        Math.min(
          section.palettes.secondaryState?.length || Infinity,
          sector.palettes.secondaryState?.length || 0
        )
      ),
      section.buffers.secondary as any
    ) as any;
  }
};
type ImportedColumnData = ReturnType<typeof getImportedColumnData>;
type ImportedSectionData = ReturnType<typeof getImportedSectionData>;

const getImportedColumnData = (sector: ArchivedSectorData) => {
  return {
    sector,
    idPalette: new StringPalette(sector.palettes.id),
    secondaryId: sector.palettes.secondaryId
      ? new StringPalette(sector.palettes.secondaryId)
      : undefined,
    lightPalette: sector.palettes.light
      ? new NumberPalette(sector.palettes.light)
      : undefined,
    statePalette: sector.palettes.state
      ? new NumberPalette(sector.palettes.state)
      : undefined,
    modPalette: sector.palettes.mod
      ? new NumberPalette(sector.palettes.mod)
      : undefined,
    secondaryState: sector.palettes.secondaryState
      ? new NumberPalette(sector.palettes.secondaryState)
      : undefined,
  };
};
const getImportedSectionData = (section: ArchivedSectionData) => {
  return {
    section,
    idPalette: section.palettes.id
      ? new NumberPalette(section.palettes.id)
      : undefined,
    lightPalette: section.palettes.light
      ? new NumberPalette(section.palettes.light)
      : undefined,
    statePalette: section.palettes.state
      ? new NumberPalette(section.palettes.state)
      : undefined,
    modPalette: section.palettes.mod
      ? new NumberPalette(section.palettes.mod)
      : undefined,
    secondaryState: section.palettes.secondaryState
      ? new NumberPalette(section.palettes.secondaryState)
      : undefined,
    secondaryId: section.palettes.secondaryId
      ? new NumberPalette(section.palettes.secondaryId)
      : undefined,
  };
};
const getId = (
  value: number,
  importedColumn: ImportedColumnData,
  importedSection: ImportedSectionData
): number => {
  if (importedSection.section.buffers.state instanceof Uint16Array)
    return value;

  if (typeof importedSection.section.buffers.id == "number") {
    return VoxelPalettesRegister.voxels.getNumberId(
      importedColumn.sector.palettes.id[importedSection.section.buffers.id]
    );
  }
  if (importedSection.idPalette) {
    return VoxelPalettesRegister.voxels.getNumberId(
      importedColumn.idPalette.getStringId(
        importedSection.idPalette.getValue(value)
      )
    );
  }

  return VoxelPalettesRegister.voxels.getNumberId(
    importedColumn.idPalette.getStringId(value)
  );
};
const getLight = (
  value: number,
  importedColumn: ImportedColumnData,
  importedSection: ImportedSectionData
): number => {
  if (importedSection.section.buffers.light instanceof Uint16Array)
    return value;
  if (typeof importedSection.section.buffers.light == "number") {
    return value;
  }
  if (importedSection.lightPalette) {
    return importedSection.lightPalette.getValue(value);
  }
  if (importedColumn.lightPalette) {
    return importedColumn.lightPalette.getValue(value);
  }
  return value;
};

const getState = (
  voxelId: number,
  value: number,
  processedState: Record<number, number>,
  importedColumn: ImportedColumnData,
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
  } else if (importedColumn.statePalette) {
    stateId = value;
  }

  if (processedState[stateId] !== undefined) return processedState[stateId];

  value = SchemaRegister.getVoxelSchemas(voxelStringId)!.state.fromStateObject(
    importedColumn.sector.palettes.stateMap[stateId]
  );
  processedState[stateId] = value;
  return value;
};

const getMod = (
  voxelId: number,
  value: number,
  processedMod: Record<number, number>,
  importedColumn: ImportedColumnData,
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
  } else if (importedColumn.modPalette) {
    modId = value;
  }

  if (processedMod[modId] !== undefined) return processedMod[modId];

  value = SchemaRegister.getVoxelSchemas(voxelStringId)!.mod.fromStateObject(
    importedColumn.sector.palettes.modMap[modId]
  );
  processedMod[modId] = value;
  return value;
};

const getSecondary = (
  voxelId: number,
  value: number,
  importedColumn: ImportedColumnData,
  importedSection: ImportedSectionData
): number => {
  if (VoxelTagsRegister.VoxelTags[voxelId]["dve_can_have_secondary"]) {
    if (typeof importedSection.section.buffers.secondary == "number") {
      return VoxelPalettesRegister.voxels.getNumberId(
        importedColumn.sector.palettes.secondaryId![
          importedSection.section.buffers.secondary
        ]
      );
    }
    if (importedSection.secondaryId) {
      return VoxelPalettesRegister.voxels.getNumberId(
        importedColumn.secondaryId!.getStringId(
          importedSection.secondaryId.getValue(value)
        )
      );
    }
    return VoxelPalettesRegister.voxels.getNumberId(
      importedColumn.sector.palettes.secondaryId![value]
    );
  }

  if (typeof importedSection.section.buffers.secondary == "number") {
    return value;
  }
  if (importedSection.secondaryState && importedColumn.secondaryState) {
    return importedColumn.secondaryState.getValue(
      importedSection.secondaryState.getValue(value)
    );
  }
  if (importedColumn.secondaryState) {
    return importedColumn.secondaryState.getId(value);
  }
  return value;
};

export default function ImportSector(
  sector: ArchivedSectorData,
  archiveData: RunData
): SectorData {
  const newSector = new Sector(Sector.CreateNew());
  newSector.position[0] = sector.location[1];
  newSector.position[1] = sector.location[2];
  newSector.position[2] = sector.location[3];

  if (!archiveData.loadColumnState) {
    //sectorStructInstance.deserialize(sector.sectorState);
  } else {
    archiveData.loadColumnState(sector.sectorState, newSector);
  }

  const importedSector = getImportedColumnData(sector);
  const processedState: Record<number, number> = {};
  const processedMod: Record<number, number> = {};

  for (
    let sectionIndex = 0;
    sectionIndex < sector.sections.length;
    sectionIndex++
  ) {
    const section = sector.sections[sectionIndex];
    const importedSection = getImportedSectionData(section);
    const newSection = newSector.sections[sectionIndex];

    const sectionState: Record<string, any> = {};
    for (let i = 0; i < sector.keys.sectionState.length; i++) {
      sectionState[sector.keys.sectionState[i]] = section.state[i];
    }

    updateSectionBuffers(sector, section);
    /* if (!archiveData.loadSectionState) {
      sectionStructInstance.setData(newSection.sectionState);
      sectionStructInstance.deserialize(sectionState);
    } else {
      archiveData.loadSectionState(
        sector.keys.sectionState,
        section.state,
        newSection
      );
    } */

    for (let i = 0; i < newSection.ids.length; i++) {
      newSection.ids[i] = getId(
        typeof section.buffers.id == "number"
          ? section.buffers.id
          : section.buffers.id[i],
        importedSector,
        importedSection
      );
      newSection.light[i] = getLight(
        typeof section.buffers.light == "number"
          ? section.buffers.light
          : section.buffers.light[i],

        importedSector,
        importedSection
      );

      newSection.secondary[i] = getSecondary(
        newSection.ids[i],
        typeof section.buffers.secondary == "number"
          ? section.buffers.secondary
          : section.buffers.secondary[i],
        importedSector,
        importedSection
      );

      let secondary =
        VoxelTagsRegister.VoxelTags[newSection.ids[i]][
          "dve_can_have_secondary"
        ] && newSection.secondary[i] > 0;

      newSection.state[i] = getState(
        secondary ? newSection.secondary[i] : newSection.ids[i],
        typeof section.buffers.state == "number"
          ? section.buffers.state
          : section.buffers.state[i],
        processedState,
        importedSector,
        importedSection
      );

      newSection.mod[i] = getMod(
        secondary ? newSection.secondary[i] : newSection.ids[i],
        typeof section.buffers.mod == "number"
          ? section.buffers.mod
          : section.buffers.mod[i],
        processedMod,
        importedSector,
        importedSection
      );
    }

    newSector.sections[sectionIndex] = newSection;
  }

  return newSector;
}
