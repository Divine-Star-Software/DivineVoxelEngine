//objects
import {
  ExplosionTaskRequests,
  FlowTaskRequests,
  LightTaskRequest,
  WorldSunTaskRequest,
} from "../Contexts/Constructor/Tasks/TasksRequest";
import { RGBRemove, RGBUpdate } from "./Illumanation/Functions/RGBUpdate.js";
import { SunRemove, SunUpdate } from "./Illumanation/Functions/SunUpdate.js";
import { RunWorldSun } from "./Illumanation/Functions/WorldSun.js";
import { FlowUpdate } from "./Flow/Functions/FlowUpdate.js";
import { FlowRemove } from "./Flow/Functions/FlowRemove.js";
import { ExplosionManager } from "./Explosion/ExplosionManager.js";

export class Propagation {
  static instance: Propagation;
  constructor() {
    if (!Propagation.instance) Propagation.instance = this;
  }

  explosion(tasks: ExplosionTaskRequests) {
    ExplosionManager.runExplosion(tasks);
  }

  async flowUpdate(tasks: FlowTaskRequests, rebuild = true) {
    await FlowUpdate(tasks, rebuild);
  }
  async flowRemove(tasks: FlowTaskRequests, rebuild = true) {
    await FlowRemove(tasks);
  }

  worldSun(tasks: WorldSunTaskRequest) {
    RunWorldSun(tasks);
  }

  rgbUpdate(tasks: LightTaskRequest) {
    RGBUpdate(tasks);
  }
  rgbRemove(tasks: LightTaskRequest) {
    RGBRemove(tasks);
  }

  sunUpdate(tasks: LightTaskRequest) {
    SunUpdate(tasks);
  }

  sunRemove(tasks: LightTaskRequest, clearUpdateMap = false) {
    SunRemove(tasks, clearUpdateMap);
  }
}
