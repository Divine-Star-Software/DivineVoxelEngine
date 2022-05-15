import {DVEW} from "../DivineVoxelEngineWorld.js";

export async function InitWorldWorker(
 onReady: () => void,
 onMessage?: (event: any) => void,
 onRestart?: () => void
): Promise<any> {
 DVEW.renderComm.onReady = onReady;
 if(onMessage) {
 DVEW.renderComm.onMessage = onMessage;
 }
 if (onRestart) {
  DVEW.renderComm.onRestart = onRestart;
 }

 if (DVEW.environment == "browser") {
  (DVEW as any).renderComm.setPort(self);
 }
 if (DVEW.environment == "node") {
  //@ts-ignore
  if (require) {
   //@ts-ignore
   const { parentPort } = require("worker_threads");
   (DVEW as any).renderComm.setPort(parentPort);
  } else {
   //@ts-ignore
   const { parentPort } = await import("worker_threads").parentPort;
   (DVEW as any).renderComm.setPort(parentPort);
  }
 }

 await new Promise((resolve) => {
  const inte = setInterval(() => {
   if (DVEW.isReady()) {
    clearInterval(inte);
    resolve(true);
   }
  }, 1);
 });
}
