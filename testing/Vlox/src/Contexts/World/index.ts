import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World";
import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { ShapeTest } from "./ShapeTest";
import { DVEVoxelData } from "Data/VoxelData";
import { ForestTest } from "./ForestTest";
import { flatTest } from "./FlatTest";

console.log("starting world");
const DVEW = await StartWorld({
  nexusEnabled: false,
  richWorldEnabled: false,
  voxels: DVEVoxelData,
});

console.log("world start");
DVEW.TC.registerTasks("start-world", async () => {
  console.log("cpu gen start");
  await flatTest();
  console.log("cpu gen end");
});
