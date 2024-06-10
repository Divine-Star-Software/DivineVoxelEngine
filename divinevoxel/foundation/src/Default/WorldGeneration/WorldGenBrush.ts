import type { Vec3Array } from "@divinevoxel/core/Math";

import { WorldGenRegister } from "./WorldGenRegister.js";

import { WorldLockTasks } from "../../Types/Tasks.types.js";

import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { BrushTool } from "../../Default/Tools/Brush/Brush.js";
import { LightData } from "../../Data/LightData.js";
import { DVEFConstrucotrCore } from "../../Contexts/Constructor/DVEFConstructorCore.js";
import { TasksRequest } from "../../Contexts/Constructor/Tasks/TasksRequest.js";
import { WorldGeneration } from "./WorldGeneration.js";
import { SafePromise } from "@divinestar/utils/Promises/SafePromise.js";

export class WorldGenBrush extends BrushTool {
  constructor() {
    super();
    WorldGeneration._brushes.push(this);
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

    this._worldPainter.paintVoxel(this.location, this.data);

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

    this._worldPainter.eraseVoxel(this.location);
  }

  runUpdates() {
    DVEFConstrucotrCore.instance.propagation.rgbUpdate(this.tasks);
    DVEFConstrucotrCore.instance.propagation.sunUpdate(this.tasks);
    this.tasks.queues.sun.updateMap.clear();
  }

  worldAlloc(start: Vec3Array, end: Vec3Array) {
    return new SafePromise<boolean>("worldAlloc", (resolve) => {
      DVEFConstrucotrCore.instance.threads.world.runPromiseTasks<WorldLockTasks>(
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
      DVEFConstrucotrCore.instance.threads.world.runPromiseTasks<WorldLockTasks>(
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
