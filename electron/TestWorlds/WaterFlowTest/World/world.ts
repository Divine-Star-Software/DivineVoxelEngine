import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
const load = () => {
 console.log("load");

 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   DVEW.buildWorldColumn(x, z);
  }
 }
};

const generate = () => {
 console.log("generate");
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   WorldGen.generateChunk(x, z);
  }
 }
};

RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT({});

DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, 7, 45, 7);
;
generate();
load();

setTimeout(async () => {
 DVEW.queues.addToFlowRunQue(7, 45, 7);

 DVEW.queues.runFlowRuneQue();

 await DVEW.queues.awaitAllFlowRuns();

 setTimeout(async () => {
  DVEW.queues.addToFlowRemoveQue(7, 45, 7);
  DVEW.queues.runFlowRemoveQue();
  await DVEW.queues.awaitAllFlowRemoves();
  console.log("all done");
  load();
 }, 1000);
}, 2000);

(self as any).DVEW = DVEW;
