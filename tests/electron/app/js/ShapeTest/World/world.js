import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { GenerateStairPillar } from "./Functions/StairPillar.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
const depth = 32;
let startX = -depth - 16;
let startZ = -depth;
let endX = depth * 4;
let endZ = depth * 4;
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
const buildAll = () => {
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
};
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateChunk(x, 0, z);
        tasks.light.worldSun.add(x, z);
    }
}
const x = 0;
const z = 0;
GetAnalyzerCubeWorld(DVEW);
const brush = DVEW.getBrush();
const doStairTest = (shapeState, x, y, z) => {
    brush
        .setId("dve_markerbox")
        .setState(shapeState)
        .setXYZ(x + 2, y + 1, z)
        .paint();
    brush
        .setState(0)
        .setShapeState(shapeState)
        .setId("dve_dreamstone-stair")
        .setXYZ(x, y + 1, z)
        .paint();
    x -= 2;
    brush.setXYZ(x, y, z).paint();
    x -= 2;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y, z - 1)
        .paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x, y, z)
        .paint();
    x -= 2;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y + 1, z - 1)
        .paint();
    brush.setXYZ(x, y, z - 1).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x, y, z)
        .paint();
    x -= 2;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y, z - 1)
        .paint();
    brush.setXYZ(x, y, z).paint();
    brush.setXYZ(x, y, z + 1).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x, y, z)
        .paint();
    x -= 2;
    brush.setId("dve_dreamstone").setShapeState(0).setXYZ(x, y, z).paint();
    brush.setXYZ(x - 2, y, z).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y + 1, z)
        .paint();
    brush.setXYZ(x - 2, y + 1, z).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush.setId("dve_dreamstone").setShapeState(0).setXYZ(x, y, z).paint();
    brush.setXYZ(x - 2, y + 1, z).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y + 1, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y + 1, z + 1)
        .paint();
    brush.setXYZ(x - 2, y + 1, z + 1).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y + 1, z - 1)
        .paint();
    brush.setXYZ(x - 2, y + 1, z - 1).paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y + 1, z + 1)
        .paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x - 2, y + 1, z + 1)
        .paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x, y + 1, z - 1)
        .paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    x -= 4;
    brush
        .setId("dve_dreamstone")
        .setShapeState(0)
        .setXYZ(x - 2, y + 1, z - 1)
        .paint();
    brush
        .setId("dve_dreamstone-stair")
        .setShapeState(shapeState)
        .setXYZ(x - 1, y, z)
        .paint();
    brush.setId("dve_dreamstone-stair").setShapeState(shapeState);
    x -= 4;
    brush
        .setXYZ(x, y, z)
        .paint()
        .setXYZ(x - 1, y, z)
        .paint()
        .setXYZ(x - 2, y, z)
        .paint();
    x -= 4;
    brush
        .setXYZ(x, y, z)
        .paint()
        .setXYZ(x, y, z - 1)
        .paint()
        .setXYZ(x - 2, y, z - 2)
        .paint();
    x -= 4;
    brush
        .setXYZ(x, y, z)
        .paint()
        .setXYZ(x, y + 1, z - 1)
        .paint()
        .setXYZ(x - 2, y + 2, z - 2)
        .paint();
    x -= 4;
    brush
        .setXYZ(x, y + 2, z)
        .paint()
        .setXYZ(x, y + 1, z - 1)
        .paint()
        .setXYZ(x - 2, y, z - 2)
        .paint();
    x -= 4;
    brush
        .setXYZ(x, y, z)
        .paint()
        .setXYZ(x - 1, y + 1, z)
        .paint()
        .setXYZ(x - 2, y + 2, z)
        .paint();
    x -= 4;
    brush
        .setXYZ(x, y + 2, z)
        .paint()
        .setXYZ(x - 1, y + 1, z)
        .paint()
        .setXYZ(x - 2, y, z)
        .paint();
};
const doVineTest = (x, y, z) => {
    for (let vy = y; vy < 60; vy++) {
        brush
            .setId("dve_dreamvine")
            .setShapeState(0)
            .setXYZ(x, vy, z)
            .paint()
            .setShapeState(1)
            .setXYZ(x - 2, vy, z)
            .paint()
            .setShapeState(2)
            .setXYZ(x - 4, vy, z)
            .paint()
            .setShapeState(3)
            .setXYZ(x - 6, vy, z)
            .paint();
        /*    brush
         .setId("dve_dreamstone")
         .setShapeState(0)
         .setXYZ(x, vy, z - 1)
         .paint()
         .setXYZ(x - 2, vy, z + 1)
         .paint()
         .setXYZ(x - 4, vy, z - 1)
         .paint()
         .setXYZ(x - 6, vy, z - 1)
         .paint(); */
    }
};
doVineTest(44, 22, 60);
doStairTest(15, 25, 25, 107);
doStairTest(14, 25, 25, 99);
doStairTest(13, 25, 25, 91);
doStairTest(12, 25, 25, 83);
doStairTest(11, 25, 16, 75);
doStairTest(10, 25, 16, 68);
doStairTest(9, 25, 16, 60);
doStairTest(8, 25, 16, 52);
doStairTest(7, 25, 25, 44);
doStairTest(6, 25, 25, 36);
doStairTest(5, 25, 25, 28);
doStairTest(4, 25, 25, 20);
doStairTest(0, 25, 16, 12);
doStairTest(1, 25, 16, 4);
doStairTest(2, 25, 16, -4);
doStairTest(3, 25, 16, -12);
for (let z = -20; z < 100; z += 16) {
    GenerateStairPillar(brush, 35, 16, z, 10, "dve_dreamstone-stair", "dve_dreamstone");
}
//-1 10 0
//0 10 -1
await tasks.light.worldSun.runAndAwait();
console.log("go");
//await tasks.light.rgb.update.runAndAwait();
brush.setId("dve_debugbox");
brush.setXYZ(30, 26, 107).paintAndUpdate();
brush.setXYZ(30, 26, 99).paintAndUpdate();
brush.setXYZ(30, 26, 91).paintAndUpdate();
brush.setXYZ(30, 26, 83).paintAndUpdate();
brush.setXYZ(30, 26, 75).paintAndUpdate();
brush.setXYZ(30, 20, 68).paintAndUpdate();
brush.setXYZ(30, 20, 69).paintAndUpdate();
brush.setXYZ(30, 20, 52).paintAndUpdate();
brush.setXYZ(30, 20, 44).paintAndUpdate();
brush.setXYZ(30, 20, 36).paintAndUpdate();
brush.setXYZ(30, 20, 28).paintAndUpdate();
brush.setXYZ(30, 20, 20).paintAndUpdate();
brush.setXYZ(30, 20, 12).paintAndUpdate();
brush.setXYZ(30, 20, 4).paintAndUpdate();
brush.setXYZ(30, 20, -4).paintAndUpdate();
brush.setXYZ(30, 20, -12).paintAndUpdate();
buildAll();
self.DVEW = DVEW;
