/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export class MatrixHub {
    threadName;
    worldMatrix;
    messageFunctions = {
        "sync-chunk": (data) => {
            this._syncChunk(data);
        },
        "release-chunk": (data) => {
            this._releaseChunk(data);
        },
        "sync-global-palettek": (data) => {
            this._releaseChunk(data);
        },
        "sync-region-palette": (data) => {
            this._releaseChunk(data);
        },
        "release-region-palette": (data) => {
            this._releaseChunk(data);
        },
        "set-world-port": (data) => {
            this._releaseChunk(data);
        },
    };
    worldPort;
    constructor(threadName, worldMatrix) {
        this.threadName = threadName;
        this.worldMatrix = worldMatrix;
    }
    onMessage(data, runAfter) {
        if (!data[0])
            return;
        const message = data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message](data);
            return;
        }
        runAfter(data);
    }
    requestChunkSync(chunkX, chunkY, chunkZ) {
        this.worldPort.postMessage(["matrix-sync-chunk"]);
    }
    requestChunkRelease(chunkX, chunkY, chunkZ) { }
    _setWorldPort(port) {
        this.worldPort = port;
    }
    _syncChunk(data) {
        const chunkSAB = data[1];
        const chunkStateSAB = data[2];
        const chunkX = data[3];
        const chunkY = data[4];
        const chunkZ = data[5];
        this.worldMatrix.__setChunk(chunkX, chunkY, chunkZ, chunkSAB, chunkStateSAB);
    }
    _releaseChunk(data) {
        const chunkX = data[1];
        const chunkY = data[2];
        const chunkZ = data[3];
        this.worldMatrix.__removeChunk(chunkX, chunkY, chunkZ);
    }
    _syncGlobalVoxelPalette(data) {
        this.worldMatrix.__setGlobalVoxelPalette(data[1]);
    }
    _syncRegionVoxelPalette(data) {
        const palette = data[1];
        const regionX = data[2];
        const regionY = data[3];
        const regionZ = data[4];
        this.worldMatrix.__setRegionVoxelPalette(regionX, regionY, regionZ, palette);
    }
    _releaseRegionVoxelPalette(data) {
        const regionX = data[1];
        const regionY = data[2];
        const regionZ = data[3];
        this.worldMatrix.__removeRegionVoxelPalette(regionX, regionY, regionZ);
    }
}
