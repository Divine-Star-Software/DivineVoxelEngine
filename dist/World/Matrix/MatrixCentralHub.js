/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export class MatrixCentralHub {
    DVEW;
    threads = {};
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    registerThread(threadId, thread) {
        this.threads[threadId] = thread;
    }
    syncChunk(chunkX, chunkY, chunkZ) {
        const chunkSABs = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
        if (!chunkSABs)
            return false;
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "sync-chunk",
                chunkSABs[0],
                chunkSABs[1],
                chunkX,
                chunkY,
                chunkZ,
            ]);
        }
    }
    syncChunkInThread(threadId, chunkX, chunkY, chunkZ) {
        const chunkSABs = this.DVEW.matrix.createChunkSAB(chunkX, chunkY, chunkZ);
        if (!chunkSABs)
            return false;
        this.threads[threadId].postMessage([
            "sync-chunk",
            chunkSABs[0],
            chunkSABs[1],
            chunkX,
            chunkY,
            chunkZ,
        ]);
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
    syncGlobalVoxelPalette() {
        const globalVoxelPalette = this.DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "sync-global-palette",
                globalVoxelPalette,
            ]);
        }
    }
    syncGlobalVoxelPaletteInThread(threadId) {
        const globalVoxelPalette = this.DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
        this.threads[threadId].postMessage([
            "sync-global-palette",
            globalVoxelPalette,
        ]);
    }
    syncRegionVoxelPalette(regionX, regionY, regionZ) {
        const region = this.DVEW.worldData.getRegion(regionX, regionY, regionZ);
        if (!region)
            return false;
        const regionVoxelPalette = region.palette;
        if (!regionVoxelPalette)
            return false;
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "sync-region-palette",
                regionVoxelPalette,
                regionX,
                regionY,
                regionZ,
            ]);
        }
    }
    syncRegionVoxelPaletteInThread(threadId, regionX, regionY, regionZ) {
        const region = this.DVEW.worldData.getRegion(regionX, regionY, regionZ);
        if (!region)
            return false;
        const regionVoxelPalette = region.palette;
        if (!regionVoxelPalette)
            return false;
        this.threads[threadId].postMessage([
            "sync-region-palette",
            regionVoxelPalette,
            regionX,
            regionY,
            regionZ,
        ]);
    }
    releaseRegionVoxelPalette(regionX, regionY, regionZ) {
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "release-region-palette",
                regionX,
                regionY,
                regionZ,
            ]);
        }
    }
    releaseRegionVoxelPaletteInThread(threadId, regionX, regionY, regionZ) {
        this.threads[threadId].postMessage([
            "release-region-palette",
            regionX,
            regionY,
            regionZ,
        ]);
    }
}
