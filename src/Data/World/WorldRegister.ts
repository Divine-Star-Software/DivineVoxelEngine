import { ThreadComm } from "Libs/ThreadComm/ThreadComm.js";
import type { ChunkSyncData } from "Meta/Data/DataSync.types";
import type {
 ChunkData,
 WorldColumn,
 WorldDimensions,
 WorldRegion,
} from "Meta/Data/WorldData.types";
import { WorldBounds } from "./WorldBounds.js";

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
   const region: WorldRegion = {
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
 worldColumn: {
  add(dimensionId: string | number, x: number, z: number, y = 0) {
   let region = WorldRegister.region.get(dimensionId, x, y, z);
   if (!region) {
    region = WorldRegister.region.add(dimensionId, x, y, z);
   }
   const worldColumnKey = WorldBounds.getWorldColumnKey(x, z, y);
   //**@TO-DO Impelement world column data.
   const sab = new SharedArrayBuffer(1);
   const worldColumn: WorldColumn = {
    chunks: {},
    buffer: sab,
    data: new DataView(sab),
   };

   region.columns[worldColumnKey] = worldColumn;
   return worldColumn;
  },
  get(dimensionId: string | number, x: number, z: number, y = 0) {
   const region = WorldRegister.region.get(dimensionId, x, y, z);
   if (!region) return false;
   const worldColumnKey = WorldBounds.getWorldColumnKey(x, z, y);
   return region.columns[worldColumnKey];
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
  
   let worldColumn = WorldRegister.worldColumn.get(dimensionId, x, z, y);
   if (!worldColumn) {
    worldColumn = WorldRegister.worldColumn.add(dimensionId, x, z, y);
   }
   const chunk: ChunkData = {
    buffer: sab,
    data: new DataView(sab),
   };
   const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
   worldColumn.chunks[chunkKey] = chunk;
  },
  get(dimensionId: string | number, x: number, y: number, z: number) {
   const worldColumn = WorldRegister.worldColumn.get(dimensionId, x, z, y);
   if (!worldColumn) return false;
   const chunkKey = WorldBounds.getChunkKeyFromPosition(x, y, z);
   return worldColumn.chunks[chunkKey];
  },
 },
};
