import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import {
 BuildTasks,
 ExplosionTasks,
 GenerateTasks,
 PaintTasks,
 PriorityTask,
 UpdateTasksO,
 WorldSunTask,
} from "Meta/Tasks/Tasks.types.js";

import { EreaseAndUpdate, PaintAndUpdate } from "./Functions/VoxelUpdate.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { TasksRequest } from "./TasksRequest.js";

const chunkTool = new ChunkDataTool();

export const Tasks = {
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
    const chunkPOS = WorldSpaces.chunk.getPositionLocation(location);
    await DVEC.builder.buildChunk(
     location[0],
     chunkPOS.x,
     chunkPOS.y,
     chunkPOS.z,
     data[1]
    );
   },
  },
  column: ThreadComm.registerTasks<BuildTasks>(
   ConstructorTasks.buildColumn,
   async (data) => {
    const column = WorldRegister.column.get(data[0]);
    if (!column) return false;
    if (column.chunks.size == 0) return false;
    const location = data[0];
    for (const [key, chunk] of column.chunks) {
     chunkTool.setChunk(chunk);
     const chunkPOS = chunkTool.getPositionData();
     location[1] = chunkPOS.x;
     location[2] = chunkPOS.y;
     location[3] = chunkPOS.z;

     DVEC.tasksQueue.addTasks(
      2,
      <BuildTasks>[[...location], data[1]],
      Tasks.build.chunk.run
     );
    }
   }
  ),
 },
 voxelUpdate: {
  erase: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.voxelErease,
   async (data, onDone) => {
    await EreaseAndUpdate(data);
    if (onDone) onDone();
   },
   "deffered"
  ),

  paint: ThreadComm.registerTasks<PaintTasks>(
   ConstructorTasks.voxelPaint,
   async (data, onDone) => {
    await PaintAndUpdate(data);
    if (onDone) onDone();
   },
   "deffered"
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
  "deffered"
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
   "deffered"
  ),
 },
 worldPropagation: ThreadComm.registerTasks<UpdateTasksO>(
  ConstructorTasks.worldPropagation,
  async (data, onDone) => {
   await DVEC.analyzer.runWorldPropagation(data);
   if (onDone) onDone();
  },
  "deffered"
 ),
 flow: {
  update: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.flowUpdate,
   async (data) => {
    const tasks = TasksRequest.getFlowUpdateRequest(data[0], data[1], data[2]);
    tasks.start();
    await DVEC.propagation.flow.update(tasks);
    tasks.stop();
   }
  ),
  remove: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.flowRemove,
   async (data) => {
    const tasks = TasksRequest.getFlowUpdateRequest(data[0], data[1], data[2]);
    tasks.start();
    await DVEC.propagation.flow.remove(tasks);
    tasks.stop();
   }
  ),
 },
 rgb: {
  update: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.RGBlightUpdate,
   (data) => {
    const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
    const [dimension, x, y, z] = data[0];
    tasks.queues.rgb.update.push([x, y, z]);
    tasks.start();
    DVEC.propagation.rgb.update(tasks);
    tasks.stop();
   }
  ),
  remove: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.RGBlightRemove,
   (data) => {
    const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
    const [dimension, x, y, z] = data[0];
    tasks.queues.rgb.rmeove.push([x, y, z]);
    tasks.start();
    DVEC.propagation.rgb.remove(tasks);
    tasks.stop();
   }
  ),
 },
 sun: {
  update: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.sunLightUpdate,
   (data) => {
    const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
    const [dimension, x, y, z] = data[0];
    tasks.queues.sun.update.push([x, y, z]);
    tasks.start();
    DVEC.propagation.sun.update(tasks);
    tasks.stop();
   }
  ),
  remove: ThreadComm.registerTasks<UpdateTasksO>(
   ConstructorTasks.sunLightRemove,
   (data) => {
    const tasks = TasksRequest.getLightUpdateRequest(data[0], data[1], data[2]);
    const [dimension, x, y, z] = data[0];
    tasks.queues.sun.rmeove.push([x, y, z]);
    tasks.start();
    DVEC.propagation.sun.remove(tasks);
    tasks.stop();
   }
  ),
 },
};
