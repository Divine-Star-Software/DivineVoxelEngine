import { PerlinGen } from "./PerlinGen";
import { WorldGen } from "./WorldGen";

import { TaskTool } from "@divinevoxel/foundation/Default/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/foundation/Default/Tools/Mesher/MesherTool";
import { PanelStates } from "@divinevoxel/foundation/Default/Mesher/Shapes/default/Panel/PanelStates";
import { DataTool } from "@divinevoxel/foundation/Default/Tools/Data/DataTool";
import { BrushTool } from "@divinevoxel/foundation/Default/Tools/Brush/Brush";
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
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXYZ(x, 0, z).fillColumn();
      WorldGen.flatColumn(x, z);
      // PerlinGen.generateWorldColumn(x, z);
      tasks.propagation.queued.add(["main", x, 0, z]);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  const brush = new BrushTool();
  brush.setId("dve_dread_stone_stair");
  for (let x = 0; x < 16; x += 2) {
    brush.setXYZ(x, 1, 0).paint();
  }

  /// await MagicGen.generate();

  const t2 = performance.now();
  //await ComputeTest(canvas);

  await tasks.worldSun.queued.runAndAwait();
  await tasks.propagation.queued.runAndAwait();

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXYZ(x, 0, z).buildColumn();
    }
  }
}
