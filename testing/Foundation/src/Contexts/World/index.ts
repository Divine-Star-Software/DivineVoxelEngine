import { ComputeShaderGenerate } from "./Gen/ComputeShaderGenerate";
import { DivineVoxelEngineWorld } from "@divinevoxel/core/Contexts/World";
import { StartWorld } from "@divinevoxel/foundation/Default/Init/StartWorld";
import { CPUGenerate } from "./Gen/CPUGenerate";
import { DVEVoxelData } from "Data/VoxelData";

console.log("starting world");
await StartWorld({
  nexusEnabled: false,
  richWorldEnabled: false,
  voxels: DVEVoxelData,
});

let doComputeGen = false;

console.log("world start");
DivineVoxelEngineWorld.instance.TC.registerTasks("start-world", async () => {
  if (doComputeGen) {
    await ComputeShaderGenerate();
  } else {
    console.log("cpu gen start");
    await CPUGenerate();
    console.log("cpu gen end");
  }
});
