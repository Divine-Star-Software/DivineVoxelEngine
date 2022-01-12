export class WorldData {
    DVEW;
    renderDistance = 20;
    chunkProccesor;
    chunks = {};
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    getCurrentWorldDataSize() {
        const data = JSON.stringify(this.chunks);
        return new Blob([data]).size;
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
    removeChunk(chunkX, chunkZ) { }
    setChunk(chunkX, chunkZ, chunk) {
        this.chunks[chunkX] ??= {};
        this.chunks[chunkX][chunkZ] = chunk;
    }
    requestBlockAdd(chunkX, chunkZ, x, y, z, voxelPalletId = 1) {
        const chunk = this.chunks[chunkX][chunkZ];
        const relativePOS = this._getRelativeChunkPosition(chunkX, chunkZ, x, y, z);
        const relativeX = relativePOS[0];
        const relativeZ = relativePOS[1];
        const chunkVoxels = chunk.voxels;
        let pallet = chunk.voxelPallet;
        if (!pallet) {
            pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
        }
        if (!chunkVoxels[relativeX][relativeZ]) {
            chunkVoxels[relativeX][relativeZ] ??= [];
            chunkVoxels[relativeX][relativeZ][y] = voxelPalletId;
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunkVoxels, pallet, chunkX, chunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
            this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
        }
        else if (!chunkVoxels[relativeX][relativeZ][y]) {
            chunkVoxels[relativeX][relativeZ][y] = voxelPalletId;
            console.log("sup");
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunkVoxels, pallet, chunkX, chunkZ);
            console.log();
            this.DVEW.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
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
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX15: if (relativeX == 15) {
            const newChunkX = chunkX + 16;
            const newChunkZ = chunkZ;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX15;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkZ0: if (relativeZ == 0) {
            const newChunkX = chunkX;
            const newChunkZ = chunkZ - 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkZ0;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkZ15: if (relativeZ == 15) {
            const newChunkX = chunkX;
            const newChunkZ = chunkZ + 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkZ15;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX15Z15: if (relativeZ == 15 && relativeX == 15) {
            const newChunkX = chunkX + 16;
            const newChunkZ = chunkZ + 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX15Z15;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX0Z0: if (relativeZ == 0 && relativeX == 0) {
            const newChunkX = chunkX - 16;
            const newChunkZ = chunkZ - 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX0Z0;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX15Z0: if (relativeZ == 0 && relativeX == 15) {
            const newChunkX = chunkX + 16;
            const newChunkZ = chunkZ - 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX15Z0;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
        }
        buildChunkX0Z15: if (relativeZ == 15 && relativeX == 0) {
            const newChunkX = chunkX - 16;
            const newChunkZ = chunkZ + 16;
            const chunk = this.getChunk(newChunkX, newChunkZ);
            if (!chunk)
                break buildChunkX0Z15;
            let pallet = chunk.voxelPallet;
            if (!pallet) {
                pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
            }
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunk.voxels, pallet, newChunkX, newChunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(newChunkX, newChunkZ, template);
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
        const chunkVoxels = chunk.voxels;
        let pallet = chunk.voxelPallet;
        if (!pallet) {
            pallet = this.DVEW.worldGeneration.getGlobalVoxelPallet();
        }
        if (!chunkVoxels[relativeX])
            return false;
        if (!chunkVoxels[relativeX][relativeZ])
            return false;
        if (chunkVoxels[relativeX][relativeZ][y]) {
            delete chunkVoxels[relativeX][relativeZ][y];
            this._checkNearbyChunksToRebuild(chunkX, chunkZ, relativeX, relativeZ);
            const template = this.DVEW.chunkProccesor.makeChunkTemplate(chunkVoxels, pallet, chunkX, chunkZ);
            this.DVEW.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
            return chunkVoxels;
        }
        else {
            return false;
        }
    }
}
