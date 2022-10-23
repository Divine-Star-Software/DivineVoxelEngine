import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
RegisterVoxels(DVEW);
const builder = DVEW.getBuilder();
const load = () => {
    console.log("load");
    let startX = 0;
    let startZ = 0;
    let endX = 512;
    let endZ = 512;
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
};
const generate = () => {
    console.log("generate");
    let startX = 0;
    let startZ = 0;
    let endX = 512;
    let endZ = 512;
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            WorldGen.generateChunk(x, z);
        }
    }
};
DVEW.dataComm.listenForMessage("load", load);
await DVEW.$INIT();
self.DVEW = DVEW;
