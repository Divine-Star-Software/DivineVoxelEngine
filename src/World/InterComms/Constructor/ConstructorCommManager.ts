import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { ConstructorTasks } from "../../../Constants/InterComms/ConstructorTasks.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { WorldTasks } from "../../../Constants/InterComms/WorldTasks.js";

const ccm = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {
  DVEW.matrixCentralHub.registerThread(commName, port);
  DVEW.matrixCentralHub.syncVoxelPaletteInThread(commName);
 },
});

ccm.listenForMessage(WorldTasks.addToRebuildQue, (data) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 const substance = data[4];

 DVEW.queues.addToRebuildQue(x, y, z, substance);
});

ccm.listenForMessage(WorldTasks.runRebuildQue, () => {
 DVEW.queues.runRebuildQue();
});

ccm.listenForMessage(WorldTasks.syncShapeMap, (data) => {
 DVEW.matrixMap.setShapeMap(data[1]);
});

ccm.listenForMessage(WorldTasks.addToRGBLightUpdateQue, (data) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 DVEW.queues.addToRGBUpdateQue(x, y, z);
});

export const CCM = Object.assign(ccm, {
 $INIT(statesSAB: SharedArrayBuffer) {
  for (const constructor of ccm.__comms) {
   constructor.sendMessage(ConstructorTasks.setQueueStates, [statesSAB]);
  }
 },

 syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number) {
  for (const constructor of ccm.__comms) {
   DVEW.matrixCentralHub.syncChunkInThread(
    constructor.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number) {
  for (const constructor of ccm.__comms) {
   DVEW.matrixCentralHub.releaseChunkInThread(
    constructor.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number) {
  for (const constructor of ccm.__comms) {
   DVEW.matrixCentralHub.syncRegionInThread(
    constructor.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number) {
  for (const constructor of ccm.__comms) {
   DVEW.matrixCentralHub.releaseRegionInThread(
    constructor.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 tasks: {
  build: {
   chunk: (data: any) => {
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
    return CCM.runTask(ConstructorTasks.fillWorldColumnWithSunLight, data);
   },
   updateAtMaxY: (data: any) => {
    return CCM.runTask(ConstructorTasks.runSunLightUpdateAtMaxY, data);
   },
   floodAtMaxY: (data: any, threadNumber: number) => {
    return CCM.runTask(
     ConstructorTasks.runSunLightUpdateMaxYFlood,
     data,
     [],
     threadNumber
    );
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
    return CCM.runTask(ConstructorTasks.runFlow, data);
   },
   remove: (data: any) => {
    return CCM.runTask(ConstructorTasks.removeFlow, data);
   },
  },
  worldGen: {
   generate: (data: any) => {
    return CCM.runTask(ConstructorTasks.generate, data);
   },
  },
 },
});
