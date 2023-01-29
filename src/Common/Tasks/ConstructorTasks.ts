import { ConstructorQueues } from "../Queues/ConstructorQueues.js";
import { ConstructorRemoteThreadTasks } from "../Threads/Contracts/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { CCM } from "../../World/Threads/Threads.js";
import { AddToRebuildQueue, RunRebuildTasks } from "Meta/Tasks/Tasks.types.js";

export const ConstructorTasks = {
 runQueue: {
  rgb: {
   update: null,
   remove: null,
  },
  worldSun: {
   fill: null,
   columnFill: null,
   flood: null,
  },
  sun: {
   update: null,
   remove: null,
  },
  flow: {
   update: null,
   remove: null,
  },
  build: {
   chunk: ThreadComm.registerTasks<RunRebuildTasks>(
    ConstructorRemoteThreadTasks.runRebuildQue,
    (data) => {
     ConstructorQueues.build.chunk.run(data[0]);
    }
   ),
  },
  generate: {
   chunk: null,
  },
 },
 addToQueue: {
  rgb: {
   update: ThreadComm.registerTasks(
    ConstructorRemoteThreadTasks.addToRGBLightUpdateQue,
    (data: any) => {
     ConstructorQueues.rgb.update.add(data);
    }
   ),
   remove: null,
  },
  worldSun: {
   fill: null,
   columnFill: null,
   flood: null,
  },
  sun: {
   update: null,
   remove: null,
  },
  flow: {
   update: null,
   remove: null,
  },
  build: {
   addToRebuildQueue: ThreadComm.registerTasks<AddToRebuildQueue>(
    ConstructorRemoteThreadTasks.addToRebuildQue,
    (data) => {
     ConstructorQueues.build.chunk.add(
      {
       data: [data[0], 1],
       priority: data[2],
      },
      data[1]
     );
    }
   ),
  },
  generate: {
   chunk: null,
  },
 },
};
