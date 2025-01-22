import { DataHooks } from "../Sync/DataHooks.js";
import {
  Chunk,
  ChunkData,
  Column,
  ColumnData,
  Dimension,
  Region,
  RegionData,
} from "./Classes/";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { DimensionsRegister } from "./DimensionsRegister.js";

import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { WorldRegisterCache } from "./WorldRegisterCache.js";

class WorldRegisterDimensions {
  constructor(private _register: WorldRegister) {}

  add(id: number | string) {
    id = this._register._dimensionRegister.getDimensionStringId(id);
    const dimesnion = Dimension.CreateNew(id);
    this._register._dimensions.set(id, dimesnion);
    return dimesnion;
  }
  get(id: number | string) {
    id = this._register._dimensionRegister.getDimensionStringId(id);
    return this._register._dimensions.get(id);
  }
}

class WorldRegisterRegions {
  constructor(private _register: WorldRegister) {}

  add(x: number, y: number, z: number, region: RegionData) {
    let dimension = this._register.dimensions.get(
      this._register._currentDimension
    );
    if (!dimension) {
      dimension = this._register.dimensions.add(
        this._register._currentDimension
      );
    }
    const newRegion = Region.toObject(region);
    const regionPOS = WorldSpaces.region.getPositionXYZ(x, y, z);
    this._register.regionTool.setRegion(newRegion);
    this._register.regionTool.setPositionData(
      regionPOS.x,
      regionPOS.y,
      regionPOS.z
    );

    dimension.set(WorldSpaces.region.getKeyXYZ(x, y, z), newRegion);
    return newRegion;
  }
  get(x: number, y: number, z: number) {
    const dimension = this._register.dimensions.get(
      this._register._currentDimension
    );
    if (!dimension) return false;
    const region = dimension.get(WorldSpaces.region.getKeyXYZ(x, y, z));
    if (!region) return false;
    return region;
  }
  remove(x: number, y: number, z: number) {
    const dimension = this._register.dimensions.get(
      this._register._currentDimension
    );
    if (!dimension) return false;
    const key = WorldSpaces.region.getKeyXYZ(x, y, z);
    const region = dimension.get(key);
    if (!region) return false;
    dimension.delete(key);
    return true;
  }
}

class WorldRegisterColumns {
  constructor(private _register: WorldRegister) {}
  add(x: number, y: number, z: number, column: ColumnData) {
    let region = this._register.region.get(x, y, z);
    if (!region) {
      let newRegion = DataHooks.region.onGetSync.pipe({
        location: [this._register._currentDimension, x, y, z],
        region: null,
      });
      if (!newRegion.region) return;
      region = this._register.region.add(x, y, z, newRegion.region);
      DataHooks.region.onNew.notify([
        this._register._currentDimension,
        x,
        y,
        z,
      ]);
    }
    const newColumn = Column.toObject(
      [this._register._currentDimension, x, y, z],
      column
    );
    region.columns.set(region.getColumnIndex(x, y, z), newColumn);

    return newColumn;
  }
  get(x: number, y: number, z: number): false | Column {
    const columnKey = this._register.cache.getColumnIndex(x, y, z);
    let addColumn = false;
    if (this._register._cacheOn) {
      const column = this._register.cache.getColumn(columnKey);
      if (column) return column;
      addColumn = true;
    }
    const region = this._register.region.get(x, y, z);
    if (!region) return false;
    const column = region.columns.get(WorldSpaces.column.getIndexXYZ(x, y, z));
    if (!column) return false;
    if (addColumn) {
      this._register.cache.addColumn(columnKey, column);
    }
    return column;
  }
  remove(x: number, y: number, z: number) {
    const region = this._register.region.get(x, y, z);
    if (!region) return false;
    const index = WorldSpaces.column.getIndexXYZ(x, y, z);
    const column = region.columns.get(index);
    if (!column) return false;
    region.columns.delete(index);
    return true;
  }
  fill(x: number, y: number, z: number) {
    let column = this.get(x, y, z);
    if (!column) {
      column = this.add(x, y, z, Column.CreateNew({}))!;
    }
    const data = {
      location: [this._register._currentDimension, x, y, z],
      chunk: null,
    } as any;
    const maxChunkIndex =
      WorldSpaces.column._bounds.y / WorldSpaces.chunk._bounds.y;
    for (let i = 0; i < maxChunkIndex; i++) {
      if (!column.chunks[i]) {
        data.location[1] = y + i * WorldSpaces.chunk._bounds.y;
        data.chunk = null;
        const newChunk = DataHooks.chunk.onGetSync.pipe(data);
        if (!newChunk.chunk) continue;
        column.chunks[i] = new Chunk(column, i, newChunk.chunk);
      }
    }
    DataHooks.column.onNew.notify([this._register._currentDimension, x, y, z]);
  }
}
class WorldRegisterChunks {
  constructor(private _register: WorldRegister) {}

  add(x: number, y: number, z: number, chunk: ChunkData) {
    let column = this._register.column.get(x, y, z);
    if (!column) {
      let newColumn = DataHooks.column.onGetSync.pipe({
        location: [this._register._currentDimension, x, y, z],
        column: null,
      });
      if (!newColumn.column) return;
      column = <Column>this._register.column.add(x, y, z, newColumn.column);
      DataHooks.column.onNew.notify([
        this._register._currentDimension,
        x,
        y,
        z,
      ]);
    }
    if (!column) return;
    const index = WorldSpaces.chunk.getIndexXYZ(x, y, z);
    const newChunk = Chunk.toObject(column, index, chunk);
    column.chunks[index] = newChunk;
    DataHooks.chunk.onNew.notify([this._register._currentDimension, x, y, z]);
    return newChunk;
  }
  get(x: number, y: number, z: number) {
    const chunkKey = this._register.cache.getChunkIndex(x, y, z);
    let addChunk = false;
    if (this._register._cacheOn) {
      const chunk = this._register.cache.getChunk(chunkKey);
      if (chunk) return chunk;
      addChunk = true;
    }
    const column = this._register.column.get(x, y, z);
    if (!column) return false;
    const chunk = column.chunks[WorldSpaces.chunk.getIndexXYZ(x, y, z)];
    if (!chunk) return;
    if (addChunk) {
      this._register.cache.addChunk(chunkKey, chunk);
    }
    return chunk;
  }
  remove(x: number, y: number, z: number) {
    const column = this._register.column.get(x, y, z);
    if (!column) return false;
    const index = WorldSpaces.chunk.getIndexXYZ(x, y, z);
    const chunk = column.chunks[index];
    if (!chunk) return false;
    delete column.chunks[index];
    return true;
  }
}

export class WorldRegister {
  static instance: WorldRegister;
  columnTool = new ColumnDataTool();
  regionTool = new RegionDataTool();
  _dimensions = new Map<string, Dimension>();
  _cacheOn = false;

  _dimensionRegister = new DimensionsRegister();
  constructor() {
    if (WorldRegister.instance) return WorldRegister.instance;
    WorldRegister.instance = this;
  }

  cache = new WorldRegisterCache();
  dimensions = new WorldRegisterDimensions(this);
  region = new WorldRegisterRegions(this);
  column = new WorldRegisterColumns(this);
  chunk = new WorldRegisterChunks(this);

  _currentDimension = "main";
  setDimension(dimension: string) {
    this._currentDimension = dimension;
  }

  clearAll() {
    this._dimensions.clear();
  }
}
