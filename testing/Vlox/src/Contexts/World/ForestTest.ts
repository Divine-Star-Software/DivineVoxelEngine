import { PerlinGen } from "./Gen/PerlinGen";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
export async function ForestTest(DVEW: DivineVoxelEngineWorld) {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const tasks = new TaskTool(DVEW.threads.meshers, DVEW.threads.generators);
  const propagation = tasks.generation.propagation.createQueue();
  const worldSun = tasks.generation.worldSun.createQueue();
  const t1 = performance.now();

  const brush = new BrushTool();
  brush.start(0, 0, 0, 0);

  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      brush.setXYZ(x, 0, z).newSector();
      propagation.add([0, x, 0, z]);
      worldSun.add([0, x, 0, z]);
    }
  }

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      PerlinGen.generateForest(x, z);
    }
  }

  await worldSun.run();

  await propagation.run();
  for (let x = startX - 16; x < endX + 16; x += 16) {
    for (let z = startZ - 16; z < endZ + 16; z += 16) {
      tasks.build.sector.run([0, x, 0, z]);
    }
  }

  const t2 = performance.now();

  console.log("ALL DONE! total time = ", t2 - t1);
}
