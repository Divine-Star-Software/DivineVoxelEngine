import { DataHooks } from "../../Data/DataHooks.js";
import type {
 ChunkData,
 Column,
 WorldDimensions,
 Region,
} from "Meta/Data/WorldData.types";
import { WorldBounds } from "./WorldBounds.js";
import { $2dMooreNeighborhood } from "../Constants/Util/CardinalNeighbors.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";
import { ChunkDataTool } from "../../Tools/Data/ChunkDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/ColumnDataTool.js";
import { RegionDataTool } from "../../Tools/Data/RegionDataTool.js";

const chunkTool = new ChunkDataTool();
const columnTool = new ColumnDataTool();
const regionTool = new RegionDataTool();
export const WorldRegister = {
 _dimensions: <WorldDimensions>new Map(),

 _cacheOn: false,
 _cache: <Map<string, ChunkData>>{},

 $INIT() {
  this._dimensions.set("main", new Map());
 },

 cache: {
  enable() {
   WorldRegister._cacheOn = true;
   WorldRegister._cache = new Map();
  },
  disable() {
   WorldRegister._cacheOn = false;
   WorldRegister._cache.clear();
  },
  _add(key: string, data: ChunkData) {
   WorldRegister._cache.set(key, data);
  },
  _get(key: string) {
   return WorldRegister._cache.get(key);
  },
 },
 dimensions: {
  add(id: number | string) {
   const dimesnion = new Map();
   id = DimensionsRegister.getDimensionStringId(id);
   WorldRegister._dimensions.set(id, dimesnion);
   return dimesnion;
  },
  get(id: number | string) {
   id = DimensionsRegister.getDimensionStringId(id);
   return WorldRegister._dimensions.get(id);
  },
 },

 region: {
  add(
   dimensionId: string,
   x: number,
   y: number,
   z: number,
   sab: SharedArrayBuffer
  ) {
   let dimension = WorldRegister.dimensions.get(dimensionId);
   if (!dimension) {
    dimension = WorldRegister.dimensions.add(dimensionId);
   }
   const region = this._getRegionData(sab);
   const regionPOS = WorldBounds.getRegionPosition(x, z, y);
   regionTool.setRegion(region);
   regionTool.setPosition(regionPOS.x, regionPOS.y, regionPOS.z);

   dimension.set(WorldBounds.getRegionKeyFromPosition(x, y, z), region);
   return region;
  },
  _getRegionData(sab: SharedArrayBuffer): Region {
   return {
    columns: new Map(),
    buffer: sab,
    data: new DataView(sab),
   };
  },
  get(dimensionId: string, x: number, y: number, z: number) {
   const dimension = WorldRegister.dimensions.get(dimensionId);
   if (!dimension) return false;
   const region = dimension.get(WorldBounds.getRegionKeyFromPosition(x, y, z));
   if (!region) return false;
   return region;
  },
 },
 column: {
  add(
   dimensionId: string,
   x: number,
   z: number,
   y = 0,
   sab: SharedArrayBuffer
  ) {
   let region = WorldRegister.region.get(dimensionId, x, y, z);
   if (!region) {
    let buffer = DataHooks.region.onGetSync.run([dimensionId, x, y, z]);
    if (!buffer) return;
    region = WorldRegister.region.add(dimensionId, x, y, z, buffer);
    DataHooks.region.onNew.run([dimensionId, x, y, z]);
   }

   const column = this._getColumnData(sab);
   const columnPOS = WorldBounds.getColumnPosition(x, z, y);
   columnTool.setColumn(column);
   columnTool.setPosition(columnPOS.x, columnPOS.y, columnPOS.z);

   region.columns.set(WorldBounds.getColumnIndex(x, z, y), column);
   return column;
  },
  _getColumnData(sab: SharedArrayBuffer): Column {
   return {
    chunks: new Map(),
    buffer: sab,
    data: new DataView(sab),
   };
  },
  get(dimensionId: string, x: number, z: number, y = 0) {
   const region = WorldRegister.region.get(dimensionId, x, y, z);
   if (!region) return false;
   return region.columns.get(WorldBounds.getColumnIndex(x, z, y));
  },
  fill(dimensionId: string, x: number, z: number, y = 0) {
   for (
    let cy = WorldBounds.bounds.MinY;
    cy < WorldBounds.bounds.MaxY;
    cy += WorldBounds.chunkYSize
   ) {
    if (!WorldRegister.chunk.get(dimensionId, x, y + cy, z)) {
     const chunk = DataHooks.chunk.onGetSync.run([dimensionId, x, cy, z]);
     if (!chunk) continue;
     WorldRegister.chunk.add(dimensionId, x, y + cy, z, chunk);
    }
   }
  },
  height: {
   getRelative(dimensionId: string, x: number, z: number, y = 0) {
    const chunkWidth = WorldBounds.chunkXSize;
    const chunkDepth = WorldBounds.chunkZSize;
    let maxHeight = -Infinity;
    for (const check of $2dMooreNeighborhood) {
     const cx = check[0] * chunkWidth + x;
     const cz = check[1] * chunkDepth + z;
     const height = this.getAbsolute(dimensionId, cx, cz, y);
     if (height > maxHeight) {
      maxHeight = height;
     }
    }
    return maxHeight;
   },
   getAbsolute(dimensionId: string, x: number, z: number, y = 0) {
    const column = WorldRegister.column.get(dimensionId, x, z, y);
    if (!column) return WorldBounds.bounds.MinY;
    if (column.chunks.size == 0) return WorldBounds.bounds.MinY;
    let maxHeight = WorldBounds.bounds.MinY;
    for (const [key, chunk] of column.chunks) {
     if (!chunk) continue;

     chunkTool.setChunk(chunk);
     const chunkPOS = chunkTool.getPosition();
     let chunkMax = chunkTool.getTagValue("#dve:max_height");
     if (chunkMax == 0) continue;
     chunkMax += chunkPOS.y;
     if (maxHeight < chunkMax) {
      maxHeight = chunkMax;
     }
    }
    return maxHeight + 1;
   },
  },
 },
 chunk: {
  add(
   dimensionId: string,
   x: number,
   y: number,
   z: number,
   sab: SharedArrayBuffer
  ) {
   let column = WorldRegister.column.get(dimensionId, x, z, y);
   if (!column) {
    let buffer = DataHooks.column.onGetSync.run([dimensionId, x, z, y]);
    if (!buffer) return;
    column = WorldRegister.column.add(dimensionId, x, z, y, buffer);
    DataHooks.column.onNew.run([dimensionId, x, z, y]);
   }
   if (!column) return;
   const chunk = this._getChunkData(sab);
   chunkTool.setChunk(chunk);
   const chunkPOS = WorldBounds.getChunkPosition(x, y, z);
   chunkTool.setPosition(chunkPOS.x, chunkPOS.y, chunkPOS.z);

   column.chunks.set(WorldBounds.getChunkColumnIndex(y), chunk);
   DataHooks.chunk.onNew.run([dimensionId, x, y, z]);
   return chunk;
  },
  _getChunkData(sab: SharedArrayBuffer): ChunkData {
   return {
    buffer: sab,
    data: new DataView(sab),
   };
  },
  addFromServer(chunkBuffer: ArrayBuffer) {
   const sab = new SharedArrayBuffer(chunkBuffer.byteLength);
   const temp = new Uint8Array(chunkBuffer);
   const temp2 = new Uint8Array(sab);
   temp2.set(temp, 0);
   const chunk = this._getChunkData(sab);
   chunkTool.setChunk(chunk);
   const chunkPOS = chunkTool.getPosition();
   let column = WorldRegister.column.get(
    "main",
    chunkPOS.x,
    chunkPOS.z,
    chunkPOS.y
   );
   if (!column) return;

   column.chunks.set(WorldBounds.getChunkColumnIndex(chunkPOS.y), chunk);
   DataHooks.chunk.onNew.run(["main", chunkPOS.x, chunkPOS.y, chunkPOS.z]);
   return chunk;
  },
  get(dimensionId: string, x: number, y: number, z: number) {
   const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
   let addChunk = false;
   if (WorldRegister._cacheOn) {
    const chunk = WorldRegister.cache._get(chunkKey);
    if (chunk) return chunk;
    addChunk = true;
   }

   const column = WorldRegister.column.get(dimensionId, x, z, y);
   if (!column) return false;
   const chunk = column.chunks.get(WorldBounds.getChunkColumnIndex(y));
   if (!chunk) return;
   if (addChunk) {
    WorldRegister.cache._add(chunkKey, chunk);
   }
   return chunk;
  },
 },
};
