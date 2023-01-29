import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
import { VoxelMath } from "../../../out/Math/VoxelMath.js";

RegisterVoxels(DVEW);
RegisterItemData(DVEW);

(self as any).DVEW = DVEW;
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
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

let ready = false;
let cameraDirection = new Float32Array();
let cameraPosition = new Float32Array();
let pickerCubePosition = new Float32Array();
DVEW.parentComm.listenForMessage("connect-camera", (data) => {
 cameraDirection = new Float32Array(data[1]);
 cameraPosition = new Float32Array(data[2]);
 pickerCubePosition = new Float32Array(data[3]);
 ready = true;
});

await DVEW.$INIT();

generate();
const brush = DVEW.getBrush();
for (let i = 13; i > -2; i -= 2) {
 brush.setId("dve_dataholder").setXYZ(i, 31, 31).paint();
}

load();

await DVEW.UTIL.createPromiseCheck({
 check: () => ready,
 checkInterval: 1,
});

const positionVector = VoxelMath.getVector3(0, 0, 0);

const pickedVector = VoxelMath.getVector3(0, 0, 0);

const dataTool = DVEW.getDataTool();
DVEW.parentComm.listenForMessage("pick-voxel", (data) => {
 if (!dataTool.loadInAt(pickedVector.x, pickedVector.y, pickedVector.z)) return;
 if (!dataTool.isRenderable()) return;
 const voxel = dataTool.getStringId();
 const voxelData = DVEW.voxelManager.getVoxelData(voxel);
 if (!voxelData) return;
 if (voxelData.isRich) {
  DVEW.richWorldComm.sendMessage("pick-voxel", [
   pickedVector.x,
   pickedVector.y,
   pickedVector.z,
  ]);
 }
});

setInterval(() => {
 positionVector.updateFromArray(cameraPosition);

 const pickVector = {
  x: cameraDirection[0] * 8 + cameraPosition[0],
  y: cameraDirection[1] * 8 + cameraPosition[1],
  z: cameraDirection[2] * 8 + cameraPosition[2],
 };
 const voxels = VoxelMath.visitAll(positionVector, pickVector);

 for (let i = 0; i < voxels.length; i += 3) {
  const x = voxels[i];
  const y = voxels[i + 1];
  const z = voxels[i + 2];

  if (!dataTool.loadInAt(x, y, z)) continue;
  if (!dataTool.isRenderable()) continue;

  pickedVector.updateVector(x, y, z);
  pickerCubePosition[0] = x;
  pickerCubePosition[1] = y;
  pickerCubePosition[2] = z;
  break;
 }
}, 20);

DVEW.createItem("dve_debug-item", 3, 35, 0);
DVEW.createItem("dve_dreamvine-item", 3, 35, 5);
/* DVEW.entityConstructor.begin(3, 3, 3);
DVEW.entityConstructor.fillLight(15, 15, 15, 15);
DVEW.entityConstructor.addVoxel("dve_dreamstone-stair", 0, 0, 1, 1, 1);
DVEW.entityConstructor.build(8, 33, 0);



 */
