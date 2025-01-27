import { WorldSpaces } from "./WorldSpaces.js";
import { Dimension } from "./Dimension/Dimension";
import { Column, ColumnData } from "./Column/Column";
import { Chunk, ChunkData } from "./Chunk/Chunk";

import type { LocationData } from "../Math/index.js";
import { DimensionData } from "./Types/WorldData.types.js";

class WorldDataHooks {
  static dimension = {
    onNew: (dimension: DimensionData): void => {},
    onRemove: (location: LocationData): void => {},
  };
  static chunk = {
    onNew: (location: LocationData, chunk: ChunkData): void => {},
    onRemove: (location: LocationData, chunk: ChunkData): void => {},
  };
  static column = {
    onNew: (location: LocationData, column: ColumnData): void => {},
    onRemove: (location: LocationData, column: ColumnData): void => {},
  };
}

class WorldRegisterDimensions {
  static add(id: string) {
    const dimesnion = Dimension.CreateNew(id);
    WorldRegister._dimensions.set(id, dimesnion);
    return dimesnion;
  }
  static get(id: string) {
    return WorldRegister._dimensions.get(id);
  }
}

class WorldRegisterColumns {
  static add(x: number, y: number, z: number, column: ColumnData) {
    const positon = WorldSpaces.column.getPositionXYZ(x, y, z);
    const newColumn = Column.toObject(column);
    newColumn.position[0] = positon.x;
    newColumn.position[1] = positon.y;
    newColumn.position[2] = positon.z;
    WorldRegister._currentDimension.columns.set(
      WorldSpaces.column.getKeyXYZ(positon.x, positon.y, positon.z),
      newColumn
    );
    return newColumn;
  }
  static get(x: number, y: number, z: number): false | Column {
    const positon = WorldSpaces.column.getPositionXYZ(x, y, z);
    const column = WorldRegister._currentDimension.columns.get(
      WorldSpaces.column.getKeyXYZ(positon.x, positon.y, positon.z)
    );
    return column || false;
  }
  static remove(x: number, y: number, z: number) {
    const positon = WorldSpaces.column.getPositionXYZ(x, y, z);
    const columnKey = WorldSpaces.column.getKeyXYZ(
      positon.x,
      positon.y,
      positon.z
    );
    const column = WorldRegister._currentDimension.columns.get(columnKey);
    if (!column) return false;
    WorldRegister._currentDimension.columns.delete(columnKey);
    WorldDataHooks.column.onRemove(
      [WorldRegister._currentDimension.id, positon.x, positon.y, positon.z],
      column
    );
    return column;
  }
  static fill(x: number, y: number, z: number) {
    let column = this.get(x, y, z);
    if (!column) {
      column = this.add(x, y, z, Column.CreateNew())!;
    }
    const location: LocationData = [
      WorldRegister._currentDimension.id,
      column.position[0],
      column.position[1],
      column.position[2],
    ];
    const maxChunkIndex =
      WorldSpaces.column.bounds.y / WorldSpaces.chunk.bounds.y;
    for (let i = 0; i < maxChunkIndex; i++) {
      if (!column.chunks[i]) {
        location[2] = y + i * WorldSpaces.chunk.bounds.y;
        const newChunk = Chunk.CreateNew();
        column.chunks[i] = new Chunk(column, i, newChunk);
      }
    }
    WorldDataHooks.column.onNew(
      [WorldRegister._currentDimension.id, x, y, z],
      column
    );
  }
}
class WorldRegisterChunks {
  static add(x: number, y: number, z: number, chunk: ChunkData) {
    let column = WorldRegister.column.get(x, y, z);
    if (!column) {
      column = WorldRegister.column.add(x, y, z, Column.CreateNew());
      WorldDataHooks.column.onNew(
        [WorldRegister._currentDimension.id, x, y, z],
        column
      );
    }
    const newChunk = Chunk.toObject(
      column,
      WorldSpaces.chunk.getIndexXYZ(x, y, z),
      chunk
    );
    column.chunks[newChunk.index] = newChunk;
    WorldDataHooks.chunk.onNew(
      [WorldRegister._currentDimension.id, x, y, z],
      newChunk
    );
    return newChunk;
  }
  static get(x: number, y: number, z: number) {
    const column = WorldRegister.column.get(x, y, z);
    if (!column) return false;
    const chunk = column.chunks[WorldSpaces.chunk.getIndexXYZ(x, y, z)];
    if (!chunk) return;
    return chunk;
  }
  static remove(x: number, y: number, z: number) {
    const column = WorldRegister.column.get(x, y, z);
    if (!column) return false;
    const chunk = column.chunks[WorldSpaces.chunk.getIndexXYZ(x, y, z)];
    if (!chunk) return false;
    delete column.chunks[chunk.index];
    WorldDataHooks.chunk.onRemove(
      [WorldRegister._currentDimension.id, x, y, z],
      chunk
    );
    return true;
  }
}

export class WorldRegister {
  static _dimensions = new Map<string, Dimension>();
  static _hooks = WorldDataHooks;
  static dimensions = WorldRegisterDimensions;
  static column = WorldRegisterColumns;
  static chunk = WorldRegisterChunks;

  static _currentDimension: Dimension;
  static setDimension(dimensionId: string) {
    let dimension = this.dimensions.get(dimensionId);
    if (!dimension) {
      dimension = this.dimensions.add(dimensionId);
    }
    this._currentDimension = dimension;
  }

  static clearAll() {
    this._dimensions.clear();
  }
}
