//types
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { ConstructorToRenderMessages } from "../../../Data/Constants/InterComms/ConstructorToRender.js";
import { VoxelSubstanceType } from "Meta/index.js";

const CCMBase = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
});



const handleUpdate = (substance: VoxelSubstanceType, data: any) => {
 const chunkX = data[2];
 const chunkY = data[3];
 const chunkZ = data[4];
 const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(
  chunkX,
  chunkY,
  chunkZ
 );
 DVER.meshManager.handleChunkUpdate(substance, chunkKey, data);
};

const substanceFunctionMap = {
 0: (data: any) => {
  handleUpdate("solid", data);
 },
 1: (data: any) => {
  handleUpdate("flora", data);
 },
 2: (data: any) => {
  handleUpdate("fluid", data);
 },
 3: (data: any) => {
  handleUpdate("magma", data);
 },
};

CCMBase.listenForMessage(ConstructorToRenderMessages.setChunk, (data) => {
 const substance: 0 | 1 | 2 | 3 = data[1];
 substanceFunctionMap[substance](data);
});
CCMBase.listenForMessage(ConstructorToRenderMessages.removeChunk, (data) => {
 const substance: VoxelSubstanceType = data[1];
 const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(
  data[2],
  data[3],
  data[4]
 );
 DVER.meshManager.removeChunkMesh(substance, chunkKey);
});
CCMBase.listenForMessage(
 ConstructorToRenderMessages.constructEntity,
 (data) => {
  DVER.meshManager.handleEntityUpdate(data[1], data[2], data[3], data);
 }
);
CCMBase.listenForMessage(ConstructorToRenderMessages.constructItem, (data) => {
 DVER.meshManager.handleItemUpdate(data[1], data[2], data[3], data);
});

const CCM = Object.assign(CCMBase, {
 $INIT() {
  const worldComm = ThreadComm.getComm("world");
  for (const constructor of CCM.__comms) {

    constructor.onMessage((event : any)=>{
        console.log(event.data);
    })
      worldComm.connectToComm(constructor);
   constructor.sendMessage("sync-uv-texuture-data", [
    DVER.textureManager.uvTextureMap,
    DVER.textureManager.overlayUVTextureMap,
   ]);
  }
 },
 createConstructors(path: string, numBuilders = 4) {
  for (let i = 0; i <= numBuilders; i++) {
   const newWorker = new Worker(new URL(path, import.meta.url), {
    type: "module",
   });
   CCM.addPort(newWorker);
  }
 },
 setConstructors(constructors: Worker[]) {
  CCM.addPorts(constructors);
 },
 syncSettings(data: any) {
  CCM.sendMessageToAll("sync-settings", [data]);
 },
});

export const ConstructorCommManager = CCM;
