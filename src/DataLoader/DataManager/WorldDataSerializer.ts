//types
import type { DataHandler } from "Meta/Interfaces/DataLoader/DataHandler.type";
import type { LocationData } from "Meta/Data/CommonTypes.js";
import type { LoadWorldDataTasks } from "Meta/Tasks/Tasks.types.js";
//objects
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import {
 WorldDataHeaders,
 DVEMessageHeader,
} from "../../Data/Constants/DataHeaders.js";
import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
export const WorldDataSerializer = {
 dataHanlder: <DataHandler | null>null,
 regions: <RegionDataTool>{},
 columns: <ColumnDataTool>{},
 chunks: <ChunkDataTool>{},
 $INIT(handler: DataHandler) {
  this.dataHanlder = handler;
  this.regions = new RegionDataTool();
  this.columns = new ColumnDataTool();
  this.chunks = new ChunkDataTool();
 },

 async loadRegion(
  location: LocationData,
  regionBuffer?: ArrayBuffer | SharedArrayBuffer
 ) {
  if (!this.dataHanlder) {
   throw new Error("A data hanlder must be set.");
  }
  if (!regionBuffer) {
   regionBuffer = await this.dataHanlder.getRegion(location);
   if (!regionBuffer)
    throw new Error(`Regiona at${location} could not be loaded.`);
  }

  const dv = new DataView(regionBuffer);
  if (
   dv.getUint16(0) != DVEMessageHeader &&
   dv.getUint16(2) != WorldDataHeaders.region
  ) {
   throw new Error(`Region at ${location} is not the correct format.`);
  }

  const regionSAB = new SharedArrayBuffer(this.regions.getBufferSize());
  const regionArray = new Uint8Array(regionSAB);
  this._readDataIntoBuffer(
   0,
   regionArray,
   regionBuffer,
   0,
   this.regions.getBufferSize()
  );
  DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-region", [regionSAB]);
  this.regions.setBuffer(regionSAB);
  let offset = this.regions.getBufferSize();
  const regionBufferLength = regionBuffer.byteLength;
  while (offset < regionBufferLength) {
   const dataType = dv.getUint16(offset + 2);
   if (dataType == WorldDataHeaders.column) {
    const columnSAB = new SharedArrayBuffer(this.columns.getBufferSize());
    const columnArray = new Uint8Array(columnSAB);
    this._readDataIntoBuffer(
     0,
     columnArray,
     regionBuffer,
     offset,
     this.columns.getBufferSize()
    );
    offset += this.columns.getBufferSize();
    DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-column", [columnSAB]);
    continue;
   }
   if (dataType == WorldDataHeaders.chunk) {
    const chunkSAB = new SharedArrayBuffer(this.chunks.getBufferSize());
    const chunkArray = new Uint8Array(chunkSAB);
    this._readDataIntoBuffer(
     0,
     chunkArray,
     regionBuffer,
     offset,
     this.chunks.getBufferSize()
    );
    offset += this.chunks.getBufferSize();
    DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-chunk", [chunkSAB]);
    continue;
   }
   throw new Error(`Error loading region at: ${location}`);
  }
 },

 async saveRegion(location: LocationData) {
  if (!this.dataHanlder) {
   throw new Error("A data hanlder must be set.");
  }
  if (
   !this.regions
    .setDimension(location[0])
    .loadIn(location[1], location[2], location[3])
  )
   return false;
  const dataCount = this.regions.getRegionDataCount();
  const bufferTotalSize =
   this.regions.getBufferSize() +
   dataCount.chunks * this.chunks.getBufferSize() +
   dataCount.columns * this.columns.getBufferSize();
  const regionBuffer = new ArrayBuffer(bufferTotalSize);
  const regionArray = new Uint8Array(regionBuffer);
  const region = this.regions.getRegion();
  this._readDataIntoBuffer(0, regionArray, region.buffer);
  let offset = this.regions.getBufferSize();
  region.columns.forEach((column) => {
   this._readDataIntoBuffer(offset, regionArray, column.buffer);
   offset += this.columns.getBufferSize();
   column.chunks.forEach((chunk) => {
    this._readDataIntoBuffer(offset, regionArray, chunk.buffer);
    offset += this.chunks.getBufferSize();
   });
  });
  await this.dataHanlder.saveRegion(location, regionBuffer);
 },

 _readDataIntoBuffer(
  offset: number,
  target: Uint8Array,
  source: ArrayBuffer | SharedArrayBuffer,
  sourceOffset = 0,
  sourceLength = -1
 ) {
  const bufferArray = new Uint8Array(
   source,
   sourceOffset,
   sourceLength == -1 ? source.byteLength : sourceLength
  );
  let i = bufferArray.length;
  while (i--) {
   target[i + offset] = bufferArray[i];
  }
 },
};
