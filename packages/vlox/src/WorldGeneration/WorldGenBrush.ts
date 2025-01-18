import type { Vec3Array } from "@amodx/math";

import { WorldGenRegister } from "./WorldGenRegister.js";

import { WorldLockTasks } from "../Types/Tasks.types.js";

import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { BrushTool } from "../Tools/Brush/Brush.js";
import { LightData } from "../Data/LightData.js";

import { TasksRequest } from "../Contexts/Constructor/Tasks/TasksRequest.js";
import { WorldGeneration } from "./WorldGeneration.js";
import { SafePromise } from "@amodx/core/Promises/SafePromise.js";
import { Propagation } from "../Propagation/Propagation.js";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { UpdateTask } from "../Contexts/Constructor/Tasks/UpdateTask.js";

export class WorldGenBrush extends BrushTool {
  constructor() {
    super();
    WorldGeneration._brushes.push(this);
  }
  requestsId: "";

  tasks = new UpdateTask();

  richData = new RichDataTool();

  start(dimension: string, x: number, y: number, z: number) {
    this.dataCursor.setFocalPoint(dimension, x, y, z);
    this.tasks.setOrigin([dimension, x, y, z]);
    this.dimension = dimension;
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  paint() {
    let voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) {
      if (this.requestsId != "") {
        WorldGenRegister.addToRequest(
          this.requestsId,
          [this.dimension, this.x, this.y, this.z],
          this.voxelCursor.getRaw()
        );
        return this;
      }
      throw new Error(
        `Tried painting in an unloaded location ${[
          this.dimension,
          this.x,
          this.y,
          this.z,
        ].toString()}`
      );
    }
    const sl = voxel.getLight();
    if (sl > 0 || !voxel.isAir()) {
      this._erase();
      voxel.setLight(sl < 0 ? 0 : sl);
      if (LightData.hasRGBLight(sl)) {
        this.tasks.rgb.remove.push(this.x, this.y, this.z);
        Propagation.instance.rgbRemove(this.tasks);
      }

      if (LightData.hasSunLight(sl)) {
        this.tasks.sun.remove.push(this.x, this.y, this.z);
        Propagation.instance.sunRemove(this.tasks);
      }
    }

    this._paint();
    this.tasks.bounds.update(this.x, this.y, this.z);

    return this;
  }

  getUpdatedChunks() {
    const queue = this.tasks.bounds.getChunks();
    this.tasks.bounds.reset();
    return queue;
  }

  update() {
    let voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return false;
    const sl = voxel.getLight();
    if (LightData.hasRGBLight(sl)) {
      this.tasks.rgb.update.push(this.x, this.y, this.z);
  //    Propagation.instance.rgbUpdate(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.sun.update.push(this.x, this.y, this.z);
    //  Propagation.instance.sunUpdate(this.tasks);
    }
    this.tasks.bounds.update(this.x, this.y, this.z);
  }

  erase() {
    let voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return this;
    const sl = voxel.getLight();
    this._erase();
    voxel = this.dataCursor.getVoxel(this.x, this.y, this.z)!;
    voxel.setLight(sl > 0 ? sl : 0);

    if (LightData.hasRGBLight(sl)) {
      this.tasks.rgb.remove.push(this.x, this.y, this.z);
      Propagation.instance.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.sun.remove.push(this.x, this.y, this.z);
      Propagation.instance.sunRemove(this.tasks);
    }

    this.tasks.bounds.update(this.x, this.y, this.z);

    return this;
  }

  runUpdates() {
    Propagation.instance.rgbUpdate(this.tasks);
    Propagation.instance.sunUpdate(this.tasks);

    this.tasks.rgb.removeMap.clear();
    this.tasks.sun.removeMap.clear();
  }

  worldAlloc(start: Vec3Array, end: Vec3Array) {
    return new SafePromise<boolean>("worldAlloc", (resolve) => {
      DivineVoxelEngineConstructor.instance.threads.world.runPromiseTasks<WorldLockTasks>(
        "world-alloc",
        [this.dimension, start, end],
        [],
        () => {
          resolve(true);
        }
      );
    }).run();
  }

  worldDealloc(start: Vec3Array, end: Vec3Array) {
    return new SafePromise<boolean>("worldDealloc", (resolve) => {
      DivineVoxelEngineConstructor.instance.threads.world.runPromiseTasks<WorldLockTasks>(
        "world-dealloc",
        [this.dimension, start, end],
        [],
        () => {
          resolve(true);
        }
      );
    }).run();
  }
}
