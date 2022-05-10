import type { DVENInitData } from "Meta/Nexus/DVEN.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { EngineSettingsData } from "Meta/index.js";
import { NexusEntites } from "./NexusEntities/NexusEntites.manager.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
declare class DivineVoxelEngineNexusClass {
    engineSettings: {
        settings: EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        getSettingsCopy(): any;
    };
    worldMatrix: WorldMatrix;
    matrixHub: MatrixHub;
    worldComm: WorldComm;
    renderComm: RenderComm;
    nexusEntites: NexusEntites;
    $INIT(data: DVENInitData): Promise<void>;
    syncSettings(data: EngineSettingsData): void;
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number): Promise<unknown>;
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number): void;
}
export declare type DivineVoxelEngineNexus = DivineVoxelEngineNexusClass;
export declare const DVEN: DivineVoxelEngineNexusClass;
export {};
