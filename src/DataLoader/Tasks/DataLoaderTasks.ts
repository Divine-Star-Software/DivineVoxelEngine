import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import type { LocationData } from "Meta/Data/CommonTypes";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export const DataLoaderTasks = {
 saveRegion: ThreadComm.registerTasks<LocationData>(
  "save-region",
  async (data, onDone) => {
   await DVEDL.serializer.saveRegion(data);
   return onDone ? onDone() : false;
  },
  "deffered"
 ),
 loadRegion: ThreadComm.registerTasks<LocationData>(
  "load-region",
  async (data, onDone) => {
   await DVEDL.serializer.loadRegion(data);
   return onDone ? onDone() : false;
  },
  "deffered"
 ),
};
