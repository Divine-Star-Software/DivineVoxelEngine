import { Util } from "../../Global/Util.helper.js";
export const RichData = {
    worldBounds: Util.getWorldBounds(),
    richRegions: {},
    getRichRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        if (!this.richRegions[regionKey])
            return false;
        return this.richRegions[regionKey];
    },
    getRichChunk(x, y, z) {
        const region = this.getRichRegion(x, y, z);
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
    addRichRegion(x, y, z) {
        if (this.getRichRegion(x, y, z))
            return false;
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        this.richRegions[regionKey] = { chunks: {} };
        return this.richRegions[regionKey];
    },
    addRichChunk(x, y, z) {
        let region = this.getRichRegion(x, y, z);
        if (!region) {
            region = this.addRichRegion(x, y, z);
        }
        const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
        if (!region.chunks[worldColumnKey]) {
            region.chunks[worldColumnKey] = {};
        }
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        region.chunks[worldColumnKey][chunkKey] = {};
        return region.chunks[worldColumnKey][chunkKey];
    },
    setRichData(x, y, z, data) {
        let chunk = this.getRichChunk(x, y, z);
        if (!chunk) {
            chunk = this.addRichChunk(x, y, z);
        }
        const richKey = this.worldBounds.getRichPositionKey(x, y, z);
        chunk[richKey] = data;
    },
    getRichData(x, y, z) {
        let chunk = this.getRichChunk(x, y, z);
        if (!chunk)
            return false;
        const richKey = this.worldBounds.getRichPositionKey(x, y, z);
        const data = chunk[richKey];
        if (!data)
            return false;
        return data;
    },
};
