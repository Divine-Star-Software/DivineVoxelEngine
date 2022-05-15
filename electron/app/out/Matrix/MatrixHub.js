import { WorldMatrix } from "./WorldMatrix.js";
/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export const MatrixHub = {
    messageFunctions: {
        "sync-chunk": (data) => {
            MatrixHub._syncChunk(data);
        },
        "release-chunk": (data) => {
            MatrixHub._releaseChunk(data);
        },
        "sync-global-palette": (data) => {
            MatrixHub._syncGlobalVoxelPalette(data);
        },
        "sync-region-data": (data) => {
            MatrixHub._syncRegionData(data);
        },
        "release-region-palette": (data) => {
            MatrixHub._releaseRegionVoxelPalette(data);
        },
        "set-thread-name": (data) => {
            MatrixHub._setThreadName(data);
        },
        "set-world-port": (data, event) => {
            const port = event.ports[0];
            MatrixHub._setWorldPort(port);
        },
    },
    worldPort: undefined,
    threadName: "",
    setThreadName(threadName) {
        this.threadName = threadName;
        WorldMatrix.threadName = this.threadName;
    },
    onMessage(event, runAfter) {
        const data = event.data;
        if (!data || !data[0])
            return;
        const message = data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message](data, event);
            return;
        }
        runAfter(event);
    },
    async requestChunkSync(chunkX, chunkY, chunkZ) {
        if (!this.worldPort)
            return;
        this.worldPort.postMessage([
            "matrix-sync-chunk",
            this.threadName,
            chunkX,
            chunkY,
            chunkZ,
        ]);
        return await WorldMatrix.awaitChunkLoad(chunkX, chunkY, chunkZ);
    },
    requestChunkRelease(chunkX, chunkY, chunkZ) {
        if (!this.worldPort)
            return;
        this.worldPort.postMessage([
            "matrix-release-chunk",
            this.threadName,
            chunkX,
            chunkY,
            chunkZ,
        ]);
    },
    _setWorldPort(port) {
        this.worldPort = port;
        this.worldPort.onmessage = (event) => {
            console.log(event);
        };
    },
    _syncChunk(data) {
        const chunkSAB = data[1];
        const chunkStateSAB = data[2];
        const chunkX = data[3];
        const chunkY = data[4];
        const chunkZ = data[5];
        WorldMatrix.__setChunk(chunkX, chunkY, chunkZ, chunkSAB, chunkStateSAB);
    },
    _releaseChunk(data) {
        const chunkX = data[1];
        const chunkY = data[2];
        const chunkZ = data[3];
        WorldMatrix.__removeChunk(chunkX, chunkY, chunkZ);
    },
    _syncGlobalVoxelPalette(data) {
        WorldMatrix.__setGlobalVoxelPalette(data[1], data[2]);
    },
    _syncRegionData(data) {
        const palette = data[1];
        const regionX = data[2];
        const regionY = data[3];
        const regionZ = data[4];
        WorldMatrix.__syncRegionData(regionX, regionY, regionZ, palette);
    },
    _releaseRegionVoxelPalette(data) {
        const regionX = data[1];
        const regionY = data[2];
        const regionZ = data[3];
        WorldMatrix.__removeRegionVoxelPalette(regionX, regionY, regionZ);
    },
    _setThreadName(data) {
        this.threadName = data[1];
        WorldMatrix.threadName = this.threadName;
    },
};
