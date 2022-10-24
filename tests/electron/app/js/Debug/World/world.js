import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
RegisterVoxels(DVEW);
RegisterItemData(DVEW);
await DVEW.$INIT();
self.DVEW = DVEW;
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        WorldGen.generateChunk(x, z);
    }
}
const brush = DVEW.getBrush();
brush.setId("dve:liquiddreamether").setXYZ(5, 10, 5).paint();
brush.setId("dve:dreamstone").setXYZ(6, 10, 5).paint();
const builder = DVEW.getBuilder();
for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
const dataTool = DVEW.getDataTool();
dataTool.loadIn(5, 10, 5);
console.log(dataTool);
self.dataTool = dataTool;
