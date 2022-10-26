import { ConstructorTasks } from "../../../Data/Constants/Contracts/ConstructorTasks.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { WorldTasks } from "../../../Data/Constants/Contracts/WorldTasks.js";
import { BuildTasks } from "Meta/Tasks/Tasks.types.js";
import { ConstructorQueues } from "../../Queues/ConstructorQueues.js";

const ccm = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
});

export const CCM = Object.assign(ccm, {
 tasks: {
  build: {
   chunk: (data: BuildTasks) => {
    return CCM.runTask(ConstructorTasks.buildChunk, data);
   },
   entity: (
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    height: number,
    composed: number,
    voxelData: Uint32Array[],
    voxelStateData: Uint32Array[]
   ) => {
    const transferArray: any[] = [];
    const dataArray: any[] = [];
    for (let i = 0; i < voxelData.length; i++) {
     dataArray.push(voxelData[i], voxelStateData[i]);
     transferArray.push(voxelData[i].buffer, voxelStateData[i].buffer);
    }
    return ccm.runTask(
     ConstructorTasks.constructEntity,
     [x, y, z, width, depth, height, composed, ...transferArray],
     transferArray
    );
   },
   item: (data: any) => {
    return CCM.runTask(ConstructorTasks.constructItem, data);
   },
  },
  rgb: {
   update: (data: any) => {
    return CCM.runTask(ConstructorTasks.RGBlightUpdate, data);
   },
   remove: (data: any) => {
    return CCM.runTask(ConstructorTasks.RGBlightRemove, data);
   },
  },
  worldSun: {
   fillWorldColumn: (data: any) => {
    return CCM.runTask(ConstructorTasks.worldSunStep1, data);
   },
   updateAtMaxY: (data: any) => {
    return CCM.runTask(ConstructorTasks.worldSunStep2, data);
   },
   floodAtMaxY: (data: any, threadNumber: number) => {
    return CCM.runTask(ConstructorTasks.worldSunStep3, data, [], threadNumber);
   },
  },
  sun: {
   update: (data: any) => {
    return CCM.runTask(ConstructorTasks.sunLightUpdate, data);
   },
   remove: (data: any) => {
    return CCM.runTask(ConstructorTasks.sunLightRemove, data);
   },
  },
  flow: {
   update: (data: any) => {
    return CCM.runTask(ConstructorTasks.flowUpdate, data);
   },
   remove: (data: any) => {
    return CCM.runTask(ConstructorTasks.flowRemove, data);
   },
  },
  worldGen: {
   generate: (data: any) => {
    return CCM.runTask(ConstructorTasks.generate, data);
   },
  },
 },
});

