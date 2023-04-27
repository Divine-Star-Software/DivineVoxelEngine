import { ConstructorQueues as CQ } from "../../Common/Queues/ConstructorQueues.js";
import { ThreadComm } from "threadcomm";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../World/Threads/WorldThreads.js";
import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import {
 BuildTasks,
 ExplosionTasks,
 GenerateTasks,
 VoxelUpdateTasks,
 Priorities,
 PriorityTask,
 UpdateTasks,
 UpdateTasksO,
 WorldSunTask,
} from "Meta/Tasks/Tasks.types.js";

import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { LocationData } from "voxelspaces";
import type { RawVoxelData } from "Meta/Data/Voxels/Voxel.types.js";

export type TaskRunModes = "async" | "sync";
export class TaskTool {
 _data = {
  dimension: "main",
  queue: "main",
 };

 _thread = "";
 _priority: Priorities = 0;
 constructor() {
  this.build.column.deferred._s = this;

  this.explosion._s = this;

  this.voxelUpdate.erase._s = this;
  this.voxelUpdate.paint._s = this;
  this.voxelUpdate.update._s = this;

  this.anaylzer.update._s = this;

  this.build.chunk.deferred._s = this;
  this.build.chunk.queued._s = this;

  this.worldSun.deferred._s = this;
  this.worldSun.queued._s = this;

  this.generate.deferred._s = this;
  this.generate.queued._s = this;

  this.propagation.deferred._s = this;
  this.propagation.queued._s = this;

  this.decorate.deferred._s = this;
  this.decorate.queued._s = this;

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

 voxelUpdate = {
  update: {
   _s: <TaskTool>{},
   run(
    location: LocationData,
    raw: RawVoxelData,
    onDone: (data: any) => void,
    mode: TaskRunModes = "sync"
   ) {
    CCM.runPromiseTasks<VoxelUpdateTasks>(
     ConstructorTasks.voxelUpdate,
     [location, raw, this._s._data.queue, this._s._thread],
     [],
     onDone,
     mode == "sync" ? 0 : undefined
    );
   },
  },
  erase: {
   _s: <TaskTool>{},
   run(
    location: LocationData,
    onDone: (data: any) => void,
    mode: TaskRunModes = "sync"
   ) {
    CCM.runPromiseTasks<UpdateTasks>(
     ConstructorTasks.voxelErease,
     [location, this._s._data.queue, this._s._thread],
     [],
     onDone,
     mode == "sync" ? 0 : undefined
    );
   },
  },
  paint: {
   _s: <TaskTool>{},
   run(
    location: LocationData,
    raw: RawVoxelData,
    onDone: (data: any) => void,
    mode: TaskRunModes = "sync"
   ) {
    CCM.runPromiseTasks<VoxelUpdateTasks>(
     ConstructorTasks.voxelPaint,
     [location, raw, this._s._data.queue, this._s._thread],
     [],
     onDone,
     mode == "sync" ? 0 : undefined
    );
   },
  },
 };
 build = {
  chunk: {
   deferred: {
    _s: <TaskTool>{},
    run(buildTasks: BuildTasks, onDone: (data: any) => void) {
     CCM.runPromiseTasks<PriorityTask<BuildTasks>>(
      ConstructorTasks.buildChunk,
      {
       data: buildTasks,
       priority: this._s._priority,
      },
      [],
      onDone,
      undefined,
      0
     );
    },
   },

   queued: {
    _s: <TaskTool>{},
    add(location: LocationData) {
     CQ.build.chunk.add(
      {
       data: [location, 1],
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
   queued: {},
   deferred: {
    _s: <TaskTool>{},
    run(location: LocationData, onDone: (data: any) => void) {
     CCM.runPromiseTasks<BuildTasks>(
      ConstructorTasks.buildColumn,
      [location, 1],
      [],
      onDone,
      undefined,
      0
     );
    },
   },
  },
 };
 explosion = {
  _s: <TaskTool>{},
  run(location: LocationData, radius: number, onDone: (data: any) => void) {
   CCM.runPromiseTasks<ExplosionTasks>(
    ConstructorTasks.explosion,
    [location, radius, "", ""],
    [],
    onDone,
    undefined,
    0
   );
  },
 };

 anaylzer = {
  update: {
   _s: <TaskTool>{},
   run(location: LocationData, onDone: (data: any) => void) {
    CCM.runPromiseTasks<UpdateTasksO>(
     ConstructorTasks.analyzerUpdate,
     [location, this._s._data.queue, this._s._thread],
     [],
     onDone,
     undefined,
     0
    );
   },
  },
 };

 propagation = {
  deferred: {
   _s: <TaskTool>{},
   run(location: LocationData, onDone: (data: any) => void) {
    CCM.runPromiseTasks<UpdateTasksO>(
     ConstructorTasks.analyzerPropagation,
     [location, this._s._data.queue, this._s._thread],
     [],
     onDone,
     undefined,
     0
    );
   },
  },
  queued: {
   _s: <TaskTool>{},
   add(location: LocationData) {
    CQ.propagation.add(
     [location, this._s._data.queue, this._s._thread],
     this._s._data.queue
    );
   },
   run(onDone: Function) {
    CQ.propagation.run(this._s._data.queue);
    CQ.propagation.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.propagation.runAndAwait(this._s._data.queue);
   },
  },
 };

 generate = {
  deferred: {
   _s: <TaskTool>{},
   run(location: LocationData, data: any, onDone: (data: any) => void) {
    CCM.runPromiseTasks<GenerateTasks>(
     ConstructorTasks.generate,
     [location, data],
     [],
     onDone,
     undefined,
     0
    );
   },
  },

  queued: {
   _s: <TaskTool>{},
   add(data: GenerateTasks) {
    CQ.generate.add(data, this._s._data.queue);
   },
   run(onDone: Function) {
    CQ.generate.run(this._s._data.queue);
    CQ.generate.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.generate.runAndAwait(this._s._data.queue);
   },
  },
 };

 decorate = {
  deferred: {
   _s: <TaskTool>{},
   run(location: LocationData, data: any, onDone: (data: any) => void) {
    CCM.runPromiseTasks<GenerateTasks>(
     ConstructorTasks.decorate,
     [location, data],
     [],
     onDone,
     undefined,
     0
    );
   },
  },

  queued: {
   _s: <TaskTool>{},
   add(data: GenerateTasks) {
    CQ.decorate.add(data, this._s._data.queue);
   },
   run(onDone: Function) {
    CQ.decorate.run(this._s._data.queue);
    CQ.decorate.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.decorate.runAndAwait(this._s._data.queue);
   },
  },
 };

 worldSun = {
  deferred: {
   _s: <TaskTool>{},
   run(location: LocationData, onDone: (data: any) => void) {
    CCM.runPromiseTasks<WorldSunTask>(
     ConstructorTasks.worldSun,
     [location, this._s._thread],
     [],
     onDone,
     undefined,
     0
    );
   },
  },
  queued: {
   _s: <TaskTool>{},
   add(location: LocationData) {
    CQ.worldSun.add(
     [location, this._s._data.queue, this._s._thread],
     this._s._data.queue
    );
    WorldRegister.column.fill(location);
   },
   run(onDone: Function) {
    CQ.worldSun.run(this._s._data.queue);
    CQ.worldSun.onDone(this._s._data.queue, onDone);
   },
   async runAndAwait() {
    await CQ.worldSun.runAndAwait(this._s._data.queue);
   },
  },
 };
}
