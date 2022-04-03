/**# Nexus Comm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
    DVEW;
    port;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    setNexusPort(port) {
        this.port = port;
        this.DVEW.matrixCentralHub.registerThread("nexus", port);
        port.onmessage = (event) => {
            //stuff
            // console.log(event);
        };
    }
    nexusLoadChunk(chunkX, chunkY, chunkZ) {
        if (this.DVEW.matrix.isChunkInMatrix(chunkX, chunkY, chunkZ))
            return false;
        this.DVEW.matrixCentralHub.syncChunkInThread("nexus", chunkX, chunkY, chunkZ);
    }
    removeChunkFromNexus(chunkX, chunkY, chunkZ) {
        if (!this.DVEW.matrix.isChunkInMatrix(chunkX, chunkY, chunkZ))
            return false;
        this.DVEW.matrixCentralHub.releaseChunkInThread("nexus", chunkX, chunkY, chunkZ);
    }
}
