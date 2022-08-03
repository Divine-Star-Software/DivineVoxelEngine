import { Util } from "../../Global/Util.helper.js";
export const RichData = {
    worldBounds: Util.getWorldBounds(),
    richRegions: {},
    getRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        if (!this.richRegions[regionKey])
            return false;
        return this.richRegions[regionKey];
    },
    getChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
        if (!region.chunks[worldColumnKey])
            return false;
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        const chunk = region.chunks[worldColumnKey][chunkKey];
        if (!chunk)
            return false;
        return chunk;
    },
    addRegion(x, y, z) {
        if (this.getRegion(x, y, z))
            return false;
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        this.richRegions[regionKey] = { chunks: {} };
        return this.richRegions[regionKey];
    },
    addChunk(x, y, z) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, z);
        }
        const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
        if (!region.chunks[worldColumnKey]) {
            region.chunks[worldColumnKey] = {};
        }
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        region.chunks[worldColumnKey][chunkKey] = {};
        return region.chunks[worldColumnKey][chunkKey];
    },
    setData(x, y, z, data) {
        let chunk = this.getChunk(x, y, z);
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const richKey = this.worldBounds.getRichPositionKey(x, y, z);
        chunk[richKey] = data;
    },
    getData(x, y, z) {
        let chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        const richKey = this.worldBounds.getRichPositionKey(x, y, z);
        const data = chunk[richKey];
        if (!data)
            return false;
        return data;
    },
    removeData(x, y, z) {
        let chunk = this.getChunk(x, y, z);
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const richKey = this.worldBounds.getRichPositionKey(x, y, z);
        delete chunk[richKey];
    },
};
