//util
import { Util } from "../../Global/Util.helper.js";
//tools
import { BrushTool } from "./Brush.js";
import { TaskRunModes, TaskTool } from "../Tasks/TasksTool.js";

const tasks = new TaskTool();

export const GetAdvancedBrushTool = () => {
 let brush = Util.merge(new BrushTool(), {
  mode: <TaskRunModes>"async",
  setMode(mode: TaskRunModes) {
   this.mode = mode;
   return this;
  },
  paintAndAwaitUpdate() {
   const self = this;
   return new Promise((resolve) => {
    self.paintAndUpdate(() => {
     resolve(true);
    });
   });
  },
  eraseAndAwaitUpdate() {
   const self = this;
   return new Promise((resolve) => {
    self.eraseAndUpdate(() => {
     resolve(true);
    });
   });
  },
  paintAndUpdate(onDone?: Function) {
   tasks.setFocalPoint(brush.location);
   tasks.voxelUpdate.paint.run(
    brush.location,
    brush.getRaw(),
    () => {
     if (onDone) onDone();
    },
    this.mode
   );
  },
  eraseAndUpdate(onDone?: Function) {
   tasks.setFocalPoint(brush.location);
   tasks.voxelUpdate.erase.run(
    brush.location,
    () => {
     if (onDone) onDone();
    },
    this.mode
   );
  },
  update(onDone?: Function) {
   tasks.setFocalPoint(brush.location);
   tasks.voxelUpdate.update.run(
    brush.location,
    brush.getRaw(),
    () => {
     if (onDone) onDone();
    },
    this.mode
   );
  },
  updateAndAwait() {
   return new Promise((resolve) => {
    this.update(() => {
     resolve(true);
    });
   });
  },
  explode(radius = 6, onDone?: Function) {
   tasks.setFocalPoint(brush.location);
   tasks.explosion.run(brush.location, radius, () => {
    if (onDone) onDone();
   });
  },
  explodeAwaitUpdate(radius = 6) {
   return new Promise((resolve) => {
    this.explode(radius, () => {
     resolve(true);
    });
   });
  },
 });

 return brush;
};
