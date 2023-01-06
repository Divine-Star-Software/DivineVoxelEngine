import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";
import { GetWorldCommands } from "../../Shared/Commands/World/WorldCommands.js";
RegisterVoxels(DVEW);
RegisterItemData(DVEW);
GetWorldCommands();
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
for (let x = 0; x < 16; x++) {
    let y = 5;
    for (let z = 0; z <= 10; z += 1) {
        brush.setId("dve_dreamstone-stair");
        if (x == 0 || x == 15) {
            brush.setId("dve_dreamstone");
        }
        brush.setXYZ(x, y, z).setShapeState(0).paint().clear();
        y++;
    }
}
brush.setId("dve_debugbox").setXYZ(20, 7, 0).paint();
builder.setDimension("other");
for (let x = -64; x <= -32; x += 16) {
    for (let z = -64; z <= -32; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
GetAnalyzerCubeWorld(DVEW);
self.DVEW = DVEW;
self.dataTool = dataTool;
