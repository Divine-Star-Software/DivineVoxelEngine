//types
import type { InterCommInterface } from "Meta/Comms/InterComm.types";
import { NodeWorker } from "Meta/Comms/NodeWorker.interface.js";
import { DVES } from "../../DivineVoxelEngineServer.js";
//objects

//functions
import { GetNewConstructorComm } from "./ConstructorComm.js";

export const ConstructorCommManager = {
 count: 0,
 constructors: <InterCommInterface[]>[],
 $INIT() {
  for (const constructor of this.constructors) {
   const channel = new MessageChannel();
   DVES.worldComm.sendMessage(
    "connect-constructor",
    [channel.port1],
    [channel.port1]
   );
   constructor.sendMessage("connect-world", [channel.port2], [channel.port2]);
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
 setConstructors(constructors: Worker[] | NodeWorker[]) {
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
