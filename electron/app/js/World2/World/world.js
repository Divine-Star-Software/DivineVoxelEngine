import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
const load = () => {
    console.log("load");
    let startX = -16;
    let startZ = -16;
    let endX = 16;
    let endZ = 16;
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            DVEW.buildChunk(x, 0, z);
        }
    }
};
RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT({});
//DVEW.matrixCentralHub.syncGlobalVoxelPalette();
/* DVEW.dataComm.sendMessage("load", []); */
WorldGen.generateChunk(0, 0, "pond");
WorldGen.generateChunk(-16, 0);
WorldGen.generateChunk(16, 0);
WorldGen.generateChunk(0, 16);
WorldGen.generateChunk(0, -16);
WorldGen.generateChunk(-16, 16, "pillar");
WorldGen.generateChunk(16, 16);
WorldGen.generateChunk(16, -16, "pillar");
WorldGen.generateChunk(-16, -16);
DVEW.worldData.paintVoxel("dve:debugbox", "default", 2, 0, 40, 4);
DVEW.worldData.paintVoxel("dve:debugbox", "default", 0, 0, 40, 6);
DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, 0, 40, -1);
DVEW.worldData.paintVoxel("dve:dreamstone", "no-grass", 0, 0, 40, 0);
DVEW.worldData.paintVoxel("dve:dreamstoneslab", "default", 0, 0, 40, -2);
load();
self.DVEW = DVEW;
