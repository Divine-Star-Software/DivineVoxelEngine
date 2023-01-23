import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import type { LocationData } from "Meta/Data/CommonTypes";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataHanlderWrapper } from "../../DataLoader/DataHandler/DataHandlerWrapper.js";

export const DataLoaderTasks = {
 saveRegion: ThreadComm.registerTasks<LocationData>(
  "save-region",
  async (data, onDone) => {
   await DataHanlderWrapper.saveRegion(data);
   return onDone ? onDone() : false;
  },
  "deffered"
 ),
 loadRegion: ThreadComm.registerTasks<LocationData>(
  "load-region",
  async (data, onDone) => {
   await DataHanlderWrapper.loadRegion(data);
   return onDone ? onDone() : false;
  },
  "deffered"
 ),
 loadRegionHeader: ThreadComm.registerTasks<LocationData>(
  "load-region-header",
  async (data, onDone) => {
   const success = await DataHanlderWrapper.loadRegionHeader(data);
   return onDone ? onDone(success) : false;
  },
  "deffered"
 ),
 saveColumn: ThreadComm.registerTasks<LocationData>(
  "save-column",
  async (data, onDone) => {
   await DataHanlderWrapper.saveColumn(data);
   return onDone ? onDone() : false;
  },
  "deffered"
 ),
 loadColumn: ThreadComm.registerTasks<LocationData>(
  "load-column",
  async (data, onDone) => {
   await DataHanlderWrapper.loadColumn(data);
   const inte = setInterval(() => {
    if (DVEDL.data.worldRegister.column.get(data)) {
     onDone ? onDone(true) : false;
     clearInterval(inte);
    }
   }, 1);
  },
  "deffered"
 ),
 unLoadColumn: ThreadComm.registerTasks<LocationData>(
  "unload-column",
  async (data, onDone) => {
   await DataHanlderWrapper.saveColumn(data);
   DVEDL.worldComm.runTasks("unload-column", data);
   const inte = setInterval(() => {
    if (!DVEDL.data.worldRegister.column.get(data)) {
     onDone ? onDone() : false;
     clearInterval(inte);
    }
   }, 1);
  },
  "deffered"
 ),
 setPath: ThreadComm.registerTasks<[id: string]>(
  "set-path",
  async (data, onDone) => {
   await DataHanlderWrapper.setPath(data[0]);
   return onDone ? onDone() : false;
  },
  "deffered"
 ),
 columnExists: ThreadComm.registerTasks<LocationData>(
  "column-exists",
  async (data, onDone) => {
   const exists = await DataHanlderWrapper.columnExists(data);
   if (onDone) {
    onDone(exists);
   }
   return false;
  },
  "deffered"
 ),
 columnTimestamp: ThreadComm.registerTasks<LocationData>(
  "column-timestamp",
  async (data, onDone) => {
   const time = await DataHanlderWrapper.columnTimestamp(data);
   if (onDone) {
    onDone(time);
   }
   return 0;
  },
  "deffered"
 ),
};
