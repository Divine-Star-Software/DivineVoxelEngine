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

export class WorldGenBrush extends BrushTool {
  constructor() {
    super();
    WorldGeneration._brushes.push(this);
  }
  requestsId: "";

  tasks = TasksRequest.getVoxelUpdateRequests(["main", 0, 0, 0]);

  richData = new RichDataTool();

  setDimension(dimensionId: string) {
    this.dimension = dimensionId;
    this.tasks.origin[0] = dimensionId;
    this._dt.setDimension(dimensionId);
    return this;
  }

  get keepTrackOfChunksToBuild() {
    return this.tasks.keepTrackOfChunks;
  }
  set keepTrackOfChunksToBuild(value: boolean) {
    this.tasks.keepTrackOfChunks = value;
  }
  paint() {
    if (
      !this._dt.setDimension(this.dimension).loadInAt(this.x, this.y, this.z)
    ) {
      if (this.requestsId != "") {
        WorldGenRegister.addToRequest(
          this.requestsId,
          [this.dimension, this.x, this.y, this.z],
          [...this.getRaw()] as any
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
    if (this._dt.isRenderable()) {
      this.erase();
      this._dt.setDimension(this.dimension).loadInAt(this.x, this.y, this.z);
    }

    const sl = this._dt.getLight();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
      Propagation.instance.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
      Propagation.instance.sunRemove(this.tasks);
    }
    this._worldPainter.dimenion = this.dimension;
    this._worldPainter.data = this.data;
    this._worldPainter.paintVoxel(this.x, this.y, this.z);

    if (this.keepTrackOfChunksToBuild) {
      this.tasks.addNeighborsToRebuildQueue(this.x, this.y, this.z);
    }

    return this;
  }

  getUpdatedChunks() {
    const queue: Vec3Array[] = [];
    if (this.keepTrackOfChunksToBuild) {
      for (const [key, position] of this.tasks.trackedChunks) {
        queue.push(position);
      }
      this.tasks.trackedChunks.clear();
    }
    this.tasks.clearBuildQueue();
    return queue;
  }

  update() {
    if (
      !this._dt.setDimension(this.dimension).loadInAt(this.x, this.y, this.z) &&
      this.requestsId != ""
    )
      return false;

    const sl = this._dt.getLight();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.update.push(this.x, this.y, this.z);
      Propagation.instance.rgbUpdate(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.update.push(this.x, this.y, this.z);
      Propagation.instance.sunUpdate(this.tasks);
    }
    if (this.keepTrackOfChunksToBuild) {
      this.tasks.addNeighborsToRebuildQueue(this.x, this.y, this.z);
    }
  }

  erase() {
    if (
      !this._dt.setDimension(this.dimension).loadInAt(this.x, this.y, this.z) &&
      this.requestsId != ""
    )
      return this;
    const sl = this._dt.getLight();
    this._worldPainter.dimenion = this.dimension;
    this._worldPainter.eraseVoxel(this.x, this.y, this.z);
    this._dt
      .setAir()
      .setLight(sl > 0 ? sl : 0)
      .commit();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
      Propagation.instance.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.remove.push(this.x, this.y, this.z);

      Propagation.instance.sunRemove(this.tasks);
    }

    if (this.keepTrackOfChunksToBuild) {
      this.tasks.addNeighborsToRebuildQueue(this.x, this.y, this.z);
    }

    return this;
  }

  runUpdates() {
    Propagation.instance.rgbUpdate(this.tasks);
    Propagation.instance.sunUpdate(this.tasks);

    this.tasks.queues.rgb.map.clear();
    this.tasks.queues.sun.updateMap.clear();
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
