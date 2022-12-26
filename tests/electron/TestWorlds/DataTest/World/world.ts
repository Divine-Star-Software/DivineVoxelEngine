import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

RegisterVoxels(DVEW);

await DVEW.$INIT();

let startX = 0;
let startZ = 0;
let endX = 512;
let endZ = 512;
const builder = DVEW.getBuilder();
console.log("generate");

const generate = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   WorldGen.generateChunk(x, z);
   builder.setXZ(x, z);
  }
 }
};

const build = () => {
 console.log("build");
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   builder.setXZ(x, z).buildColumn();
  }
 }
};

(self as any).DVEW = DVEW;

const dataLoader = DVEW.getDataLoaderTool();

const save = async () => {
 generate();
 console.log("saving");
 await dataLoader.setDimension("main").setPosition(0, 0, 0).saveRegionAsync();
 console.log("done");
 build();
};

const load = async () => {
 console.log("loading");
 await dataLoader.setDimension("main").setPosition(0, 0, 0).loadRegionAsync();
 console.log("done");
 build();
};



await save();