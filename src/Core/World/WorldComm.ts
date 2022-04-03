import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { BaseWorldData } from "Meta/World/BaseWorldData.type.js";
import { PositionMatrix } from "Meta/Util.types.js";

/**# World Comm
 * ---
 * Handles communication with the world thread.
 */
export class WorldComm {
 waitingForWolrdData = false;
 baseWorldData: BaseWorldData | null = null;
 worker: Worker;

 constructor(private DVE: DivineVoxelEngine) {}

 requestWorldUpdate(
  type: "voxel-add" | "voxel-remove",
  position: PositionMatrix
 ) {
  this.worker.postMessage([type, position.x, position.y, position.z]);
 }

 getWorker() {
  return this.worker;
 }

 start() {
  this.worker.postMessage(["start"]);
 }

 reStart() {
  this.worker.postMessage(["re-start"]);
 }

 handleMessage(event: MessageEvent, world: this) {
  const message = event.data[0];

  if (message == "remove-chunk") {
   const chunkX = event.data[1];
   const chunkZ = event.data[2];
   this.DVE.meshManager.requestChunkBeRemoved(`${chunkX}-${chunkZ}`);
  }
  if (message == "set-world-data") {
   this.baseWorldData = event.data[1];
   this.waitingForWolrdData = false;
  }
 }

 getBaseWorldData(): Promise<BaseWorldData> {
  this.waitingForWolrdData = true;
  this.baseWorldData = null;
  this.worker.postMessage(["get-world-data"]);
  const world = this;
  const prom: Promise<BaseWorldData> = new Promise((resolve, reject) => {
   let checkTimeout: any = null;
   const check = () => {
    if (world.waitingForWolrdData) {
     checkTimeout = setTimeout(() => {
      check();
     }, 1);
    } else {
     resolve(<BaseWorldData>world.baseWorldData);
     clearTimeout(rejectTimeout);
     clearTimeout(checkTimeout);
    }
   };
   check();

   const rejectTimeout = setTimeout(() => {
    clearTimeout(checkTimeout);
    reject("Timed out");
   }, 60000);
  });
  return prom;
 }

 createWorldWorker(workerPath: string) {
  this.worker = new Worker(new URL(workerPath, import.meta.url), {
   type: "module",
  });
  this._initWorker();
 }

 setWorldWorker(worker: Worker) {
  this.worker = worker;
  this._initWorker();
 }

 _initWorker() {
  const world = this;
  this.worker.onerror = (er: ErrorEvent) => {
   console.log(er);
  };
  this.worker.onmessage = (message: MessageEvent) => {
   this.handleMessage(message, world);
  };
 }

 _syncSettings() {
  const settings = this.DVE.engineSettings.getSettingsCopy();
  this.worker.postMessage(["sync-settings", settings]);
 }
}
