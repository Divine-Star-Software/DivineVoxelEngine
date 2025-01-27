import { Thread, ThreadPool } from "@amodx/threads/";
import {
  ExplosionTasks,
  GenerateTasks,
  VoxelUpdateTasks,
} from "../../Tasks/Tasks.types";
import { LocationData } from "../../Math";
import { TasksIds } from "../../Tasks/TasksIds.js";

export type TaskRunModes = "async" | "sync";

class TaskQueue<Data extends any = any, ReturnData extends any = void> {
  private _queue: Data[] = [];

  constructor(private _task: TaskToolTask<Data, ReturnData>) {}
  add(data: Data) {
    this._queue.push(data);
  }

  clear() {
    this._queue.length = 0;
  }

  run() {
    return new Promise((resolve) => {
      let waitingFor = 0;
      const onDone = () => {
        waitingFor--;
        if (waitingFor <= 0) resolve(true);
      };
      while (this._queue.length) {
        const data = this._queue.shift()!;
        waitingFor++;
        this._task.run(data, null, onDone);
      }
    });
  }
}

export class TaskToolTask<
  Data extends any = any,
  ReturnData extends any = void,
> {
  private _count = 0;
  _threads: Thread[];
  constructor(
    public id: string | number,
    threads: Thread | ThreadPool
  ) {
    if (threads instanceof Thread) {
      this._threads = [threads];
    } else {
      this._threads = [...threads.getThreads()];
    }
  }

  run(
    data: Data,
    transfer?: any[] | null,
    onDone?: (returnData: ReturnData) => void | null
  ) {
    const thread = this._threads[this._count];
    thread.runTask(this.id, data, transfer, onDone);
    this._count++;
    if (this._count >= this._threads.length) this._count = 0;
  }

  runAsync(data: Data, transfer?: any[] | null): Promise<ReturnData> {
    return new Promise<ReturnData>((resolve) => {
      this.run(data, transfer, resolve);
    });
  }

  createQueue() {
    return new TaskQueue(this);
  }
}

class VoxelTasks {
  update: TaskToolTask<VoxelUpdateTasks>;
  paint: TaskToolTask<VoxelUpdateTasks>;
  erease: TaskToolTask<LocationData>;
  constructor(public tool: TaskTool) {
    this.update = new TaskToolTask(TasksIds.VoxelUpdate, tool.threads);
    this.paint = new TaskToolTask(TasksIds.VoxelPaint, tool.threads);
    this.erease = new TaskToolTask(TasksIds.VoxelErease, tool.threads);
  }
}

class BuildTask {
  chunk: TaskToolTask<LocationData>;
  column: TaskToolTask<LocationData>;
  constructor(public tool: TaskTool) {
    this.chunk = new TaskToolTask(TasksIds.BuildChunk, tool.threads);
    this.column = new TaskToolTask(TasksIds.BuildColumn, tool.threads);
  }
}
export class TaskTool {
  voxel: VoxelTasks;
  build: BuildTask;
  explosion: TaskToolTask<ExplosionTasks>;
  anaylzer: TaskToolTask<LocationData>;
  propagation: TaskToolTask<LocationData>;
  generate: TaskToolTask<GenerateTasks>;
  decorate: TaskToolTask<GenerateTasks>;
  worldSun: TaskToolTask<LocationData>;

  constructor(public threads: Thread | ThreadPool) {
    this.voxel = new VoxelTasks(this);
    this.build = new BuildTask(this);

    this.explosion = new TaskToolTask(TasksIds.Explosion, threads);
    this.propagation = new TaskToolTask(TasksIds.Propagation, threads);
    this.generate = new TaskToolTask(TasksIds.Generate, threads);
    this.decorate = new TaskToolTask(TasksIds.Decorate, threads);
    this.worldSun = new TaskToolTask(TasksIds.WorldSun, threads);
  }
}
