//util
import { Util } from "../../Global/Util.helper.js";
//tools
import { BrushTool } from "./Brush.js";
import { TasksTool } from "../Tasks/TasksTool.js";

const tasks = TasksTool();

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
   const dimesnion = brush.data.dimension;
   const x = brush.data.position[0];
   const y = brush.data.position[1];
   const z = brush.data.position[2];
   tasks.setFocalPoint(x, y, z, dimesnion);
   tasks.voxelUpdate.paint.add(x, y, z, brush.getRaw());
   tasks.voxelUpdate.paint.run(() => (onDone ? onDone() : false));
  },
  eraseAndUpdate(onDone?: Function) {
   const dimesnion = brush.data.dimension;
   const x = brush.data.position[0];
   const y = brush.data.position[1];
   const z = brush.data.position[2];
   tasks.setFocalPoint(x, y, z, dimesnion);
   tasks.voxelUpdate.erase.add(x, y, z);
   tasks.voxelUpdate.erase.run(() => (onDone ? onDone() : false));
  },
  explode(radius = 6, onDone?: Function) {
   const dimesnion = brush.data.dimension;
   const x = brush.data.position[0];
   const y = brush.data.position[1];
   const z = brush.data.position[2];
   tasks.setFocalPoint(x, y, z, dimesnion);
   tasks.explosion.run.add(x, y, z, radius);
   tasks.explosion.run.run(() => {
    tasks.build.chunk.run(() => (onDone ? onDone() : 0));
   });
  },
 });

 return brush;
};
