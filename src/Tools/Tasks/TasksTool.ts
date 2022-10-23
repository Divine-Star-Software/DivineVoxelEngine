import { DimensionsData } from "../../Data/Dimensions/DimensionsData.js";
import { DVEW } from "../../World/DivineVoxelEngineWorld.js";
class TasksBase {
 _data = {
  dimension: 0,
 };

 setDimension(dimensionId: number | string) {
  this._data.dimension = DimensionsData.getDimensionNumericId(dimensionId);
  return this;
 }
 build = {
  chunk: {
   __queueId: "main",
   add(x: number, y: number, z: number) {
    DVEW.queues.build.chunk.add([0, x, y, z, 1]);
   },
   run(onDone: Function) {
    DVEW.queues.build.chunk.run();
    DVEW.queues.build.chunk.onDone(this.__queueId, onDone);
   },
   async runAndAwait() {
    await DVEW.queues.build.chunk.runAndAwait();
   },
  },
 };
 flow = {
  update: {
   __queueId: "main",
   add(x: number, y: number, z: number) {
    DVEW.queues.flow.update.add([x, y, z]);
   },
   run(onDone: Function) {
    DVEW.queues.flow.update.run();
    DVEW.queues.flow.update.onDone(this.__queueId, onDone);
   },
   async runAndAwait() {
    await DVEW.queues.flow.update.runAndAwait();
   },
  },
  remove: {
   __queueId: "main",
   add(x: number, y: number, z: number) {
    DVEW.queues.flow.remove.add([x, y, z]);
   },
   run(onDone: Function) {
    DVEW.queues.flow.remove.run();
    DVEW.queues.flow.remove.onDone(this.__queueId, onDone);
   },
   async runAndAwait() {
    await DVEW.queues.flow.remove.runAndAwait();
   },
  },
 };
 light = {
  rgb: {
   update: {
    __queueId: "main",
    add(x: number, y: number, z: number) {
     DVEW.queues.rgb.update.add([x, y, z]);
    },
    run(onDone: Function) {
     DVEW.queues.rgb.update.run();
     DVEW.queues.rgb.update.onDone(this.__queueId, onDone);
    },
    async runAndAwait() {
     await DVEW.queues.rgb.update.runAndAwait();
    },
   },
   remove: {
    __queueId: "main",
    add(x: number, y: number, z: number) {
     DVEW.queues.rgb.remove.add([x, y, z]);
    },
    run(onDone: Function) {
     DVEW.queues.rgb.remove.run();
     DVEW.queues.rgb.remove.onDone(this.__queueId, onDone);
    },
    async runAndAwait() {
     await DVEW.queues.rgb.remove.runAndAwait();
    },
   },
  },
  sun: {
   update: {
    __queueId: "main",
    add(x: number, y: number, z: number) {
     DVEW.queues.sun.update.add([x, y, z]);
    },
    run(onDone: Function) {
     DVEW.queues.sun.update.run();
     DVEW.queues.sun.update.onDone(this.__queueId, onDone);
    },
    async runAndAwait() {
     await DVEW.queues.sun.update.runAndAwait();
    },
   },
   remove: {
    __queueId: "main",
    add(x: number, y: number, z: number) {
     DVEW.queues.sun.remove.add([x, y, z]);
    },
    run(onDone: Function) {
     DVEW.queues.sun.remove.run();
     DVEW.queues.sun.remove.onDone(this.__queueId, onDone);
    },
    async runAndAwait() {
     await DVEW.queues.sun.remove.runAndAwait();
    },
   },
  },
  worldSun: {
   __queueId: "main",
   add(x: number, z: number, y: number = 0) {
    DVEW.queues.worldSun.add(x, z);
   },
   async runAndAwait() {
    await DVEW.queues.worldSun.run();
   },
  },
 };
}

export const TasksTool = function () {
 return new TasksBase();
};
