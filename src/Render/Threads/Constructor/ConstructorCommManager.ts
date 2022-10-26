//types
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { ConstructorToRenderMessages } from "../../../Data/Constants/Contracts/ConstructorToRender.js";

const CCMBase = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
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
   constructor.onMessage((event: any) => {
    console.log(event.data);
   });
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
