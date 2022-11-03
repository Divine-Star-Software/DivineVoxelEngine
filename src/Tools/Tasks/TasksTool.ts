import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { ConstructorQueues as CQ } from "../../Common/Queues/ConstructorQueues.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
class TasksBase {
 _data = {
  dimension: "main",
  queue: "main",
 };

 _thread = "";

 constructor() {
  this._thread = ThreadComm.threadName;
  this.build.chunk._s = this;
  this.light.rgb.update._s = this;
  this.light.rgb.remove._s = this;
  this.light.sun.update._s = this;
  this.light.sun.remove._s = this;
  this.flow.update._s = this;
  this.flow.remove._s = this;
  this.light.worldSun._s = this;
 }

 setFocalPoint(
  x: number,
  y: number,
  z: number,
  dimension = this._data.dimension
 ) {
  const queueKey = `${dimension}-${WorldBounds.getRegionKeyFromPosition(
   x,
   y,
   z
  )}`;
  CQ.addQueue(queueKey);
  this._data.queue = queueKey;
 }

 

 build = {
  chunk: {
   _s: <TasksBase>{},
   __queueId: "main",
   add(x: number, y: number, z: number) {
    CQ.build.chunk.add(
     [this._s._data.dimension, x, y, z, 1],
     this._s._data.queue
    );
   },
   run(onDone: Function) {
    CQ.build.chunk.run(this._s._data.queue);
    CQ.build.chunk.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.build.chunk.runAndAwait(this._s._data.queue);
   },
  },
 };
 flow = {
  update: {
   _s: <TasksBase>{},
   __queueId: "main",
   add(x: number, y: number, z: number) {
    CQ.flow.update.add(
     [this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread],
     this._s._data.queue
    );
   },
   run(onDone: Function) {
    CQ.flow.update.run(this._s._data.queue);
    CQ.flow.update.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.flow.update.runAndAwait(this._s._data.queue);
   },
  },
  remove: {
   _s: <TasksBase>{},
   __queueId: "main",
   add(x: number, y: number, z: number) {
    CQ.flow.remove.add(
     [this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread],
     this._s._data.queue
    );
   },
   run(onDone: Function) {
    CQ.flow.remove.run(this._s._data.queue);
    CQ.flow.remove.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.flow.remove.runAndAwait(this._s._data.queue);
   },
  },
 };
 light = {
  rgb: {
   update: {
    _s: <TasksBase>{},
    __queueId: "main",
    add(x: number, y: number, z: number, queue: string | null = null) {
     queue = queue ? queue : this._s._data.queue;
     CQ.rgb.update.add(
      [this._s._data.dimension, x, y, z, queue, this._s._thread],
      queue
     );
    },
    run(onDone: Function) {
     CQ.rgb.update.run(this._s._data.queue);
     CQ.rgb.update.onDone(this._s._data.queue, onDone);
    },
    async runAndAwait() {
     await CQ.rgb.update.runAndAwait(this._s._data.queue);
    },
   },
   remove: {
    _s: <TasksBase>{},
    __queueId: "main",
    add(x: number, y: number, z: number, queue: string | null = null) {
     queue = queue ? queue : this._s._data.queue;
     CQ.rgb.remove.add(
      [this._s._data.dimension, x, y, z, queue, this._s._thread],
      queue
     );
    },
    run(onDone: Function) {
     CQ.rgb.remove.run(this._s._data.queue);
     CQ.rgb.remove.onDone(this._s._data.queue, onDone);
    },
    async runAndAwait() {
     await CQ.rgb.remove.runAndAwait(this._s._data.queue);
    },
   },
  },
  sun: {
   update: {
    _s: <TasksBase>{},
    __queueId: "main",
    add(x: number, y: number, z: number) {
     CQ.sun.update.add(
      [this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread],
      this._s._data.queue
     );
    },
    run(onDone: Function) {
     CQ.sun.update.run(this._s._data.queue);
     CQ.sun.update.onDone(this._s._data.queue, onDone);
    },
    async runAndAwait() {
     await CQ.sun.update.runAndAwait(this._s._data.queue);
    },
   },
   remove: {
    _s: <TasksBase>{},
    __queueId: "main",
    add(x: number, y: number, z: number) {
     CQ.sun.remove.add(
      [this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread],
      this._s._data.queue
     );
    },
    run(onDone: Function) {
     CQ.sun.remove.run(this._s._data.queue);
     CQ.sun.remove.onDone(this._s._data.queue, onDone);
    },
    async runAndAwait() {
     await CQ.sun.remove.runAndAwait(this._s._data.queue);
    },
   },
  },
  worldSun: {
   _s: <TasksBase>{},
   __queueId: "main",
   add(x: number, z: number, y: number = 0) {
    CQ.worldSun.add(x, z, this._s._data.queue);
   },
   async runAndAwait() {
    await CQ.worldSun.run();
   },
  },
 };
}

export const TasksTool = function () {
 return new TasksBase();
};
