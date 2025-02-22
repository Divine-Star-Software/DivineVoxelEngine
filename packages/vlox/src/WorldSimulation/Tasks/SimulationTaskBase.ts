import { LocationData } from "../../Math/index.js";
import { WorldSimulationDimensions } from "../Internal/WorldSimulationDimensions.js"
import { DimensionSegment } from "../Dimensions/DimensionSegment.js";
import { TaskSegment } from "./TaskSegment.js";

export type SimulationTaskBaseData = {
  id: string;
  sort?: boolean;
  generationTask?: boolean;

  checkDone?(location: LocationData): boolean;
  run(
    dimension: DimensionSegment,
    location: LocationData,
    taskId: number,
    task: TaskSegment
  ): void;
};

export class SimulationTaskBase {
  constructor(public data: SimulationTaskBaseData) {}

  add(dimensionId: number, x: number, y: number, z: number) {
    const dimension = WorldSimulationDimensions.getDimension(dimensionId);
    const task = dimension.getTask(this.data.id);

    if (task.has(x, y, z)) return;

    task.add(x, y, z);
  }

  runTask(max = 10) {
    for (const [key, dimension] of WorldSimulationDimensions._dimensions) {
      const task = dimension.getTask(this.data.id);
      if (this.data.checkDone) {
        for (const [id, taskData] of task._task) {
          if (this.data.checkDone(taskData)) {
            task.completeTask(id);
          }
        }
      }

      if (task.waitingFor >= max) continue;

      if (this.data.sort) {
        const updatePosition = dimension.getUpdatePosition();
        task.sort(updatePosition.x, updatePosition.y, updatePosition.z);
      }
      let count = 0;

      for (const location of task.run()) {
        const [, x, y, z] = location;

        const taskId = task.addTask(x, y, z);

        this.data.run(dimension, location, taskId, task);
        if (count + task.waitingFor > max) break;
        count++;
      }
    }
  }
}
