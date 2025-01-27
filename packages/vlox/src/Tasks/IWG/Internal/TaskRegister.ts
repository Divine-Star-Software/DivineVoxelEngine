import { DimensionSegment } from "./Classes/DimensionSegment";
import { IWGTaskBase, IWGTasksData } from "./Classes/IWGTaskBase";

export class TaskRegister {
  static readonly tasks: IWGTaskBase[] = [];

  static addTasks(data: IWGTasksData) {
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
