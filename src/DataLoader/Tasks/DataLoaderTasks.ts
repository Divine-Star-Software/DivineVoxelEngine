import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import type { LocationData } from "voxelspaces";
import { ThreadComm } from "threadcomm";
import { DataHanlderWrapper } from "../../DataLoader/DataHandler/DataHandlerWrapper.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";

export const DataLoaderTasks = {
 loadRegionHeader: ThreadComm.registerTasks<LocationData>(
  "load-region-header",
  async (data, onDone) => {
   const success = await DataHanlderWrapper.loadRegionHeader(data);
   return onDone ? onDone(success) : false;
  },
  "deferred"
 ),
 saveColumn: ThreadComm.registerTasks<LocationData>(
  "save-column",
  async (data, onDone) => {
   await DataHanlderWrapper.saveColumn(data);
   return onDone ? onDone() : false;
  },
  "deferred"
 ),
 loadColumn: ThreadComm.registerTasks<LocationData>(
  "load-column",
  async (data, onDone) => {
   if (WorldRegister.column.get(data)) {
    if (onDone) {
     onDone();
    }
    return;
   }
   await DataHanlderWrapper.loadColumn(data);
   const inte = setInterval(() => {
    if (WorldRegister.column.get(data)) {
     onDone ? onDone(true) : false;
     clearInterval(inte);
    }
   }, 1);
  },
  "deferred"
 ),
 unLoadColumn: ThreadComm.registerTasks<LocationData>(
  "unload-column",
  async (data, onDone) => {
   if (!WorldRegister.column.get(data)) {
    if (onDone) onDone();
    return;
   }
   await DataHanlderWrapper.unLoadColumn(data);
   DVEDL.worldComm.runPromiseTasks("unload-column", data, [], () => {
    if (onDone) onDone();
   });
  },
  "deferred"
 ),
 setPath: ThreadComm.registerTasks<[id: string]>(
  "set-path",
  async (data, onDone) => {
   await DataHanlderWrapper.setPath(data[0]);
   return onDone ? onDone() : false;
  },
  "deferred"
 ),
 columnExists: ThreadComm.registerTasks<LocationData>(
  "column-exists",
  async (data, onDone) => {
   if (WorldRegister.column.get(data)) {
    if (onDone) {
     onDone();
    }
    return;
   }
   const exists = await DataHanlderWrapper.columnExists(data);
   if (onDone) {
    onDone(exists);
   }
   return false;
  },
  "deferred"
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
  "deferred"
 ),
};
