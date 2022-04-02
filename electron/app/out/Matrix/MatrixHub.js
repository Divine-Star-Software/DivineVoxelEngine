/**# Matrix Hub
 * ---
 * Handles messages from the WorldData thread.
 * It syncs the chunk data.
 */
export class MatrixHub {
    worldMatrix;
    constructor(worldMatrix) {
        this.worldMatrix = worldMatrix;
    }
    onMessage(data, runAfter) {
        if (data[0] == "sync-chun") {
            this._syncChunk(data);
            return;
        }
        if (data[0] == "release-chun") {
            this._releaseChunk(data);
            return;
        }
        if (data[0] == "sync-global-palette") {
            this._syncGlobalVoxelPalette(data);
            return;
        }
        if (data[0] == "sync-region-palette") {
            this._syncGlobalVoxelPalette(data);
            return;
        }
        if (data[0] == "release-region-palette") {
            this._syncGlobalVoxelPalette(data);
            return;
        }
        runAfter(data);
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