import { BinaryObject } from "@amodx/binary";
import { Sector } from "../../../World/index";
import {
  ArchivedAreaSectorData,
  ArchivedAreaData,
  ArchivedSectionData,
  ArchivedSectorData,
} from "../Archive.types";
import { uint16To4CharString } from "./Shared";
import { WorldRegister } from "World/WorldRegister";

type RunData = {
  dimension: number;
  sectors: ArchivedSectorData[];
  version?: number;
};

const processPalettes = (archiveData: RunData) => {
  const allRegistered = new Set<string>();
  for (const sector of archiveData.sectors) {
    for (const id of sector.palettes.id) {
      allRegistered.add(id);
    }
    if (!sector.palettes.secondaryId) continue;
    for (const id of sector.palettes.secondaryId) {
      allRegistered.add(id);
    }
  }

  let count = 0;
  const idMap: Record<string, string> = {};
  const idRecord: Record<string, string> = {};
  for (const voxelId of allRegistered) {
    const newId = uint16To4CharString(count);
    idMap[voxelId] = newId;
    idRecord[newId] = voxelId;
    count++;
  }
  for (const sector of archiveData.sectors) {
    for (let i = 0; i < sector.palettes.id.length; i++) {
      sector.palettes.id[i] = idMap[sector.palettes.id[i]];
    }
    if (!sector.palettes.secondaryId) continue;
    for (let i = 0; i < sector.palettes.secondaryId.length; i++) {
      sector.palettes.secondaryId[i] = idMap[sector.palettes.secondaryId[i]];
    }
  }
  return idRecord;
};
const hashBuffer = (buffer: ArrayBuffer) => {
  const data = new Uint8Array(buffer);
  let hash = "";

  for (let i = 0; i < data.length; i++) {
    hash += data[i].toString(16).padStart(2, "0");
  }
  return hash;
};

const processSections = (archiveData: RunData) => {
  const chunMap: Record<string, ArchivedSectionData> = {};
  const created = new Map<string, number>();
  const maped = new Map<string, string>();
  const binaryObjects = new Map<ArchivedSectionData, ArrayBuffer>();
  let count = 0;

  const process = (object: ArchivedSectionData | string) => {
    if (typeof object == "string") return object;
    let binaryObject = binaryObjects.get(object);
    if (!binaryObject) {
      binaryObject = BinaryObject.objectToBuffer(object);
      binaryObjects.set(object, binaryObject);
    }

    let hash = hashBuffer(binaryObject);
    if (maped.has(hash)) return maped.get(hash);

    if (created.has(hash) && created.get(hash)! == 0) {
      created.set(hash, 1)!;

      const id = uint16To4CharString(count);
      chunMap[id] = object;
      maped.set(hash, id);
      count++;
      return id;
    }
    if (!created.has(hash)) {
      created.set(hash, 0);
    }

    return object;
  };

  for (const sector of archiveData.sectors) {
    for (let i = 0; i < sector.sections.length; i++) {
      if (!sector.sections[i]) continue;
      sector.sections[i] = process(sector.sections[i]) as any;
    }
  }
  created.clear();
  for (const sector of archiveData.sectors) {
    for (let i = 0; i < sector.sections.length; i++) {
      if (!sector.sections[i]) continue;
      sector.sections[i] = process(sector.sections[i]) as any;
    }
  }

  return chunMap;
};

const buildSectorState = (archiveData: RunData) => {
  const sectorStateMap = {};
  const maped = new Map<string, string>();
  const binaryObjects = new Map<any, ArrayBuffer>();
  let count = 0;
  const sectorStateKeys: string[] = [];
  const created = new Map<string, number>();

  const processSectorState = (
    sector: ArchivedAreaSectorData,
    sectorStateMap: Record<string, any[]>
  ) => {
    if (typeof sector.sectorState == "string") return sector.sectorState;
    if (!Array.isArray(sector.sectorState)) {
      const sectorState: any[] = [];
      for (let i = 0; i < sectorStateKeys.length; i++) {
        sectorState[i] = sector.sectorState[sectorStateKeys[i]];
      }
      sector.sectorState = sectorState;
    }
    let binaryObject = binaryObjects.get(sector.sectorState);
    if (!binaryObject) {
      binaryObject = BinaryObject.objectToBuffer(sector.sectorState);
      binaryObjects.set(sector.sectorState, binaryObject);
    }

    let hash = hashBuffer(binaryObject);
    if (maped.has(hash)) {
      sector.sectorState = maped.get(hash)!;
      return;
    }

    if (created.has(hash) && created.get(hash)! == 0) {
      created.set(hash, 1)!;

      const id = uint16To4CharString(count);
      sectorStateMap[id] = sector.sectorState as any[];
      maped.set(hash, id);
      count++;
      sector.sectorState = id;
      return id;
    }
    if (!created.has(hash)) {
      created.set(hash, 0);
    }

    return sector.sectorState;
  };
  for (const sector of archiveData.sectors) {
    processSectorState(sector as any, sectorStateMap);
  }
  created.clear();
  for (const sector of archiveData.sectors) {
    processSectorState(sector as any, sectorStateMap);
  }
  return sectorStateMap;
};
const createPaletteMaps = <T>(
  archiveData: RunData,
  paletteType: keyof ArchivedSectorData["palettes"],
  paletteMap: Record<string, T>,
  paletteIdsMap: Map<string, string>
) => {
  const created = new Map<string, number>();
  let count = 0;

  for (const sector of archiveData.sectors) {
    const palette = sector.palettes[paletteType] as T;
    if (!palette) continue;
    if (typeof palette == "string") continue;

    const hash =
      paletteType === "id" || paletteType === "secondaryId"
        ? JSON.stringify(palette)
        : hashBuffer(palette as unknown as ArrayBuffer);

    if (paletteIdsMap.has(hash)) {
      (sector as any).palettes[paletteType] = paletteIdsMap.get(hash);
      continue;
    }

    if (created.has(hash) && created.get(hash)! === 0) {
      created.set(hash, 1)!;

      const id = uint16To4CharString(count);
      paletteMap[id] = palette;
      paletteIdsMap.set(hash, id);
      count++;
      (sector as any).palettes[paletteType] = id;
      continue;
    }

    if (!created.has(hash)) {
      created.set(hash, 0);
    }
  }
};
const getPaletteMaps = (archiveData: RunData) => {
  const lightPalette: Record<string, Uint16Array> = {};
  const paletteMap = new Map<string, string>();
  createPaletteMaps(archiveData, "light", lightPalette, paletteMap);
  createPaletteMaps(archiveData, "light", lightPalette, paletteMap);
  paletteMap.clear();

  const levelPalette: Record<string, Uint8Array> = {};
  createPaletteMaps(archiveData, "level", levelPalette, paletteMap);
  createPaletteMaps(archiveData, "level", levelPalette, paletteMap);
  paletteMap.clear();

  /*   const statePalette: Record<string, Uint16Array> = {};
  createPaletteMaps(archiveData, "state", statePalette, paletteMap);
  createPaletteMaps(archiveData, "state", statePalette, paletteMap);
  paletteMap.clear();

  const modPalette: Record<string, Uint16Array> = {};
  createPaletteMaps(archiveData, "mod", modPalette, paletteMap);
  createPaletteMaps(archiveData, "mod", modPalette, paletteMap);
  paletteMap.clear(); */

  const secondaryValuePalette: Record<string, Uint16Array> = {};
  createPaletteMaps(
    archiveData,
    "secondaryValue",
    secondaryValuePalette,
    paletteMap
  );
  createPaletteMaps(
    archiveData,
    "secondaryValue",
    secondaryValuePalette,
    paletteMap
  );
  paletteMap.clear();

  const idPalette: Record<string, string[]> = {};
  createPaletteMaps(archiveData, "id", idPalette, paletteMap);
  createPaletteMaps(archiveData, "id", idPalette, paletteMap);
  paletteMap.clear();

  const secondaryIdPalette: Record<string, string[]> = {};
  createPaletteMaps(archiveData, "secondaryId", secondaryIdPalette, paletteMap);
  createPaletteMaps(archiveData, "secondaryId", secondaryIdPalette, paletteMap);
  paletteMap.clear();
  return {
    idPalette,
    secondaryIdPalette,
    levelPalette,
    lightPalette,
    statePalette: {} as any,
    secondaryValuePalette,
    modPalette: {} as any,
  };
};

function SectorToArchivedAreaSector(
  sector: ArchivedSectorData
): ArchivedAreaSectorData {
  const palettes: ArchivedAreaSectorData["palettes"] = {} as any;
  palettes.id = sector.palettes.id;
  if (sector.palettes.secondaryId)
    palettes.secondaryId = sector.palettes.secondaryId;

  // if (sector.palettes.light) palettes.light = sector.palettes.light;

  if (sector.palettes.secondaryValue)
    palettes.secondaryValueState = sector.palettes.secondaryValue;
  /*   if (sector.palettes.state) palettes.state = sector.palettes.state;
  sector.palettes.stateMap = sector.palettes.stateMap;
  if (sector.palettes.mod) palettes.state = sector.palettes.mod; */

  sector.palettes.modMap = sector.palettes.modMap;

  return {
    position: sector.location,
    sectorState: sector.flags as any,
    buffers: sector.buffers,
    palettes,
    sections: sector.sections,
  };
}

export default function CreateArchiveArea(
  archiveData: RunData
): ArchivedAreaData {
  const sectorStateKeys: string[] = [];

  const sectors: ArchivedAreaSectorData[] = [];
  for (const sector of archiveData.sectors) {
    sectors.push(SectorToArchivedAreaSector(sector));
  }

  return {
    dimension:
      WorldRegister.dimensions.get(archiveData.dimension)?.id || "main",
    version: "",
    keys: {
      sectorState: sectorStateKeys,
      sectionState: [],
      //   sectionState: archiveData.sectors[0].keys.sectionState,
    },
    maps: {
      sectorState: buildSectorState(archiveData),
      id: processPalettes(archiveData),
      section: processSections(archiveData),
      ...getPaletteMaps(archiveData),
    },
    sectors,
  };
}

export function CreateSectorFromArea(
  area: ArchivedAreaData,
  sector: ArchivedAreaSectorData
): ArchivedSectorData {
  const sectorState: Record<string, any> = {};
  const currentState =
    typeof sector.sectorState == "string"
      ? area.maps.sectorState[sector.sectorState]
      : sector.sectorState;
  for (let i = 0; i < area.keys.sectorState.length; i++) {
    sectorState[area.keys.sectorState[i]] = currentState[i];
  }

  const palettes: ArchivedSectorData["palettes"] = {} as any;

  let id: string[];
  if (typeof sector.palettes.id == "string") {
    id = area.maps.idPalette[sector.palettes.id];
  } else {
    id = sector.palettes.id;
  }
  for (let i = 0; i < id.length; i++) {
    id[i] = area.maps.id[i];
  }
  palettes.id = id;

  /*   palettes.light =
    typeof sector.palettes.light == "string"
      ? area.maps.lightPalette[sector.palettes.light]
      : sector.palettes.light;
 */
  palettes.level =
    typeof sector.palettes.level == "string"
      ? area.maps.levelPalette[sector.palettes.level]
      : sector.palettes.level;

  /*   palettes.state =
    typeof sector.palettes.state == "string"
      ? area.maps.statePalette[sector.palettes.state]
      : sector.palettes.state!;
  palettes.stateMap = sector.palettes.stateMap;

  palettes.mod =
    typeof sector.palettes.mod == "string"
      ? area.maps.statePalette[sector.palettes.mod]
      : sector.palettes.mod!;
  palettes.modMap = sector.palettes.modMap;
 */
  let secondaryId: string[];
  if (typeof sector.palettes.secondaryId == "string") {
    secondaryId = area.maps.idPalette[sector.palettes.secondaryId];
  } else {
    secondaryId = sector.palettes.secondaryId || [];
  }
  for (let i = 0; i < secondaryId.length; i++) {
    secondaryId[i] = area.maps.id[i];
  }
  palettes.secondaryId = secondaryId;
  palettes.secondaryValue =
    typeof sector.palettes.secondaryValueState == "string"
      ? area.maps.secondaryValuePalette[sector.palettes.secondaryValueState]
      : sector.palettes.secondaryValueState;

  const sections: ArchivedSectionData[] = [];
  for (let i = 0; i < sector.sections.length; i++) {
    const section = sector.sections[i];
    if (typeof section == "string") {
      sections[i] = area.maps.section[section];
      continue;
    }
    sections[i] = section;
  }

  return {
    version: area.version,
    vloxVersion: area.version,
    dimension: "",
    location: [...sector.position],
    flags: sectorState,
    timestamps: {},
    /*     keys: {
      sectionState: area.keys.sectionState,
    }, */
    duplicates: {},
    palettes,
    buffers: sector.buffers,
    sections,
  };
}

export function* CreateSectorsFromArea(
  area: ArchivedAreaData
): Generator<ArchivedSectorData> {
  for (const sector of area.sectors) {
    yield CreateSectorFromArea(area, sector);
  }
}
