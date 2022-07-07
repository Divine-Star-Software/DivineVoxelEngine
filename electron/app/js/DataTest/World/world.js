import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
RegisterVoxels(DVEW);
const load = () => {
    console.log("load");
    let startX = 0;
    let startZ = 0;
    let endX = 512;
    let endZ = 512;
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            DVEW.buildChunk(x, 0, z);
        }
    }
};
const generate = () => {
    console.log("generate");
    let startX = 0;
    let startZ = 0;
    let endX = 512;
    let endZ = 512;
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            WorldGen.generateChunk(x, z);
        }
    }
};
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT({
    onReady: () => { },
});
DVEW.matrixCentralHub.syncGlobalVoxelPalette();
/* DVEW.dataComm.sendMessage("load", []); */
/*
 WorldGen.generateChunk(0, 0);
WorldGen.generateChunk(-16, 0);
WorldGen.generateChunk(16, 0);
WorldGen.generateChunk(0, 16);
WorldGen.generateChunk(0, -16);

WorldGen.generateChunk(-16, 16, "pillar");
WorldGen.generateChunk(16, 16);
WorldGen.generateChunk(16, -16, "pillar");
WorldGen.generateChunk(-16, -16);
*/
/*  generate();
load();
DVEW.dataComm.sendMessage("load", []);   */
self.DVEW = DVEW;
