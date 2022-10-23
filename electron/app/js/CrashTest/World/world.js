import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
RegisterVoxels(DVEW);
const depth = 16;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;
const builder = DVEW.getBuilder();
const load = () => {
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
};
const generate = () => {
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            WorldGen.generateChunk(x, z);
        }
    }
};
await DVEW.$INIT();
generate();
load();
self.DVEW = DVEW;
