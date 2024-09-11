import { PerlinGen } from "./PerlinGen";
import { WorldGen } from "./WorldGen";

import { TaskTool } from "@divinevoxel/foundation/Default/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/foundation/Default/Tools/Mesher/MesherTool";
import { PanelStates } from "@divinevoxel/foundation/Default/Mesher/Shapes/default/Panel/PanelStates";
import { DataTool } from "@divinevoxel/foundation/Default/Tools/Data/DataTool";
import { BrushTool } from "@divinevoxel/foundation/Default/Tools/Brush/Brush";
import { WorldRegister } from "@divinevoxel/foundation/Data/World/WorldRegister";
export async function CPUGenerate() {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const builder = new MesherTool();

  const tasks = new TaskTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();
  /* 
  builder.setXYZ(0, 0, 0).fillColumn();
  WorldGen.flatColumn(0, 0);

 tasks.propagation.queued.add(["main", 0, 0, 0]);
 tasks.worldSun.queued.add(["main", 0, 0, 0]);
 */
  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      builder.setXYZ(x, 0, z).fillColumn();
      tasks.propagation.queued.add(["main", x, 0, z]);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      if ((x > -10 && x < 10) && (z > -10 && z < 10)) continue;

      WorldGen.flatColumn(x, z);
    }
  }
  /*   for (let x = 0; x < 16; x += 16) {
    for (let z = 0; z < 16; z += 16) {
      WorldGen.flatColumn(x, z);
    }
  } */
  /*   const brush = new BrushTool();
  brush.setId("dve_dread_stone");
  for (let y = 0; y < 12; y++) {
    if (y % 2 == 0) continue;
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        if (Math.random() > 0.85) continue;
        brush.setXYZ(x, y, z).paint();
      }
    }
  }
 */
  // brush.setXYZ(5, 1, 5).paint();
  /*
  for (let x = 0; x < 16; x += 2) {
    brush.setXYZ(x, 1, 0).paint();
  }
 */
  /// await MagicGen.g enerate();

  //await ComputeTest(canvas);

  await tasks.worldSun.queued.runAndAwait();
  await tasks.propagation.queued.runAndAwait();

  for (let x = startX - 16; x < endX + 16; x += 16) {
    for (let z = startZ - 16; z < endZ + 16; z += 16) {
      builder.setXYZ(x, 0, z).buildColumn();
    }
  }

  const t2 = performance.now();

  console.log("ALL DONE! total time = ", t2 - t1);
}
