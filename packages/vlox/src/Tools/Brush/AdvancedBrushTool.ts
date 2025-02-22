import { BrushTool } from "./Brush.js";
import { TaskRunModes, TaskTool } from "../Tasks/TasksTool.js";
import { LocationData } from "Math/index.js";

export class AdvancedBrush extends BrushTool {
  _location: LocationData = [0, 0, 0, 0];
  constructor(public tasks: TaskTool) {
    super();
  }
  mode: TaskRunModes = "async";
  _mapLocation() {
    this._location[0] = this.dimension;
    this._location[1] = this.x;
    this._location[2] = this.y;
    this._location[3] = this.z;
  }
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
    this._mapLocation();
    this.tasks.voxel.paint.run([this._location, this.getRaw()], null, () => {
      if (onDone) onDone();
    });
  }
  eraseAndUpdate(onDone?: Function) {
    this._mapLocation();
    this.tasks.voxel.erase.run(this._location, null, () => {
      if (onDone) onDone();
    });
  }
  update(onDone?: Function) {
    this._mapLocation();
    this.tasks.voxel.update.run([this._location, this.getRaw()], null, () => {
      if (onDone) onDone();
    });
  }
  updateAndAwait() {
    return new Promise((resolve) => {
      this.update(() => {
        resolve(true);
      });
    });
  }
  explode(radius = 6, onDone?: Function) {
    this._mapLocation();
    this.tasks.voxel.explosion.run([this._location, radius], null, () => {
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
