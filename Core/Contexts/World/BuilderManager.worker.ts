export class BuilderManagerWorker {
  count = 0;
  numBuilders = 0;

  mainThreadCom : Worker;

  builders: MessagePort[] = [];


  setMainThreadCom(worker : Worker) {
    this.mainThreadCom = worker;
  }

  addBuilder(port: MessagePort) {
    this.builders.push(port);
    this.numBuilders++;
  }

  requestChunkBeRemoved(
    chunkX: number,
    chunkZ: number

  ) {

    this.mainThreadCom.postMessage(["remove-chunk",chunkX,chunkZ]);

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
    const indicies = new Uint8Array(chunkTemplate[1]);
    const blocks = new Uint16Array(chunkTemplate[2]);
    const ambientOcclusion = new Float32Array(chunkTemplate[3]);

    this.builders[this.count].postMessage([
      chunkX,
      chunkZ,
      positions.buffer,
      indicies.buffer,
      blocks.buffer,
      ambientOcclusion.buffer
    ]),
      [positions.buffer, indicies.buffer, blocks.buffer,ambientOcclusion.buffer];
  }
}
