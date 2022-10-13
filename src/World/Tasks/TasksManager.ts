import { ConstructorTasks } from "Constants/InterComms/ConstructorTasks.js";
import { QueuesManager } from "../Queues/QueuesManager.js";
import { CCM } from "World/InterComms/Constructor/ConstructorCommManager.js";
import { WorldTasks } from "../../Constants/InterComms/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";

export const TasksManager = {
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
   chunk: ThreadComm.registerTasks<string>(
    WorldTasks.runRebuildQue,
    (data: string) => {
     if (!data) {
      data = "main";
     }
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
    WorldTasks.addToRGBLightUpdateQue,
    (data: any) => {
     QueuesManager.rgb.update.add(data);
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
   chunk: ThreadComm.registerTasks<string>(
    WorldTasks.runRebuildQue,
    (data: string) => {
     if (!data) {
      data = "main";
     }
    }
   ),
  },
  generate: {
   chunk: null,
  },
 },

};
