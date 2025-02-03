import { StringPalette } from "../../../Util/StringPalette";
import { NumberPalette } from "../../../Util/NumberPalette";
import { LocationData } from "../../../Math";
import { WorldRegister } from "../../../World/WorldRegister";
import { Section } from "../../../World/index";
import { ArchivedSectionData, ArchivedSectorData } from "../Archive.types";
import { convertToPaletteBuffer } from "../../../Util/Binary/Palettes";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";

type ProcessedSection = ReturnType<typeof getProcessedSection>;
const getProcessedSection = (section: Section) => {
  return {
    section,
    palettes: getSectionPalettes(),
    // ids
    ids: new Uint16Array(section.ids.length),
    idsAllTheSame: true,
    remappedIds: false,
    // light
    light: new Uint16Array(section.light.length),
    lightAllTheSame: true,
    isLightPaletted: false,
    remappedLight: false,
    // level
    level: new Uint8Array(section.level.length),
    levelAllTheSame: true,
    isLevelPaletted: false,
    remappedLevel: false,
    // state
    state: new Uint16Array(section.state.length),
    stateAllTheSame: true,
    isStatePaletted: false,
    remappedState: false,
    // mod
    mod: new Uint16Array(section.mod.length),
    modAllTheSame: true,
    isModPaletted: false,
    remappedMod: false,
    // secondary
    secondary: new Uint16Array(section.secondary.length),
    isSecondaryPaletted: false,
    secondaryAllTheSame: true,
    remappedSecondary: false,
  };
};

function getSectionPalettes() {
  return {
    ids: new NumberPalette(),
    level: new NumberPalette(),
    light: new NumberPalette(),
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
    light: new NumberPalette(),
    stateIdMap: <number[]>[],
    state: new NumberPalette(),
    modIdMap: <number[]>[],
    mod: new NumberPalette(),
    secondaryId: new StringPalette(),
    secondaryState: new NumberPalette(),
  };
}

function GetArchivedSection(
  archiveSection: ProcessedSection,
  sectorPalettes: ColumnPalettes
): ArchivedSectionData {
  const palettes: ArchivedSectionData["palettes"] = {};
  if (archiveSection.remappedIds)
    palettes.id = Uint16Array.from(archiveSection.palettes.ids._palette);
  if (archiveSection.remappedLevel)
    palettes.level = Uint8Array.from(archiveSection.palettes.level._palette);
  if (archiveSection.remappedLight)
    palettes.light = Uint16Array.from(archiveSection.palettes.light._palette);
  if (archiveSection.remappedState)
    palettes.state = Uint16Array.from(archiveSection.palettes.state._palette);
  if (archiveSection.remappedMod)
    palettes.mod = Uint16Array.from(archiveSection.palettes.mod._palette);
  if (archiveSection.remappedSecondary) {
    palettes.secondaryId = Uint16Array.from(
      archiveSection.palettes.secondaryId._palette
    );
    palettes.secondaryState = Uint16Array.from(
      archiveSection.palettes.secondaryState._palette
    );
  }
  return {
    state: {} as any,
    palettes,
    buffers: {
      id: archiveSection.idsAllTheSame
        ? archiveSection.ids[0]
        : convertToPaletteBuffer(
            archiveSection.remappedIds
              ? archiveSection.palettes.ids.size
              : sectorPalettes.ids.size,
            archiveSection.ids
          ),
      level: archiveSection.isLevelPaletted
        ? archiveSection.level[0]
        : archiveSection.isLevelPaletted
          ? (convertToPaletteBuffer(
              archiveSection.remappedLevel
                ? archiveSection.palettes.level.size
                : sectorPalettes.level.size,
              archiveSection.level
            ) as Uint8Array)
          : new Uint8Array(archiveSection.section.level.slice()),
      light: archiveSection.lightAllTheSame
        ? archiveSection.light[0]
        : archiveSection.isLightPaletted
          ? convertToPaletteBuffer(
              archiveSection.remappedLight
                ? archiveSection.palettes.light.size
                : sectorPalettes.light.size,
              archiveSection.light
            )
          : new Uint16Array(archiveSection.section.light.slice()),
      state: archiveSection.stateAllTheSame
        ? archiveSection.state[0]
        : archiveSection.isStatePaletted
          ? convertToPaletteBuffer(
              archiveSection.remappedState
                ? archiveSection.palettes.state.size
                : sectorPalettes.state.size,
              archiveSection.state
            )
          : new Uint16Array(archiveSection.section.state.slice()),
      mod: archiveSection.modAllTheSame
        ? archiveSection.mod[0]
        : archiveSection.isModPaletted
          ? convertToPaletteBuffer(
              archiveSection.remappedMod
                ? archiveSection.palettes.mod.size
                : sectorPalettes.mod.size,
              archiveSection.mod
            )
          : new Uint16Array(archiveSection.section.mod.slice()),
      secondary: archiveSection.secondaryAllTheSame
        ? archiveSection.secondary[0]
        : archiveSection.isSecondaryPaletted
          ? convertToPaletteBuffer(
              archiveSection.remappedSecondary
                ? Math.max(
                    archiveSection.palettes.secondaryState.size,
                    archiveSection.palettes.secondaryId.size
                  )
                : Math.max(
                    sectorPalettes.secondaryState.size,
                    sectorPalettes.secondaryId.size
                  ),
              archiveSection.secondary
            )
          : new Uint16Array(archiveSection.secondary),
    },
  };
}
type ArchiveColumnProps = {
  location: LocationData;
};
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
    const length = section.ids.length;
    let firstId = -1;
    let firstLight = -1;
    let firstLevel = -1;
    let firstState = -1;
    let firstMod = -1;
    let firstSecondary = -1;

    const processedSection = getProcessedSection(section);

    for (let i = 0; i < length; i++) {
      const stringId = VoxelPalettesRegister.voxels.getStringId(section.ids[i]);

      const voxelId = !sectorPalettes.ids.isRegistered(stringId)
        ? sectorPalettes.ids.register(stringId)
        : sectorPalettes.ids.getNumberId(stringId);

      if (!processedSection.palettes.ids.isRegistered(voxelId))
        processedSection.palettes.ids.register(voxelId);
      if (firstId == -1) firstId = voxelId;

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

      secondaryId
        ? !processedSection.palettes.secondaryId.isRegistered(voxelSecondary) &&
          processedSection.palettes.secondaryId.register(voxelSecondary)
        : !processedSection.palettes.secondaryState.isRegistered(
            voxelSecondary
          ) &&
          processedSection.palettes.secondaryState.register(voxelSecondary);

      if (firstSecondary == -1) firstSecondary = section.secondary[i];

      const voxelLevel = !sectorPalettes.level.isRegistered(section.level[i])
        ? sectorPalettes.level.register(section.level[i])
        : sectorPalettes.level.getId(section.level[i]);
      if (!processedSection.palettes.level.isRegistered(section.level[i]))
        processedSection.palettes.level.register(section.level[i]);
      if (firstLevel == -1) firstLevel = voxelLevel;

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
      if (firstState == -1) firstState = voxelState;

      let voxelMod = -1;
      if (!sectorPalettes.mod.isRegistered(section.mod[i])) {
        voxelMod = sectorPalettes.mod.register(section.mod[i]);
        sectorPalettes.stateIdMap[voxelMod] = secondaryId
          ? section.secondary[i]
          : section.ids[i];
      } else {
        voxelMod = sectorPalettes.mod.getId(section.mod[i]);
      }
      if (!processedSection.palettes.mod.isRegistered(voxelMod))
        processedSection.palettes.mod.register(voxelMod);
      if (firstMod == -1) firstMod = voxelMod;

      const voxelLight = !sectorPalettes.light.isRegistered(section.light[i])
        ? sectorPalettes.light.register(section.light[i])
        : sectorPalettes.light.getId(section.light[i]);
      if (!processedSection.palettes.light.isRegistered(section.light[i]))
        processedSection.palettes.light.register(section.light[i]);
      if (firstLight == -1) firstLight = voxelLight;

      if (voxelId != firstId) processedSection.idsAllTheSame = false;
      if (voxelLevel != firstLevel) processedSection.levelAllTheSame = false;
      if (voxelState != firstState) processedSection.stateAllTheSame = false;
      if (voxelMod != firstMod) processedSection.modAllTheSame = false;
      if (voxelLight != firstLight) processedSection.lightAllTheSame = false;
      if (voxelSecondary != firstSecondary)
        processedSection.secondaryAllTheSame = false;

      processedSection.ids[i] = voxelId;
      processedSection.level[i] = voxelLevel;
      processedSection.state[i] = voxelState;
      processedSection.mod[i] = voxelMod;
      processedSection.secondary[i] = voxelSecondary;
      processedSection.light[i] = voxelLight;
    }

    processedSections.push(processedSection);
  }

  for (const section of processedSections) {
    const reMapIds =
      section.palettes.ids.size < sectorPalettes.ids.size &&
      section.palettes.ids.size <= 255 &&
      !section.idsAllTheSame;
    const reMapLevel =
      section.palettes.level.size < sectorPalettes.level.size &&
      section.palettes.level.size <= 255 &&
      !section.levelAllTheSame;
    const reMapState =
      section.palettes.state.size < sectorPalettes.state.size &&
      section.palettes.state.size <= 255 &&
      !section.stateAllTheSame;
    const reMapMod =
      section.palettes.mod.size < sectorPalettes.mod.size &&
      section.palettes.mod.size <= 255 &&
      !section.modAllTheSame;
    const reMapLight =
      section.palettes.light.size < sectorPalettes.light.size &&
      section.palettes.light.size <= 255 &&
      !section.lightAllTheSame;
    const reMapSecondary =
      Math.max(
        section.palettes.secondaryId.size,
        section.palettes.secondaryState.size
      ) <
        Math.max(
          sectorPalettes.secondaryState.size,
          sectorPalettes.secondaryId.size
        ) &&
      Math.max(
        section.palettes.secondaryId.size,
        section.palettes.secondaryState.size
      ) <= 255 &&
      !section.secondaryAllTheSame;
    section.isLightPaletted =
      sectorPalettes.light.size < 65_535 && section.palettes.light.size < 255;
    section.isLevelPaletted =
      sectorPalettes.level.size < 255 && section.palettes.level.size < 255;
    section.isStatePaletted =
      sectorPalettes.state.size < 65_535 && section.palettes.state.size < 255;
    section.isModPaletted =
      sectorPalettes.mod.size < 65_535 && section.palettes.mod.size < 255;
    section.isSecondaryPaletted =
      sectorPalettes.secondaryState.size < 65_535 &&
      section.palettes.secondaryState.size < 255 &&
      section.palettes.secondaryId.size < 255;
    section.remappedIds = reMapIds;
    section.remappedLight = reMapLight && section.isLightPaletted;
    section.remappedState = reMapState && section.isStatePaletted;
    section.remappedMod = reMapMod && section.isModPaletted;
    section.remappedSecondary = reMapSecondary && section.isSecondaryPaletted;
    if (!reMapIds && !reMapLight && !reMapSecondary && !reMapState) continue;
    const length = section.section.ids.length;
    for (let i = 0; i < length; i++) {
      if (reMapIds) section.ids[i] = section.palettes.ids.getId(section.ids[i]);
      if (reMapLight)
        section.light[i] = section.palettes.light.getId(
          section.section.light[i]
        );
      if (reMapLevel)
        section.level[i] = section.palettes.level.getId(
          section.section.level[i]
        );
      if (reMapState)
        section.state[i] = section.palettes.state.getId(
          sectorPalettes.state.getId(section.section.state[i])
        );
      if (reMapMod)
        section.mod[i] = section.palettes.mod.getId(
          sectorPalettes.mod.getId(section.section.mod[i])
        );

      if (reMapSecondary)
        section.secondary[i] = VoxelTagsRegister.VoxelTags[section.ids[i]][
          "dve_can_have_secondary"
        ]
          ? section.palettes.secondaryId.getId(section.secondary[i])
          : section.palettes.secondaryState.getId(section.secondary[i]);
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
  };

  if (sectorPalettes.light.size < 255)
    palettes.light = new Uint16Array(sectorPalettes.light._palette);
  if (sectorPalettes.level.size < 255)
    palettes.level = new Uint8Array(sectorPalettes.level._palette);
  if (sectorPalettes.light.size < 255)
    palettes.light = new Uint16Array(sectorPalettes.light._palette);
  if (sectorPalettes.secondaryId.size > 0)
    palettes.secondaryId = sectorPalettes.secondaryId._palette;
  if (sectorPalettes.secondaryState.size < 255)
    palettes.secondaryState = new Uint16Array(
      sectorPalettes.secondaryState._palette
    );

  return {
    version: "",
    location: [...archiveData.location],
    sectorState: {},
    buffers: {},
    keys: {
      sectionState: [],
    },
    palettes,
    sections,
  };
}
