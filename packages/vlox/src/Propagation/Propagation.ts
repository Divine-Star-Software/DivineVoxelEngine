//objects
import {
  ExplosionTaskRequests,
  WorldSunTaskRequest,
} from "../Contexts/Constructor/Tasks/TasksRequest";
import { RGBRemove, RGBUpdate } from "./Illumanation/Functions/RGBUpdate.js";
import { SunRemove, SunUpdate } from "./Illumanation/Functions/SunUpdate.js";
import { RunWorldSun } from "./Illumanation/Functions/WorldSun.js";
import { FlowUpdate } from "./Flow/Functions/FlowUpdate.js";
import { FlowRemove } from "./Flow/Functions/FlowRemove.js";
import { ExplosionManager } from "./Explosion/ExplosionManager.js";
import { UpdateTask } from "../Contexts/Constructor/Tasks/UpdateTask";

export class Propagation {
  static instance: Propagation;
  constructor() {
    if (!Propagation.instance) Propagation.instance = this;
  }

  explosion(tasks: UpdateTask, radius: number) {
    ExplosionManager.runExplosion(tasks, radius);
  }

  async flowUpdate(tasks: UpdateTask, rebuild = true) {
    await FlowUpdate(tasks, rebuild);
  }
  async flowRemove(tasks: UpdateTask, rebuild = true) {
    await FlowRemove(tasks);
  }

  worldSun(tasks: WorldSunTaskRequest) {
    RunWorldSun(tasks);
  }

  rgbUpdate(tasks: UpdateTask) {
    RGBUpdate(tasks);
  }
  rgbRemove(tasks: UpdateTask) {
    RGBRemove(tasks);
  }

  sunUpdate(tasks: UpdateTask) {
    SunUpdate(tasks);
  }

  sunRemove(tasks: UpdateTask, clearUpdateMap = false) {
    SunRemove(tasks, clearUpdateMap);
  }
}
