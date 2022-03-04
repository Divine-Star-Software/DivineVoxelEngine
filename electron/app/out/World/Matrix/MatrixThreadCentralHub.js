/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export class MatrixThreadCentralHub {
    DVEW;
    threads = {};
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    registerThread(threadId, thread) {
        this.threads[threadId] = thread;
    }
    syncChunk(chunkX, chunkY, chunkZ) {
        const chunkSAB = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
        if (!chunkSAB)
            return false;
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage(["sync-chunk", chunkSAB]);
        }
    }
    syncChunkInThread(threadId, chunkX, chunkY, chunkZ) {
        const chunkSAB = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
        if (!chunkSAB)
            return false;
        this.threads[threadId].postMessage(["sync-chunk", chunkSAB]);
    }
    releaseChunk(chunkX, chunkY, chunkZ) {
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "release-chunk",
                chunkX,
                chunkY,
                chunkZ,
            ]);
        }
    }
    releaseChunkInThread(threadId, chunkX, chunkY, chunkZ) {
        this.threads[threadId].postMessage(["release-chunk", chunkX, chunkY, chunkZ]);
    }
}
