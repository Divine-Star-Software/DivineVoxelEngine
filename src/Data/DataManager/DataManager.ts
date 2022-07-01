//types
import type { DataHandler } from "Meta/Data/DataHandler.type";
//objects
import { DVED } from "../DivineStarVoxelEngineData.js";

export const DataManager = {
 dataHanlder: <DataHandler | null>null,

 setDataHandler(handler: DataHandler) {
  this.dataHanlder = handler;
 },
 async loadRegion(x: number, y: number, z: number) {
  if (!this.dataHanlder) {
   throw new Error("A data hanlder must be set.");
  }
  const rawRegionData = await this.dataHanlder.getRegion(x, y, z);
  const region = JSON.parse(rawRegionData);
  for (const worldColumnKey of Object.keys(region.chunks)) {
   const worldColumn = region.chunks[worldColumnKey];
   for (const chunkKey of Object.keys(worldColumn)) {
    const chunk = region.chunks[worldColumnKey][chunkKey];
    const voxelSAB = this._convertArrayToSAB(chunk.voxels, "UInt32");
    const voxelStatesSAB = this._convertArrayToSAB(chunk.voxelStates, "UInt32");
    const heightMapSAB = this._convertArrayToSAB(chunk.heightMap, "UInt32");
    const minMaxMap = this._convertArrayToSAB(chunk.minMaxMap, "UInt32");
    DVED.worldComm.sendMessage("set-chunk", [
     chunk.position[0],
     chunk.position[1],
     chunk.position[2],
     voxelSAB,
     voxelStatesSAB,
     heightMapSAB,
     minMaxMap,
    ]);
   }
  }
 },

 _convertArrayToSAB(array: number[], type: "UInt32" | "UInt8") {
  let sab = new SharedArrayBuffer(0);
  let typeArray: Uint32Array | Uint8Array = new Uint32Array();
  if (type == "UInt32") {
   sab = new SharedArrayBuffer(array.length * 4);
   typeArray = new Uint32Array(sab);
  }
  if (type == "UInt8") {
   sab = new SharedArrayBuffer(array.length);
   typeArray = new Uint8Array(sab);
  }
  for (let i = 0; i < array.length; i++) {
   typeArray[i] = array[i];
  }
  return sab;
 },

 _convertSABtoArray(array: Uint32Array | Uint8Array | number[]) {
  const returnArray: number[] = [];
  for (let i = 0; i < array.length; i++) {
   returnArray[i] = array[i];
  }
  return returnArray;
 },
 saveRegion(x: number, y: number, z: number) {
  if (!this.dataHanlder) {
   throw new Error("A data hanlder must be set.");
  }
  const region = DVED.worldMatrix.getRegion(x, y, z);
  if (!region) {
   console.warn(`Region ${x}-${y}-${z} does not exists!`);
   return;
  }
  const newRegion: any = {
   chunks: {},
  };
  for (const worldColumnKey of Object.keys(region.chunks)) {
   const worldColumn = region.chunks[worldColumnKey];
   for (const chunkKey of Object.keys(worldColumn)) {
    if (!newRegion.chunks[worldColumnKey]) {
     newRegion.chunks[worldColumnKey] = {};
    }
    const chunk = worldColumn[chunkKey];
    const newChunk = {
     voxels: this._convertSABtoArray(chunk.voxels),
     voxelStates: this._convertSABtoArray(chunk.voxelStates),
     heightMap: this._convertSABtoArray(chunk.heightMap),
     minMaxMap: this._convertSABtoArray(chunk.minMaxMap),
     position: chunk.position,
    };
    newRegion.chunks[worldColumnKey][chunkKey] = newChunk;
   }
  }

  const dataSendString = JSON.stringify(newRegion);
  this.dataHanlder.saveRegion(x, y, z, dataSendString);
 },
};
