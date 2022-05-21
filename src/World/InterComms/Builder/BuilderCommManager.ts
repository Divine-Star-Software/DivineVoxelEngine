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
 buildersConnected: 0,

 addBuilder(port: InterCommPortTypes) {
  const newComm = GetNewBuilderComm(this.numBuilders + 1, port);
  this.builders.push(newComm);
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
  return true;
 },

 requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number) {
  const comm = this.builders[this.count];
  comm.sendMessage(0, [chunkX, chunkY, chunkZ]);
  this.count++;
  if (this.count >= this.numBuilders) {
   this.count = 0;
  }
 },
};
