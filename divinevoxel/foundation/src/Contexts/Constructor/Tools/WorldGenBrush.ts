import type { Vec3Array } from "@divinevoxel/core/Math";

import { WorldGenRegister } from "../WorldGeneration/Register/WorldGenRegister.js";
import { TasksRequest } from "../Tasks/TasksRequest.js";

import { WorldLockTasks } from "../../../Types/Tasks.types.js";

import { RichDataTool } from "../../../Default/Tools/Data/RichDataTool.js";
import { BrushTool } from "../../../Default/Tools/Brush/Brush.js";
import { LightData } from "../../../Data/LightData.js";
import { DVEFConstrucotrCore } from "../DVEFConstructorCore.js";
import { WorldPainter } from "../../../Data/World/WorldPainter.js";

export class WorldGenBrush extends BrushTool {
  constructor() {
    super();
  }
  requestsId: "";

  tasks = TasksRequest.getVoxelUpdateRequests(this.location);

  richData = new RichDataTool();

  paint() {
    if (!this._dt.loadInAtLocation(this.location) && this.requestsId != "") {
      WorldGenRegister.addToRequest(this.requestsId, this.location, [
        ...this.getRaw(),
      ] as any);
      return this;
    }
    const sl = this._dt.getLight();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
      DVEFConstrucotrCore.instance.propagation.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
      DVEFConstrucotrCore.instance.propagation.sunRemove(this.tasks);
    }

    WorldPainter.paint.voxel(this.location, this.data);

    return this;
  }

  erease() {
    const sl = this._dt.getLight();
    this._dt
      .setAir()
      .setLight(sl > 0 ? sl : 0)
      .commit(2);

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
      DVEFConstrucotrCore.instance.propagation.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.remove.push(this.x, this.y, this.z);

      DVEFConstrucotrCore.instance.propagation.sunRemove(this.tasks);
    }

    WorldPainter.paint.erase(this.location);
  }

  runUpdates() {
    DVEFConstrucotrCore.instance.propagation.rgbUpdate(this.tasks);
    DVEFConstrucotrCore.instance.propagation.sunUpdate(this.tasks);
    this.tasks.queues.sun.updateMap.clear();
  }

  worldAlloc(start: Vec3Array, end: Vec3Array) {
    return new Promise<boolean>((resolve) => {
      DVEFConstrucotrCore.instance.threads.world.runPromiseTasks<WorldLockTasks>(
        "world-alloc",
        [this.dimension, start, end],
        [],
        () => {
          resolve(true);
        }
      );
    });
  }

  worldDealloc(start: Vec3Array, end: Vec3Array) {
    return new Promise<boolean>((resolve) => {
      DVEFConstrucotrCore.instance.threads.world.runPromiseTasks<WorldLockTasks>(
        "world-dealloc",
        [this.dimension, start, end],
        [],
        () => {
          resolve(true);
        }
      );
    });
  }
}
