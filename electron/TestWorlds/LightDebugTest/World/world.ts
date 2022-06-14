import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);

await DVEW.$INIT({
 onReady: () => {},
});

const depth = 32;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;

const buildAll = () => {
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunk(x, 0, z);
  }
 }
};
const runLightRemove = () => {
 setTimeout(async () => {
  await DVEW.worldData.requestVoxelBeRemoved(x, 12, z + 5);
  buildAll();
 }, 2000);
};
const runAdd = () => {
 setTimeout(async () => {
  await DVEW.worldData.requestVoxelAdd("dve:dreamstone", "default", 0, 10, 0);
  await DVEW.worldData.requestVoxelAdd("dve:dreamstone", "default", 0, 10, -10);
  runLightRemove();
 }, 2000);
};
const runRemove = () => {
 setTimeout(async () => {
  await DVEW.worldData.requestVoxelBeRemoved(x, 10, -10);
  await DVEW.worldData.requestVoxelBeRemoved(x, 10, z);

  runAdd();
 }, 2000);
};

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
  DVEW.queues.addWorldColumnToSunLightQue(x, z);
 }
}

const x = 0;
const z = 0;
await DVEW.queues.runWorldColumnSunLightAndUpateQue();

//-1 10 0
//0 10 -1
buildAll();
setTimeout(async () => {
 await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x, 12, z + 5);
 runRemove();
}, 2000);
(self as any).DVEW = DVEW;
