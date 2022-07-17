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

/*
DVEW.worldData.paintVoxel("dve:debugbox", "default", 2, 0, 40, 4);
DVEW.worldData.paintVoxel("dve:debugbox", "default", 0, 0, 40, 6);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 0, 40, -1);
DVEW.worldData.paintVoxel("dve:dreamstone", "no-grass", 0, 0, 40, 0);
DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", 0, 0, 40, -2);

for (let y = 35; y < 50; y++) {
 //north
 DVEW.worldData.paintVoxel("dve:dreamvine", "default", 1, 3, y, -2);
 DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 3, y, -1);
 //south
 DVEW.worldData.paintVoxel("dve:dreamvine", "default", 0, 3, y, 0);
 //east
 DVEW.worldData.paintVoxel("dve:dreamvine", "default", 2, 3, y, 2);
 DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 4, y, 2);
 //west
 DVEW.worldData.paintVoxel("dve:dreamvine", "default", 3, 3, y, 4);
 DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 2, y, 4);
 //top
 DVEW.worldData.paintVoxel("dve:dreamvine", "default", 4, 3, y, 6);
 //bottom
 DVEW.worldData.paintVoxel("dve:dreamvine", "default", 5, 3, y, 8);
}
*/

DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, 7, 47, 7);
load();

DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, 7, 34, 11);

setTimeout(() => {
 DVEW.queues.addToFlowRunQue(7, 47, 7);
 DVEW.queues.runFlowRuneQue();
}, 2000);

(DVEW as any).worldData.setLevelState(1, 0, 0, 0);

const data = (DVEW as any).worldData.getLevelState(0, 0, 0);
console.log(data);
(self as any).DVEW = DVEW;
