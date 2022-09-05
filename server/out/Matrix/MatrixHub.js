import { VoxelMatrix } from "./VoxelMatrix.js";
import { WorldMatrix } from "./WorldMatrix.js";
import { Util } from "../Global/Util.helper.js";
/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export const MatrixHub = {
    environment: "browser",
    worldPort: undefined,
    threadName: "",
    __threadNameSet: false,
    messageFunctions: {
        "sync-chunk": (data) => {
            MatrixHub._syncChunk(data);
        },
        "release-chunk": (data) => {
            MatrixHub._releaseChunk(data);
        },
        "sync-voxel-palette": (data) => {
            MatrixHub._syncGlobalVoxelPalette(data);
        },
        "set-thread-name": (data) => {
            MatrixHub._setThreadName(data);
        },
        "set-world-port": (data, event) => {
            if (MatrixHub.environment == "node") {
                const port = data[1];
                MatrixHub._setWorldPort(port);
            }
            else {
                const port = event.ports[0];
                MatrixHub._setWorldPort(port);
            }
        },
        "sync-voxel-data": (data) => {
            MatrixHub._syncVoxelData(data);
        },
    },
    isReady() {
        return this.__threadNameSet && this.worldPort != undefined;
    },
    onMessage(event, runAfter) {
        if (this.environment == "node") {
            const data = event;
            if (!data || !data[0])
                return;
            const message = data[0];
            if (this.messageFunctions[message]) {
                this.messageFunctions[message](data, event);
                return;
            }
        }
        else {
            const data = event.data;
            if (!data || !data[0])
                return;
            const message = data[0];
            if (this.messageFunctions[message]) {
                this.messageFunctions[message](data, event);
                return;
            }
        }
        runAfter(event);
    },
    /**# Request Chunk Sync
     *
     * Will sync a chunk if it exists.
     *
     */
    async requestChunkSync(x, y, z) {
        if (!this.worldPort)
            return;
        const chunkPOS = WorldMatrix.worldBounds.getChunkPosition(x, y, z);
        this.worldPort.postMessage([
            "matrix-sync-chunk",
            this.threadName,
            chunkPOS.x,
            chunkPOS.y,
            chunkPOS.z,
        ]);
        return await WorldMatrix.awaitChunkLoad(chunkPOS.x, chunkPOS.y, chunkPOS.z);
    },
    /**# Request Chunk Load
     *
     * Will sync a chunk if it exists.
     *
     */
    async requestChunkLoad(x, y, z) {
        if (!this.worldPort)
            return;
        const chunkPOS = WorldMatrix.worldBounds.getChunkPosition(x, y, z);
        this.worldPort.postMessage([
            "matrix-load-chunk",
            this.threadName,
            chunkPOS.x,
            chunkPOS.y,
            chunkPOS.z,
        ]);
        return await WorldMatrix.awaitChunkLoad(chunkPOS.x, chunkPOS.y, chunkPOS.z);
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
        const voxelsSAB = data[1];
        const voxelStatesSAB = data[2];
        const chunkX = data[3];
        const chunkY = data[4];
        const chunkZ = data[5];
        WorldMatrix.__setChunk(chunkX, chunkY, chunkZ, voxelsSAB, voxelStatesSAB);
    },
    _syncVoxelData(data) {
        VoxelMatrix.syncData(data[1], data[2]);
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
    _setThreadName(data) {
        this.threadName = data[1];
        WorldMatrix.threadName = this.threadName;
        this.__threadNameSet = true;
    },
};
MatrixHub.environment = Util.getEnviorment();
