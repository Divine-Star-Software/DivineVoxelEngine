import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { DVEM } from "../../../out/Math/DivineVoxelEngineMath.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
RegisterVoxels(DVEW);
RegisterItemData(DVEW);
self.DVEW = DVEW;
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
const load = () => {
    console.log("load");
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            DVEW.buildWorldColumn(x, z);
        }
    }
};
const generate = () => {
    console.log("generate");
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            DVEW.worldData.fillWorldCollumnWithChunks(x, z);
            WorldGen.generateChunk(x, z);
        }
    }
};
let ready = false;
let cameraDirection = new Float32Array();
let cameraPosition = new Float32Array();
let pickerCubePosition = new Float32Array();
DVEW.renderComm.listenForMessage("connect-camera", (data) => {
    cameraDirection = new Float32Array(data[1]);
    cameraPosition = new Float32Array(data[2]);
    pickerCubePosition = new Float32Array(data[3]);
    ready = true;
});
await DVEW.$INIT({});
generate();
DVEW.worldData.paintVoxel("dve:dataholder", "default", 0, 11, 31, 31);
DVEW.worldData.paintVoxel("dve:dataholder", "default", 0, 9, 31, 31);
DVEW.worldData.paintVoxel("dve:dataholder", "default", 0, 7, 31, 31);
DVEW.worldData.paintVoxel("dve:dataholder", "default", 0, 5, 31, 31);
DVEW.worldData.paintVoxel("dve:dataholder", "default", 0, 3, 31, 31);
load();
await DVEW.UTIL.createPromiseCheck({
    check: () => ready,
    checkInterval: 1,
});
const positionVector = DVEM.getVector3(0, 0, 0);
const pickedVector = DVEM.getVector3(0, 0, 0);
DVEW.renderComm.listenForMessage("pick-voxel", (data) => {
    const voxel = DVEW.worldData.getVoxel(pickedVector.x, pickedVector.y, pickedVector.z);
    if (voxel && voxel[0] != -1) {
        const voxelData = voxel[0];
        if (voxelData.rich) {
            DVEW.richWorldComm.sendMessage("pick-voxel", [
                pickedVector.x,
                pickedVector.y,
                pickedVector.z,
            ]);
        }
    }
});
setInterval(() => {
    positionVector.updateFromArray(cameraPosition);
    const pickVector = {
        x: cameraDirection[0] * 8 + cameraPosition[0],
        y: cameraDirection[1] * 8 + cameraPosition[1],
        z: cameraDirection[2] * 8 + cameraPosition[2],
    };
    const voxels = DVEM.visitAll(positionVector, pickVector);
    for (let i = 0; i < voxels.length; i += 3) {
        const x = voxels[i];
        const y = voxels[i + 1];
        const z = voxels[i + 2];
        const voxel = DVEW.worldData.getVoxel(x, y, z);
        if (voxel && voxel[0] != -1) {
            pickedVector.updateVector(x, y, z);
            pickerCubePosition[0] = x;
            pickerCubePosition[1] = y;
            pickerCubePosition[2] = z;
            break;
        }
    }
}, 20);
DVEW.entityConstructor.begin(3, 3, 3);
DVEW.entityConstructor.fillLight(15, 15, 15, 15);
DVEW.entityConstructor.addVoxel("dve:dreamstone-stair", "default", 0, 1, 1, 1);
DVEW.entityConstructor.build(8, 33, 0);
DVEW.createItem("dve:debug-item", 3, 35, 0);
DVEW.createItem("dve:dreamvine-item", 3, 35, 5);
