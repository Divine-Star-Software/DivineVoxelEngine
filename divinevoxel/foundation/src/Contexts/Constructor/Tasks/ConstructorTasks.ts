import { ConstructorTasksIds } from "../../Common/ConstructorTasksIds.js";
import { ThreadComm } from "@divinestar/threads/";

import type {
  BuildTasks,
  ExplosionTasks,
  GenerateTasks,
  VoxelUpdateTasks as VoxelUpdateTasks,
  PriorityTask,
  AnaylzerTask,
  WorldSunTask,
} from "../../../Types/Tasks.types.js";

import { EreaseAndUpdate, PaintAndUpdate, VoxelUpdate } from "./VoxelUpdate.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";

import { TasksRequest } from "./TasksRequest.js";
import { ChunkDataTool } from "../../../Default/Tools/Data/WorldData/ChunkDataTool.js";
import { DVEFConstrucotrCore } from "../DVEFConstructorCore.js";

const chunkTool = new ChunkDataTool();

export class ConstructorTasks {
  clearAll = ThreadComm.registerTasks("clear-all", () => {
    WorldRegister.clearAll();
  });
  data = {};
  build = {
    chunk: {
      tasks: ThreadComm.registerTasks<PriorityTask<BuildTasks>>(
        ConstructorTasksIds.BuildChunk,
        async (buildData, onDone) => {
          const DVEC = DVEFConstrucotrCore.instance;
          const location = buildData.data[0];
          await DVEC.builder.buildChunk(location, buildData.data[1]);
          if (onDone) onDone();
        }
      ),
    },
    column: ThreadComm.registerTasks<BuildTasks>(
      ConstructorTasksIds.BuildColumn,
      async (data, onDone) => {
        const DVEC = DVEFConstrucotrCore.instance;
        const column = WorldRegister.column.get(data[0]);

        if (!column) {
          console.warn("Tried building a column that does not exists.", data);
          return false;
        }
        if (column.chunks.length == 0) return false;
        let totalChunks = 0;
        const location = data[0];
        for (const chunk of column.chunks) {
          chunkTool.setChunk(chunk);
          const chunkPOS = chunkTool.getPositionData();
          location[1] = chunkPOS.x;
          location[2] = chunkPOS.y;
          location[3] = chunkPOS.z;
          totalChunks++;
          DVEC.builder.buildChunk([...location], 1);
        }
        if (onDone) onDone();
      },
      "deferred"
    ),
  };
  voxelUpdate = {
    update: ThreadComm.registerTasks<VoxelUpdateTasks>(
      ConstructorTasksIds.VoxelUpdate,
      async (data, onDone) => {
        await VoxelUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
    erase: ThreadComm.registerTasks<AnaylzerTask>(
      ConstructorTasksIds.VoxelErease,
      async (data, onDone) => {
        await EreaseAndUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),

    paint: ThreadComm.registerTasks<VoxelUpdateTasks>(
      ConstructorTasksIds.VoxelPaint,
      async (data, onDone) => {
        await PaintAndUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
  };
  explosion = ThreadComm.registerTasks<ExplosionTasks>(
    ConstructorTasksIds.Explosion,
    async (data) => {
      const DVEC = DVEFConstrucotrCore.instance;
      await DVEC.propagation.explosion(
        TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3])
      );
    }
  );

  worldSun = ThreadComm.registerTasks<WorldSunTask>(
    ConstructorTasksIds.WorldSun,
    (data, onDone) => {
      const DVEC = DVEFConstrucotrCore.instance;
      DVEC.propagation.worldSun(
        TasksRequest.getWorldSunRequests(data[0], data[1])
      );
      if (onDone) onDone();
    },
    "deferred"
  );
  worldGen = {
    generate: ThreadComm.registerTasks<GenerateTasks>(
      ConstructorTasksIds.Generate,
      (data, onDone) => {
        if (!onDone) return;
        const DVEC = DVEFConstrucotrCore.instance;
        DVEC.worldGen.generate(data, "generate", onDone);
      },
      "deferred"
    ),
    decorate: ThreadComm.registerTasks<GenerateTasks>(
      ConstructorTasksIds.Decorate,
      (data, onDone) => {
        if (!onDone) return;
        const DVEC = DVEFConstrucotrCore.instance;
        DVEC.worldGen.generate(data, "decorate", onDone);
      },
      "deferred"
    ),
  };
  anaylzer = {
    propagation: ThreadComm.registerTasks<AnaylzerTask>(
      ConstructorTasksIds.AnalyzerPropagation,
      async (data, onDone) => {
        const DVEC = DVEFConstrucotrCore.instance;
        await DVEC.analyzer.runPropagation(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
    update: ThreadComm.registerTasks<AnaylzerTask>(
      ConstructorTasksIds.AnalyzerUpdate,
      async (data, onDone) => {
        const DVEC = DVEFConstrucotrCore.instance;
        await DVEC.analyzer.runUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
  };
}
