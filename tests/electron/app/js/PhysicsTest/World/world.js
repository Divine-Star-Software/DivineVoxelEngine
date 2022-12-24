import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
const builder = DVEW.getBuilder();
const brush = DVEW.getBrush();
const depth = 64;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
for (let x = startX - 16; x < endX + 16; x += 16) {
    for (let z = startZ - 16; z < endZ + 16; z += 16) {
        builder.setXZ(x, z).fillColumn();
    }
}
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, z);
    }
}
brush.setId("dve_dreamstone-stair");
for (let i = 0; i < 6; i++) {
    brush.setXYZ(7, 6 + i, 5 - i);
}
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
self.DVEW = DVEW;
