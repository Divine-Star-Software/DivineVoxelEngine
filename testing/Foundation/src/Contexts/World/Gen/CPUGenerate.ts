import { DVEFWorldCore } from "@divinevoxel/foundation/Contexts/World/DVEFWorldCore"
import { PerlinGen } from "./PerlinGen";
import { WorldGen } from "./WorldGen";

export async function CPUGenerate() {

  const numChunks = 4;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const builder = DVEFWorldCore.instance.getBuilder();

  const tasks = DVEFWorldCore.instance.getTasksTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXZ(x, z).fillColumn();
      PerlinGen.generateWorldColumn(x, z);
      tasks.propagation.queued.add(["main", x, 0, z]);
      //  tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }
  //WorldGen.brush.setXYZ(0, 60, 0).setId("dve_dream_lamp").paint();

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
