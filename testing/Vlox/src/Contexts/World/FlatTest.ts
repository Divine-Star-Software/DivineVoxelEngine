import { PerlinGen } from "./Gen/PerlinGen";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { WorldGen } from "./Gen/WorldGen";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
export async function FlatTest(DVEW: DivineVoxelEngineWorld) {
  const tStart = performance.now();
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const tasks = new TaskTool(DVEW.threads.constructors);
  const propagation = tasks.propagation.createQueue();
  const worldSun = tasks.worldSun.createQueue();
  const brush = new BrushTool();
  brush.start("main", 0, 0, 0);

  PerlinGen.worldCursor.setFocalPoint("main", 0, 0, 0);
  WorldGen.worldCursor.setFocalPoint("main", 0, 0, 0);
  let genOne = true;
  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      brush.setXYZ(x, 0, z).fillColumn();
      propagation.add(["main", x, 0, z]);
      worldSun.add(["main", x, 0, z]);
    }
  }
  if (genOne) {

    brush.setId("dve_debug_box").setXYZ(0,1,0).paint();
    // WorldGen.pyramidColumn(0, 0);
  //  PerlinGen.generateTest(0, 0);
  } else {
    for (let x = startX; x < endX; x += 16) {
      for (let z = startZ; z < endZ; z += 16) {
        PerlinGen.generateTest(x, z, x == 0 && z == 0);
      }
    }
  }
  const tPropS = performance.now();
  await propagation.run();
  const tPropE = performance.now();
  console.log("Propagation done = ", tPropE - tPropS);
  const tSunS = performance.now();
  await worldSun.run();
  const tSunE = performance.now();
  console.log("Sun done = ", tSunE - tSunS);


  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      tasks.build.column.run(["main", x, 0, z]);
    }
  }

  const tEnd = performance.now();

  console.log("ALL DONE! total time = ", tEnd - tStart);
}
