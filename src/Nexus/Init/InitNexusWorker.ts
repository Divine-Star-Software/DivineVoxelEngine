import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";
import { getNexusWorkerFunctions } from "./NexusMessageFunctions.js";

export function InitNexusWorker(
 DVEN: DivineVoxelEngineNexus,
 onReady: Function,
 onMessage?: Function,
 onRestart?: Function
) {
 return new Promise((resolve, reject) => {
  try {
   const messageFunctions = getNexusWorkerFunctions(resolve, DVEN, onReady);
   addEventListener("message", (event: MessageEvent) => {
    const eventData = event.data;
    const message = eventData[0];
    if (messageFunctions[message]) {
     messageFunctions[message](eventData, event);
    }
    DVEN.renderComm._onMessage(event);
   });
  } catch (error) {
   reject(false);
  }
 });
}
