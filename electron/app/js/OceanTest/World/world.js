import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
await DVEW.$INIT({});
let startX = -128;
let startZ = -128;
let endX = 128;
let endZ = 128;
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, z);
    }
}
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        DVEW.buildChunk(x, 0, z);
    }
}
