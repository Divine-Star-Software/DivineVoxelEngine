//objects
import { Util } from "../Global/Util.helper.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export const WorldMatrix = {
    _3dArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    voxelByte: Util.getVoxelByte(),
    //two minutes
    updateDieTime: 120000,
    loadDieTime: 10000,
    regions: {},
    chunks: {},
    chunkStates: {},
    paletteMode: 0,
    globalVoxelPalette: {},
    globalVoxelPaletteRecord: {},
    regionVoxelPalettes: {},
    threadName: "",
    syncChunkBounds() {
        this.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
    },
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(x, y, z, timeout = 120000) {
        return Util.createPromiseCheck({
            check: () => {
                return this.getChunk(x, y, z) !== false;
            },
            checkInterval: 10,
            failTimeOut: timeout,
            onFail: () => {
                const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
                console.warn(`${this.threadName} could not load the chunk ${chunkKey} in time.`);
            },
        });
    },
    __setGlobalVoxelPalette(palette, record) {
        this.globalVoxelPalette = palette;
        this.globalVoxelPaletteRecord = record;
    },
    __syncRegionData(x, y, z, palette) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        const region = this.regions[regionKey];
        region.palette = palette;
    },
    __removeRegionVoxelPalette(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        if (!this.regionVoxelPalettes[regionKey])
            return false;
        delete this.regionVoxelPalettes[regionKey];
    },
    getVoxel(x, y, z) {
        let palette = this.globalVoxelPalette;
        let record = this.globalVoxelPaletteRecord;
        if (this.paletteMode == 1) {
            const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
            const region = this.regions[regionKey];
            if (region && region?.palette) {
                palette = region.palette.palette;
                record = region.palette.record;
            }
            else {
                return false;
            }
        }
        const numericVoxelId = this.getVoxelNumberID(x, y, z);
        if (numericVoxelId === false)
            return false;
        if (numericVoxelId == 0)
            return ["dve:air"];
        const paletteId = palette[numericVoxelId];
        return record[paletteId];
    },
    _createRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        const region = {
            chunks: {},
        };
        this.regions[regionKey] = region;
        return region;
    },
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(x, y, z, chunkSAB, chunkStateSAB) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        let region = this.regions[regionKey];
        if (!region) {
            region = this._createRegion(x, y, z);
        }
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        region.chunks[chunkKey] = {
            voxels: new Uint32Array(chunkSAB),
            chunkStates: new Uint8Array(chunkStateSAB),
        };
    },
    getRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        let region = this.regions[regionKey];
        if (!region)
            return false;
        return region;
    },
    /**# Remove Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __removeChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        delete region.chunks[chunkKey];
    },
    getChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        const chunk = region.chunks[chunkKey];
        if (!chunk)
            return false;
        return chunk;
    },
    isChunkLocked(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        return Atomics.load(chunk.chunkStates, 0) == 1;
    },
    lockChunk(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        Atomics.store(chunk.chunkStates, 0, 1);
        return true;
    },
    unLockChunk(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        Atomics.store(chunk.chunkStates, 0, 0);
        return true;
    },
    updateChunkData(x, y, z, run) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk) {
            return false;
        }
        return Util.createPromiseCheck({
            check: () => {
                return !this.isChunkLocked(x, y, z);
            },
            onReady: () => {
                run(chunk);
            },
            checkInterval: 10,
            failTimeOut: this.updateDieTime,
            onFail: () => {
                const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
                console.warn(`${this.threadName} could not load the chunk ${chunkKey} in time.`);
            },
        });
    },
    setData(x, y, z, data) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        this._3dArray.setValueUseObj(this.worldBounds.getVoxelPosition(x, y, z), chunk.voxels, data);
    },
    getData(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return -1;
        return this._3dArray.getValueUseObj(this.worldBounds.getVoxelPosition(x, y, z), chunk.voxels);
    },
    getVoxelNumberID(x, y, z) {
        const rawVoxelData = this.getData(x, y, z);
        if (rawVoxelData < 0)
            return false;
        return this.voxelByte.getId(rawVoxelData);
    },
};
