import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";

RegisterVoxels(DVEW);

await DVEW.$INIT();

let startX = 0;
let startZ = 0;
let endX = 64;
let endZ = 64;
const builder = DVEW.getBuilder();
console.log("generate");

const generate = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   WorldGen.generateChunk(x, z);
   builder.setXZ(x, z).fillColumn();
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

const saveRegion = async () => {
 generate();
 console.log("saving");
 await dataLoader.setDimension("main").setXYZ(0, 0, 0).saveRegionAsync();
 console.log("done");
 build();
};

const saveColumns = async () => {
 console.log("saving columns");
 generate();
 dataLoader.setDimension("main");
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   await dataLoader.setXYZ(x, 0, z).saveColumnAsync();
  }
 }
 build();
};

const loadRegion = async () => {
 console.log("loading");
 await dataLoader.setDimension("main").setXYZ(0, 0, 0).loadRegionAsync();
 console.log("done");
 build();
};

const loadColumns = async () => {
 console.log("loading columns");
 dataLoader.setDimension("main");
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   await dataLoader.setXYZ(x, 0, z).loadColumnAsync();
  }
 }
 build();
};

const save = async () => {
 WorldGen.generateChunk(0, 0);
 builder.setXZ(0, 0).fillColumn().buildColumn();
 await dataLoader.setDimension("main").setXYZ(0, 0, 0).saveColumn();
};
const load = async () => {
 await dataLoader.setDimension("main").setXYZ(0, 0, 0).loadColumnAsync();
 dataLoader.columnExists((answer) => {
  console.log(answer);
 });
 dataLoader.columnTimestamp((timeStamp) => {
  console.log(timeStamp);
 });
 builder.setXZ(0, 0).buildColumn();
};

await loadColumns();

//await dataLoader.loadColumnAsync();

//await saveColumns();
