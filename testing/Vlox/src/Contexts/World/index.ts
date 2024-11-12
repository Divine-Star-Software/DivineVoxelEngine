import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World";
import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { CPUGenerate } from "./Gen/CPUGenerate";
import { DVEVoxelData } from "Data/VoxelData";

console.log("starting world");
await StartWorld({
  nexusEnabled: false,
  richWorldEnabled: false,
  voxels: DVEVoxelData,
});

console.log("world start");
DivineVoxelEngineWorld.instance.TC.registerTasks("start-world", async () => {

    console.log("cpu gen start");
    await CPUGenerate();
    console.log("cpu gen end");
 
});
