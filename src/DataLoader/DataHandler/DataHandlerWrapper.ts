import type {
 LoadRegionHeadertasks,
 LoadWorldDataTasks,
} from "Meta/Tasks/Tasks.types.js";
import type { LocationData } from "Meta/Data/CommonTypes";
import type { DataHandler } from "Meta/Interfaces/DataLoader/DataHandler.type";
//objects
import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { WorldDataSerialize } from "../Serializers/WorldDataSerializer.js";
import { Util } from "../../Global/Util.helper.js";

const columnDatatool = new ColumnDataTool();

export const DataHanlderWrapper = {
 handler: <DataHandler>{},
 $INIT(handler: DataHandler) {
  this.handler = handler;
 },

 async loadRegionHeader(location: LocationData) {
  try {
   const headerBuffer = await this.handler.getRegionHeader(location);
   if (!headerBuffer) return false;
   const sab = Util.convertBufferToSAB(headerBuffer);
   DVEDL.worldComm.runTasks<LoadRegionHeadertasks>("load-region-header", [
    location,
    sab,
   ]);
   return true;
  } catch (error: any) {
   console.error(`Problem getting region header at ${location.toString()}`);
   console.error(error);
   return false;
  }
 },
 async saveColumn(location: LocationData) {
  if (columnDatatool.setLocation(location).loadIn()) {
   try {
    columnDatatool.markAsStored();
    const column = WorldDataSerialize.serializeColumn(location);
    if (!column) return false;
    const success = await this.handler.saveColumn(location, column);
    if (!success) {
     columnDatatool.markAsNotStored();
     throw new Error(`Could not store column at ${location.toString()}`);
    }
   } catch (error: any) {
    console.error(`Problem storing column at ${location.toString()}`);
    console.error(error);
   }
  }
 },

 async loadColumn(location: LocationData) {
  try {
   const column = await this.handler.getColumn(location);
   const data = WorldDataSerialize.deSerializeColumn(column);
   columnDatatool.setBuffer(data.column);
   DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-column", [data.column]);
   for (const chunk of data.chunks) {
    DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-chunk", [chunk]);
   }
   return true;
  } catch (error: any) {
   console.error(`Problem loading column at ${location.toString()}`);
   console.error(error);
   return false;
  }
 },

 async setPath(id: string) {
  try {
   await this.handler.setPath(id);
   return true;
  } catch (error: any) {
   console.error(`Problem setting path to ${id}`);
   console.error(error);
   return false;
  }
 },

 async columnExists(location: LocationData) {
  try {
   return await this.handler.columnExists(location);
  } catch (error: any) {
   console.error(`Problem checking if column exists at ${location.toString()}`);
   console.error(error);
   return false;
  }
 },

 async columnTimestamp(location: LocationData) {
  try {
   return await this.handler.columnTimestamp(location);
  } catch (error: any) {
   console.error(`Problem getting column timestamp at ${location.toString()}`);
   console.error(error);
   return 0;
  }
 },

 async saveRegion(location: LocationData) {
  /** @TO-DO*/
  return true;
 },

 async loadRegion(location: LocationData) {
  /** @TO-DO*/
  return true;
 },
};
