//types
import { EngineSettings } from "../Global/EngineSettings.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//functions
import { InitNexusWorker } from "./Init/InitNexusWorker.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { NexusEntites } from "./NexusEntities/NexusEntites.manager.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
export const DVEN = {
    environment: "browser",
    engineSettings: EngineSettings,
    worldMatrix: WorldMatrix,
    matrixHub: MatrixHub,
    __connectedToWorld: false,
    worldComm: WorldComm,
    renderComm: RenderComm,
    nexusEntites: NexusEntites,
    async $INIT(data) {
        await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
    },
    isReady() {
        return this.matrixHub.worldPort !== undefined && this.__connectedToWorld;
    },
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        if (data.chunks) {
            this.worldMatrix.worldBounds.setChunkBounds(data.chunks.chunkXPow2, data.chunks.chunkYPow2, data.chunks.chunkZPow2);
            this.worldMatrix.syncChunkBounds();
        }
        if (data.regions) {
            this.worldMatrix.worldBounds.setRegionBounds(data.regions.regionXPow2, data.regions.regionYPow2, data.regions.regionZPow2);
        }
    },
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    async loadChunkIntoNexus(chunkX, chunkY, chunkZ) {
        this.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
        return await this.worldMatrix.awaitChunkLoad(chunkX, chunkY, chunkZ);
    },
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX, chunkY, chunkZ) {
        this.matrixHub.requestChunkRelease(chunkX, chunkY, chunkZ);
    },
};
DVEN.matrixHub.setThreadName("nexus");
