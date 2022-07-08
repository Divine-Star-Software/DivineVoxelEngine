//types
import type { InterCommInterface } from "Meta/Comms/InterComm.types";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { GetNewConstructorComm } from "./ConstructorComm.js";

export const ConstructorCommManager = {
 count: 0,
 constructors: <InterCommInterface[]>[],
 $INIT() {
  for (const constructor of this.constructors) {
   const channel = new MessageChannel();
   DVER.worldComm.sendMessage(
    "connect-constructor",
    [constructor.name],
    [channel.port1]
   );
   constructor.sendMessage("connect-world", [], [channel.port2]);

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
   this.count++;
   const newComm = GetNewConstructorComm(this.count, newWorker);
   this.constructors.push(newComm);
  }
 },
 setConstructors(constructors: Worker[]) {
  for (const constructor of constructors) {
   this.count++;
   const newComm = GetNewConstructorComm(this.count, constructor);
   this.constructors.push(newComm);
  }
 },
 syncSettings(data: any) {
  for (const constructor of this.constructors) {
   constructor.sendMessage("sync-settings", [data]);
  }
 },
};
