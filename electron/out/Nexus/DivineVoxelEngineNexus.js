import { EngineSettings } from "../Global/EngineSettings.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//functions
import { InitNexusWorker } from "./Init/InitNexusWorker.js";
import { WorldComm } from "./World/WorldComm.js";
class DivineVoxelEngineNexusClass {
    engineSettings = new EngineSettings();
    worldMatrix = new WorldMatrix();
    matrixHub = new MatrixHub("nexus", this.worldMatrix);
    worldComm = new WorldComm(this);
    async $INIT(data) {
        await InitNexusWorker(this, data.onReady, data.onMessage, data.onRestart);
    }
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        if (data.chunks) {
            this.worldMatrix.chunkBounds.setChunkBounds(data.chunks.chunkXPow2, data.chunks.chunkYPow2, data.chunks.chunkZPow2);
            this.worldMatrix.syncChunkBounds();
        }
    }
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    loadChunkIntoNexus(chunkX, chunkY, chunkZ) {
        this.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
    }
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX, chunkY, chunkZ) {
        this.matrixHub.requestChunkRelease(chunkX, chunkY, chunkZ);
    }
    /**# On Message From World
     * ---
     * Add a function to run on a message from the world thread.
     */
    onMessageFromWorld(message, run) {
        this.worldComm.listenForMessage(message, run);
    }
}
export const DVEN = new DivineVoxelEngineNexusClass();
