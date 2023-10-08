import { DivineVoxelEngineWorld } from "@divinevoxel/core/World";
import { WorldGen } from "./WorldGen";

export async function GenerateWorld() {
  const DVEW = DivineVoxelEngineWorld.instance;
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const builder = DVEW.getBuilder();
  const tasks = DVEW.getTasksTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      WorldGen.generateWorldColumn(x, z);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }
  await tasks.worldSun.queued.runAndAwait();
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXZ(x, z).buildColumn();
    }
  }
}
