import { DimensionSegment } from "../Dimensions/DimensionSegment";
import {
  SimulationTaskBase,
  SimulationTaskBaseData,
} from "./SimulationTaskBase";

export class TaskRegister {
  static readonly tasks: SimulationTaskBase[] = [];

  static addTasks(data: SimulationTaskBaseData) {
    const newTask = new SimulationTaskBase(data);
    this.tasks.push(newTask);
    return newTask;
  }

  static addToDimension(dimension: DimensionSegment) {
    for (const task of this.tasks) {
      dimension.addTask(task.data.id, task.data.generationTask || false);
    }
  }
}
