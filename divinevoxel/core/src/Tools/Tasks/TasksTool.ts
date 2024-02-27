import { ConstructorQueues as CQ } from "../../Common/Queues/ConstructorQueues.js";
import { ThreadComm } from "@divinestar/threads/";
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
} from "Types/Tasks/Tasks.types.js";

import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { LocationData } from "@divinestar/voxelspaces";
import type { RawVoxelData } from "Types/Data/Voxels/Voxel.types.js";

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
     ConstructorTasks.VoxelUpdate,
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
     ConstructorTasks.VoxelErease,
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
     ConstructorTasks.VoxelPaint,
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
      ConstructorTasks.BuildChunk,
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
      ConstructorTasks.BuildColumn,
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
    ConstructorTasks.Explosion,
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
     ConstructorTasks.AnalyzerUpdate,
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
     ConstructorTasks.AnalyzerPropagation,
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
     ConstructorTasks.Generate,
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
     ConstructorTasks.Decorate,
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
     ConstructorTasks.WorldSun,
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
