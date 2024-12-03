import { PerlinGen } from "./Gen/PerlinGen";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/vlox/Tools/Mesher/MesherTool";
import { WorldGen } from "./Gen/WorldGen";
export async function flatTest() {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const mesher = new MesherTool();

  const tasks = new TaskTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();

  let genOne = false;
  if (genOne) {
    for (let x = startX - 32; x < endX + 32; x += 16) {
      for (let z = startZ - 32; z < endZ + 32; z += 16) {
        mesher.setXYZ(x, 0, z).fillColumn();
        tasks.propagation.queued.add(["main", x, 0, z]);
        tasks.worldSun.queued.add(["main", x, 0, z]);
      }
    }
  //  WorldGen.flatColumn(0, 0);
    WorldGen.pyramidColumn(0, 0);
    tasks.propagation.queued.add(["main", 0, 0, 0]);
    tasks.worldSun.queued.add(["main", 0, 0, 0]);
  } else {
    for (let x = startX - 32; x < endX + 32; x += 16) {
      for (let z = startZ - 32; z < endZ + 32; z += 16) {
        mesher.setXYZ(x, 0, z).fillColumn();
        tasks.propagation.queued.add(["main", x, 0, z]);
        tasks.worldSun.queued.add(["main", x, 0, z]);
      }
    }
    for (let x = startX; x < endX; x += 16) {
      for (let z = startZ; z < endZ; z += 16) {
        WorldGen.pyramidColumn(x, z);
      }
    }
  }

  await tasks.worldSun.queued.runAndAwait();
  await tasks.propagation.queued.runAndAwait();

  if (genOne) {
    mesher.setXYZ(0, 0, 0).buildColumn();
  } else {
    for (let x = startX - 16; x < endX + 16; x += 16) {
      for (let z = startZ - 16; z < endZ + 16; z += 16) {
        mesher.setXYZ(x, 0, z).buildColumn();
      }
    }
  }

  const t2 = performance.now();

  console.log("ALL DONE! total time = ", t2 - t1);
}
