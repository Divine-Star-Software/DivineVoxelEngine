import type { DivineVoxelEngineNexus } from "index";

/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export class WorldComm {
 port: MessagePort;
 constructor(private DVEN: DivineVoxelEngineNexus) {}
 setWorldPort(messagePort: MessagePort) {
  this.port = messagePort;

  this.port.onmessage = (event) => {
   this.DVEN.matrixHub.onMessage(event, (messageEvent) => {});
  };
 }
}
