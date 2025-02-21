import type { Vec3Array } from "@amodx/math";

import { WorldGenRegister } from "./WorldGenRegister.js";

import { WorldLockTasks } from "../Tasks.types.js";

import { BrushTool } from "../../Tools/Brush/Brush.js";
import { VoxelLightData } from "../../Voxels/Cursor/VoxelLightData.js";

import { WorldGeneration } from "./WorldGeneration.js";
import { VoxelUpdateTask } from "../VoxelUpdateTask.js";
import { RGBRemove, RGBUpdate } from "../Propagation/Illumanation/RGBUpdate.js";
import { SunRemove, SunUpdate } from "../Propagation/Illumanation/SunUpdate.js";

const lightData = new VoxelLightData();
export class WorldGenBrush extends BrushTool {
  constructor() {
    super();
    WorldGeneration._brushes.push(this);
  }
  requestsId: "";

  tasks = new VoxelUpdateTask();

  start(dimension: number, x: number, y: number, z: number) {
    this.dataCursor.setFocalPoint(dimension, x, y, z);
    this.tasks.setOriginAt([dimension, x, y, z]);
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
      if (lightData.hasRGBLight(sl)) {
        this.tasks.rgb.remove.push(this.x, this.y, this.z);
        RGBRemove(this.tasks);
      }

      if (lightData.hasSunLight(sl)) {
        this.tasks.sun.remove.push(this.x, this.y, this.z);
        SunRemove(this.tasks);
      }
    }

    this._paint();
    this.tasks.bounds.updateDisplay(this.x, this.y, this.z);

    return this;
  }

  getUpdatedSections() {
    const queue = this.tasks.bounds.getSections();
    this.tasks.bounds.start();
    return queue;
  }

  update() {
    let voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return false;
    const sl = voxel.getLight();
    voxel.updateVoxel(2);
    if (lightData.hasRGBLight(sl)) {
      this.tasks.rgb.update.push(this.x, this.y, this.z);
      //    Propagation.instance.rgbUpdate(this.tasks);
    }

    if (lightData.hasSunLight(sl)) {
      this.tasks.sun.update.push(this.x, this.y, this.z);
      //  Propagation.instance.sunUpdate(this.tasks);
    }
    this.tasks.bounds.updateDisplay(this.x, this.y, this.z);
  }

  erase() {
    let voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return this;
    const sl = voxel.getLight();
    this._erase();
    voxel = this.dataCursor.getVoxel(this.x, this.y, this.z)!;
    voxel.setLight(sl > 0 ? sl : 0);

    if (lightData.hasRGBLight(sl)) {
      this.tasks.rgb.remove.push(this.x, this.y, this.z);
      RGBRemove(this.tasks);
    }

    if (lightData.hasSunLight(sl)) {
      this.tasks.sun.remove.push(this.x, this.y, this.z);
      SunRemove(this.tasks);
    }

    this.tasks.bounds.updateDisplay(this.x, this.y, this.z);

    return this;
  }

  runUpdates() {
    RGBUpdate(this.tasks);
    SunUpdate(this.tasks);

    this.tasks.rgb.removeMap.clear();
    this.tasks.sun.removeMap.clear();
  }

  worldAlloc(start: Vec3Array, end: Vec3Array) {
    return WorldGenRegister._worldThread.runTaskAsync<WorldLockTasks>(
      "world-alloc",
      [this.dimension, start, end]
    );
  }

  worldDealloc(start: Vec3Array, end: Vec3Array) {
    return WorldGenRegister._worldThread.runTaskAsync<WorldLockTasks>(
      "world-dealloc",
      [this.dimension, start, end]
    );
  }
}
