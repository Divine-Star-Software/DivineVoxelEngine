import { DataHooks } from "../../Data/DataHooks.js";
import type {
 ChunkData,
 Column,
 WorldDimensions,
 Region,
} from "Meta/Data/WorldData.types";
import { WorldBounds } from "./WorldBounds.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { HeightMapData } from "../Chunk/HeightMapData.js";
import { $2dMooreNeighborhood } from "../Constants/Util/CardinalNeighbors.js";

export const WorldRegister = {
 dimensionRecord: <Record<string, number>>{
  main: 0,
 },
 dimensionMap: <Record<number, string>>{
  0: "main",
 },
 _dimensions: <WorldDimensions>{
  main: {},
 },

 _cacheOn: false,
 _cache: <Record<string, ChunkData>>{},

 cache: {
  enable() {
   WorldRegister._cacheOn = true;
   WorldRegister._cache = {};
  },
  disable() {
   WorldRegister._cacheOn = false;
   WorldRegister._cache = {};
  },
  _add(key: string, data: ChunkData) {
   WorldRegister._cache[key] = data;
  },
  _get(key: string) {
   return WorldRegister._cache[key];
  },
 },
 dimensions: {
  add(id: number | string) {
   const dimesnion = {};
   WorldRegister._dimensions[id] = dimesnion;
   return dimesnion;
  },
  get(id: number | string) {
   let dim;
   if (typeof id == "number") {
    return WorldRegister._dimensions[WorldRegister.dimensionMap[id]];
   }
   return WorldRegister._dimensions[id];
  },
 },

 region: {
  add(dimensionId: string | number, x: number, y: number, z: number) {
   let dimension = WorldRegister.dimensions.get(dimensionId);
   if (!dimension) {
    dimension = WorldRegister.dimensions.add(dimensionId);
   }
   const regionKey = WorldBounds.getRegionKeyFromPosition(x, y, z);
   const region: Region = {
    columns: {},
   };
   dimension[regionKey] = region;
   return region;
  },
  get(dimensionId: string | number, x: number, y: number, z: number) {
   const dimension = WorldRegister.dimensions.get(dimensionId);
   if (!dimension) return false;
   const regionKey = WorldBounds.getRegionKeyFromPosition(x, y, z);
   const region = dimension[regionKey];
   if (!region) return false;
   return region;
  },
 },
 column: {
  add(dimensionId: string | number, x: number, z: number, y = 0) {
   let region = WorldRegister.region.get(dimensionId, x, y, z);
   if (!region) {
    region = WorldRegister.region.add(dimensionId, x, y, z);
   }
   const worldKey = WorldBounds.getColumnKey(x, z, y);
   /**
   @TDO Impelement column data.
   */
   const sab = new SharedArrayBuffer(1);
   const column: Column = {
    chunks: {},
    buffer: sab,
    data: new DataView(sab),
   };

   region.columns[worldKey] = column;
   return column;
  },
  get(dimensionId: string | number, x: number, z: number, y = 0) {
   const region = WorldRegister.region.get(dimensionId, x, y, z);
   if (!region) return false;
   const columnKey = WorldBounds.getColumnKey(x, z, y);
   return region.columns[columnKey];
  },
  fill(dimensionId: string | number, x: number, z: number, y = 0) {
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
   getRelative(dimensionId: string | number, x: number, z: number, y = 0) {
    const chunkWidth = WorldBounds.chunkXSize;
    const chunkDepth = WorldBounds.chunkZSize;
    let maxHeight = -Infinity;
    for (const check of $2dMooreNeighborhood) {
     const cx = check[0] * chunkWidth + x;
     const cz = check[0] * chunkDepth + z;
     const height = this.getAbsolute(dimensionId, cx, cz, y);
     if (height > maxHeight) {
      maxHeight = height;
     }
    }
    return maxHeight;
   },
   getAbsolute(dimensionId: string | number, x: number, z: number, y = 0) {
    const column = WorldRegister.column.get(dimensionId, x, z, y);
    if (!column) return -Infinity;
    const chunkKeys = Object.keys(column.chunks);
    if (chunkKeys.length == 0) return -Infinity;
    let maxHeight = -Infinity;
    for (const chunkKey of chunkKeys) {
     const chunk = column.chunks[chunkKey];
     const chunkPOS = ChunkReader.getChunkPosition(chunk.data);
     const chunkMax = HeightMapData.getChunkMax(chunk.data) + chunkPOS.y;
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
   dimensionId: string | number,
   x: number,
   y: number,
   z: number,
   sab: SharedArrayBuffer
  ) {
   let column = WorldRegister.column.get(dimensionId, x, z, y);
   if (!column) {
    column = WorldRegister.column.add(dimensionId, x, z, y);
   }
   const chunk: ChunkData = {
    buffer: sab,
    data: new DataView(sab),
    segement1: new Uint32Array(
     sab,
     ChunkReader.indexes.voxelData,
     ChunkReader.indexSizes.voxelData / 4
    ),
    segement2: new Uint32Array(
     sab,
     ChunkReader.indexes.voxelStateData,
     ChunkReader.indexSizes.voxelStateData / 4
    ),
   };
   const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
   column.chunks[chunkKey] = chunk;
   DataHooks.chunk.onNew.run([dimensionId, x, y, z]);
   return chunk;
  },
  get(dimensionId: string | number, x: number, y: number, z: number) {
   const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
   let addChunk = false;
   if (WorldRegister._cacheOn) {
    const chunk = WorldRegister.cache._get(chunkKey);
    if (chunk) return chunk;
    addChunk = true;
   }

   const column = WorldRegister.column.get(dimensionId, x, z, y);
   if (!column) return false;
   const chunk = column.chunks[chunkKey];
   if (addChunk) {
    WorldRegister.cache._add(chunkKey, chunk);
   }
   return chunk;
  },
 },
};
