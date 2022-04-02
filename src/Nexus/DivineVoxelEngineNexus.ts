import { MatrixHub } from "Matrix/MatrixHub.js";
import { DVENInitData } from "Meta/Nexus/DVEN.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { InitNexusWorker } from "./Functions/InitNexusWorker.js";

export class DivineVoxelEngineNexus {
 worldMatrix = new WorldMatrix();
 matrixHub = new MatrixHub(this.worldMatrix);

 async $INIT(data: DVENInitData) {
  await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
 }
}
