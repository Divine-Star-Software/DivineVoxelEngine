//util
import { Util } from "../../Global/Util.helper.js";
//tools
import { BrushTool } from "./Brush.js";
import { GetTasksTool } from "../Tasks/TasksTool.js";

const tasks = GetTasksTool();

export const GetAdvancedBrushTool = () => {
 let brush = Util.merge(new BrushTool(), {
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
   tasks.voxelUpdate.paint.run(brush.location, brush.getRaw(), () => {
    if (onDone) onDone();
   });
  },
  eraseAndUpdate(onDone?: Function) {
   tasks.setFocalPoint(brush.location);
   tasks.voxelUpdate.erase.run(brush.location, () => {
    if (onDone) onDone();
   });
  },
  explode(radius = 6, onDone?: Function) {
   tasks.setFocalPoint(brush.location);
   tasks.explosion.run(brush.location, radius, () => {
    if (onDone) onDone();
   });
  },
 });

 return brush;
};
