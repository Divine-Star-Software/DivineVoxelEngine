import { DVEBInitData } from "Meta/Builder/DVEB";
import type { MeshData } from "Meta/Util.types";
import type { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";
import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";

export async function InitWorker(
 DVEB: DivineVoxelEngineBuilder,
 initData: DVEBInitData
) {
 RegisterDefaultShapes(DVEB.shapeManager, DVEB.shapeHelper);

 DVEB.renderComm.onReady = initData.onReady;
 if (initData.onMessage) {
  DVEB.renderComm.onMessage = initData.onMessage;
 }
 if (initData.onRestart) {
  DVEB.renderComm.onRestart = initData.onRestart;
 }

 if (DVEB.environment == "browser") {
  (DVEB as any).renderComm.setPort(self);
 }

 if (DVEB.environment == "node") {
  //@ts-ignore
  if (require) {
   //@ts-ignore
   const { parentPort } = require("worker_threads");
   (DVEB as any).renderComm.setPort(parentPort);
  } else {
   //@ts-ignore
   const { parentPort } = await import("worker_threads").parentPort;
   (DVEB as any).renderComm.setPort(parentPort);
  }
 }

 await new Promise((resolve) => {
  const inte = setInterval(() => {
   if (DVEB.isReady()) {
    clearInterval(inte);
    resolve(true);
   }
  }, 1);
 });

}
