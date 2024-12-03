import { VoxelPalette } from "../../Data/Voxel/VoxelPalette";
import { Chunk, ChunkData, Column, ColumnData } from "../../Data/World/Classes";

import { ArchivedChunkData, ArchivedColumnData } from "../Archive.types";
import { VoxelStruct } from "../../Data/Voxel/VoxelStruct";
import { VoxelTagIDs } from "../../Data/Constants/VoxelTagIds";
import { NumberPalette } from "../../Interfaces/Data/NumberPalette";
import { StringPalette } from "../../Interfaces/Data/StringPalette";
import { getPaletteArray } from "./Palettes";

let columnStructInstance: ReturnType<typeof Column.StateStruct.instantiate>;
let chunkStructInstance: ReturnType<typeof Chunk.StateStruct.instantiate<any>>;

type RunData = {
  version?: number;
  loadColumnState?: (data: Record<string, any>, column: ColumnData) => void;
  loadChunkState?: (keys: string[], data: any[], chunk: ChunkData) => void;
};

const updateChunkBuffers = (
  column: ArchivedColumnData,
  chunk: ArchivedChunkData
) => {
  if (
    (column.palettes.id.length <= 15 ||
      (chunk.palettes.id && chunk.palettes.id.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.id)
  ) {
    chunk.buffers.id = getPaletteArray(
      Math.min(
        chunk.palettes.id?.length || Infinity,
        column.palettes.id?.length || 0
      ),
      chunk.buffers.id
    ) as any;
  }
  if (
    ((chunk.palettes.light && chunk.palettes.light.length <= 15) ||
      (column.palettes.light && column.palettes.light.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.light)
  ) {
    chunk.buffers.light = getPaletteArray(
      Math.min(
        chunk.palettes.light?.length || Infinity,
        column.palettes.light?.length || 0
      ),
      chunk.buffers.light
    ) as any;
  }

  if (
    ((chunk.palettes.state && chunk.palettes.state.length <= 15) ||
      (column.palettes.state && column.palettes.state.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.state)
  ) {
    chunk.buffers.state = getPaletteArray(
      Math.min(
        chunk.palettes.state?.length || Infinity,
        column.palettes.state?.length || 0
      ),
      chunk.buffers.state
    ) as any;
  }

  if (
    ((chunk.palettes.mod && chunk.palettes.mod.length <= 15) ||
      (column.palettes.mod && column.palettes.mod.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.mod)
  ) {
    chunk.buffers.mod = getPaletteArray(
      Math.min(
        chunk.palettes.mod?.length || Infinity,
        column.palettes.mod?.length || 0
      ),
      chunk.buffers.mod
    ) as any;
  }

  if (
    ((chunk.palettes.secondaryState &&
      chunk.palettes.secondaryState.length <= 15) ||
      (column.palettes.secondaryState &&
        column.palettes.secondaryState.length <= 15)) &&
    ((chunk.palettes.secondaryId && chunk.palettes.secondaryId.length <= 15) ||
      (column.palettes.secondaryId &&
        column.palettes.secondaryId.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.secondary)
  ) {
    chunk.buffers.secondary = getPaletteArray(
      Math.max(
        Math.min(
          chunk.palettes.secondaryId?.length || Infinity,
          column.palettes.secondaryId?.length || 0
        ),
        Math.min(
          chunk.palettes.secondaryState?.length || Infinity,
          column.palettes.secondaryState?.length || 0
        )
      ),
      chunk.buffers.secondary
    ) as any;
  }
};
type ImportedColumnData = {
  column: ArchivedColumnData;
  idPalette: StringPalette;
  secondaryId?: StringPalette;
  lightPalette?: NumberPalette;
  modPalette?: NumberPalette;
  statePalette?: NumberPalette;
  secondaryState?: NumberPalette;
};
type ImportedChunkData = {
  chunk: ArchivedChunkData;
  idPalette?: NumberPalette;

  lightPalette?: NumberPalette;
  statePalette?: NumberPalette;
  modPalette?: NumberPalette;
  secondaryState?: NumberPalette;
  secondaryId?: NumberPalette;
};

const getImportedColumnData = (
  column: ArchivedColumnData
): ImportedColumnData => {
  return {
    column,
    idPalette: new StringPalette(column.palettes.id),
    secondaryId: column.palettes.secondaryId
      ? new StringPalette(column.palettes.secondaryId)
      : undefined,
    lightPalette: column.palettes.light
      ? new NumberPalette(column.palettes.light)
      : undefined,
    statePalette: column.palettes.state
      ? new NumberPalette(column.palettes.state)
      : undefined,
    modPalette: column.palettes.mod
      ? new NumberPalette(column.palettes.mod)
      : undefined,
    secondaryState: column.palettes.secondaryState
      ? new NumberPalette(column.palettes.secondaryState)
      : undefined,
  };
};
const getImportedChunkData = (chunk: ArchivedChunkData): ImportedChunkData => {
  return {
    chunk,
    idPalette: chunk.palettes.id
      ? new NumberPalette(chunk.palettes.id)
      : undefined,
    lightPalette: chunk.palettes.light
      ? new NumberPalette(chunk.palettes.light)
      : undefined,
    statePalette: chunk.palettes.state
      ? new NumberPalette(chunk.palettes.state)
      : undefined,
    modPalette: chunk.palettes.mod
      ? new NumberPalette(chunk.palettes.mod)
      : undefined,
    secondaryState: chunk.palettes.secondaryState
      ? new NumberPalette(chunk.palettes.secondaryState)
      : undefined,
    secondaryId: chunk.palettes.secondaryId
      ? new NumberPalette(chunk.palettes.secondaryId)
      : undefined,
  };
};
const getId = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  if (importedChunk.chunk.buffers.state instanceof Uint16Array) return value;

  if (typeof importedChunk.chunk.buffers.id == "number") {
    return VoxelPalette.ids.getNumberId(
      importedColumn.column.palettes.id[importedChunk.chunk.buffers.id]
    );
  }
  if (importedChunk.idPalette) {
    return VoxelPalette.ids.getNumberId(
      importedColumn.idPalette.getStringId(
        importedChunk.idPalette.getValue(value)
      )
    );
  }

  return VoxelPalette.ids.getNumberId(
    importedColumn.idPalette.getStringId(value)
  );
};
const getLight = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  if (importedChunk.chunk.buffers.light instanceof Uint16Array) return value;
  if (typeof importedChunk.chunk.buffers.light == "number") {
    return value;
  }
  if (importedChunk.lightPalette) {
    return importedChunk.lightPalette.getValue(value);
  }
  if (importedColumn.lightPalette) {
    return importedColumn.lightPalette.getValue(value);
  }
  return value;
};

const getState = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  if (importedChunk.chunk.buffers.state instanceof Uint16Array) return value;

  if (typeof importedChunk.chunk.buffers.state == "number") {
    return value;
  }
  if (importedChunk.statePalette) {
    return importedChunk.statePalette.getValue(value);
  }
  if (importedColumn.statePalette) {
    return importedColumn.statePalette.getValue(value);
  }
  return value;
};

const getMod = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  if (importedChunk.chunk.buffers.mod instanceof Uint16Array) return value;

  if (typeof importedChunk.chunk.buffers.mod == "number") {
    return value;
  }
  if (importedChunk.modPalette) {
    return importedChunk.modPalette.getValue(value);
  }
  if (importedColumn.modPalette) {
    return importedColumn.modPalette.getValue(value);
  }
  return value;
};

const getSecondary = (
  voxelId: number,
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  if (importedChunk.chunk.buffers.state instanceof Uint16Array) return value;

  VoxelStruct.setVoxel(voxelId);
  if (VoxelStruct.instance[VoxelTagIDs.canHaveSecondary] == 1) {
    if (typeof importedChunk.chunk.buffers.secondary == "number") {
      return VoxelPalette.ids.getNumberId(
        importedColumn.column.palettes.secondaryId![
          importedChunk.chunk.buffers.secondary
        ]
      );
    }
    if (importedChunk.secondaryId) {
      return VoxelPalette.ids.getNumberId(
        importedColumn.secondaryId!.getStringId(
          importedChunk.secondaryId.getValue(value)
        )
      );
    }
    return VoxelPalette.ids.getNumberId(
      importedColumn.column.palettes.secondaryId![value]
    );
  }

  if (typeof importedChunk.chunk.buffers.secondary == "number") {
    return value;
  }
  if (importedChunk.secondaryState && importedColumn.secondaryState) {
    return importedColumn.secondaryState.getValue(
      importedChunk.secondaryState.getValue(value)
    );
  }
  if (importedColumn.secondaryState) {
    return importedColumn.secondaryState.getId(value);
  }
  return value;
};

export default function ImportColumn(
  column: ArchivedColumnData,
  archiveData: RunData
): ColumnData {
  if (!columnStructInstance)
    columnStructInstance = Column.StateStruct.instantiate();
  if (!chunkStructInstance)
    chunkStructInstance = Chunk.StateStruct.instantiate();

  const newColumn = Column.CreateNew({});
  if (!archiveData.loadColumnState) {
    columnStructInstance.setBuffer(newColumn.stateBuffer);
    columnStructInstance.deserialize(column.columnState);
  } else {
    archiveData.loadColumnState(column.columnState, newColumn);
  }

  const importedColumn = getImportedColumnData(column);

  for (let chunkIndex = 0; chunkIndex < column.chunks.length; chunkIndex++) {
    const chunk = column.chunks[chunkIndex];
    const importedChunk = getImportedChunkData(chunk);
    const newChunk = Chunk.CreateNew();

    const chunkState: Record<string, any> = {};
    for (let i = 0; i < column.keys.chunkState.length; i++) {
      chunkState[column.keys.chunkState[i]] = chunk.state[i];
    }

    updateChunkBuffers(column, chunk);
    if (!archiveData.loadChunkState) {
      chunkStructInstance.setBuffer(newChunk.stateBuffer);
      chunkStructInstance.deserialize(chunkState);
    } else {
      archiveData.loadChunkState(column.keys.chunkState, chunk.state, newChunk);
    }

    for (let i = 0; i < newChunk.ids.length; i++) {
      newChunk.ids[i] = getId(
        typeof chunk.buffers.id == "number"
          ? chunk.buffers.id
          : chunk.buffers.id[i],
        importedColumn,
        importedChunk
      );

      newChunk.state[i] = getState(
        typeof chunk.buffers.state == "number"
          ? chunk.buffers.state
          : chunk.buffers.state[i],
        importedColumn,
        importedChunk
      );

      newChunk.mod[i] = getMod(
        typeof chunk.buffers.mod == "number"
          ? chunk.buffers.mod
          : chunk.buffers.mod[i],
        importedColumn,
        importedChunk
      );

      newChunk.light[i] = getLight(
        typeof chunk.buffers.light == "number"
          ? chunk.buffers.light
          : chunk.buffers.light[i],
        importedColumn,
        importedChunk
      );

      newChunk.secondary[i] = getSecondary(
        newChunk.ids[i],
        typeof chunk.buffers.secondary == "number"
          ? chunk.buffers.secondary
          : chunk.buffers.secondary[i],
        importedColumn,
        importedChunk
      );
    }

    newColumn.chunks[chunkIndex] = newChunk;
  }

  return newColumn;
}
