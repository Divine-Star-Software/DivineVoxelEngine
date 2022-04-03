import type { DVENInitData } from "Meta/Nexus/DVEN.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { WorldComm } from "./World/WorldComm.js";
declare class DivineVoxelEngineNexusClass {
    worldMatrix: WorldMatrix;
    matrixHub: MatrixHub;
    worldComm: WorldComm;
    $INIT(data: DVENInitData): Promise<void>;
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number): void;
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number): void;
}
export declare type DivineVoxelEngineNexus = DivineVoxelEngineNexusClass;
export declare const DVEN: DivineVoxelEngineNexusClass;
export {};
