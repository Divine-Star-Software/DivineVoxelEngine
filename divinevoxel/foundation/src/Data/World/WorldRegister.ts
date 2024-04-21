import { DataHooks } from "../../Data/DataHooks.js";
import { Chunk, Column, Dimension, Region } from "./Classes/";
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";
import { DimensionsRegister } from "./DimensionsRegister.js";

import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import type { LocationData } from "@divinevoxel/core/Math";
import { ChunkDataTool } from "../../Default/Tools/Data/WorldData/ChunkDataTool.js";
import { ColumnDataTool } from "../../Default/Tools/Data/WorldData/ColumnDataTool.js";
import { RegionDataTool } from "../../Default/Tools/Data/WorldData/RegionDataTool.js";

export class WorldRegister {
  static instance: WorldRegister;
  chunkTool = new ChunkDataTool();
  columnTool = new ColumnDataTool();
  regionTool = new RegionDataTool();
  _dimensions = new Map<string, Dimension>();
  _cacheOn = false;
  _chunkCache = <Map<string, Chunk>>new Map<string, Chunk>();
  _columnCache = <Map<string, Column>>new Map<string, Column>();

  _dimensionRegister = new DimensionsRegister();
  constructor() {
    if (WorldRegister.instance) return WorldRegister.instance;
    WorldRegister.instance = this;
  }
  cache = {
    enable: () => {
      this._cacheOn = true;
      this._chunkCache.clear();
      this._columnCache.clear();
    },
    disable: () => {
      this._cacheOn = false;
      this._chunkCache.clear();
      this._columnCache.clear();
    },
    _addChunk: (key: string, data: Chunk) => {
      this._chunkCache.set(key, data);
    },
    _addColumn: (key: string, data: Column) => {
      this._columnCache.set(key, data);
    },
    _getChunk: (key: string) => {
      return this._chunkCache.get(key);
    },
    _getColumn: (key: string) => {
      return this._columnCache.get(key);
    },
  };
  dimensions = {
    add: (id: number | string) => {
      id = this._dimensionRegister.getDimensionStringId(id);
      const dimesnion = Dimension.CreateNew(id);
      this._dimensions.set(id, dimesnion);
      return dimesnion;
    },
    get: (id: number | string) => {
      id = this._dimensionRegister.getDimensionStringId(id);
      return this._dimensions.get(id);
    },
  };

  clearAll() {
    this._dimensions.clear();
    this._chunkCache.clear();
    this._columnCache.clear();
  }

  region = {
    add: (location: LocationData, region: Region) => {
      let dimension = this.dimensions.get(location[0]);
      if (!dimension) {
        dimension = this.dimensions.add(location[0]);
      }
      const newRegion = Region.AddNew(region);
      const regionPOS = WorldSpaces.region.getPositionLocation(location);
      this.regionTool.setRegion(newRegion);
      this.regionTool.setPositionData(regionPOS.x, regionPOS.y, regionPOS.z);
      this.regionTool.setDimensionId(location[0]);
      dimension.set(WorldSpaces.region.getKey(), newRegion);
      return newRegion;
    },
    get: (location: LocationData) => {
      const dimension = this.dimensions.get(location[0]);
      if (!dimension) return false;
      const region = dimension.get(WorldSpaces.region.getKeyLocation(location));
      if (!region) return false;
      return region;
    },
    remove: (location: LocationData) => {
      const dimension = this.dimensions.get(location[0]);
      if (!dimension) return false;
      const key = WorldSpaces.region.getKeyLocation(location);
      const region = dimension.get(key);
      if (!region) return false;
      dimension.delete(key);
      return true;
    },
  };
  column = {
    add: (location: LocationData, column: Column) => {
      let region = this.region.get(location);
      if (!region) {
        let newRegion = DataHooks.region.onGetSync.pipe({
          location,
          region: null,
        });
        if (!newRegion.region) return;
        region = this.region.add(location, newRegion.region);
        DataHooks.region.onNew.notify(location);
      }
      const newColumn = Column.AddNew(column);
      const columnPOS = WorldSpaces.column.getPositionLocation(location);
      this.columnTool.setColumn(newColumn);
      this.columnTool.setPositionData(columnPOS.x, columnPOS.y, columnPOS.z);
      this.columnTool.setDimensionId(location[0]);
      region.columns.set(WorldSpaces.column.getIndex(), newColumn);
      return newColumn;
    },
    get: (location: LocationData): false | Column => {
      const columnKey = WorldSpaces.column.getKeyLocation(location);
      let addColumn = false;
      if (this._cacheOn) {
        const column = this.cache._getColumn(columnKey);
        if (column) return column;
        addColumn = true;
      }
      const region = this.region.get(location);
      if (!region) return false;
      const column = region.columns.get(
        WorldSpaces.column.getIndexLocation(location)
      );
      if (!column) return false;
      if (addColumn) {
        this.cache._addColumn(columnKey, column);
      }
      return column;
    },
    remove: (location: LocationData): boolean => {
      const region = this.region.get(location);
      if (!region) return false;
      const index = WorldSpaces.column.getIndexLocation(location);
      const column = region.columns.get(index);
      if (!column) return false;
      region.columns.delete(index);
      return true;
    },
    fill: (location: LocationData) => {
      for (
        let cy = WorldBounds.bounds.MinY;
        cy < WorldBounds.bounds.MaxY;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        location[2] = cy;
        if (!this.chunk.get(location)) {
          const newChunk = DataHooks.chunk.onGetSync.pipe({
            location,
            chunk: null,
          });
          if (!newChunk.chunk) continue;
          this.chunk.add(location, newChunk.chunk);
        }
      }
    },
  };

  chunk = {
    add: (location: LocationData, chunk: Chunk) => {
      let column = this.column.get(location);
      if (!column) {
        let newColumn = DataHooks.column.onGetSync.pipe({
          location,
          column: null,
        });
        if (!newColumn.column) return;
        column = <Column>this.column.add(location, newColumn.column);
        DataHooks.column.onNew.notify(location);
      }
      if (!column) return;
      const newChunk = Chunk.AddNew(chunk);
      this.chunkTool.setChunk(newChunk);

      const chunkPOS = WorldSpaces.chunk.getPositionLocation(location);
      this.chunkTool.setPositionData(chunkPOS.x, chunkPOS.y, chunkPOS.z);
      this.chunkTool.setDimensionId(location[0]);
      column.chunks[WorldSpaces.chunk.getIndex()] = newChunk;
      DataHooks.chunk.onNew.notify(location);
      return newChunk;
    },
    get: (location: LocationData) => {
      const chunkKey = WorldSpaces.chunk.getKeyLocation(location);
      let addChunk = false;
      if (this._cacheOn) {
        const chunk = this.cache._getChunk(chunkKey);
        if (chunk) return chunk;
        addChunk = true;
      }
      const column = this.column.get(location);
      if (!column) return false;
      const chunk = column.chunks[WorldSpaces.chunk.getIndex()];
      if (!chunk) return;
      if (addChunk) {
        this.cache._addChunk(chunkKey, chunk);
      }
      return chunk;
    },
    remove: (location: LocationData) => {
      const column = this.column.get(location);
      if (!column) return false;
      const index = WorldSpaces.chunk.getIndexLocation(location);
      const chunk = column.chunks[index];
      if (!chunk) return false;
      delete column.chunks[index];
      return true;
    },
  };
}
