import { DVEW } from "../DivineVoxelEngineWorld.js";
/**# Matrix Thread Central Hub
 *---
 * Hanldes all syncing and releasing of data between chunk bound threads.
 */
export const MatrixCentralHub = {
    threads: {},
    _threadMessageFunctions: {
        "matrix-sync-chunk": (data, event) => {
            const thread = data[1];
            const chunkX = data[2];
            const chunkY = data[3];
            const chunkZ = data[4];
            MatrixCentralHub.syncChunkInThread(thread, chunkX, chunkY, chunkZ);
        },
        "matrix-release-chunk": (data, event) => {
            const thread = data[1];
            const chunkX = data[2];
            const chunkY = data[3];
            const chunkZ = data[4];
            MatrixCentralHub.releaseChunkInThread(thread, chunkX, chunkY, chunkZ);
        },
        "sync-global-voxel-palette": (data, event) => {
            const thread = data[1];
            MatrixCentralHub.syncGlobalVoxelPaletteInThread(thread);
        },
        "sync-region-voxel-palette": (data, event) => {
            const thread = data[1];
            const regionX = data[2];
            const regionY = data[3];
            const regionZ = data[4];
            MatrixCentralHub.syncRegionVoxelPaletteInThread(thread, regionX, regionY, regionZ);
        },
        "release-region-voxel-palette": (data, event) => {
            const thread = data[1];
            const regionX = data[2];
            const regionY = data[3];
            const regionZ = data[4];
            MatrixCentralHub.releaseRegionVoxelPaletteInThread(thread, regionX, regionY, regionZ);
        },
    },
    registerThread(threadId, thread) {
        const channel = new MessageChannel();
        const port = channel.port1;
        thread.postMessage(["set-thread-name", threadId]);
        thread.postMessage(["set-world-port"], [port]);
        this.threads[threadId] = thread;
        channel.port2.onmessage = (event) => {
            const data = event.data;
            if (data && data[0]) {
                const message = data[0];
                if (this._threadMessageFunctions[message]) {
                    this._threadMessageFunctions[message](data, event);
                }
            }
        };
    },
    syncChunk(x, y, z) {
        if (DVEW.settings.settings.world?.voxelPaletteMode == "per-region") {
            if (!DVEW.matrix.isRegionInMatrix(x, y, z)) {
                this.syncRegionVoxelPalette(x, y, z);
            }
        }
        let chunkSABs = [];
        if (DVEW.matrix.getMatrixChunkData(x, y, z)) {
            const chunkData = DVEW.matrix.getMatrixChunkData(x, y, z);
            if (chunkData) {
                chunkSABs[0] = chunkData.voxelsSAB;
                chunkSABs[1] = chunkData.voxelsStatesSAB;
                chunkSABs[2] = chunkData.heightMapSAB;
                chunkSABs[3] = chunkData.minMaxMapSAB;
                chunkSABs[4] = chunkData.chunkStatesSAB;
            }
        }
        else {
            const newChunkSAB = DVEW.matrix.createMatrixChunkData(x, y, z);
            if (!newChunkSAB)
                return false;
            chunkSABs = newChunkSAB;
        }
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "sync-chunk",
                chunkSABs[0],
                chunkSABs[1],
                chunkSABs[2],
                chunkSABs[3],
                chunkSABs[4],
                x,
                y,
                z,
            ]);
        }
    },
    syncChunkInThread(threadId, x, y, z) {
        if (DVEW.settings.settings.world?.voxelPaletteMode == "per-region") {
            if (!DVEW.matrix.isRegionInMatrix(x, y, z)) {
                this.syncRegionVoxelPalette(x, y, z);
            }
        }
        let chunkSABs = [];
        if (DVEW.matrix.getMatrixChunkData(x, y, z)) {
            const chunkData = DVEW.matrix.getMatrixChunkData(x, y, z);
            if (chunkData) {
                chunkSABs[0] = chunkData.voxelsSAB;
                chunkSABs[1] = chunkData.voxelsStatesSAB;
                chunkSABs[2] = chunkData.heightMapSAB;
                chunkSABs[3] = chunkData.minMaxMapSAB;
                chunkSABs[4] = chunkData.chunkStatesSAB;
            }
        }
        else {
            const newChunkSAB = DVEW.matrix.createMatrixChunkData(x, y, z);
            if (!newChunkSAB)
                return false;
            chunkSABs = newChunkSAB;
        }
        this.threads[threadId].postMessage([
            "sync-chunk",
            chunkSABs[0],
            chunkSABs[1],
            chunkSABs[2],
            chunkSABs[3],
            chunkSABs[4],
            x,
            y,
            z,
        ]);
    },
    releaseChunk(x, y, z) {
        const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "release-chunk",
                chunkPOS.x,
                chunkPOS.y,
                chunkPOS.z,
            ]);
        }
    },
    releaseChunkInThread(threadId, x, y, z) {
        const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
        this.threads[threadId].postMessage([
            "release-chunk",
            chunkPOS.x,
            chunkPOS.y,
            chunkPOS.z,
        ]);
    },
    syncRegion(x, y, z) {
        const region = DVEW.worldData.getRegion(x, y, z);
        if (!region)
            return false;
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData) {
            matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
        }
        for (const worldColumnKeys of Object.keys(region.chunks)) {
            const worldColumn = region.chunks[worldColumnKeys];
            for (const chunkKey of Object.keys(worldColumn)) {
                const chunk = worldColumn[chunkKey];
                for (const threadId of Object.keys(this.threads)) {
                    this.syncChunkInThread(threadId, chunk.position[0], chunk.position[1], chunk.position[2]);
                }
            }
        }
    },
    syncRegionInThread(threadId, x, y, z) {
        const region = DVEW.worldData.getRegion(x, y, z);
        if (!region)
            return false;
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData) {
            matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
        }
        for (const worldColumnKeys of Object.keys(region.chunks)) {
            const worldColumn = region.chunks[worldColumnKeys];
            for (const chunkKey of Object.keys(worldColumn)) {
                const chunk = worldColumn[chunkKey];
                this.syncChunkInThread(threadId, chunk.position[0], chunk.position[1], chunk.position[2]);
            }
        }
    },
    releaseRegion(x, y, z) {
        const region = DVEW.worldData.getRegion(x, y, z);
        if (!region)
            return false;
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData) {
            matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
        }
        for (const worldColumnKeys of Object.keys(region.chunks)) {
            const worldColumn = region.chunks[worldColumnKeys];
            for (const chunkKey of Object.keys(worldColumn)) {
                const chunk = worldColumn[chunkKey];
                for (const threadId of Object.keys(this.threads)) {
                    this.releaseChunkInThread(threadId, chunk.position[0], chunk.position[1], chunk.position[2]);
                }
            }
        }
        DVEW.matrix.removeRegionFromMatrix(x, y, z);
    },
    releaseRegionInThread(threadId, x, y, z) {
        const region = DVEW.worldData.getRegion(x, y, z);
        if (!region)
            return false;
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData) {
            matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
        }
        delete matrixRegionData.threadsLoadedIn[threadId];
        for (const worldColumnKeys of Object.keys(region.chunks)) {
            const worldColumn = region.chunks[worldColumnKeys];
            for (const chunkKey of Object.keys(worldColumn)) {
                const chunk = worldColumn[chunkKey];
                this.releaseChunkInThread(threadId, chunk.position[0], chunk.position[1], chunk.position[2]);
            }
        }
    },
    syncGlobalVoxelPalette() {
        const globalVoxelPalette = DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
        const globalVoxelPaletteRecord = DVEW.worldGeneration.voxelPalette.getGlobalVoxelPaletteRecord();
        for (const threadId of Object.keys(this.threads)) {
            this.threads[threadId].postMessage([
                "sync-global-palette",
                globalVoxelPalette,
                globalVoxelPaletteRecord,
            ]);
        }
    },
    syncGlobalVoxelPaletteInThread(threadId) {
        const globalVoxelPalette = DVEW.worldGeneration.voxelPalette.getGlobalVoxelPalette();
        const globalVoxelPaletteRecord = DVEW.worldGeneration.voxelPalette.getGlobalVoxelPaletteRecord();
        this.threads[threadId].postMessage([
            "sync-global-palette",
            globalVoxelPalette,
            globalVoxelPaletteRecord,
        ]);
    },
    syncRegionVoxelPalette(x, y, z) {
        const region = DVEW.worldData.getRegion(x, y, z);
        if (!region)
            return false;
        const regionVoxelPalette = region.palette;
        if (!regionVoxelPalette)
            return false;
        const regionPOS = DVEW.worldBounds.getRegionPosition(x, y, z);
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData) {
            matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
        }
        for (const threadId of Object.keys(this.threads)) {
            matrixRegionData.threadsLoadedIn[threadId] = true;
            this.threads[threadId].postMessage([
                "sync-region-data",
                regionVoxelPalette,
                regionPOS.x,
                regionPOS.y,
                regionPOS.z,
            ]);
        }
    },
    syncRegionVoxelPaletteInThread(threadId, x, y, z) {
        const region = DVEW.worldData.getRegion(x, y, z);
        if (!region)
            return false;
        const regionVoxelPalette = region.palette;
        if (!regionVoxelPalette)
            return false;
        const regionPOS = DVEW.worldBounds.getRegionPosition(x, y, z);
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData) {
            matrixRegionData = DVEW.matrix.addRegionToMatrix(x, y, z);
        }
        matrixRegionData.threadsLoadedIn[threadId] = true;
        this.threads[threadId].postMessage([
            "sync-region-data",
            regionVoxelPalette,
            regionPOS.x,
            regionPOS.y,
            regionPOS.z,
        ]);
    },
    releaseRegionVoxelPalette(x, y, z) {
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData)
            return false;
        const regionPOS = DVEW.worldBounds.getRegionPosition(x, y, z);
        for (const threadId of Object.keys(this.threads)) {
            delete matrixRegionData.threadsLoadedIn[threadId];
            this.threads[threadId].postMessage([
                "release-region-palette",
                regionPOS.x,
                regionPOS.y,
                regionPOS.z,
            ]);
        }
    },
    releaseRegionVoxelPaletteInThread(threadId, x, y, z) {
        let matrixRegionData = DVEW.matrix.getMatrixRegionData(x, y, z);
        if (!matrixRegionData)
            return false;
        delete matrixRegionData.threadsLoadedIn[threadId];
        const regionPOS = DVEW.worldBounds.getRegionPosition(x, y, z);
        this.threads[threadId].postMessage([
            "release-region-palette",
            regionPOS.x,
            regionPOS.y,
            regionPOS.z,
        ]);
    },
};
