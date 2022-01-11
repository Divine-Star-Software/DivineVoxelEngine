/**# Builder Manager Worker
 * ---
 * Handles communication with the mesh builders thread.
 */
export class BuilderManager {
 count = 0;
 numBuilders = 0;

 mainThreadCom: Worker;

 builders: MessagePort[] = [];

 setMainThreadCom(worker: Worker) {
  this.mainThreadCom = worker;
 }

 addBuilder(port: MessagePort) {
  this.builders.push(port);
  this.numBuilders++;
 }

 requestChunkBeRemoved(chunkX: number, chunkZ: number) {
  this.mainThreadCom.postMessage(["remove-chunk", chunkX, chunkZ]);
 }

 requestChunkBeBuilt(
  chunkX: number,
  chunkZ: number,
  chunkTemplate: number[][]
 ) {
  this.count++;
  if (this.count >= this.numBuilders) {
   this.count = 0;
  }

  //   console.log(chunkTemplate[0]);
  const positions = new Uint16Array(chunkTemplate[0]);
  //  console.log(positions);
  const faces = new Uint8Array(chunkTemplate[1]);
  const shapes = new Uint16Array(chunkTemplate[2]);
  const uvs = new Uint16Array(chunkTemplate[3]);
  const light = new Float32Array(chunkTemplate[4]);
  const ambientOcclusion = new Float32Array(chunkTemplate[5]);

  this.builders[this.count].postMessage([
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
 }
}
