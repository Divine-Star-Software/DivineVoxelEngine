//util

//tools
import { BrushTool } from "./Brush.js";
import { TaskRunModes, TaskTool } from "../Tasks/TasksTool.js";

const tasks = new TaskTool();

export class AdvancedBrush extends BrushTool {
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
    tasks.setFocalPoint(this.location);
    tasks.voxelUpdate.paint.run(
      this.location,
      this.getRaw(),
      () => {
        if (onDone) onDone();
      },
      this.mode
    );
  }
  eraseAndUpdate(onDone?: Function) {
    tasks.setFocalPoint(this.location);
    tasks.voxelUpdate.erase.run(
      this.location,
      () => {
        if (onDone) onDone();
      },
      this.mode
    );
  }
  update(onDone?: Function) {
    tasks.setFocalPoint(this.location);
    tasks.voxelUpdate.update.run(
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
    tasks.setFocalPoint(this.location);
    tasks.explosion.run(this.location, radius, () => {
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
