import type {
 LoadRegionHeadertasks,
 LoadWorldDataTasks,
} from "Meta/Tasks/Tasks.types.js";
import type { LocationData } from "voxelspaces";
//objects
import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { WorldDataSerialize } from "../Serializers/WorldDataSerializer.js";
import { Util } from "../../Global/Util.helper.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DataHandler, DataLoaderModes } from "./DataHandlerBaes.js";
import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
import { DataHooks } from "../../Data/DataHooks.js";

const columnDatatool = new ColumnDataTool();
export const DataHanlderWrapper = {
 mode: <DataLoaderModes>"indexdb",
 handler: <DataHandler>{},
 richData: <RichDataTool>{},
 $INIT(handler: DataHandler) {
  this.handler = handler;
  this.richData = new RichDataTool();
 },

 async loadRegionHeader(location: LocationData) {
  this.handler.setDataType("world-data");
  try {
   const headerBuffer = await this.handler.getRegionHeader(location);
   if (!headerBuffer) return false;
   const sab = Util.convertBufferToSAB(headerBuffer);
   DVEDL.worldComm.runTasks<LoadRegionHeadertasks>("load-region-header", [
    location,
    sab,
   ]);
   this.handler.setDataType("world-data");
   return true;
  } catch (error: any) {
   console.error(`Problem getting region header at ${location.toString()}`);
   console.error(error);
   return false;
  }
 },
 async saveColumn(location: LocationData) {
  this.handler.setDataType("world-data");
  if (columnDatatool.setLocation(location).loadIn()) {
   try {
    if (columnDatatool.isStored()) return true;
    columnDatatool.markAsStored();
    const column = WorldDataSerialize.serializeColumn(location);
    if (!column) return false;
    this.handler.setDataType("world-data");
    const success = await this.handler.saveColumn(location, column);
    if (!success) {
     columnDatatool.markAsNotStored();
     throw new Error(`Could not store column at ${location.toString()}`);
    }

    if (this.richData._enabled) {
     const column = await this.richData.setLocation(location).getColumnAsync();

     if (column) {
      this.handler.setDataType("rich-data");
      const success = await this.handler.saveColumn(location, column);
      if (!success) {
       columnDatatool.markAsNotStored();
       throw new Error(
        `Rich data could not store column at ${location.toString()}`
       );
      }
     }
    }

    this.handler.setDataType("world-data");
   } catch (error: any) {
    console.error(`Problem storing column at ${location.toString()}`);
    console.error(error);
   }
  }
 },

 async loadColumn(location: LocationData) {
  this.handler.setDataType("world-data");
  try {
   if (WorldRegister.column.get(location)) return true;
   this.handler.setDataType("world-data");
   const column = await this.handler.getColumn(location);
   const data = WorldDataSerialize.deSerializeColumn(column);
   columnDatatool.setBuffer(data.column);
   DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-column", [
    location,
    data.column,
   ]);
   for (const chunk of data.chunks) {
    DVEDL.worldComm.runTasks<LoadWorldDataTasks>("load-chunk", [
     location,
     chunk,
    ]);
   }
   if (this.richData._enabled && columnDatatool.hasRichData()) {
    this.handler.setDataType("rich-data");
    const richColumn = await this.handler.getColumn(location);
    if (!richColumn) return false;
    await this.richData.setLocation(location).setColumnAsync(richColumn);
   }

   this.handler.setDataType("world-data");
   return true;
  } catch (error: any) {
   console.error(`Problem loading column at ${location.toString()}`);
   console.error(error);
   return false;
  }
 },

 async unLoadColumn(location: LocationData) {
  this.handler.setDataType("world-data");
  if (columnDatatool.setLocation(location).loadIn()) {
   try {
    if (!columnDatatool.isStored()) {
     await this.saveColumn(location);
    }

    if (
     this.richData._enabled &&
     (await this.richData.setLocation(location).columnHasDataAsync())
    ) {
     await this.richData.removeColumnAsync();
    }

    this.handler.setDataType("world-data");
   } catch (error: any) {
    console.error(`Problem storing column at ${location.toString()}`);
    console.error(error);
   }
  } else {
   return true;
  }
 },

 async setPath(id: string) {
  this.handler.setDataType("world-data");
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
  this.handler.setDataType("world-data");
  try {
   if (WorldRegister.column.get(location)) return true;
   return await this.handler.columnExists(location);
  } catch (error: any) {
   console.error(`Problem checking if column exists at ${location.toString()}`);
   console.error(error);
   return false;
  }
 },

 async columnTimestamp(location: LocationData) {
  this.handler.setDataType("world-data");
  try {
   return await this.handler.columnTimestamp(location);
  } catch (error: any) {
   console.error(`Problem getting column timestamp at ${location.toString()}`);
   console.error(error);
   return 0;
  }
 },
};

DataHooks.settingsSynced.addToRun((data) => {
 DataHanlderWrapper.mode = data.data.mode;
});
