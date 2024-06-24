import { DivineVoxelEngineDataLoaderWorld } from "./DivineVoxelEngineDataLoaderWorld"
import type { LocationData } from "@divinevoxel/core/Math";;
import { Threads } from "@amodx/threads/";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor/DivineVoxelEngineConstructor.js";

export default function (DVEDL: DivineVoxelEngineDataLoaderWorld) {
  const DataHanlderWrapper = DVEDL.dataHandler;
  Threads.registerTasks<LocationData>(
    "load-region-header",
    async (data, onDone) => {
      const success = await DataHanlderWrapper.loadRegionHeader(data);
      return onDone ? onDone(success) : false;
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
    "save-column",
    async (data, onDone) => {
      await DataHanlderWrapper.saveColumn(data);
      return onDone ? onDone() : false;
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
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
  Threads.registerTasks<LocationData>(
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
  Threads.registerTasks<[id: string]>(
    "set-path",
    async (data, onDone) => {
      await DataHanlderWrapper.setPath(data[0]);
      return onDone ? onDone() : false;
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
    "column-exists",
    async (data, onDone) => {
      const start = performance.now();
      if (WorldRegister.instance.column.get(data)) {
        if (onDone) {
          onDone();
        }
        return false;
      }
      const exists = await DataHanlderWrapper.columnExists(data);
      if (onDone) {
        onDone(exists);
      }
      return false;
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
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
