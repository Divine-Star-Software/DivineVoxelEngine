import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";

RegisterVoxels(DVEW);
RegisterItemData(DVEW);
await DVEW.$INIT();
const builder = DVEW.getBuilder();
const dataTool = DVEW.getDataTool();
const brush = DVEW.getBrush();
DVEW.data.dimensions.registerDimension("other", {
 liquidFlowSpeed: 1,
 magmaFlowSpeed: 1,
 sunLight: true,
});

for (let x = -16; x <= 16; x += 16) {
 for (let z = -16; z <= 16; z += 16) {
  WorldGen.generateChunk("main", x, z);
 }
}
for (let x = -64; x <= -32; x += 16) {
 for (let z = -64; z <= -32; z += 16) {
  WorldGen.generateChunk("other", x, z);
 }
}

builder.setDimension("main");
for (let x = -16; x <= 16; x += 16) {
 for (let z = -16; z <= 16; z += 16) {
  builder.setXZ(x, z).buildColumn();
 }
}


let s = 0;
for (let x = -16; x <= 32; x += 3) {
 brush.setId("dve:dreamstone-stair").setXYZ(x, 6, 0).setShapeState(s).paint().clear();
 brush.setId("dve:markerbox").setXYZ(x, 6, -3).setState(s).paint().clear();
 brush.setId("dve:debugbox").setXYZ(x, 6, 3).paint().clear();
 s++;
 if(s > 15) break;
}

builder.setDimension("other");
for (let x = -64; x <= -32; x += 16) {
 for (let z = -64; z <= -32; z += 16) {
  builder.setXZ(x, z).buildColumn();
 }
}

GetAnalyzerCubeWorld(DVEW);

(self as any).DVEW = DVEW;
(self as any).dataTool = dataTool;
