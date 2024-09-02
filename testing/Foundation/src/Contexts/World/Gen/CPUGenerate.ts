import { PerlinGen } from "./PerlinGen";
import { WorldGen } from "./WorldGen";

import { TaskTool } from "@divinevoxel/foundation/Default/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/foundation/Default/Tools/Mesher/MesherTool";
import { PanelStates } from "@divinevoxel/foundation/Default/Mesher/Shapes/default/Panel/PanelStates";
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
      builder.setXZ(x, z).fillColumn();
      // WorldGen.generateWorldColumn(x, z);
      PerlinGen.generateWorldColumn(x, z);
      tasks.propagation.queued.add(["main", x, 0, z]);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  for (let y = 55; y < 80; y++) {
    {
      WorldGen.brush
        .setXYZ(0, y, 1)
        .setId("dve_dream_vine")
        .setShapeState(PanelStates.North)
        .paint();
      WorldGen.brush
        .setXYZ(0, y, 2)
        .setId("dve_dream_stone")
        .setShapeState(PanelStates.North)
        .paint();
    }

    {
      WorldGen.brush
        .setXYZ(0, y, -1)
        .setId("dve_dream_vine")
        .setShapeState(PanelStates.South)
        .paint();
      WorldGen.brush
        .setXYZ(0, y, -2)
        .setId("dve_dream_stone")
        .setShapeState(PanelStates.South)
        .paint();
    }

    {
      WorldGen.brush
        .setXYZ(1, y, 0)
        .setId("dve_dream_vine")
        .setShapeState(PanelStates.East)
        .paint();
      WorldGen.brush
        .setXYZ(2, y, 0)
        .setId("dve_dream_stone")
        .setShapeState(PanelStates.East)
        .paint();
    }

    {
      WorldGen.brush
        .setXYZ(-1, y, 0)
        .setId("dve_dream_vine")
        .setShapeState(PanelStates.West)
        .paint();
      WorldGen.brush
        .setXYZ(-2, y, 0)
        .setId("dve_dream_stone")
        .setShapeState(PanelStates.West)
        .paint();
    }
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
