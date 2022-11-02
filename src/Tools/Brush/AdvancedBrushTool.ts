import { WorldPainter as WD } from "../../Data/World/WorldPainter.js";
import { Util } from "../../Global/Util.helper.js";
import { VoxelBrush } from "./Brush.js";
import type { AddVoxelData } from "Meta/Data/WorldData.types";
import { LightData as LD } from "../../Data/Light/LightByte.js";
import { VoxelData } from "../../Data/Voxel/VoxelData.js";
import { $3dMooreNeighborhood } from "../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { EngineSettings as ES } from "../../Data/Settings/EngineSettings.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { DataTool } from "../Data/DataTool.js";
import { TasksTool } from "../Tasks/TasksTool.js";
import { VoxelSubstanceType } from "Meta/index.js";

const tasks = TasksTool();
const dataTool = new DataTool();

const getUpdateState = () => {
 return {
  phase: "pre",
  status: "idle",
  pre: {
   rgb: false,
   sun: false,
  },
  paint: {
   done: false,
  },
  post: {
   rgb: false,
   build: false,
  },
 };
};

const getRemoveState = () => {
 return {
  phase: "pre",
  status: "idle",
  pre: {
   light: false,
  },
  post: {
   build: false,
  },
 };
};

const lightUpdateFromNeighbors = (x: number, y: number, z: number) => {
 for (const n of $3dMooreNeighborhood) {
  //if (n[0] == 0 && n[1] == 0 && n[2] == 0) continue;
  const nx = x + n[0];
  const ny = y + n[1];
  const nz = z + n[2];
  if (!dataTool.loadIn(nx, ny, nz)) continue;
  const l = dataTool.getLight();
  if (l <= 0) continue;
  if (LD.getS(l) > 0) {
   tasks.light.sun.update.add(nx, ny, nz);
  }
  if (LD.hasRGBLight(l)) {
   tasks.light.rgb.update.add(nx, ny, nz);
  }
 }
};

const flowUpdateFromNeighbors = (x: number, y: number, z: number) => {
 for (const n of $3dMooreNeighborhood) {
  //if (n[0] == 0 && n[1] == 0 && n[2] == 0) continue;
  const nx = x + n[0];
  const ny = y + n[1];
  const nz = z + n[2];
  if (!dataTool.loadIn(nx, ny, nz)) continue;
  const substance = dataTool.getSubstance();
  if (substance == "fluid" || substance == "magma") {
   tasks.flow.update.add(nx, ny, nz);
  }
 }
};

const setFocus = (dim: string, x: number, y: number, z: number) => {
 tasks.setFocalPoint(x, y, z, dim as string);
};

const preErease = (
 l: number,
 dim: string,
 x: number,
 y: number,
 z: number,
 onDone: Function
) => {
 if (!ES.doLight()) {
  onDone();
  return;
 }
 const updates = {
  rgb: 0,
  sun: 0,
 };
 setFocus(dim, x, y, z);
 dataTool.loadIn(x, y, z);
 if (l > 0) {
  dataTool.setLight(l).commit();
  if (ES.doRGBPropagation()) {
   tasks.light.rgb.remove.add(x, y, z);
  }
  if (ES.doSunPropagation()) {
   tasks.light.sun.remove.add(x, y, z);
  }
 }

 lightUpdateFromNeighbors(x, y, z);

 if (ES.doSunPropagation() && ES.doRGBPropagation()) {
  tasks.light.sun.remove.run(() => {
   updates.sun = 1;
   setFocus(dim, x, y, z);
   tasks.light.sun.update.run(() => {
    updates.sun = 2;
    setFocus(dim, x, y, z);
    tasks.light.rgb.remove.run(() => {
     updates.rgb = 1;
     setFocus(dim, x, y, z);
     tasks.light.rgb.update.run(() => {
      updates.rgb = 2;
     });
    });
   });
  });
 }
 if (ES.doRGBPropagation() && !ES.doSunPropagation()) {
  tasks.light.rgb.remove.run(() => {
   updates.rgb = 1;
   setFocus(dim, x, y, z);
   tasks.light.rgb.update.run(() => {
    updates.rgb = 2;
   });
  });
 }
 const inte = setInterval(() => {
  if (ES.doSunPropagation() && ES.doRGBPropagation()) {
   if (updates.rgb == 2 && updates.sun == 2) {
    clearInterval(inte);
    onDone();
   }
   return;
  }
  if (updates.rgb == 2) {
   clearInterval(inte);
   onDone();
  }
 }, 1);
};

const prePaint = (
 data: AddVoxelData,
 substance: VoxelSubstanceType,
 onDone: Function
) => {
 const x = data.position[0];
 const y = data.position[1];
 const z = data.position[2];
 setFocus(data.dimension, x, y, z);
 let needLightUpdate = false;

  if (ES.doRGBPropagation()) {
   needLightUpdate = true;
   tasks.light.rgb.remove.add(x, y, z);
  }
  if (ES.doSunPropagation()) {
   needLightUpdate = true;
   tasks.light.sun.remove.add(x, y, z);
  }
 

 if (!needLightUpdate) {
  onDone();
  return;
 }

 const updates = {
  rgb: 0,
  sun: 0,
  flow: 0,
 };

 tasks.light.sun.remove.run(() => {
  updates.sun = 1;
  setFocus(data.dimension, x, y, z);
  tasks.light.rgb.remove.run(() => {
   updates.rgb = 1;
  });
 });

 const inte = setInterval(() => {
  if (ES.doSunPropagation()) {
   if (updates.rgb == 1 && updates.sun == 1) {
    clearInterval(inte);
    onDone();
   }
   return;
  }
  if (updates.rgb == 1) {
   clearInterval(inte);
   onDone();
  }
 }, 1);
};

const postUpdate = (
 data: AddVoxelData,
 substance: VoxelSubstanceType,
 lightSource: number,
 lightValue: number,
 onDone: Function
) => {
 const x = data.position[0];
 const y = data.position[1];
 const z = data.position[2];
 setFocus(data.dimension, x, y, z);
 let needLightUpdate = false;
 if (ES.doRGBPropagation()) {
  if (ES.settings.lighting?.autoRGBLight) {
   if (lightSource && lightValue) {
    needLightUpdate = true;
    tasks.light.rgb.update.add(x, y, z);
   }
  }
 }
 if (ES.doRGBPropagation() || ES.doSunPropagation()) {
  if (substance != "solid" && substance != "magma") {
   needLightUpdate = true;
   lightUpdateFromNeighbors(x, y, z);
  }
 }

 if (ES.doFlow()) {
  if (substance == "fluid" || substance == "magma") {
   tasks.flow.update.add(x, y, z);
   tasks.flow.update.run(() => {});
  }
 }

 if (needLightUpdate) {
  tasks.light.sun.update.run(() => {
   setFocus(data.dimension, x, y, z);
   tasks.light.rgb.update.run(() => {
    onDone();
   });
  });

  return;
 }
 onDone();
};

const rebuild = (
 dim: string,
 x: number,
 y: number,
 z: number,
 onDone: Function
) => {
 setFocus(dim, x, y, z);
 for (let i = 0; i < $3dMooreNeighborhood.length; i++) {
  const n = $3dMooreNeighborhood[i];
  const chunkPOS = WorldBounds.getChunkPosition(n[0] + x, n[1] + y, n[2] + z);
  tasks.build.chunk.add(chunkPOS.x, chunkPOS.y, chunkPOS.z);
 }

 tasks.build.chunk.run(onDone);
};

export const GetAdvancedBrushTool = () => {
 let brush = Util.merge(new VoxelBrush(), {
  paintAndAwaitUpdate() {
   const self = this;
   return new Promise((resolve) => {
    self.paintAndUpdate(() => {
     resolve(true);
    });
   });
  },
  ereaseAndAwaitUpdate() {
   const self = this;
   return new Promise((resolve) => {
    self.ereaseAndUpdate(() => {
     resolve(true);
    });
   });
  },
  paintAndUpdate(onDone: Function = () => {}) {
   const state = getUpdateState();
   const dimesnion = brush.data.dimension;
   const x = brush.data.position[0];
   const y = brush.data.position[1];
   const z = brush.data.position[2];
   const data: AddVoxelData = structuredClone(brush.data);
   const id = VoxelPaletteReader.id.numberFromString(data.id);
   const substance = dataTool.setId(id).getSubstance();
   const voxleData = VoxelData.getVoxelData(id);
   const inte = setInterval(() => {
    if (state.phase == "pre") {
     if (state.status == "waiting") {
      return;
     }
     if (state.status == "idle") {
      state.status = "waiting";
      prePaint(data, substance, () => {
       state.pre.sun = true;
       state.pre.rgb = true;

       state.status = "idle";
       state.phase = "paint";
      });

      return;
     }
    }
    if (state.phase == "paint") {
     if (state.paint.done) {
      state.phase = "post";
      return;
     }
     WD.paint.voxel(data, false);
     state.paint.done = true;
     return;
    }
    if (state.phase == "post") {
     if (state.status == "waiting") {
      return;
     }

     if (state.status == "idle") {
      if (state.post.build && state.post.rgb) {
       if (onDone) {
        onDone();
       }
       clearInterval(inte);
      }
      if (!state.post.rgb) {
       state.status = "waiting";
       postUpdate(
        data,
        substance,
        voxleData.lightSource,
        voxleData.lightValue,
        () => {
         state.post.rgb = true;
         state.status = "idle";
        }
       );

       return;
      }
      if (!state.post.build) {
       state.status = "waiting";
       rebuild(dimesnion, x, y, z, () => {
        state.post.build = true;
        state.status = "idle";
       });

       return;
      }
      return;
     }
    }
   }, 1);
  },
  ereaseAndUpdate(onDone?: Function) {
   const state = getRemoveState();
   dataTool.loadIn(
    brush.data.position[0],
    brush.data.position[1],
    brush.data.position[2]
   );

   const l = dataTool.getLight();

   const dimesnion = brush.data.dimension;
   const x = brush.data.position[0];
   const y = brush.data.position[1];
   const z = brush.data.position[2];
   WD.paint.erease(dimesnion, x, y, z);

   const inte = setInterval(() => {
    if (state.phase == "pre") {
     if (state.status == "waiting") {
      return;
     }
     if (state.status == "idle") {
      state.status = "waiting";
      preErease(l, dimesnion, x, y, z, () => {
       state.status = "idle";
       state.phase = "post";
      });
      return;
     }
    }

    if (state.phase == "post") {
     if (state.status == "waiting") {
      return;
     }
     if (state.status == "idle") {
      if (state.post.build) {
       if (onDone) {
        onDone();
       }
       clearInterval(inte);
       return;
      }
      if (!state.post.build) {
       state.status = "waiting";
       rebuild(dimesnion, x, y, z, () => {
        state.post.build = true;
        state.status = "idle";
       });
       return;
      }
     }
     return;
    }
   }, 1);
  },
 });

 return brush;
};
