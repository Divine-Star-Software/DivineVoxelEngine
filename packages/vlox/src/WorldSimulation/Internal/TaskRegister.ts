import { DimensionSegment } from "./Classes/DimensionSegment";
import {
  WorldSimulationTaskBase,
  WorldSimulationTaskBaseData,
} from "./Classes/WorldSimulationTaskBase";

export class TaskRegister {
  static readonly tasks: WorldSimulationTaskBase[] = [];

  static addTasks(data: WorldSimulationTaskBaseData) {
    const newTask = new WorldSimulationTaskBase(data);
    this.tasks.push(newTask);
    return newTask;
  }

  static addToDimension(dimension: DimensionSegment) {
    for (const task of this.tasks) {
      dimension.addTask(task.data.id, task.data.propagationBlocking || false);
    }
  }
}
