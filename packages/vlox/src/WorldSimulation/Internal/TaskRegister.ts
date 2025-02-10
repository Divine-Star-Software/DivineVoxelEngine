import { DimensionSegment } from "./Classes/DimensionSegment";
import { IWGTaskBase, WorldSimulationTaskBase } from "./Classes/WorldSimulationTaskBase";

export class TaskRegister {
  static readonly tasks: IWGTaskBase[] = [];

  static addTasks(data: WorldSimulationTaskBase) {
    const newTask = new IWGTaskBase(data);
    this.tasks.push(newTask);
    return newTask;
  }

  static addToDimension(dimension: DimensionSegment) {
    for (const task of this.tasks) {
      dimension.addTask(task.data.id);
    }
  }
}
