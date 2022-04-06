import type { DivineVoxelEngineRender } from "../../DivineVoxelEngineRender.js";

/**# NexusComm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
 worker: Worker;
 scene: BABYLON.Scene;

 messageFunctions: Record<string, (data: any[], event: MessageEvent) => void> =
  {
   "spawn-entity": (data, event) => {
    const entityId = data[1];
    const identiferId = data[2];
    const position = data[3];
    const states = data[4];

    this.DVER.renderedEntites.spawnEntity(
     entityId,
     identiferId,
     position,
     states
    );
   },
   "de-spawn-entity": (data, event) => {
    const entityId = data[1];
    const identiferId = data[2];
    this.DVER.renderedEntites.deSpawnEntity(entityId, identiferId);
   },
  };

 constructor(private DVER: DivineVoxelEngineRender) {}

 reStart() {
  this.worker.postMessage("re-start");
 }

 getWorker() {
  return this.worker;
 }

 startWorldGen() {
  this.worker.postMessage("start");
 }

 handleMessage(event: MessageEvent) {
  const message = event.data[0];
  console.log(message);
  if (this.messageFunctions[message]) {
   this.messageFunctions[message](event.data, event);
  }
 }

 createNexusWorker(workerPath: string) {
  this.worker = new Worker(new URL(workerPath, import.meta.url), {
   type: "module",
  });
  this._initWorker();
 }

 setNexusWorker(worker: Worker) {
  this.worker = worker;
  this._initWorker();
 }

 _initWorker() {
  this.worker.onerror = (er: ErrorEvent) => {
   console.log(er);
  };
  this.worker.onmessage = (event: MessageEvent) => {
    this.handleMessage(event);
  };
  const channel = new MessageChannel();
  const worldWorker = this.DVER.worldComm.getWorker();
  //connect world to fluid builder
  worldWorker.postMessage(["connect-nexus"], [channel.port1]);
  //connect fluid builder to world
  this.worker.postMessage(["connect-world"], [channel.port2]);
 }

 _syncSettings() {
  this.worker.postMessage(["sync-settings", this.DVER.engineSettings.settings]);
 }
}
