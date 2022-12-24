import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
const ddepth = 64;
let startX = -ddepth;
let startZ = -ddepth;
let endX = ddepth;
let endZ = ddepth;
const builder = DVEW.getBuilder();
const load = () => {
    console.log("load");
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
};
RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT();
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
const brush = DVEW.getBrush();
brush.setId("dve_liquiddreadether").setXYZ(7, 47, 7).paint();
load();
const tasks = DVEW.getTasksTool();
setTimeout(() => {
    tasks.flow.update.add(7, 47, 7);
    tasks.flow.update.runAndAwait();
}, 2000);
self.DVEW = DVEW;
