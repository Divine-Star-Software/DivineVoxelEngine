//types
import type { InterCommInterface } from "Meta/Comms/InterComm.types";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { GetNewWorldGenComm } from "./WorldGenComm.js";

export const WorldGenCommManager = {
 count: 0,
 worldGens: <InterCommInterface[]>[],
 $INIT() {
     
  for (const worldGens of this.worldGens) {
   const channel = new MessageChannel();
   DVER.worldComm.sendMessage("connect-world-gen", [worldGens.name], [channel.port1]);
   worldGens.sendMessage("connect-world", [], [channel.port2]);
  }
 },
 createWorldGens(path: string, numWorldGens = 4) {
  for (let i = 0; i <= numWorldGens; i++) {
   const newWorker = new Worker(new URL(path, import.meta.url), {
    type: "module",
   });
   this.count++;
   const newComm = GetNewWorldGenComm(this.count, newWorker);
   this.worldGens.push(newComm);
  }
 },
 setWorldGens(worldGens: Worker[]) {
  for (const worldGen of worldGens) {
   this.count++;
   const newComm = GetNewWorldGenComm(this.count, worldGen);
   this.worldGens.push(newComm);
  }
 },
 syncSettings(data: any) {
  for (const worldGen of this.worldGens) {
   worldGen.sendMessage("sync-settings", [data]);
  }
 },
};
