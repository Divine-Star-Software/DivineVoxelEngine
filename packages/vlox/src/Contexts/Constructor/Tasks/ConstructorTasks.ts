import { ConstructorTasksIds } from "./ConstructorTasksIds.js";
import { Threads } from "@amodx/threads/";

import type { BuildTasks, PriorityTask } from "../../../Types/Tasks.types.js";

import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { DivineVoxelEngineConstructor } from "../DivineVoxelEngineConstructor.js";

import type {
  ExplosionTasks,
  VoxelUpdateTasks as VoxelUpdateTasks,
  AnaylzerTask,
  WorldSunTask,
} from "../../../Types/Tasks.types.js";

import {
  EreaseAndUpdate,
  PaintAndUpdate,
  VoxelUpdate,
} from "../Tasks/VoxelUpdate.js";

import { TasksRequest } from "../Tasks/TasksRequest.js";
import { Propagation } from "../../../Propagation";
import { Analyzer } from "../../../Analyzer/Analyzer";
import { UpdateTask } from "./UpdateTask.js";

export default function (DVEC: DivineVoxelEngineConstructor) {
  Threads.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });
  const propagation = new Propagation();
  const analyzer = new Analyzer();

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
      await propagation.explosion(new UpdateTask(), data[1]);
    }
  );

  Threads.registerTasks<WorldSunTask>(
    ConstructorTasksIds.WorldSun,
    (data, onDone) => {
      propagation.worldSun(TasksRequest.getWorldSunRequests(data[0], data[1]));
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    ConstructorTasksIds.AnalyzerPropagation,
    async (data, onDone) => {
      await analyzer.runPropagation(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    ConstructorTasksIds.AnalyzerUpdate,
    async (data, onDone) => {
      await analyzer.runUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<PriorityTask<BuildTasks>>(
    ConstructorTasksIds.BuildChunk,
    async (buildData, onDone) => {
      WorldRegister.instance.cache.enable();
      const location = buildData.data[0];
      await DVEC.mesher.meshChunk(location, buildData.data[1], 0);
      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    }
  );

  Threads.registerTasks<BuildTasks>(
    ConstructorTasksIds.BuildColumn,
    async (data, onDone) => {
      WorldRegister.instance.setDimension(data[0][0]);
      const column = WorldRegister.instance.column.get(
        data[0][1],
        data[0][2],
        data[0][2]
      );
      if (!column) {
        console.warn("Tried building a column that does not exists.", data);
        return false;
      }
      if (column.chunks.length == 0) return false;
      const location = data[0];
      WorldRegister.instance.cache.enable();
      for (let i = 0; i < column.chunks.length; i++) {
        const chunk = column.chunks[i];
        if (!chunk) continue;

        DVEC.mesher.meshChunk(
          [
            location[0],
            location[1],
            location[2] + i * WorldSpaces.chunk.getHeight(),
            location[3],
          ],
          1,
          100
        );
      }

      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    },
    "deferred"
  );
}
