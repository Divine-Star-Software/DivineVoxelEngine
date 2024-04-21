import { ThreadComm } from "@divinestar/threads/";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import {
  BuildTasks,
  ExplosionTasks,
  GenerateTasks,
  VoxelUpdateTasks,
  Priorities,
  PriorityTask,
  UpdateTasks,
  AnaylzerTask,
  WorldSunTask,
} from "../../../Types/Tasks.types.js";

import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { LocationData } from "@divinevoxel/core/Math";
import type { RawVoxelData } from "@divinevoxel/core/Types/Voxel.types.js";

import { ConstructorRemoteThreadTasks } from "../../../Contexts/Common/ConstructorRemoteThreadTasks.js";
import { DVEFWorldCore } from "../../../Contexts/World/DVEFWorldCore.js";
import { ConstructorTasksIds } from "../../../Contexts/Common/ConstructorTasksIds.js";

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
    DVEFWorldCore.instance.queues.addQueue(queueKey);
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
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<VoxelUpdateTasks>(
          ConstructorTasksIds.VoxelUpdate,
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
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<UpdateTasks>(
          ConstructorTasksIds.VoxelErease,
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
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<VoxelUpdateTasks>(
          ConstructorTasksIds.VoxelPaint,
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
          DVEFWorldCore.instance.threads.constructors.runPromiseTasks<
            PriorityTask<BuildTasks>
          >(
            ConstructorTasksIds.BuildChunk,
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
          DVEFWorldCore.instance.queues.buildChunk.add(
            {
              data: [location, 1],
              priority: this._priority,
            },
            this._data.queue
          );
        },
        run: (onDone: Function) => {
          DVEFWorldCore.instance.queues.buildChunk.run(this._data.queue);
          DVEFWorldCore.instance.queues.buildChunk.onDone(
            this._data.queue,
            onDone
          );
        },
        runAndAwait: async () => {
          await DVEFWorldCore.instance.queues.buildChunk.runAndAwait(
            this._data.queue
          );
        },
      },
    },
    column: {
      queued: {},
      deferred: {
        run: (location: LocationData, onDone: (data: any) => void) => {
          DVEFWorldCore.instance.threads.constructors.runPromiseTasks<BuildTasks>(
            ConstructorTasksIds.BuildColumn,
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
      DVEFWorldCore.instance.threads.constructors.runPromiseTasks<ExplosionTasks>(
        ConstructorTasksIds.Explosion,
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
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<AnaylzerTask>(
          ConstructorTasksIds.AnalyzerUpdate,
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
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<AnaylzerTask>(
          ConstructorTasksIds.AnalyzerPropagation,
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
        DVEFWorldCore.instance.queues.propagation.add(
          [location, this._data.queue, this._thread],
          this._data.queue
        );
      },
      run: (onDone: Function) => {
        DVEFWorldCore.instance.queues.propagation.run(this._data.queue);
        DVEFWorldCore.instance.queues.propagation.onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEFWorldCore.instance.queues.propagation.runAndAwait(this._data.queue);
      },
    },
  };
  generate = {
    deferred: {
      run(location: LocationData, data: any, onDone: (data: any) => void) {
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<GenerateTasks>(
          ConstructorTasksIds.Generate,
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
        DVEFWorldCore.instance.queues.generate.add(data, this._data.queue);
      },
      run: (onDone: Function) => {
        DVEFWorldCore.instance.queues.generate.run(this._data.queue);
        DVEFWorldCore.instance.queues.generate.onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEFWorldCore.instance.queues.generate.runAndAwait(this._data.queue);
      },
    },
  };
  decorate = {
    deferred: {
      run: (location: LocationData, data: any, onDone: (data: any) => void) => {
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<GenerateTasks>(
          ConstructorTasksIds.Decorate,
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
        DVEFWorldCore.instance.queues.decorate.add(data, this._data.queue);
      },
      run: (onDone: Function) => {
        DVEFWorldCore.instance.queues.decorate.run(this._data.queue);
        DVEFWorldCore.instance.queues.decorate.onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEFWorldCore.instance.queues.decorate.runAndAwait(this._data.queue);
      },
    },
  };
  worldSun = {
    deferred: {
      run: (location: LocationData, onDone: (data: any) => void) => {
        DVEFWorldCore.instance.threads.constructors.runPromiseTasks<WorldSunTask>(
          ConstructorTasksIds.WorldSun,
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
        DVEFWorldCore.instance.queues.worldSun.add(
          [location, this._data.queue, this._thread],
          this._data.queue
        );
        WorldRegister.instance.column.fill(location);
      },
      run: (onDone: Function) => {
        DVEFWorldCore.instance.queues.worldSun.run(this._data.queue);
        DVEFWorldCore.instance.queues.worldSun.onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEFWorldCore.instance.queues.worldSun.runAndAwait(this._data.queue);
      },
    },
  };
}

const tasks = new TaskTool();
const CommonTasks = {
  buildChunk: ThreadComm.registerTasks<PriorityTask<BuildTasks>>(
    ConstructorRemoteThreadTasks.buildChunk,
    (data) => {
      tasks.setPriority(data.priority);
      tasks.build.chunk.deferred.run(data.data, () => {});
    }
  ),
};
