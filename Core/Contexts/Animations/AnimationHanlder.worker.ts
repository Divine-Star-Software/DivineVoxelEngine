export class AnimationHanlder {
  count = 0;
  numAnimators = 0;
  animators: MessagePort[] = [];

  playerABSPositon : Float32Array;
  playerChunkPosition : Float32Array;
  playerDirection : Uint8Array;

  constructor() {}



  setPlayerSharedArrays(postionBuffer : SharedArrayBuffer, chunkBuffer : SharedArrayBuffer,directionBuffer : SharedArrayBuffer ) {

    this.playerABSPositon = new Float32Array(postionBuffer);
    this.playerChunkPosition = new Float32Array(chunkBuffer);
    this.playerDirection = new Uint8Array(directionBuffer);

  }

  connectAnimator(port: MessagePort) {
    this.numAnimators++;
    this.animators.push(port);

  }

  sendAnimation(chunkX : number, chunkZ : number, chunkTemplate : Uint8Array[]) {
    if(this.count >= this.numAnimators) {
        this.count = 0;
    }
    


    this.animators[this.count].postMessage([chunkX,chunkZ,chunkTemplate[0],chunkTemplate[1]])



    this.count++;
  

  }
}
