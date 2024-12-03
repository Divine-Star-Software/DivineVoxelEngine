import { WorldGen } from "./Gen/WorldGen";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/vlox/Tools/Mesher/MesherTool";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
import { SchemaRegister } from "@divinevoxel/vlox/VoxelState/SchemaRegister";
import {
  VoxelFaceNameDirectionsRecord,
  VoxelFaceNames,
} from "@divinevoxel/vlox/Math/Constants/VoxelFaces";
export async function ShapeTest() {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const mesher = new MesherTool();

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
      mesher.setXYZ(x, 0, z).fillColumn();
      tasks.propagation.queued.add(["main", x, 0, z]);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      // if ((x > -10 && x < 10) && (z > -10 && z < 10)) continue;
      //  WorldGen.flatColumn(x, z);
    }
  }

  const brush = new BrushTool();
  brush.setId("dve_dream_fence").setXYZ(0, 2, -5).paint();
  brush.setId("dve_dream_fence").setXYZ(1, 2, -5).paint();
/*   for (let x = -5; x <= 5; x++) {
    brush.setId("dve_dream_fence").setXYZ(x, 2, 5).paint();
    brush.setId("dve_dream_fence").setXYZ(x, 2, -5).paint();
  }
  for (let z = -5; z <= 5; z++) {
    brush.setId("dve_dream_fence").setXYZ(-5, 2, z).paint();
    brush.setId("dve_dream_fence").setXYZ(5, 2, z).paint();
  } */

  await tasks.worldSun.queued.runAndAwait();
  await tasks.propagation.queued.runAndAwait();

  for (let x = startX - 16; x < endX + 16; x += 16) {
    for (let z = startZ - 16; z < endZ + 16; z += 16) {
      mesher.setXYZ(x, 0, z).buildColumn();
    }
  }

  const t2 = performance.now();

  console.log("ALL DONE! total time = ", t2 - t1);
}
