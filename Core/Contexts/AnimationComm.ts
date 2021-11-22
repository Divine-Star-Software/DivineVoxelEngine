/**# Animation Comm
 * ---
 * Class to talk to the animation context
 */
export class AnimationComm {
  animationWorkerManagerPort: MessagePort;

  setPort(animationWorkerManagerPort: MessagePort) {
    this.animationWorkerManagerPort = animationWorkerManagerPort;
  }

  removeChunkTemplate(chunkX: number, chunkZ: number) {
    this.animationWorkerManagerPort.postMessage(
      [
        "remove-animatied-chunk",
        chunkX,
        chunkZ,
      ]);
  }

  sendChunkTemplateUpdate(
    chunkX: number,
    chunkZ: number,
    faceTemplate: number[],
    blockTemplate: number[]
  ) {
    const faceTemplateArray = new Uint8Array(faceTemplate);
    const blockTemplateArray = new Int16Array(blockTemplate);

    this.animationWorkerManagerPort.postMessage(
      [
        "register-animatied-chunk",
        chunkX,
        chunkZ,
        faceTemplateArray.buffer,
        blockTemplateArray.buffer,
      ],
      [faceTemplateArray.buffer, blockTemplateArray.buffer]
    );
  }
  sendChunkTemplate(
    chunkX: number,
    chunkZ: number,
    faceTemplate: number[],
    blockTemplate: number[]
  ) {
    const faceTemplateArray = new Uint8Array(faceTemplate);
    const blockTemplateArray = new Int16Array(blockTemplate);

    this.animationWorkerManagerPort.postMessage(
      [
        "register-animatied-chunk",
        chunkX,
        chunkZ,
        faceTemplateArray.buffer,
        blockTemplateArray.buffer,
      ],
      [faceTemplateArray.buffer, blockTemplateArray.buffer]
    );
  }

  registerAnimatedBlock(blockId: number, uvs: number[]) {
    const uvsArray = new Uint16Array(uvs);

    this.animationWorkerManagerPort.postMessage(
      ["register-block", blockId, uvsArray.buffer],
      [uvsArray.buffer]
    );
  }
}
