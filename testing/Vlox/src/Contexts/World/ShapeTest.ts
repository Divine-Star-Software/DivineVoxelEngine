import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";
export async function ShapeTest(DVEW: DivineVoxelEngineWorld) {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const tasks = new TaskTool(DVEW.threads.constructors);
  const brush = new BrushTool();
  brush.start("main", 0, 0, 0);

  const propagation = tasks.propagation.createQueue();
  const worldSun = tasks.worldSun.createQueue();

  const t1 = performance.now();
  /* 
  builder.setXYZ(0, 0, 0).fillColumn();
  WorldGen.flatColumn(0, 0);

 tasks.propagation.queued.add(["main", 0, 0, 0]);
 tasks.worldSun.queued.add(["main", 0, 0, 0]);
 */
  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      brush.setXYZ(x, 0, z).fillColumn();
      propagation.add(["main", x, 0, z]);
      worldSun.add(["main", x, 0, z]);
    }
  }

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      // if ((x > -10 && x < 10) && (z > -10 && z < 10)) continue;
      //  WorldGen.flatColumn(x, z);
    }
  }

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

  await worldSun.run();
  await propagation.run();

  for (let x = startX - 16; x < endX + 16; x += 16) {
    for (let z = startZ - 16; z < endZ + 16; z += 16) {
      tasks.build.column.run(["main", x, 0, z]);
    }
  }

  const t2 = performance.now();

  console.log("ALL DONE! total time = ", t2 - t1);
}
