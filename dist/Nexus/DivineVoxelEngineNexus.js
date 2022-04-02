import { MatrixHub } from "Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { InitNexusWorker } from "./Functions/InitNexusWorker.js";
export class DivineVoxelEngineNexus {
    worldMatrix = new WorldMatrix();
    matrixHub = new MatrixHub(this.worldMatrix);
    async $INIT(data) {
        await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
    }
}
