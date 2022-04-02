import { MatrixHub } from "Matrix/MatrixHub.js";
import { DVENInitData } from "Meta/Nexus/DVEN.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
export declare class DivineVoxelEngineNexus {
    worldMatrix: WorldMatrix;
    matrixHub: MatrixHub;
    $INIT(data: DVENInitData): Promise<void>;
}
