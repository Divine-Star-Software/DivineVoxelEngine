import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { PlayerWatcher } from "./PlayerWatcher/PlayerWatcher.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
const playerWatcher = new PlayerWatcher(DVEW);
const brush = DVEW.getBrush();
DVEW.parentComm.listenForMessage("voxel-add", (data, event) => {
    brush
        .setId("dve:dreamstone")
        .setXYZ(data[1], data[2], data[3])
        .paintAndUpdate();
});
DVEW.parentComm.listenForMessage("voxel-remove", (data, event) => {
    brush.setXYZ(data[1], data[2], data[3]).ereaseAndUpdate();
});
DVEW.parentComm.listenForMessage("connect-player", (data, event) => {
    playerWatcher.setPlayerSharedArrays(data);
    playerWatcher.startWatchingPlayer();
});
await DVEW.$INIT();
console.log("start");
const numChunks = 5;
let startX = -16 * numChunks;
let startZ = -16 * numChunks;
let endX = 16 * numChunks;
let endZ = 16 * numChunks;
const builder = DVEW.getBuilder();
let t1 = performance.now();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateWorldColumn(x, z);
    }
}
let t2 = performance.now();
console.log(t2 - t1);
console.log("done");
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
