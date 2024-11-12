//util

//tools
import { BrushTool } from "./Brush.js";
import { TaskRunModes, TaskTool } from "../Tasks/TasksTool.js";

export class AdvancedBrush extends BrushTool {
  tasks = new TaskTool();
  mode: TaskRunModes = "async";
  setMode(mode: TaskRunModes) {
    this.mode = mode;
    return this;
  }
  paintAndAwaitUpdate() {
    return new Promise((resolve) => {
      this.paintAndUpdate(() => {
        resolve(true);
      });
    });
  }
  eraseAndAwaitUpdate() {
    const self = this;
    return new Promise((resolve) => {
      self.eraseAndUpdate(() => {
        resolve(true);
      });
    });
  }
  paintAndUpdate(onDone?: Function) {
    this.tasks.setFocalPoint(this.location);
    this.tasks.voxelUpdate.paint.run(
      this.location,
      this.getRaw(),
      () => {
        if (onDone) onDone();
      },
      this.mode
    );
  }
  eraseAndUpdate(onDone?: Function) {
    this.tasks.setFocalPoint(this.location);
    this.tasks.voxelUpdate.erase.run(
      this.location,
      () => {
        if (onDone) onDone();
      },
      this.mode
    );
  }
  update(onDone?: Function) {
    this.tasks.setFocalPoint(this.location);
    this.tasks.voxelUpdate.update.run(
      this.location,
      this.getRaw(),
      () => {
        if (onDone) onDone();
      },
      this.mode
    );
  }
  updateAndAwait() {
    return new Promise((resolve) => {
      this.update(() => {
        resolve(true);
      });
    });
  }
  explode(radius = 6, onDone?: Function) {
    this.tasks.setFocalPoint(this.location);
    this.tasks.explosion.run(this.location, radius, () => {
      if (onDone) onDone();
    });
  }
  explodeAwaitUpdate(radius = 6) {
    return new Promise((resolve) => {
      this.explode(radius, () => {
        resolve(true);
      });
    });
  }
}
