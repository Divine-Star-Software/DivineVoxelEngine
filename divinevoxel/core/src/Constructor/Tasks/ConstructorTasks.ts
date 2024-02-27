import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DivineVoxelEngineConstructor } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "@divinestar/threads/";
import type { BuildNodeMesh } from "Types/Tasks/RenderTasks.types.js";

import type {
  BuildTasks,
  ExplosionTasks,
  GenerateTasks,
  VoxelUpdateTasks as VoxelUpdateTasks,
  PriorityTask,
  UpdateTasksO,
  WorldSunTask,
} from "Types/Tasks/Tasks.types.js";

import {
  EreaseAndUpdate,
  PaintAndUpdate,
  VoxelUpdate,
} from "./Functions/VoxelUpdate.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { TasksRequest } from "./TasksRequest.js";

const chunkTool = new ChunkDataTool();

export const Tasks = {
  clearAll: ThreadComm.registerTasks("clear-all", () => {
    WorldRegister.clearAll();
  }),
  data: {
    syncTextures: ThreadComm.registerTasks(
      "sync-texuture-index",
      (data: any) => {
        const DVEC = DivineVoxelEngineConstructor.instance;
        DVEC.builder.textureManager.setTextureIndex(data);
        DVEC.hooks.texturesRegistered.run(DVEC.builder.textureManager);
      }
    ),
  },
  build: {
    nodeMesh: ThreadComm.registerTasks<BuildNodeMesh>(
      "build-node-mesh",
      (data, onDone) => {
        const DVEC = DivineVoxelEngineConstructor.instance;
        const nodeData = DVEC.builder.nodes.buildNode(data);
        if (!nodeData) return onDone ? onDone(false) : 0;
        onDone ? onDone(nodeData[0], nodeData[1]) : 0;
      },
      "deferred"
    ),
    chunk: {
      tasks: ThreadComm.registerTasks<PriorityTask<BuildTasks>>(
        ConstructorTasks.BuildChunk,
        async (buildData, onDone) => {
          const DVEC = DivineVoxelEngineConstructor.instance;
          const location = buildData.data[0];
          await DVEC.builder.buildChunk(location, buildData.data[1]);
          if (onDone) onDone();
        }
      ),
    },
    column: ThreadComm.registerTasks<BuildTasks>(
      ConstructorTasks.BuildColumn,
      async (data, onDone) => {
        const DVEC = DivineVoxelEngineConstructor.instance;

        const column = WorldRegister.column.get(data[0]);
        if (!column) return false;
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
          DVEC.builder.buildChunk([...location]);
        }
        if (onDone) onDone();
      },
      "deferred"
    ),
  },
  voxelUpdate: {
    update: ThreadComm.registerTasks<VoxelUpdateTasks>(
      ConstructorTasks.VoxelUpdate,
      async (data, onDone) => {
        await VoxelUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
    erase: ThreadComm.registerTasks<UpdateTasksO>(
      ConstructorTasks.VoxelErease,
      async (data, onDone) => {
        await EreaseAndUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),

    paint: ThreadComm.registerTasks<VoxelUpdateTasks>(
      ConstructorTasks.VoxelPaint,
      async (data, onDone) => {
        await PaintAndUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
  },
  explosion: ThreadComm.registerTasks<ExplosionTasks>(
    ConstructorTasks.Explosion,
    async (data) => {
      const DVEC = DivineVoxelEngineConstructor.instance;
      await DVEC.propagation.expolosion.run(
        TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3])
      );
    }
  ),

  worldSun: ThreadComm.registerTasks<WorldSunTask>(
    ConstructorTasks.WorldSun,
    (data, onDone) => {
      const DVEC = DivineVoxelEngineConstructor.instance;
      DVEC.propagation.worldSun.run(
        TasksRequest.getWorldSunRequests(data[0], data[1])
      );
      if (onDone) onDone();
    },
    "deferred"
  ),
  worldGen: {
    generate: ThreadComm.registerTasks<GenerateTasks>(
      ConstructorTasks.Generate,
      (data, onDone) => {
        if (!onDone) return;
        const DVEC = DivineVoxelEngineConstructor.instance;
        DVEC.worldGen.generate(data, "generate", onDone);
      },
      "deferred"
    ),
    decorate: ThreadComm.registerTasks<GenerateTasks>(
      ConstructorTasks.Decorate,
      (data, onDone) => {
        if (!onDone) return;
        const DVEC = DivineVoxelEngineConstructor.instance;
        DVEC.worldGen.generate(data, "decorate", onDone);
      },
      "deferred"
    ),
  },
  anaylzer: {
    propagation: ThreadComm.registerTasks<UpdateTasksO>(
      ConstructorTasks.AnalyzerPropagation,
      async (data, onDone) => {
        const DVEC = DivineVoxelEngineConstructor.instance;
        await DVEC.analyzer.runPropagation(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
    update: ThreadComm.registerTasks<UpdateTasksO>(
      ConstructorTasks.AnalyzerUpdate,
      async (data, onDone) => {
        const DVEC = DivineVoxelEngineConstructor.instance;
        await DVEC.analyzer.runUpdate(data);
        if (onDone) onDone();
      },
      "deferred"
    ),
  },
};
