export class WorldData {
    builderManager;
    UTIL;
    renderDistance = 20;
    chunkProccesor;
    chunks = {};
    constructor(builderManager, UTIL) {
        this.builderManager = builderManager;
        this.UTIL = UTIL;
    }
    setChunkProcessor(chunkProccesor) {
        this.chunkProccesor = chunkProccesor;
    }
    getChunk(chunkX, chunkZ) {
        if (!this.chunks[chunkX]) {
            return false;
        }
        else if (!this.chunks[chunkX][chunkZ]) {
            return false;
        }
        else {
            return this.chunks[chunkX][chunkZ];
        }
    }
    removeChunk(chunkX, chunkZ) {
    }
    setChunk(chunkX, chunkZ, chunk) {
        this.chunks[chunkX] ??= {};
        this.chunks[chunkX][chunkZ] = chunk;
    }
    requestBlockAdd(chunkX, chunkZ, x, y, z, blockId = 1) {
        const chunk = this.chunks[chunkX][chunkZ];
        const relativePOS = this._getRelativeChunkPosition(chunkX, chunkZ, x, y, z);
        const relativeX = relativePOS[0];
        const relativeZ = relativePOS[1];
        if (!chunk[relativeX][relativeZ]) {
            chunk[relativeX][relativeZ] ??= [];
            chunk[relativeX][relativeZ][y] = ["dve:voxel1", 0, ""];
            const template = this.chunkProccesor.makeChunkTemplate(chunk, chunkX, chunkZ);
            this.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
            this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
        }
        else if (!chunk[relativeX][relativeZ][y]) {
            chunk[relativeX][relativeZ][y] = ["dve:voxel1", 0, ""];
            const template = this.chunkProccesor.makeChunkTemplate(chunk, chunkX, chunkZ);
            this.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
            this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
        }
        return false;
    }
    _checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ) {
        buildChunkX0: if (relativeX == 0) {
            const newChunkX = chunkX - 16;
            const newChunkZ = chunkZ;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX0;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX15: if (relativeX == 15) {
            const newChunkX = chunkX + 16;
            const newChunkZ = chunkZ;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX15;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkZ0: if (relativeZ == 0) {
            const newChunkX = chunkX;
            const newChunkZ = chunkZ - 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkZ0;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkZ15: if (relativeZ == 15) {
            const newChunkX = chunkX;
            const newChunkZ = chunkZ + 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkZ15;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX15Z15: if (relativeZ == 15 && relativeX == 15) {
            const newChunkX = chunkX + 16;
            const newChunkZ = chunkZ + 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX15Z15;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX0Z0: if (relativeZ == 0 && relativeX == 0) {
            const newChunkX = chunkX - 16;
            const newChunkZ = chunkZ - 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX0Z0;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX15Z0: if (relativeZ == 0 && relativeX == 15) {
            const newChunkX = chunkX + 16;
            const newChunkZ = chunkZ - 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX15Z0;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX0Z15: if (relativeZ == 15 && relativeX == 0) {
            const newChunkX = chunkX - 16;
            const newChunkZ = chunkZ + 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX0Z15;
            const template = this.chunkProccesor.makeChunkTemplate(chunk, newChunkX, newChunkZ);
            this.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
    }
    _getRelativeChunkPosition(chunkX, chunkZ, x, y, z) {
        let relativeX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + 15) {
                relativeX = 15;
            }
        }
        let relativeZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + 15) {
                relativeZ = 15;
            }
        }
        if (z > 0) {
            if (z == chunkZ - 15) {
                relativeZ = 15;
            }
        }
        return [relativeX, relativeZ];
    }
    requestBlockRemove(chunkX, chunkZ, x, y, z, blockId = 1) {
        const chunk = this.chunks[chunkX][chunkZ];
        const relativePOS = this._getRelativeChunkPosition(chunkX, chunkZ, x, y, z);
        const relativeX = relativePOS[0];
        const relativeZ = relativePOS[1];
        if (!chunk[relativeX])
            return false;
        if (!chunk[relativeX][relativeZ])
            return false;
        if (chunk[relativeX][relativeZ][y]) {
            delete chunk[relativeX][relativeZ][y];
            this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
            const template = this.chunkProccesor.makeChunkTemplate(chunk, chunkX, chunkZ);
            this.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
            return chunk;
        }
        else {
            return false;
        }
    }
}
