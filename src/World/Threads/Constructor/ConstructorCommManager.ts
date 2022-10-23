import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { ConstructorTasks } from "../../../Data/Constants/InterComms/ConstructorTasks.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { WorldTasks } from "../../../Data/Constants/InterComms/WorldTasks.js";
import { DataSync } from "../../Data/DataSync.js";
import { BuildTasks } from "Meta/Tasks/Tasks.types.js";

const ccm = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
});

ccm.listenForMessage(WorldTasks.addToRebuildQue, (data) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 const substance = data[4];
 DVEW.queues.build.chunk.add([0, x, y, z, 1]);
});

ccm.listenForMessage(WorldTasks.runRebuildQue, () => {
 DVEW.queues.build.chunk.run();
});

ccm.listenForMessage(WorldTasks.syncShapeMap, (data) => {
 DVEW.dataSync.voxelDataCreator.setShapeMap(data[1]);
});

ccm.listenForMessage(WorldTasks.addToRGBLightUpdateQue, (data) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 DVEW.queues.rgb.update.add([x, y, z]);
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

DataSync.registerComm(CCM);
