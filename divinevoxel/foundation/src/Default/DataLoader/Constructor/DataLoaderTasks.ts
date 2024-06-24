import { DivineVoxelEngineDataLoaderConstructor } from "./DivineVoxelEngineDataLoaderConstructor.js";
import type { LocationData } from "@divinevoxel/core/Math";;
import { Threads } from "@amodx/threads/";

export default function (DVEDL: DivineVoxelEngineDataLoaderConstructor) {
  Threads.registerTasks<LocationData>(
    "serialize-column",
    async (location, onDone) => {
      const seralized = DVEDL.serializer.serializeColumn(location);
      if (!seralized) return onDone ? onDone(false) : false;
      return onDone ? onDone(seralized, [seralized]) : seralized;
    },
    "deferred"
  );
  Threads.registerTasks<ArrayBuffer>(
    "deserialize-column",
    async (columnData, onDone) => {
      const deSeralized = DVEDL.serializer.deSerializeColumn(columnData);
      return onDone ? onDone(deSeralized) : deSeralized;
    },
    "deferred"
  );
}
