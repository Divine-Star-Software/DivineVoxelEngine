import { ColumnVisistedMap } from "./ColumnVisistedMap";

class TaskSegment {
  queue: number[] = [];
  vistedMap = new ColumnVisistedMap();
  waitingFor = 0;
  clear() {
    this.waitingFor = 0;
    this.queue.length = 0;
    this.vistedMap.clear();
  }
}

export class DimensionSegment {
  tasks = new Map<string, TaskSegment>();
  queue: number[] = [];
  vistedMap = new ColumnVisistedMap();
  rendered = new ColumnVisistedMap();
  inProgress = new ColumnVisistedMap();

  constructor(public id: string) {}

  addTask(id: string) {
    this.tasks.set(id, new TaskSegment());
  }
  getTask(id: string) {
    const task = this.tasks.get(id);
    if (!task)
      throw new Error(
        `Task with id [${id}] not registered in dimension segment ${this.id}`
      );
    return task;
  }
  clearAllTasks() {
    for (const [key, task] of this.tasks) {
      task.clear();
    }
  }

  logTasks() {
    const tasks: string[] = [];
    for (const [key, task] of this.tasks) {
      tasks.push(`${key} | ${task.waitingFor}`);
    }
    return tasks.join("\n");
  }
}
