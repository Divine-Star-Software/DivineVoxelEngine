import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
let depth = 32 * 2;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
/*  let startX = -128;
let startZ = -128;
let endX = 128;
let endZ = 128;  */
const generateAsync = async () => {
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            DVEW.generate(x, z);
        }
    }
};
const distance = (x1, x2, y1, y2) => {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
};
const builder = DVEW.getBuilder();
const load = () => {
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            let LOD = 1;
            const d = distance(x, 0, z, 0);
            if (d > 250) {
                LOD = 2;
            }
            if (d > 350) {
                LOD = 4;
            }
            if (d > 450) {
                LOD = 8;
            }
            builder.setLOD(LOD).setXZ(x, z).buildColumn();
        }
    }
};
RegisterVoxels(DVEW);
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT();
console.log("start");
let t1 = performance.now();
await generateAsync();
//generateSync();
let t2 = performance.now();
console.log(t2 - t1);
console.log("never end");
load();
self.DVEW = DVEW;
