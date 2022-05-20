//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
//comms
import { GetNewBuilderComm } from "./BuilderComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export const BuilderCommManager = {
 count: 0,
 numBuilders: 0,

 builders: <InterCommInterface[]>[],

 ready: <Record<string, boolean>>{},
 buildersConnected: 0,

 addBuilder(port: InterCommPortTypes) {
  const newComm = GetNewBuilderComm(this.numBuilders + 1, port);
  this.builders.push(newComm);
  const builder = this;
  newComm.listenForMessage("ready", () => {
   builder.ready[newComm.name] = true;
   builder.buildersConnected++;
  });
  this.numBuilders++;
 },

 syncChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number) {
  for (const builder of this.builders) {
   DVEW.matrixCentralHub.syncChunkInThread(
    builder.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 releaseChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number) {
  for (const builder of this.builders) {
   DVEW.matrixCentralHub.releaseChunkInThread(
    builder.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 syncRegionInAllBuilders(regionX: number, regionY: number, regionZ: number) {
  for (const builder of this.builders) {
   DVEW.matrixCentralHub.syncRegionInThread(
    builder.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 releaseRegionInAllBuilders(regionX: number, regionY: number, regionZ: number) {
  for (const builder of this.builders) {
   DVEW.matrixCentralHub.releaseRegionInThread(
    builder.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 isReady() {
  if (!this.buildersConnected) return false;
  if (this.buildersConnected < this.numBuilders) return false;
  for (const ready of Object.keys(this.ready)) {
   if (this.ready[ready] == false) {
    return false;
   }
  }
  return true;
 },

 requestFullChunkBeRemoved(chunkX: number, chunkY: number, chunkZ: number) {},

 requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number) {
  const comm = this.builders[this.count];
  comm.sendMessage(7, [chunkX, chunkY, chunkZ]);
  this.count++;
  if (this.count >= this.numBuilders) {
   this.count = 0;
  }
 },
};
