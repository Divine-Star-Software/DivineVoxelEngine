import { DivineVoxelEngineDataLoaderWorld } from "./DivineVoxelEngineDataLoaderWorld"
import type { LocationData } from "@divinevoxel/core/Math";
import { ThreadComm } from "@divinestar/threads/";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor/DivineVoxelEngineConstructor.js";

export default function (DVEDL: DivineVoxelEngineDataLoaderWorld) {
  const DataHanlderWrapper = DVEDL.dataHandler;
  ThreadComm.registerTasks<LocationData>(
    "load-region-header",
    async (data, onDone) => {
      const success = await DataHanlderWrapper.loadRegionHeader(data);
      return onDone ? onDone(success) : false;
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "save-column",
    async (data, onDone) => {
      await DataHanlderWrapper.saveColumn(data);
      return onDone ? onDone() : false;
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "load-column",
    async (data, onDone) => {
      if (WorldRegister.instance.column.get(data)) {
        if (onDone) {
          onDone();
        }
        return;
      }

      await DataHanlderWrapper.loadColumn(data);
      const inte = new SafeInterval().setInterval(1).setOnRun(() => {
        if (WorldRegister.instance.column.get(data)) {
          onDone ? onDone(true) : false;
          inte.stop();
        }
      });
      inte.start();
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "unload-column",
    async (data, onDone) => {
      if (!WorldRegister.instance.column.get(data)) {
        if (onDone) onDone();
        return;
      }
      await DataHanlderWrapper.unLoadColumn(data);
      DivineVoxelEngineConstructor.instance.core.threads.world.runPromiseTasks(
        "unload-column",
        data,
        [],
        () => {
          if (onDone) onDone();
        }
      );
    },
    "deferred"
  );
  ThreadComm.registerTasks<[id: string]>(
    "set-path",
    async (data, onDone) => {
      await DataHanlderWrapper.setPath(data[0]);
      return onDone ? onDone() : false;
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "column-exists",
    async (data, onDone) => {
      const start = performance.now();
      if (WorldRegister.instance.column.get(data)) {
        if (onDone) {
          onDone();
        }
        console.log("COLUMN EXISTS", performance.now() - start);
        return false;
      }
      const exists = await DataHanlderWrapper.columnExists(data);
      if (onDone) {
        onDone(exists);
      }
      console.log("COLUMN EXISTS", performance.now() - start);
      return false;
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "column-timestamp",
    async (data, onDone) => {
      const time = await DataHanlderWrapper.columnTimestamp(data);
      if (onDone) {
        onDone(time);
      }
      return 0;
    },
    "deferred"
  );
}
