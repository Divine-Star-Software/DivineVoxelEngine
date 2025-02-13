import {  Vector3Like } from "@amodx/math";
import { SectorVisistedMap } from "./SectorVisistedMap";

import { TaskTool } from "../../../Tools/Tasks/TasksTool";
import { TaskSegment } from "./TaskSegment";
import { Generator } from "./Generator";


export class DimensionSegment {
  tasks = new Map<string, TaskSegment>();
  queue: number[] = [];
  vistedMap = new SectorVisistedMap();
  rendered = new SectorVisistedMap();
  inProgress = new SectorVisistedMap();

  generators: Generator[] = [];


  constructor(
    public id: number,
    public taskTool: TaskTool
  ) {}

  _updatePosition = Vector3Like.Create();

  addGenerator(generator: Generator) {
    this.generators.push(generator);
  }

  removeGenerator(generator: Generator) {
    for (let i = 0; i < this.generators.length; i++) {
      if (this.generators[i] == generator) this.generators.splice(i, 1);
    }
  }

  getUpdatePosition() {
    const numGenerators = this.generators.length;
    if (numGenerators === 0) {
      this._updatePosition.x = 0;
      this._updatePosition.y = 0;
      this._updatePosition.z = 0;
      return this._updatePosition;
    }
    if (numGenerators === 1) {
      this._updatePosition.x = this.generators[0].position.x;
      this._updatePosition.y = this.generators[0].position.y;
      this._updatePosition.z = this.generators[0].position.z;
      return this._updatePosition;
    }
  
    let sumX = 0, sumY = 0, sumZ = 0;
    for (let i = 0; i < numGenerators; i++) {
      sumX += this.generators[i].position.x;
      sumY += this.generators[i].position.y;
      sumZ += this.generators[i].position.z;
    }
  
    this._updatePosition.x = sumX / numGenerators;
    this._updatePosition.y = sumY / numGenerators;
    this._updatePosition.z = sumZ / numGenerators;
  
    return this._updatePosition;
  }
  

  addTask(id: string,propagationBlocking:boolean) {
    this.tasks.set(id, new TaskSegment(this,propagationBlocking));
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
