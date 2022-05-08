//types
import { DivineVoxelEngineWorld } from "index.js";
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import type { FullChunkTemplate } from "Meta/index";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
//comms
import { GetNewBuilderComm } from "./BuilderComm.js";

/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export class BuilderCommManager {
 voxelBuildOrder: VoxelSubstanceType[] = ["solid", "flora", "magma"];
 voxelTypeMap = {
  solid: 0,
  flora: 1,
  magma: 3,
 };
 count = 0;
 numBuilders = 0;

 builders: InterCommInterface[] = [];

 ready: Record<string, boolean> = {};
 buildersConnected = 0;

 constructor(public DVEW: DivineVoxelEngineWorld) {}

 addBuilder(port: InterCommPortTypes) {
  const newComm = GetNewBuilderComm(this.numBuilders + 1, port);
  this.builders.push(newComm);
  const builder = this;
  newComm.listenForMessage("ready", () => {
   builder.ready[newComm.name] = true;
   builder.buildersConnected++;
  });
  this.numBuilders++;
 }

 syncChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number) {
  for (const builder of this.builders) {
   this.DVEW.matrixCentralHub.syncChunkInThread(
    builder.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 }

 releaseChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number) {
  for (const builder of this.builders) {
   this.DVEW.matrixCentralHub.releaseChunkInThread(
    builder.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 }

 isReady() {
  if (!this.buildersConnected) return false;
  if (this.buildersConnected < this.numBuilders) return false;
  for (const ready of Object.keys(this.ready)) {
   if (this.ready[ready] == false) {
    return false;
   }
  }
  return true;
 }

 requestFullChunkBeRemoved(chunkX: number, chunkY: number, chunkZ: number) {}

 requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number) {
  const comm = this.builders[this.count];

  comm.sendMessage(7, [chunkX, chunkY, chunkZ]);
  this.count++;
  if (this.count >= this.numBuilders) {
   this.count = 0;
  }
 }

 requestFullChunkBeBuiltO(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  template: FullChunkTemplate
 ) {
  let i = this.voxelBuildOrder.length;
  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];
   if (baseTemplate.positionTemplate.length == 0) continue;
   const positions = new Uint16Array(baseTemplate.positionTemplate);
   const faces = new Uint8Array(baseTemplate.faceTemplate);
   const shapes = new Uint16Array(baseTemplate.shapeTemplate);
   const uvs = new Uint16Array(baseTemplate.uvTemplate);
   const colors = new Float32Array(baseTemplate.colorTemplate);
   const light = new Float32Array(baseTemplate.lightTemplate);
   const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
   this.builders[this.count].sendMessage(
    (this as any).voxelTypeMap[type],
    [
     chunkX,
     chunkY,
     chunkZ,
     positions.buffer,
     faces.buffer,
     shapes.buffer,
     uvs.buffer,
     colors.buffer,
     light.buffer,
     ambientOcclusion.buffer,
    ],
    [
     positions.buffer,
     faces.buffer,
     shapes.buffer,
     uvs.buffer,
     colors.buffer,
     light.buffer,
     ambientOcclusion.buffer,
    ]
   );
   this.count++;
   if (this.count >= this.numBuilders) {
    this.count = 0;
   }
  }
 }
}
