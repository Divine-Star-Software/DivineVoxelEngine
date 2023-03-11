import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "threadcomm";
import {
 BuildTasks,
 ExplosionTasks,
 GenerateTasks,
 PaintTasks,
 PriorityTask,
 UpdateTasksO,
 WorldSunTask,
} from "Meta/Tasks/Tasks.types.js";

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
 data: {
  syncTextures: ThreadComm.registerTasks(
   "sync-uv-texuture-data",
   (data: any) => {
    DVEC.builder.textureManager.setUVTextureMap(data);
    DVEC.hooks.texturesRegistered.run(DVEC.builder.textureManager);
   }
  ),
 },
 build: {
  chunk: {
   tasks: ThreadComm.registerTasks<PriorityTask<BuildTasks>>(
    ConstructorTasks.buildChunk,
    async (buildData) => {
     if (buildData.priority == 0) {
      Tasks.build.chunk.run(buildData.data);
      return;
     }
     DVEC.tasksQueue.addTasks(
      buildData.priority,
      buildData.data,
      Tasks.build.chunk.run
     );
    }
   ),
   async run(data: BuildTasks) {
    const location = data[0];
    await DVEC.builder.buildChunk(location, data[1]);
   },
  },
  column: ThreadComm.registerTasks<BuildTasks>(
   ConstructorTasks.buildColumn,
   async (data, onDone) => {
    const column = WorldRegister.column.get(data[0]);
    if (!column) return false;
    if (column.chunks.size == 0) return false;
    let totalChunks = 0;
    const location = data[0];
    for (const [key, chunk] of column.chunks) {
     chunkTool.setChunk(chunk);
     const chunkPOS = chunkTool.getPositionData();
     location[1] = chunkPOS.x;
     location[2] = chunkPOS.y;
     location[3] = chunkPOS.z;
     totalChunks++;
     DVEC.tasksQueue.addTasks(
      2,
      <BuildTasks>[[...location], data[1]],
      async (data) => {
       await Tasks.build.chunk.run(data);
       totalChunks--;
       if (totalChunks == 0) {
        if (onDone) onDone(true);
       }
      }
     );
    }
   },
   "deferred"
  ),
 },
 voxelUpdate: {
  update: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.voxelUpdate,
   async (data, onDone) => {
    await VoxelUpdate(data);
    if (onDone) onDone();
   },
   "deferred"
  ),
  erase: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.voxelErease,
   async (data, onDone) => {
    await EreaseAndUpdate(data);
    if (onDone) onDone();
   },
   "deferred"
  ),

  paint: ThreadComm.registerTasks<PaintTasks>(
   ConstructorTasks.voxelPaint,
   async (data, onDone) => {
    await PaintAndUpdate(data);
    if (onDone) onDone();
   },
   "deferred"
  ),
 },
 explosion: ThreadComm.registerTasks<ExplosionTasks>(
  ConstructorTasks.explosion,
  async (data) => {
   await DVEC.propagation.expolosion.run(
    TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3])
   );
  }
 ),

 worldSun: ThreadComm.registerTasks<WorldSunTask>(
  ConstructorTasks.worldSun,
  (data, onDone) => {
   DVEC.tasksQueue.addTasks(2, data, () => {
    DVEC.propagation.worldSun.run(
     TasksRequest.getWorldSunRequests(data[0], data[1])
    );
    if (onDone) onDone();
   });
  },
  "deferred"
 ),
 worldGen: {
  generate: ThreadComm.registerTasks<GenerateTasks>(
   ConstructorTasks.generate,
   (data, onDone) => {
    if (!onDone) return;
    DVEC.tasksQueue.addTasks(2, data, () => {
     DVEC.worldGen.generate(data, onDone);
    });
   },
   "deferred"
  ),
 },
 anaylzer: {
  propagation: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.analyzerPropagation,
   async (data, onDone) => {
    await DVEC.analyzer.runPropagation(data);
    if (onDone) onDone();
   },
   "deferred"
  ),
  update: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.analyzerUpdate,
   async (data, onDone) => {
    await DVEC.analyzer.runUpdate(data);
    if (onDone) onDone();
   },
   "deferred"
  ),
 },
};
