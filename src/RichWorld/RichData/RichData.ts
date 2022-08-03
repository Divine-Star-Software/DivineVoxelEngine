import type { RichChunk } from "Meta/index";
import type { RichWorldRegion } from "Meta/World/WorldData/World.types";
import { Util } from "../../Global/Util.helper.js";
export const RichData = {
 worldBounds: Util.getWorldBounds(),
 richRegions: <Record<string, RichWorldRegion>>{},

 getRegion(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.richRegions[regionKey]) return false;
  return this.richRegions[regionKey];
 },
 getChunk(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
  if (!region.chunks[worldColumnKey]) return false;
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  const chunk = region.chunks[worldColumnKey][chunkKey];
  if (!chunk) return false;
  return chunk;
 },
 addRegion(x: number, y: number, z: number) {
  if (this.getRegion(x, y, z)) return false;
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  this.richRegions[regionKey] = { chunks: {} };
  return this.richRegions[regionKey];
 },
 addChunk(x: number, y: number, z: number) {
  let region = this.getRegion(x, y, z);
  if (!region) {
   region = <RichWorldRegion>this.addRegion(x, y, z);
  }
  const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
  if (!region.chunks[worldColumnKey]) {
   region.chunks[worldColumnKey] = {};
  }
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  region.chunks[worldColumnKey][chunkKey] = <RichChunk>{};
  return <RichChunk>region.chunks[worldColumnKey][chunkKey];
 },

 setData(x: number, y: number, z: number, data: any) {
  let chunk = this.getChunk(x, y, z);
  if (!chunk) {
   chunk = <RichChunk>this.addChunk(x, y, z);
  }
  const richKey = this.worldBounds.getRichPositionKey(x, y, z);
  chunk[richKey] = data;
 },

 getData<T>(x: number, y: number, z: number): T | false {
  let chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  const richKey = this.worldBounds.getRichPositionKey(x, y, z);
  const data: T = chunk[richKey];
  if (!data) return false;
  return data;
 },

 removeData(x: number, y: number, z: number) {
  let chunk = this.getChunk(x, y, z);
  if (!chunk) {
   chunk = <RichChunk>this.addChunk(x, y, z);
  }
  const richKey = this.worldBounds.getRichPositionKey(x, y, z);
  delete chunk[richKey];
 },
};
