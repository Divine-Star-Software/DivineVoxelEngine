import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterVoxels(DVEW);

await DVEW.$INIT();

const brush = DVEW.getBrush();
const builder = DVEW.getBuilder();

const fillWithChunks = () => {
 let startX = -64;
 let startZ = -64;
 let endX = 64;
 let endZ = 64;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   builder.setXZ(x, z).fillColumn();
  }
 }
};

const topBottomTest = async () => {
 let startX = -16;
 let startZ = -16;
 let endX = 16;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z, 0);
  }
 }
};

const northSouthTest = async () => {
 let startX = -48;
 let startZ = -16;
 let endX = -16;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z, 1);
  }
 }
};

const eastWestTest = async () => {
 let startX = 16;
 let startZ = -16;
 let endX = 48;
 let endZ = 16;

 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   WorldGen.generateChunk(x, 0, z, 2);
  }
 }
};

fillWithChunks();

brush
 .setId("dve_dreamstone")
 .setXYZ(-15, 17, 15)
 .paint()
 .setXYZ(-15, 17, 14)
 .paint();

topBottomTest();
northSouthTest();
eastWestTest();

brush.setId("dve_debugbox").setXYZ(0, 16, 0).paintAndAwaitUpdate();
brush
 .setId("dve_debugbox")
 .setXYZ(-48 + 16, 16, 1)
 .paintAndAwaitUpdate();
brush
 .setId("dve_debugbox")
 .setXYZ(16 + 14, 16, 1)
 .paintAndAwaitUpdate();

(self as any).DVEW = DVEW;
