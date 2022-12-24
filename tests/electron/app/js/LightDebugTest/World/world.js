import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
const brush = DVEW.getBrush();
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
await DVEW.$INIT();
const depth = 32;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
const buildAll = () => {
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
};
const runLightRemove = () => {
    setTimeout(async () => {
        await brush.setXYZ(x, 12, z + 5).eraseAndAwaitUpdate();
        buildAll();
    }, 2000);
};
const runAdd = () => {
    setTimeout(async () => {
        await brush.setId("dve_dreamstone").setXYZ(0, 10, 0).paintAndAwaitUpdate();
        await brush.setId("dve_dreamstone").setXYZ(0, 10, -10).paintAndAwaitUpdate();
        runLightRemove();
    }, 2000);
};
const runRemove = () => {
    setTimeout(async () => {
        await brush.setXYZ(x, 10, -10).eraseAndAwaitUpdate();
        await brush.setXYZ(x, 10, z).eraseAndAwaitUpdate();
        runAdd();
    }, 2000);
};
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
        tasks.light.worldSun.add(x, z);
    }
}
const x = 0;
const z = 0;
let t1 = performance.now();
console.log("start");
await tasks.light.worldSun.runAndAwait();
let t2 = performance.now();
console.log("end");
console.log(t2 - t1);
//-1 10 0
//0 10 -1
buildAll();
await brush.setId("dve_dreamlamp").setXYZ(23, 6, -6).paintAndAwaitUpdate();
setTimeout(async () => {
    await brush.setId("dve_dreamlamp").setXYZ(0, 12, 5).paintAndAwaitUpdate();
    runRemove();
}, 2000);
self.DVEW = DVEW;
