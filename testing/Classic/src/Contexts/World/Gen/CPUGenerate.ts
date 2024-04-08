import { DivineVoxelEngineWorld } from "@divinevoxel/core/World";
import { PerlinGen } from "./PerlinGen";

export async function CPUGenerate() {
  const DVEW = DivineVoxelEngineWorld.instance;

  const numChunks = 4;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX =   16 * numChunks;
  let endZ =   16 * numChunks;

  const builder = DVEW.getBuilder();

  const tasks = DVEW.getTasksTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      PerlinGen.generateWorldColumn(x, z);
    //  tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }


  console.log("gen time", performance.now() - t1);
  const t2 = performance.now();
  //await ComputeTest(canvas);

 // await tasks.worldSun.queued.runAndAwait();
  await tasks.propagation.queued.runAndAwait();
  console.log("sun light time ", performance.now() - t2);

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXZ(x, z).buildColumn();
    }
  }
}
