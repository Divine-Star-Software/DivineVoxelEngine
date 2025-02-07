import { Vec3Array } from "@amodx/math";
import { SectorVisistedMap } from "./SectorVisistedMap";
import { Sector } from "World";
import { BuildQueue } from "./BuildQueue";

class TaskSegment {
  queue: number[] = [];
  vistedMap = new SectorVisistedMap();
  waitingFor = 0;
  clear() {
    this.waitingFor = 0;
    this.queue.length = 0;
    this.vistedMap.clear();
  }
}

class SecotrQueueNode {
  time = 0;
  constructor(public position: Vec3Array) {}
}

class SectorQueue {
  nodes: SecotrQueueNode[] = [];
  private addedMap = new SectorVisistedMap();
  removeIndex(index: number) {
    const sector = this.nodes.splice(index, 1)[0];
    this.addedMap.remove(...sector.position);
  }
  inMap(sector: Sector) {
    return this.addedMap.has(...sector.position);
  }
  addSector(sector: Sector) {
    this.addedMap.add(...sector.position);
    this.nodes.push(new SecotrQueueNode([...sector.position]));
  }
}

export class DimensionSegment {
  tasks = new Map<string, TaskSegment>();
  queue: number[] = [];
  vistedMap = new SectorVisistedMap();
  rendered = new SectorVisistedMap();
  inProgress = new SectorVisistedMap();


  unRenderQueue = new SectorQueue();
  unLoadQueue = new SectorQueue();

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
