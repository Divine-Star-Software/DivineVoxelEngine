/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export class MatrixHub {
    worldMatrix;
    messageFunctions = {
        "sync-chunk": (data) => {
            this._syncChunk(data);
        },
        "release-chunk": (data) => {
            this._releaseChunk(data);
        },
        "sync-global-palette": (data) => {
            this._syncGlobalVoxelPalette(data);
        },
        "sync-region-palette": (data) => {
            this._syncRegionVoxelPalette(data);
        },
        "release-region-palette": (data) => {
            this._releaseRegionVoxelPalette(data);
        },
        "set-thread-name": (data) => {
            this._setThreadName(data);
        },
        "set-world-port": (data, event) => {
            const port = event.ports[0];
            this._setWorldPort(port);
        },
    };
    worldPort;
    threadName;
    constructor(worldMatrix, threadName) {
        this.worldMatrix = worldMatrix;
        if (threadName) {
            this.threadName = threadName;
        }
    }
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
    }
    async requestChunkSync(chunkX, chunkY, chunkZ) {
        this.worldPort.postMessage([
            "matrix-sync-chunk",
            this.threadName,
            chunkX,
            chunkY,
            chunkZ,
        ]);
        return await this.worldMatrix.awaitChunkLoad(chunkX, chunkY, chunkZ);
    }
    requestChunkRelease(chunkX, chunkY, chunkZ) {
        this.worldPort.postMessage([
            "matrix-release-chunk",
            this.threadName,
            chunkX,
            chunkY,
            chunkZ,
        ]);
    }
    _setWorldPort(port) {
        this.worldPort = port;
        this.worldPort.onmessage = (event) => {
            console.log(event);
        };
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
        this.worldMatrix.__setGlobalVoxelPalette(data[1], data[2]);
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
    _setThreadName(data) {
        this.threadName = data[1];
    }
}
