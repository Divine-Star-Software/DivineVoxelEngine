import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
const ddepth = 64;
let startX = -ddepth;
let startZ = -ddepth;
let endX = ddepth;
let endZ = ddepth;
const load = () => {
 console.log("load");
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   if (DVEW.worldData.getWorldColumn(x, z)) {
    DVEW.buildWorldColumn(x, z);
   }
  }
 }
};
const fill = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   DVEW.worldData.fillWorldCollumnWithChunks(x, z);
   DVEW.queues.addWorldColumnToSunLightQue(x, z);
  }
 }
};

RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT({});

//DVEW.matrixCentralHub.syncGlobalVoxelPalette();
/* DVEW.dataComm.sendMessage("load", []); */
WorldGen.generateChunk(-32, 16, "pillar");
WorldGen.generateChunk(-32, -16, "pillar");
WorldGen.generateChunk(32, 16, "pillar");
WorldGen.generateChunk(32, -16, "pillar");
WorldGen.generateChunk(-16, 32, "pillar");
WorldGen.generateChunk(16, 32, "pillar");
WorldGen.generateChunk(-16, -32, "pillar");
WorldGen.generateChunk(16, -32, "pillar");

WorldGen.generateStairChunk("south", 0, -32);
WorldGen.generateStairChunk("west", -32, 0);

WorldGen.generateTemplate("south", 0, -48);
WorldGen.generateStairChunk("north", 0, 32);
WorldGen.generateTemplate("north", 0, 48);
WorldGen.generateStairChunk("east", 32, 0);
WorldGen.generateTemplate("east", 48, 0);

WorldGen.generateTemplate("west", -48, 0);

WorldGen.generateChunk(0, 0, "pond");
WorldGen.generateChunk(-16, 0);
WorldGen.generateChunk(-16, 16);
WorldGen.generateChunk(16, 0);
WorldGen.generateChunk(16, -16);
WorldGen.generateChunk(0, 16);
WorldGen.generateChunk(0, -16);

WorldGen.generateChunk(16, 16);

WorldGen.generateChunk(-16, -16);

DVEW.worldData.paintVoxel("dve:liquiddreadether", 0, 0, 7, 47, 7);
//fill();
let t1 = performance.now();
await DVEW.queues.runWorldColumnSunLightAndUpateQue();
let t2 = performance.now();
console.log(t2 - t1);
load();
/* DVEW.worldData.paintDualVoxel(
 "dve:liquiddreamether",
 0,
 0,
 "dve:dreamgrass",
 0,
 0,
 40,
 0
); */



setTimeout(() => {
 DVEW.queues.addToFlowRunQue(7, 47, 7);
 DVEW.queues.runFlowRuneQue();
}, 2000);


(self as any).DVEW = DVEW;
