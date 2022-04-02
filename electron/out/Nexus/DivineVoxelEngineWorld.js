import { MatrixHub } from "Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
export class DivineVoxelEngineNexus {
    worldMatrix = new WorldMatrix();
    matrixHub = new MatrixHub(this.worldMatrix);
}
