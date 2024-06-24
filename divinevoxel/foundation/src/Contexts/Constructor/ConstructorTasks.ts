import { ConstructorTasksIds } from "../Common/ConstructorTasksIds.js";
import { Threads } from "@amodx/threads/";

import type {
  BuildTasks,
  ExplosionTasks,
  GenerateTasks,
  VoxelUpdateTasks as VoxelUpdateTasks,
  PriorityTask,
  AnaylzerTask,
  WorldSunTask,
} from "../../Types/Tasks.types.js";

import {
  EreaseAndUpdate,
  PaintAndUpdate,
  VoxelUpdate,
} from "./Tasks/VoxelUpdate.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";

import { TasksRequest } from "./Tasks/TasksRequest.js";
import { ChunkDataTool } from "../../Default/Tools/Data/WorldData/ChunkDataTool.js";
import { DVEFConstrucotrCore } from "./DVEFConstructorCore.js";

export default function (DVEC: DVEFConstrucotrCore) {
  const chunkTool = new ChunkDataTool();

  Threads.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });

  Threads.registerTasks<PriorityTask<BuildTasks>>(
    ConstructorTasksIds.BuildChunk,
    async (buildData, onDone) => {
      WorldRegister.instance.cache.enable();
      const location = buildData.data[0];
      await DVEC.builder.buildChunk(location, buildData.data[1],0);
      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    }
  );
  Threads.registerTasks<BuildTasks>(
    ConstructorTasksIds.BuildColumn,
    async (data, onDone) => {
      WorldRegister.instance.cache.enable();
      const column = WorldRegister.instance.column.get(data[0]);
      if (!column) {
        console.warn("Tried building a column that does not exists.", data);
        return false;
      }
      if (column.chunks.length == 0) return false;
      const location = data[0];
      for (const chunk of column.chunks) {
        chunkTool.setChunk(chunk);
        const chunkPOS = chunkTool.getPositionData();
        location[1] = chunkPOS.x;
        location[2] = chunkPOS.y;
        location[3] = chunkPOS.z;
        DVEC.builder.buildChunk([...location], 1,100);
      }
      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    },
    "deferred"
  );

  Threads.registerTasks<VoxelUpdateTasks>(
    ConstructorTasksIds.VoxelUpdate,
    async (data, onDone) => {
      await VoxelUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<AnaylzerTask>(
    ConstructorTasksIds.VoxelErease,
    async (data, onDone) => {
      await EreaseAndUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<VoxelUpdateTasks>(
    ConstructorTasksIds.VoxelPaint,
    async (data, onDone) => {
      await PaintAndUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<ExplosionTasks>(
    ConstructorTasksIds.Explosion,
    async (data) => {
      await DVEC.propagation.explosion(
        TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3])
      );
    }
  );

  Threads.registerTasks<WorldSunTask>(
    ConstructorTasksIds.WorldSun,
    (data, onDone) => {
      DVEC.propagation.worldSun(
        TasksRequest.getWorldSunRequests(data[0], data[1])
      );
      if (onDone) onDone();
    },
    "deferred"
  );


  Threads.registerTasks<AnaylzerTask>(
    ConstructorTasksIds.AnalyzerPropagation,
    async (data, onDone) => {
      await DVEC.analyzer.runPropagation(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<AnaylzerTask>(
    ConstructorTasksIds.AnalyzerUpdate,
    async (data, onDone) => {
      await DVEC.analyzer.runUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );
}
