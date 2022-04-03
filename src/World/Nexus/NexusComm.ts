import type { DivineVoxelEngineWorld } from "index";

/**# Nexus Comm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
 port: MessagePort;
 messageFunctions: Record<string, (data: any[], event: MessageEvent) => void> =
  {};
 constructor(private DVEW: DivineVoxelEngineWorld) {}

 setNexusPort(port: MessagePort) {
  this.port = port;

  this.DVEW.matrixCentralHub.registerThread("nexus", port);
  port.onmessage = (event: MessageEvent) => {
   const message = event.data[0];
   if (this.messageFunctions[message]) {
    this.messageFunctions[message](event.data, event);
   }
  };
 }

 sendMessageToNexus(message: string, data: any[], transfers?: any[]) {
  if (transfers) {
   this.port.postMessage([message, ...data], transfers);
  }
  this.port.postMessage([message, ...data]);
 }

 listenForMessage(
  message: string,
  run: (data: any[], event: MessageEvent) => void
 ) {
  this.messageFunctions[message] = run;
 }
}
