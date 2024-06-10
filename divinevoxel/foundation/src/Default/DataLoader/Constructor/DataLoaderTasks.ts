import { DivineVoxelEngineDataLoaderConstructor } from "./DivineVoxelEngineDataLoaderConstructor.js";
import type { LocationData } from "@divinevoxel/core/Math";
import { ThreadComm } from "@divinestar/threads/";

export default function (DVEDL: DivineVoxelEngineDataLoaderConstructor) {
  ThreadComm.registerTasks<LocationData>(
    "serialize-column",
    async (location, onDone) => {
      const seralized = DVEDL.serializer.serializeColumn(location);
      if (!seralized) return onDone ? onDone(false) : false;
      return onDone ? onDone(seralized, [seralized]) : seralized;
    },
    "deferred"
  );
  ThreadComm.registerTasks<ArrayBuffer>(
    "deserialize-column",
    async (columnData, onDone) => {
      const deSeralized = DVEDL.serializer.deSerializeColumn(columnData);
      return onDone ? onDone(deSeralized) : deSeralized;
    },
    "deferred"
  );
}
