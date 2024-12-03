import { PerlinGen } from "./Gen/PerlinGen";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/vlox/Tools/Mesher/MesherTool";
export async function ForestTest() {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const mesher = new MesherTool();

  const tasks = new TaskTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();


  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      mesher.setXYZ(x, 0, z).fillColumn();
      tasks.propagation.queued.add(["main", x, 0, z]);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      PerlinGen.generateForest(x, z);
    }
  }

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
