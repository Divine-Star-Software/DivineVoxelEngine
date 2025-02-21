import { BinaryTaskType, Thread, ThreadPool, Threads } from "@amodx/threads/";
import { ExplosionTasks, VoxelUpdateTasks } from "../../Tasks/Tasks.types";
import { LocationData } from "../../Math";
import { TasksIds } from "../../Tasks/TasksIds.js";
import { setLocationData } from "../../Util/LocationData";

export type TaskRunModes = "async" | "sync";
interface ITask<Data> {
  run(data: Data, transfer: any[] | null, onDone?: (data: any) => void): void;
}
class TaskQueue<Data extends any = any, ReturnData extends any = void> {
  private _queue: Data[] = [];

  constructor(private _task: ITask<Data>) {}
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
export class LocationTaskToolTask implements ITask<LocationData> {
  private _count = 0;
  _threads: Thread[];
  constructor(
    public id: string,
    threads: Thread | ThreadPool
  ) {
    if (threads instanceof Thread) {
      this._threads = [threads];
    } else {
      this._threads = [...threads.getThreads()];
    }
  }

  run(
    location: LocationData,
    transfer?: any[] | null,
    onDone?: (data: any) => void
  ) {
    const thread = this._threads[this._count];

    const view = Threads.createBinaryTask(16);

    setLocationData(view, location);

    thread.runBinaryTask(this.id, view, onDone);
    this._count++;
    if (this._count >= this._threads.length) this._count = 0;
  }

  runAsync(location: LocationData): Promise<void> {
    return new Promise<void>((resolve) => {
      this.run(location, null, resolve);
    });
  }

  createQueue() {
    return new TaskQueue<LocationData>(this);
  }
}
export class TaskToolTask<Data extends any = any, ReturnData extends any = void>
  implements ITask<Data>
{
  private _count = 0;
  _threads: Thread[];
  constructor(
    public id: string,
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
  explosion: TaskToolTask<ExplosionTasks>;

  constructor(public tool: TaskTool) {
    this.explosion = new TaskToolTask(TasksIds.Explosion, tool.generators);
    this.update = new TaskToolTask(TasksIds.VoxelUpdate, tool.generators);
    this.paint = new TaskToolTask(TasksIds.VoxelPaint, tool.generators);
    this.erease = new TaskToolTask(TasksIds.VoxelErase, tool.generators);
  }
}

class BuildTask {
  section: LocationTaskToolTask;
  sector: LocationTaskToolTask;
  constructor(public tool: TaskTool) {
    this.section = new LocationTaskToolTask(
      TasksIds.BuildSection,
      tool.meshers
    );
    this.sector = new LocationTaskToolTask(TasksIds.BuildSector, tool.meshers);
  }
}

class SimulationTasks {
  logic: LocationTaskToolTask;
  propagation: LocationTaskToolTask;
  constructor(public tool: TaskTool) {
    this.logic = new LocationTaskToolTask(
      TasksIds.LogicUpdate,
      tool.generators
    );
    this.propagation = new LocationTaskToolTask(
      TasksIds.PropagationUpdate,
      tool.generators
    );
  }
}

class GenerationTasks {
  propagation: LocationTaskToolTask;
  generate: LocationTaskToolTask;
  decorate: LocationTaskToolTask;
  worldSun: LocationTaskToolTask;
  constructor(public tool: TaskTool) {
    this.propagation = new LocationTaskToolTask(
      TasksIds.WorldPropagation,
      tool.generators
    );
    this.generate = new LocationTaskToolTask(
      TasksIds.Generate,
      tool.generators
    );
    this.decorate = new LocationTaskToolTask(
      TasksIds.Decorate,
      tool.generators
    );
    this.worldSun = new LocationTaskToolTask(
      TasksIds.WorldSun,
      tool.generators
    );
  }
}

export class TaskTool {
  voxel: VoxelTasks;
  build: BuildTask;
  generation: GenerationTasks;
  simulation: SimulationTasks;

  constructor(
    public meshers: Thread | ThreadPool,
    public generators: Thread | ThreadPool
  ) {
    this.voxel = new VoxelTasks(this);
    this.build = new BuildTask(this);
    this.generation = new GenerationTasks(this);
    this.simulation = new SimulationTasks(this);
  }
}
