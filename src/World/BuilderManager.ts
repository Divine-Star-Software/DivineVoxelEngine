import { FullChunkTemplate } from "Meta/Chunks/Chunk.types";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";

/**# Builder Manager Worker
 * ---
 * Handles communication with the mesh builders thread.
 */
export class BuilderManager {
 count = 0;
 numBuilders = 0;

 voxelBuildOrder: VoxelSubstanceType[] = ["solid", "flora", "fluid", "magma"];
 voxelTypeMap: Record<VoxelSubstanceType, number> = {
  solid: 0,
  flora: 1,
  fluid: 2,
  magma: 3,
  transparent: -1,
 };

 mainThreadCom: Worker;

 builders: MessagePort[] = [];

 fluidBuilder: MessagePort;

 setMainThreadCom(worker: Worker) {
  this.mainThreadCom = worker;
 }

 addFluidBuilder(port: MessagePort) {
  this.fluidBuilder = port;
 }

 addBuilder(port: MessagePort) {
  this.builders.push(port);
  this.numBuilders++;
 }

 requestChunkBeRemoved(chunkX: number, chunkZ: number) {
  this.mainThreadCom.postMessage(["remove-chunk", chunkX, chunkZ]);
 }

 requestFullChunkBeBuilt(
  chunkX: number,
  chunkZ: number,
  template: FullChunkTemplate
 ) {
  let i = this.voxelBuildOrder.length;
  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];
   if (baseTemplate.positionTemplate.length == 0) continue;

   if (type == "fluid") {
    const positions = new Uint16Array(baseTemplate.positionTemplate);
 
    const faces = new Uint8Array(baseTemplate.faceTemplate);
    const shapes = new Uint16Array(baseTemplate.shapeTemplate);
    const uvs = new Uint16Array(baseTemplate.uvTemplate);
    const light = new Float32Array(baseTemplate.ligtTemplate);
    const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);

    this.fluidBuilder.postMessage([
     0,
     chunkX,
     chunkZ,
     positions.buffer,
     faces.buffer,
     shapes.buffer,
     uvs.buffer,
     light.buffer,
     ambientOcclusion.buffer,
    ]),
     [
      positions.buffer,
      faces.buffer,
      shapes.buffer,
      uvs.buffer,
      light.buffer,
      ambientOcclusion.buffer,
     ];
   } else {
    const positions = new Uint16Array(baseTemplate.positionTemplate);
    const faces = new Uint8Array(baseTemplate.faceTemplate);
    const shapes = new Uint16Array(baseTemplate.shapeTemplate);
    const uvs = new Uint16Array(baseTemplate.uvTemplate);
    const light = new Float32Array(baseTemplate.ligtTemplate);
    const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);

    this.builders[this.count].postMessage([
     this.voxelTypeMap[type],
     chunkX,
     chunkZ,
     positions.buffer,
     faces.buffer,
     shapes.buffer,
     uvs.buffer,
     light.buffer,
     ambientOcclusion.buffer,
    ]),
     [
      positions.buffer,
      faces.buffer,
      shapes.buffer,
      uvs.buffer,
      light.buffer,
      ambientOcclusion.buffer,
     ];
     this.count++;
     if (this.count >= this.numBuilders) {
      this.count = 0;
     }
   }


  }
 }
}
