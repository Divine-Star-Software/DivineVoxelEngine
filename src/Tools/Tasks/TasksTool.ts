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
   run: (
    location: LocationData,
    raw: RawVoxelData,
    onDone: (data: any) => void,
    mode: TaskRunModes = "sync"
   ) => {
    CCM.runPromiseTasks<VoxelUpdateTasks>(
     ConstructorTasks.voxelUpdate,
     [location, raw, this._data.queue, this._thread],
     [],
     onDone,
     mode == "sync" ? 0 : undefined
    );
   },
  },
  erase: {
   run: (
    location: LocationData,
    onDone: (data: any) => void,
    mode: TaskRunModes = "sync"
   ) => {
    CCM.runPromiseTasks<UpdateTasks>(
     ConstructorTasks.voxelErease,
     [location, this._data.queue, this._thread],
     [],
     onDone,
     mode == "sync" ? 0 : undefined
    );
   },
  },
  paint: {
   run: (
    location: LocationData,
    raw: RawVoxelData,
    onDone: (data: any) => void,
    mode: TaskRunModes = "sync"
   ) => {
    CCM.runPromiseTasks<VoxelUpdateTasks>(
     ConstructorTasks.voxelPaint,
     [location, raw, this._data.queue, this._thread],
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
    run: (buildTasks: BuildTasks, onDone: (data: any) => void) => {
     CCM.runPromiseTasks<PriorityTask<BuildTasks>>(
      ConstructorTasks.buildChunk,
      {
       data: buildTasks,
       priority: this._priority,
      },
      [],
      onDone,
      undefined,
      0
     );
    },
   },
   queued: {
    add: (location: LocationData) => {
     CQ.build.chunk.add(
      {
       data: [location, 1],
       priority: this._priority,
      },
      this._data.queue
     );
    },
    run: (onDone: Function) => {
     CQ.build.chunk.run(this._data.queue);
     CQ.build.chunk.onDone(this._data.queue, onDone);
    },
    runAndAwait: async () => {
     await CQ.build.chunk.runAndAwait(this._data.queue);
    },
   },
  },
  column: {
   queued: {},
   deferred: {
    run: (location: LocationData, onDone: (data: any) => void) => {
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
  run: (
   location: LocationData,
   radius: number,
   onDone: (data: any) => void
  ) => {
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
   run: (location: LocationData, onDone: (data: any) => void) => {
    CCM.runPromiseTasks<UpdateTasksO>(
     ConstructorTasks.analyzerUpdate,
     [location, this._data.queue, this._thread],
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
   run: (location: LocationData, onDone: (data: any) => void) => {
    CCM.runPromiseTasks<UpdateTasksO>(
     ConstructorTasks.analyzerPropagation,
     [location, this._data.queue, this._thread],
     [],
     onDone,
     undefined,
     0
    );
   },
  },
  queued: {
   add: (location: LocationData) => {
    CQ.propagation.add(
     [location, this._data.queue, this._thread],
     this._data.queue
    );
   },
   run: (onDone: Function) => {
    CQ.propagation.run(this._data.queue);
    CQ.propagation.onDone(this._data.queue, onDone);
   },
   runAndAwait: async () => {
    await CQ.propagation.runAndAwait(this._data.queue);
   },
  },
 };
 generate = {
  deferred: {
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
   add: (data: GenerateTasks) => {
    CQ.generate.add(data, this._data.queue);
   },
   run: (onDone: Function) => {
    CQ.generate.run(this._data.queue);
    CQ.generate.onDone(this._data.queue, onDone);
   },
   runAndAwait: async () => {
    await CQ.generate.runAndAwait(this._data.queue);
   },
  },
 };
 decorate = {
  deferred: {
   run: (location: LocationData, data: any, onDone: (data: any) => void) => {
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
   add: async (data: GenerateTasks) => {
    CQ.decorate.add(data, this._data.queue);
   },
   run: (onDone: Function) => {
    CQ.decorate.run(this._data.queue);
    CQ.decorate.onDone(this._data.queue, onDone);
   },
   runAndAwait: async () => {
    await CQ.decorate.runAndAwait(this._data.queue);
   },
  },
 };
 worldSun = {
  deferred: {
   run: (location: LocationData, onDone: (data: any) => void) => {
    CCM.runPromiseTasks<WorldSunTask>(
     ConstructorTasks.worldSun,
     [location, this._thread],
     [],
     onDone,
     undefined,
     0
    );
   },
  },
  queued: {
   add: (location: LocationData) => {
    CQ.worldSun.add(
     [location, this._data.queue, this._thread],
     this._data.queue
    );
    WorldRegister.column.fill(location);
   },
   run: (onDone: Function) => {
    CQ.worldSun.run(this._data.queue);
    CQ.worldSun.onDone(this._data.queue, onDone);
   },
   runAndAwait: async () => {
    await CQ.worldSun.runAndAwait(this._data.queue);
   },
  },
 };
}
