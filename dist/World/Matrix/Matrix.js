/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export class Matrix {
    DVEW;
    //two minutes
    updateDieTime = 120000;
    loadedChunks = {};
    chunkStatesSAB = {};
    //A view of the chunk states SAB. The states are used to define if the chunk is 'locked' or not.
    chunkStates = {};
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    isChunkInMatrix(chunkX, chunkY, chunkZ) {
        return this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`] !== undefined;
    }
    isChunkLocked(chunkX, chunkY, chunkZ) {
        if (!this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`])
            return false;
        return (Atomics.load(this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`], 0) == 1);
    }
    lockChunk(chunkX, chunkY, chunkZ) {
        if (!this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`])
            return false;
        Atomics.store(this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`], 0, 1);
        return true;
    }
    unLockChunk(chunkX, chunkY, chunkZ) {
        if (!this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`])
            return false;
        Atomics.store(this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`], 0, 0);
        return true;
    }
    updateChunkData(chunkX, chunkY, chunkZ, run) {
        const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk) {
            return false;
        }
        if (!this.isChunkInMatrix(chunkX, chunkY, chunkZ)) {
            run(chunk);
        }
        const prom = new Promise((resolve, reject) => {
            if (!this.isChunkLocked(chunkX, chunkY, chunkZ)) {
                this.lockChunk(chunkX, chunkY, chunkZ);
                run(chunk);
                this.unLockChunk(chunkX, chunkY, chunkZ);
                resolve(true);
            }
            else {
                const inte = setInterval(() => {
                    if (!this.isChunkLocked(chunkX, chunkY, chunkZ)) {
                        this.lockChunk(chunkX, chunkY, chunkZ);
                        run(chunk);
                        this.unLockChunk(chunkX, chunkY, chunkZ);
                        resolve(true);
                    }
                }, 1);
                setTimeout(() => {
                    clearInterval(inte);
                    resolve(false);
                }, this.updateDieTime);
            }
        });
        return prom;
    }
    releaseChunk(chunkX, chunkY, chunkZ) {
        if (!this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`])
            return;
        const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        const voxels = [];
        const length = chunk.voxels.length;
        const chunkSABView = chunk.voxels;
        let i = length;
        while (i--) {
            voxels[i] = chunkSABView[i];
        }
        chunk.voxels = voxels;
        delete this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`];
        return true;
    }
    createChunkSAB(chunkX, chunkY, chunkZ) {
        const chunk = this.DVEW.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        const length = chunk.voxels.length;
        const chunkSAB = new SharedArrayBuffer(length * 4);
        const chunkStateSAB = new SharedArrayBuffer(1);
        const chunkSABView = new Uint32Array(chunkSAB);
        let i = length;
        while (i--) {
            chunkSABView[i] = chunk.voxels[i];
        }
        this.loadedChunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunkSAB;
        chunk.voxels = chunkSABView;
        this.chunkStates[`${chunkX}-${chunkZ}-${chunkY}`] = new Uint8Array(chunkStateSAB);
        return [chunkSAB, chunkStateSAB];
    }
}
