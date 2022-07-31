import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);

await DVEW.$INIT({});

const depth = 32;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth * 4;

const buildAll = () => {
 for (let x = startX; x < endX; x += 16) {
  for (let z = startZ; z < endZ; z += 16) {
   DVEW.buildChunk(x, 0, z);
  }
 }
};

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
  // DVEW.queues.addWorldColumnToSunLightQue(x, z);
 }
}

const x = 0;
const z = 0;

const doStairTest = (shapeState : number, x : number, y : number, z : number) => {
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y + 1, z);
    x-= 2;
    
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z);
    x-= 2;
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z);
    
    x-= 2;
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y + 1, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z);
    
    x-= 2;
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z);
    
    x-= 2;
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x - 2, y, z);

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y + 1, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x - 2, y + 1, z);
    
    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 1, y + 1, z);
    DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x - 2, y, z);
    

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x , y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 2, y, z);

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x , y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z - 2);

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x , y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y + 1, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y + 2, z - 2);

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x , y + 2, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y + 1, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x, y, z - 2);

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x , y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 1, y + 1, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 2, y + 2, z);

    x-= 4;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x , y + 2, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 1, y + 1, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", shapeState, x - 2, y , z);
    
}
doStairTest(15,25,25,107);
doStairTest(14,25,25,99);
doStairTest(13,25,25,91);
doStairTest(12,25,25,83);
doStairTest(11,25,16,75);
doStairTest(10,25,16,68);
doStairTest(9,25,16,60);
doStairTest(8,25,16,52);
doStairTest(7,25,25,44);
doStairTest(6,25,25,36);
doStairTest(5,25,25,28);
doStairTest(4,25,25,20);
doStairTest(0,25,16,12);
doStairTest(1,25,16,4);
doStairTest(2,25,16,-4);
doStairTest(3,25,16,-12);
//-1 10 0
//0 10 -1
buildAll();
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 107);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 99);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 91);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 83);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, 75);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, 68);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, 60);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, 52);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 44);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 36);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 28);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 26, 20);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, 12);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, 4);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, -4);
await DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", 0, 30, 20, -12);

(self as any).DVEW = DVEW;
