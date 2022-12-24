import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
self.DVEW = DVEW;
let startX = -64;
let startZ = -64;
let endX = 64;
let endZ = 64;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
    }
}
const tasks = DVEW.getTasksTool();
await tasks.light.rgb.update.runAndAwait();
const builder = DVEW.getBuilder();
const buildAll = () => {
    console.log("build all");
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
};
buildAll();
const brush = DVEW.getBrush();
brush.setId("dve_dreadlamp");
const y = 60;
let remove = false;
const run = async () => {
    for (let x = startX; x < endX + 16; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            await brush.setXYZ(x + 7, y + 7, z + 7).paintAndAwaitUpdate();
            await brush.setXYZ(x + 7 - 16, y + 7, z + 7).eraseAndAwaitUpdate();
        }
    }
    for (let z = startZ; z < endZ; z += 16) {
        await brush.setXYZ(endX + 16 + 7 - 16, y + 7, z + 7).eraseAndAwaitUpdate();
    }
    await run();
};
setTimeout(() => {
    console.log("go");
    run();
}, 1000);
