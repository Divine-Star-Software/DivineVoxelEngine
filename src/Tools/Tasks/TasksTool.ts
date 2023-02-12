import { ConstructorQueues as CQ } from "../../Common/Queues/ConstructorQueues.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../World/Threads/Threads.js";
import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import {
 BuildTasks,
 GenerateTasks,
 PaintTasks,
 Priorities,
 PriorityTask,
 UpdateTasks,
 UpdateTasksO,
 WorldSunTask,
} from "Meta/Tasks/Tasks.types.js";

import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import type { RawVoxelData } from "Meta/Data/Voxels/Voxel.types.js";

class TasksBase {
 _data = {
  dimension: "main",
  queue: "main",
 };

 _thread = "";
 _priority: Priorities = 0;
 constructor() {
  this.build.chunk.async._s = this;
  this.build.chunk.deferred._s = this;
  this.build.column.deferred._s = this;
  this.light.rgb.update._s = this;
  this.light.rgb.remove._s = this;
  this.light.sun.update._s = this;
  this.light.sun.remove._s = this;
  this.light.worldSun._s = this;
  this.light.worldSun.deferred._s = this;
  this.flow.update._s = this;
  this.flow.remove._s = this;
  this.explosion.run._s = this;
  this.voxelUpdate.erase.async._s = this;
  this.voxelUpdate.erase.deferred._s = this;
  this.voxelUpdate.paint.async._s = this;
  this.voxelUpdate.paint.deferred._s = this;
  this.generate.deferred._s = this;
  this.generate.async._s = this;
  this.anaylzer.propagation._s = this;
  this.anaylzer.update._s = this;
  this._thread = ThreadComm.threadName;
 }

 setPriority(priority: Priorities) {
  this._priority = priority;
  return this;
 }

 setFocalPoint(location: LocationData) {
  const [dimesnion, x, y, z] = location;
  const queueKey = `${dimesnion}-${WorldSpaces.region.getKeyXYZ(x, y, z)}`;
  CQ.addQueue(queueKey);
  this._data.queue = queueKey;
  this._thread = ThreadComm.threadName;
  return this;
 }

 generate = {
  async: {
   _s: <TasksBase>{},
   add(x: number, y: number, z: number, data: any = []) {
    CQ.generate.add(
     [[this._s._data.dimension, x, y, z], data],
     this._s._data.queue
    );
   },
   run(onDone: Function) {
    CQ.generate.run(this._s._data.queue);
    CQ.generate.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.generate.runAndAwait(this._s._data.queue);
   },
  },
  deferred: {
   _s: <TasksBase>{},
   run(
    x: number,
    y: number,
    z: number,
    data: any,
    onDone: (data: any) => void
   ) {
    const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
    CCM.runPromiseTasks<GenerateTasks>(
     ConstructorTasks.generate,
     requestsKey,
     onDone,
     [[this._s._data.dimension, x, y, z], data]
    );
   },
  },
 };

 voxelUpdate = {
  erase: {
   deferred: {
    _s: <TasksBase>{},
    run(x: number, y: number, z: number, onDone: (data: any) => void) {
     const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
     CCM.runPromiseTasks<UpdateTasks>(
      ConstructorTasks.voxelErease,
      requestsKey,
      onDone,
      [[this._s._data.dimension, x, y, z], this._s._data.queue, this._s._thread]
     );
    },
   },
   async: {
    _s: <TasksBase>{},
    add(x: number, y: number, z: number) {
     CQ.voxelUpdate.erase.add(
      [
       [this._s._data.dimension, x, y, z],
       this._s._data.queue,
       this._s._thread,
      ],
      this._s._data.queue
     );
    },
    run(onDone: Function) {
     CQ.voxelUpdate.erase.run(this._s._data.queue);
     CQ.voxelUpdate.erase.onDone(this._s._data.queue, onDone);
    },
    async runAndAwait() {
     await CQ.voxelUpdate.erase.runAndAwait(this._s._data.queue);
    },
   },
  },
  paint: {
   deferred: {
    _s: <TasksBase>{},
    run(
     x: number,
     y: number,
     z: number,
     raw: RawVoxelData,
     onDone: (data: any) => void
    ) {
     const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
     CCM.runPromiseTasks<PaintTasks>(
      ConstructorTasks.voxelPaint,
      requestsKey,
      onDone,
      [
       [this._s._data.dimension, x, y, z],
       raw,
       this._s._data.queue,
       this._s._thread,
      ]
     );
    },
   },
   async: {
    _s: <TasksBase>{},
    add(x: number, y: number, z: number, raw: RawVoxelData) {
     CQ.voxelUpdate.paint.add(
      [
       [this._s._data.dimension, x, y, z],
       raw,
       this._s._data.queue,
       this._s._thread,
      ],
      this._s._data.queue
     );
    },
    run(onDone: Function) {
     CQ.voxelUpdate.paint.run(this._s._data.queue);
     CQ.voxelUpdate.paint.onDone(this._s._data.queue, onDone);
    },
    async runAndAwait() {
     await CQ.voxelUpdate.paint.runAndAwait(this._s._data.queue);
    },
   },
  },
 };
 build = {
  chunk: {
   deferred: {
    _s: <TasksBase>{},
    run(buildTasks: BuildTasks, onDone: (data: any) => void) {
     const requestsKey = buildTasks.toString();
     CCM.runPromiseTasks<PriorityTask<BuildTasks>>(
      ConstructorTasks.buildChunk,
      requestsKey,
      onDone,
      {
       data: buildTasks,
       priority: this._s._priority,
      }
     );
    },
   },

   async: {
    _s: <TasksBase>{},
    add(x: number, y: number, z: number) {
     CQ.build.chunk.add(
      {
       data: [[this._s._data.dimension, x, y, z], 1],
       priority: this._s._priority,
      },
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
  },
  column: {
   async: {},
   deferred: {
    _s: <TasksBase>{},
    run(x: number, y: number, z: number, onDone: (data: any) => void) {
     const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
     CCM.runPromiseTasks<BuildTasks>(
      ConstructorTasks.buildColumn,
      requestsKey,
      onDone,
      [[this._s._data.dimension, x, y, z], 1]
     );
    },
   },
  },
 };
 explosion = {
  run: {
   _s: <TasksBase>{},
   add(x: number, y: number, z: number, radius: number) {
    CQ.explosion.run.add(
     [
      [this._s._data.dimension, x, y, z],
      radius,
      this._s._data.queue,
      this._s._thread,
     ],
     this._s._data.queue
    );
   },
   run(onDone: Function) {
    CQ.explosion.run.run(this._s._data.queue);
    CQ.explosion.run.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.explosion.run.runAndAwait(this._s._data.queue);
   },
  },
 };
 flow = {
  update: {
   _s: <TasksBase>{},
   add(x: number, y: number, z: number) {
    CQ.flow.update.add(
     [[this._s._data.dimension, x, y, z], this._s._data.queue, this._s._thread],
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
   add(x: number, y: number, z: number) {
    CQ.flow.remove.add(
     [[this._s._data.dimension, x, y, z], this._s._data.queue, this._s._thread],
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
 anaylzer = {
  propagation: {
   _s: <TasksBase>{},
   run(x: number, y: number, z: number, onDone: (data: any) => void) {
    const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
    CCM.runPromiseTasks<UpdateTasksO>(
     ConstructorTasks.analyzerPropagation,
     requestsKey,
     onDone,
     [[this._s._data.dimension, x, y, z], this._s._data.queue, this._s._thread]
    );
   },
  },
  update: {
   _s: <TasksBase>{},
   run(x: number, y: number, z: number, onDone: (data: any) => void) {
    const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
    CCM.runPromiseTasks<UpdateTasksO>(
     ConstructorTasks.analyzerUpdate,
     requestsKey,
     onDone,
     [[this._s._data.dimension, x, y, z], this._s._data.queue, this._s._thread]
    );
   },
  },
 };
 light = {
  rgb: {
   update: {
    _s: <TasksBase>{},
    add(x: number, y: number, z: number, queue: string | null = null) {
     queue = queue ? queue : this._s._data.queue;
     CQ.rgb.update.add(
      [[this._s._data.dimension, x, y, z], queue, this._s._thread],
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
    add(x: number, y: number, z: number, queue: string | null = null) {
     queue = queue ? queue : this._s._data.queue;
     CQ.rgb.remove.add(
      [[this._s._data.dimension, x, y, z], queue, this._s._thread],
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
    add(x: number, y: number, z: number) {
     CQ.sun.update.add(
      [
       [this._s._data.dimension, x, y, z],
       this._s._data.queue,
       this._s._thread,
      ],
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
    add(x: number, y: number, z: number) {
     CQ.sun.remove.add(
      [
       [this._s._data.dimension, x, y, z],
       this._s._data.queue,
       this._s._thread,
      ],
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
   deferred: {
    _s: <TasksBase>{},
    run(x: number, y: number, z: number, onDone: (data: any) => void) {
     const requestsKey = `${this._s._data.dimension}-${x}-${y}-${z}}`;
     CCM.runPromiseTasks<WorldSunTask>(
      ConstructorTasks.worldSun,
      requestsKey,
      onDone,
      [[this._s._data.dimension, x, y, z], this._s._thread]
     );
    },
   },
   add(x: number, z: number, y: number = 0) {
    CQ.worldSun.add([
     [this._s._data.dimension, x, y, z],
     this._s._data.queue,
     this._s._thread,
    ]);
    WorldRegister.column.fill([this._s._data.dimension, x, y, z]);
   },
   run(onDone: Function) {
    CQ.worldSun.run(this._s._data.queue);
    CQ.worldSun.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.worldSun.runAndAwait();
   },
  },
 };
}

export const TasksTool = function () {
 return new TasksBase();
};
