import type { DivineStar } from "Core/DivineStar";

export class AnimationManager {
  animationWorker: Worker;
  numAnimators: number = 0;
  animators: Worker[] = [];

  constructor(private DS: DivineStar) {
    /* 
     if (window.navigator.hardwareConcurrency > this.numAnimators) {
      //use all possible cores if we can
      this.numAnimators = window.navigator.hardwareConcurrency * 2;
    } 
 */
  }

  sendPlayerSharedArrays(arrays: SharedArrayBuffer[]) {
    this.animationWorker.postMessage(
      ["connect-player", arrays[0], arrays[1], arrays[2]]
    );
  }

  startAnimations() {
    this.animationWorker.postMessage("start");
  }

  createAnimationWorker() {
    this.animationWorker = new Worker(
      new URL(
        "../Contexts/Animations/Animation.worker.manager.js",
        import.meta.url
      ),
      {
        type: "module",
      }
    );
    this.animationWorker.onerror = async (er: ErrorEvent) => {
      console.log(er);
    };
    const channel = new MessageChannel();
    const worldWorker = this.DS.world.getWorker();

    // Setup the connection: Port 1 is for worker 1
    worldWorker.postMessage(["connect-animator"], [channel.port1]);

    // Setup the connection: Port 2 is for worker 2
    this.animationWorker.postMessage(["connect-world"], [channel.port2]);
  }

  createAnimators() {
    for (let i = 0; i < this.numAnimators; i++) {
      this.animators[i] = new Worker(
        new URL("../Contexts/Animations/Animator.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
      this.animators[i].onerror = (er: ErrorEvent) => {
        console.log(er);
      };
      this.animators[i].onmessage = async (event) => {
        this._handleAnimationUpdate(event);
      };

      const channel = new MessageChannel();
      const animationWorker = this.animators[i];

      // Setup the connection: Port 1 is for worker 1
      this.animationWorker.postMessage(["connect-animator"], [channel.port1]);

      // Setup the connection: Port 2 is for worker 2
      animationWorker.postMessage(["connect-animator"], [channel.port2]);
    }
  }

  async _handleAnimationUpdate(event: MessageEvent) {
    const data = event.data;

    const chunkX = data[0];
    const chunkZ = data[1];
    const newUvs = new Float32Array(data[2]);
  

    //   console.log(chunkX,chunkZ);
    this.DS.builderManager.updateChunkUVs(chunkX, chunkZ, newUvs);
  }
}
