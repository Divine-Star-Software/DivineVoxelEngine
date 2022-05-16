import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";

export async function InitNexusWorker(
 DVEN: DivineVoxelEngineNexus,
 onReady: Function,
 onMessage?: Function,
 onRestart?: Function
) {
 if (DVEN.environment == "browser") {
  (DVEN as any).renderComm.setPort(self);
 }

 if (DVEN.environment == "node") {
  //@ts-ignore
  if (require) {
   //@ts-ignore
   const { parentPort } = require("worker_threads");
   (DVEN as any).renderComm.setPort(parentPort);
  } else {
   //@ts-ignore
   const { parentPort } = await import("worker_threads").parentPort;
   (DVEN as any).renderComm.setPort(parentPort);
  }
 }

 await new Promise((resolve) => {
  const inte = setInterval(() => {
   if (DVEN.isReady()) {
    clearInterval(inte);
    resolve(true);
   }
  }, 1);
 });
}
