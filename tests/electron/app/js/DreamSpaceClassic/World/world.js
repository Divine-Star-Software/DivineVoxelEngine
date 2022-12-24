import { WorldPlayer } from "../../Shared/Player/World/WorldPlayer.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
const brush = DVEW.getBrush();
DVEW.parentComm.listenForMessage("voxel-add", (data, event) => {
    brush
        .setId("dve_dreamstone")
        .setXYZ(data[1], data[2], data[3])
        .paintAndUpdate();
});
DVEW.parentComm.listenForMessage("voxel-remove", (data, event) => {
    brush.setXYZ(data[1], data[2], data[3]).eraseAndUpdate();
});
await DVEW.$INIT();
console.log("start");
const numChunks = 5;
let startX = -16 * numChunks;
let startZ = -16 * numChunks;
let endX = 16 * numChunks;
let endZ = 16 * numChunks;
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateWorldColumn(x, z);
        tasks.light.worldSun.add(x, z);
    }
}
await tasks.light.worldSun.runAndAwait();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
DVEW.nexusComm.sendMessage("ready");
await WorldPlayer(DVEW);
