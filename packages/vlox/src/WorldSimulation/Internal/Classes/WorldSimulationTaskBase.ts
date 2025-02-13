import { LocationData } from "../../../Math/index.js";
import { WorldSimulationDimensions } from "../WorldSimulationDimensions.js";
import { DimensionSegment } from "./DimensionSegment.js";
import { TaskSegment } from "./TaskSegment.js";

export type WorldSimulationTaskBaseData = {
  id: string;
  propagationBlocking?: boolean;
  sort?: boolean;
  predicate?(location: LocationData, dimension: DimensionSegment): boolean;
  checkDone?(location: LocationData): boolean;
  run(
    dimension: DimensionSegment,
    location: LocationData,
    taskId: number,
    task: TaskSegment
  ): void;
};

export class WorldSimulationTaskBase {
  constructor(public data: WorldSimulationTaskBaseData) {}

  add(dimensionId: number, x: number, y: number, z: number) {
    const dimension = WorldSimulationDimensions.getDimension(dimensionId);
    const task = dimension.getTask(this.data.id);

    if (task.has(dimensionId, x, y, z)) return;
    if (this.data.propagationBlocking && dimension.inProgress.has(x, y, z))
      return;

    task.add(dimensionId, x, y, z);
  }

  remove(dimensionId: number, x: number, y: number, z: number) {
    const dimension = WorldSimulationDimensions.getDimension(dimensionId);
    const task = dimension.getTask(this.data.id);
    task.remove(dimensionId, x, y, z);
    if (this.data.propagationBlocking) {
      dimension.inProgress.remove(x, y, z);
    }
  }

  cancelAll(dimensionId: number | null = null) {
    if (dimensionId) {
      const dimension = WorldSimulationDimensions.getDimension(dimensionId);
      const task = dimension.getTask(this.data.id);
      task.clear();
    } else {
      for (const [key, dimension] of WorldSimulationDimensions._dimensions) {
        dimension.clearAllTasks();
      }
    }
  }

  runTask(max = 1000) {
    for (const [key, dimension] of WorldSimulationDimensions._dimensions) {
      const task = dimension.getTask(this.data.id);
      if (this.data.checkDone) {
        for (const [id, taskData] of task._task) {
          if (this.data.checkDone(taskData)) {
            task.completeTask(id);
          }
        }
      }

      if (task.waitingFor < 0) task.waitingFor = 0;
      if (task.waitingFor >= max) continue;

      if (this.data.sort) {
        const updatePosition = dimension.getUpdatePosition();
        task.sort(updatePosition.x, updatePosition.y, updatePosition.z);
      }

      for (const location of task.run()) {
        if (task.waitingFor > max) break;
        const [, x, y, z] = location;
        if (this.data.predicate && !this.data.predicate(location, dimension)) {
          continue;
        }
        const taskId = task.addTask(dimension.id, x, y, z);
    
        this.data.run(dimension, location, taskId, task);
      }
    }
  }
}
