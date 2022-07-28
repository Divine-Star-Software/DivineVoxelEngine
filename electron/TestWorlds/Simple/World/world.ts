import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

const load = () => {
 console.log("load");
 let startX = -48;
 let startZ = -48;
 let endX = 48;
 let endZ = 48;
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   if (DVEW.worldData.getWorldColumn(x, z)) {
    DVEW.buildWorldColumn(x, z);
   }
  }
 }
};

RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT({});

//DVEW.matrixCentralHub.syncGlobalVoxelPalette();
/* DVEW.dataComm.sendMessage("load", []); */
WorldGen.generateChunk(-16, 16, "pillar");
WorldGen.generateChunk(16, -16, "pillar");
WorldGen.generateChunk(0, -32, "stair");
WorldGen.generateChunk(0, -48, "temple");
WorldGen.generateChunk(0, 0, "pond");
WorldGen.generateChunk(-16, 0);
WorldGen.generateChunk(16, 0);
WorldGen.generateChunk(0, 16);
WorldGen.generateChunk(0, -16);

WorldGen.generateChunk(16, 16);

WorldGen.generateChunk(-16, -16);

DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, 7, 47, 7);



load();
DVEW.worldData.paintDualVoxel(
    "dve:liquiddreamether",
    "default",
    0,
    "dve:dreamgrass",
    "default",
    0,
    40,
    0
   );



setTimeout(() => {
 DVEW.queues.addToFlowRunQue(7, 47, 7);
 DVEW.queues.runFlowRuneQue();
}, 2000);

(DVEW as any).worldData.setLevelState(1, 0, 0, 0);

const data = (DVEW as any).worldData.getLevelState(0, 0, 0);
console.log(data);
(self as any).DVEW = DVEW;
