import { BinaryObject } from "@amodx/binary";
import { Column } from "../../Data/World/Classes";
import {
  ArchivedAreaColumnData,
  ArchivedAreaData,
  ArchivedChunkData,
  ArchivedColumnData,
} from "../Archive.types";

type RunData = {
  dimension: string;
  columns: ArchivedColumnData[];
  version?: number;
};
const charset = "0123456789ABCDEF";

function uint16To4CharString(value: number): string {
  if (value < 0 || value > 0xffff) {
    throw new RangeError("Value must be a 16-bit unsigned integer.");
  }

  const chars: string[] = [];

  for (let i = 0; i < 4; i++) {
    const charCode = (value >> (i * 4)) & 0x0f;
    chars.unshift(charset[charCode]);
  }

  const result = chars.join("").replace(/^0+(?!$)/, "");

  return result;
}

let columnStructInstance: ReturnType<typeof Column.StateStruct.instantiate>;

const processPalettes = (archiveData: RunData) => {
  const allRegistered = new Set<string>();
  archiveData.columns.forEach((_) => {
    _.palettes.id.forEach((_) => {
      allRegistered.add(_);
    });
    _.palettes.secondaryId &&
      _.palettes.secondaryId.forEach((_) => {
        allRegistered.add(_);
      });
  });
  let count = 0;
  const idMap: Record<string, string> = {};
  const idRecord: Record<string, string> = {};
  for (const voxelId of allRegistered) {
    const newId = uint16To4CharString(count);
    idMap[voxelId] = newId;
    idRecord[newId] = voxelId;
    count++;
  }
  archiveData.columns.forEach((_) => {
    _.palettes.id.forEach((id, index) => {
      _.palettes.id[index] = idMap[id];
    });
    _.palettes.secondaryId &&
      _.palettes.secondaryId.forEach((id, index) => {
        _.palettes.secondaryId![index] = idMap[id];
      });
  });

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

const processChunks = (archiveData: RunData) => {
  const chunMap: Record<string, ArchivedChunkData> = {};
  const created = new Map<string, number>();
  const maped = new Map<string, string>();
  const binaryObjects = new Map<ArchivedChunkData, ArrayBuffer>();
  let count = 0;

  const process = (object: ArchivedChunkData | string) => {
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

  archiveData.columns.forEach((_) => {
    (_ as any).chunks = _.chunks.map((_) => process(_));
  });
  created.clear();
  archiveData.columns.forEach((_) => {
    (_ as any).chunks = _.chunks.map((_) => process(_));
  });
  return chunMap;
};
const processColumnStates = (archiveData: RunData) => {
  const columnStateMap: Record<string, any[]> = {};
  const created = new Map<string, number>();
  const maped = new Map<string, string>();
  const binaryObjects = new Map<any, ArrayBuffer>();
  let count = 0;

  const columnStateKeys = columnStructInstance.getKeys();

  const process = (column: ArchivedAreaColumnData) => {
    if (typeof column.columnState == "string") return column.columnState;
    if (!Array.isArray(column.columnState)) {
      const columnState: any[] = [];
      for (let i = 0; i < columnStateKeys.length; i++) {
        columnState[i] = column.columnState[columnStateKeys[i]];
      }
      column.columnState = columnState;
    }
    let binaryObject = binaryObjects.get(column.columnState);
    if (!binaryObject) {
      binaryObject = BinaryObject.objectToBuffer(column.columnState);
      binaryObjects.set(column.columnState, binaryObject);
    }

    let hash = hashBuffer(binaryObject);
    if (maped.has(hash)) {
      column.columnState = maped.get(hash)!;
      return;
    }

    if (created.has(hash) && created.get(hash)! == 0) {
      created.set(hash, 1)!;

      const id = uint16To4CharString(count);
      columnStateMap[id] = column.columnState as any[];
      maped.set(hash, id);
      count++;
      column.columnState = id;
      return id;
    }
    if (!created.has(hash)) {
      created.set(hash, 0);
    }

    return column.columnState;
  };

  archiveData.columns.forEach((_) => {
    process(_ as any);
  });
  created.clear();
  archiveData.columns.forEach((_) => {
    process(_ as any);
  });
  return columnStateMap;
};

const getPaletteMaps = (archiveData: RunData) => {
  const createPaletteMaps = <T>(
    paletteType: keyof ArchivedColumnData["palettes"],
    paletteMap: Record<string, T>,
    paletteIdsMap: Map<string, string>
  ) => {
    const created = new Map<string, number>();
    let count = 0;

    archiveData.columns.forEach((column) => {
      const palette = column.palettes[paletteType] as T;
      if (!palette) return;
      if (typeof palette == "string") return;

      const hash =
        paletteType === "id" || paletteType === "secondaryId"
          ? JSON.stringify(palette)
          : hashBuffer(palette as unknown as Uint16Array);

      if (paletteIdsMap.has(hash)) {
        (column as any).palettes[paletteType] = paletteIdsMap.get(hash);
        return;
      }

      if (created.has(hash) && created.get(hash)! === 0) {
        created.set(hash, 1)!;

        const id = uint16To4CharString(count);
        paletteMap[id] = palette;
        paletteIdsMap.set(hash, id);
        count++;
        (column as any).palettes[paletteType] = id;
        return id;
      }

      if (!created.has(hash)) {
        created.set(hash, 0);
      }
    });
  };

  const lightPalette: Record<string, Uint16Array> = {};
  const lightPaletteIdMap = new Map<string, string>();
  createPaletteMaps("light", lightPalette, lightPaletteIdMap);
  createPaletteMaps("light", lightPalette, lightPaletteIdMap);

  const statePalette: Record<string, Uint16Array> = {};
  const statePaletteIdsMap = new Map<string, string>();
  createPaletteMaps("state", statePalette, statePaletteIdsMap);
  createPaletteMaps("state", statePalette, statePaletteIdsMap);

  const modPalette: Record<string, Uint16Array> = {};
  const modPaletteIdsMap = new Map<string, string>();
  createPaletteMaps("mod", modPalette, modPaletteIdsMap);
  createPaletteMaps("mod", modPalette, modPaletteIdsMap);

  const secondaryStatePalette: Record<string, Uint16Array> = {};
  const secondaryStatePaletteIdsMap = new Map<string, string>();
  createPaletteMaps(
    "secondaryState",
    secondaryStatePalette,
    secondaryStatePaletteIdsMap
  );
  createPaletteMaps(
    "secondaryState",
    secondaryStatePalette,
    secondaryStatePaletteIdsMap
  );

  const idPalette: Record<string, string[]> = {};
  const idsPaletteIdsMap = new Map<string, string>();
  createPaletteMaps("id", idPalette, idsPaletteIdsMap);
  createPaletteMaps("id", idPalette, idsPaletteIdsMap);

  const secondaryIdPalette: Record<string, string[]> = {};
  const secondaryIdsPaletteIdsMap = new Map<string, string>();
  createPaletteMaps(
    "secondaryId",
    secondaryIdPalette,
    secondaryIdsPaletteIdsMap
  );
  createPaletteMaps(
    "secondaryId",
    secondaryIdPalette,
    secondaryIdsPaletteIdsMap
  );

  return {
    idPalette,
    secondaryIdPalette,
    lightPalette,
    statePalette,
    secondaryStatePalette,
    modPalette,
  };
};

export default function CreateArchiveArea(
  archiveData: RunData
): ArchivedAreaData {
  if (!columnStructInstance)
    columnStructInstance = Column.StateStruct.instantiate();

  const columnStateKeys = columnStructInstance.getKeys();

  return {
    dimension: archiveData.dimension,
    archiverVersion: 0,

    version: archiveData.version || 0,
    keys: {
      columnState: columnStateKeys,
      chunkState: archiveData.columns[0].keys.chunkState,
    },
    maps: {
      columnState: processColumnStates(archiveData),
      id: processPalettes(archiveData),
      chunk: processChunks(archiveData),
      ...getPaletteMaps(archiveData),
    },

    columns: archiveData.columns.map((column) => {
      return {
        position: [column.location[1], column.location[2], column.location[3]],
        columnState: column.columnState as any,
        buffers: column.buffers,
        palettes: {
          id: column.palettes.id,

          ...(column.palettes.secondaryId
            ? {
                secondaryIds: column.palettes.secondaryId,
              }
            : {}),
          ...(column.palettes.light
            ? {
                light: column.palettes.light,
              }
            : {}),
          ...(column.palettes.secondaryState
            ? {
                secondaryState: column.palettes.secondaryState,
              }
            : {}),
          ...(column.palettes.state
            ? {
                state: column.palettes.state,
              }
            : {}),
          ...(column.palettes.mod
            ? {
                mod: column.palettes.mod,
              }
            : {}),
        },
        chunks: column.chunks,
      };
    }),
  };
}

export function CreateColumnFromArea(
  area: ArchivedAreaData,
  column: ArchivedAreaColumnData
): ArchivedColumnData {
  const columnState: Record<string, any> = {};
  const currentState =
    typeof column.columnState == "string"
      ? area.maps.columnState[column.columnState]
      : column.columnState;
  for (let i = 0; i < area.keys.columnState.length; i++) {
    columnState[area.keys.columnState[i]] = currentState[i];
  }

  return {
    archiverVersion: area.archiverVersion,
    version: area.version,
    location: [area.dimension, ...column.position],
    palettes: {
      id: (typeof column.palettes.id == "string"
        ? area.maps.idPalette[column.palettes.id]
        : column.palettes.id
      ).map((_) => area.maps.id[_]),
      light:
        typeof column.palettes.light == "string"
          ? area.maps.lightPalette[column.palettes.light]
          : column.palettes.light,
      secondaryId: column.palettes.secondary
        ? (typeof column.palettes.secondary == "string"
            ? area.maps.secondaryIdPalette[column.palettes.secondary]
            : column.palettes.secondary
          ).map((_) => area.maps.id[_])
        : undefined,
      secondaryState:
        typeof column.palettes.secondaryState == "string"
          ? area.maps.secondaryStatePalette[column.palettes.secondaryState]
          : column.palettes.secondaryState,
      state:
        typeof column.palettes.state == "string"
          ? area.maps.statePalette[column.palettes.state]
          : column.palettes.state,
      mod:
        typeof column.palettes.mod == "string"
          ? area.maps.statePalette[column.palettes.mod]
          : column.palettes.mod,
    },
    buffers: column.buffers,
    columnState,
    keys: {
      chunkState: area.keys.chunkState,
    },
    chunks: column.chunks.map((_) => {
      if (typeof _ == "string") return area.maps.chunk[_];
      return _;
    }) as ArchivedChunkData[],
  };
}

export function* CreateColumnsFromArea(
  area: ArchivedAreaData
): Generator<ArchivedColumnData> {
  for (const column of area.columns) {
    yield CreateColumnFromArea(area, column);
  }
}
