import { CalculateVoxelLight, VoxelLightMixCalc, } from "./Functions/CalculateVoxelLight.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export class WorldData {
    DVEW;
    renderDistance = 20;
    chunkXPow2 = 4;
    chunkZPow2 = 4;
    chunkYPow2 = 7;
    chunks = {};
    _chunkRebuildQue = [];
    _chunkRebuildQueMap = {};
    calculdateVoxelLight = CalculateVoxelLight;
    voxelRGBLightMixCalc = VoxelLightMixCalc;
    infoByte;
    lightByte;
    substanceRules = {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-fluid": true,
        "solid-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": true,
        "transparent-fluid": true,
        "transparent-magma": true,
        "flora-solid": true,
        "flora-flora": true,
        "flora-transparent": true,
        "flora-fluid": true,
        "flora-magma": true,
        "fluid-solid": false,
        "fluid-flora": true,
        "fluid-transparent": true,
        "fluid-fluid": false,
        "fluid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-fluid": true,
        "magma-magma": false,
    };
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.infoByte = this.DVEW.UTIL.getInfoByte();
        this.lightByte = this.DVEW.UTIL.getLightByte();
    }
    getChunkRebuildQue() {
        return this._chunkRebuildQue;
    }
    getSubstanceNeededToRebuild(chunkX, chunkY, chunkZ) {
        return this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`];
    }
    clearChunkRebuildQue() {
        this._chunkRebuildQue = [];
        this._chunkRebuildQueMap = {};
    }
    _addToRebuildQue(x, y, z, substance) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        if (!this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`]) {
            this._chunkRebuildQue.push([chunkX, chunkY, chunkZ]);
            //@ts-ignore
            this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`] = {};
            this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`][substance] = true;
        }
        else {
            this._chunkRebuildQueMap[`${chunkX}-${chunkZ}-${chunkY}`][substance] = true;
        }
    }
    getCurrentWorldDataSize() {
        const data = JSON.stringify(this.chunks);
        return new Blob([data]).size;
    }
    getCurrentWorldDataString() {
        return JSON.stringify(this.chunks);
    }
    setLight(x, y, z, lightValue) {
        const voxel = this.getVoxel(x, y, z);
        if (voxel) {
            if (voxel[0] == -1) {
                voxel[1][voxel[1].length - 1] = lightValue;
            }
            else {
                if (voxel[0].data.substance == "solid") {
                    return false;
                }
                else {
                    const voxelInterface = voxel[0];
                    if (voxelInterface.data.lightSource && voxelInterface.data.lightValue) {
                        return false;
                    }
                    voxel[2][voxel[2].length - 1] = lightValue;
                }
            }
        }
        return true;
    }
    getLight(x, y, z) {
        const voxel = this.getVoxel(x, y, z);
        if (voxel) {
            if (voxel[0] == -1) {
                return voxel[1][voxel[1].length - 1];
            }
            else {
                const voxelInterface = voxel[0];
                if (voxelInterface.data.lightSource && voxelInterface.data.lightValue) {
                    return voxelInterface.data.lightValue;
                }
                if (voxelInterface.data.substance == "solid") {
                    return 0;
                }
                return voxel[2][voxel[2].length - 1];
            }
        }
        return 0;
    }
    /**# Is Exposed
     * ---
     * Will return true if any face of the voxel is exposed.
     * Must provide the voxel's x,y,z position.
     * @param voxel
     * @param voxelData
     * @param x
     * @param y
     * @param z
     * @returns
     */
    isVoxelExposed(voxel, voxelData, x, y, z) {
        if (this.voxelFaceCheck(voxel, voxelData, x + 1, y, z)) {
            return true;
        }
        if (this.voxelFaceCheck(voxel, voxelData, x - 1, y, z)) {
            return true;
        }
        if (this.voxelFaceCheck(voxel, voxelData, x, y + 1, z)) {
            return true;
        }
        if (this.voxelFaceCheck(voxel, voxelData, x, y - 1, z)) {
            return true;
        }
        if (this.voxelFaceCheck(voxel, voxelData, x, y, z + 1)) {
            return true;
        }
        if (this.voxelFaceCheck(voxel, voxelData, x, y, z - 1)) {
            return true;
        }
        return false;
    }
    /**# Voxel Face Check
     * ---
     * Determines if a face of a voxel is exposed.
     * You must provide the x,y,z position for the face that is being checked.
     * For instance if you want to check the top face it would be the voxels y plus 1.
     * @param voxel
     * @param voxelData
     * @param x
     * @param y
     * @param z
     * @returns
     */
    voxelFaceCheck(voxel, voxelData, x, y, z) {
        if (voxelData[0] < 0)
            return true;
        const voxelCheck = this.getVoxel(x, y, z);
        if (voxelCheck && voxelCheck[0] != -1) {
            const neighborVoxel = voxelCheck[0];
            if (this.substanceRules[`${voxel.data.substance}-${neighborVoxel.data.substance}`]) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    removeData(x, y, z) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        if (!chunk || chunk.isEmpty) {
            return false;
        }
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkYPow2) - 1;
            }
        }
        if (chunk.voxels[voxelX] &&
            chunk.voxels[voxelX][voxelZ] &&
            chunk.voxels[voxelX][voxelZ][voxelY]) {
            delete chunk.voxels[voxelX][voxelZ][voxelY];
        }
        else {
            return false;
        }
    }
    getVoxel(x, y, z) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        if (!chunk || chunk.isEmpty) {
            return false;
        }
        let globalPalette = true;
        if (chunk.palette) {
            globalPalette = false;
        }
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkYPow2) - 1;
            }
        }
        if (chunk.voxels[voxelX] &&
            chunk.voxels[voxelX][voxelZ] &&
            chunk.voxels[voxelX][voxelZ][voxelY]) {
            const voxelData = chunk.voxels[voxelX][voxelZ][voxelY];
            const voxelId = voxelData[0];
            if (voxelId == -1) {
                return [-1, voxelData];
            }
            else {
                let voxelTrueID = "";
                let voxelState = "";
                if (globalPalette) {
                    const check = this.DVEW.worldGeneration.getVoxelDataFromGlobalPalette(voxelId);
                    if (check) {
                        voxelTrueID = check[0];
                        voxelState = check[1];
                    }
                    else {
                        return false;
                    }
                }
                else {
                    const check = this.DVEW.worldGeneration.voxelPaletteHelper.getVoxelData(chunk, voxelId);
                    if (check) {
                        voxelTrueID = check[0];
                        voxelState = check[1];
                    }
                    else {
                        return false;
                    }
                }
                const voxel = this.DVEW.voxelManager.getVoxel(voxelTrueID);
                return [voxel, voxelState, voxelData];
            }
        }
        else {
            return false;
        }
    }
    getData(x, y, z) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        if (!chunk || chunk.isEmpty) {
            return false;
        }
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkYPow2) - 1;
            }
        }
        if (chunk.voxels[voxelX] &&
            chunk.voxels[voxelX][voxelZ] &&
            chunk.voxels[voxelX][voxelZ][voxelY]) {
            return chunk.voxels[voxelX][voxelZ][voxelY];
        }
        else {
            return false;
        }
    }
    _copy(data) {
        return [...data];
    }
    /**# Set Data
     * ---
     * Sets the data for a specific point in the world data.
     * Will not make a new chunk if there is none and just return false.
     * @param x
     * @param y
     * @param z
     * @param data
     * @returns
     */
    setData(x, y, z, data) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        if (!chunk || chunk.isEmpty) {
            return false;
        }
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkYPow2) - 1;
            }
        }
        const voxels = chunk.voxels;
        voxels[voxelX] ??= [];
        voxels[voxelX][voxelZ] ??= [];
        voxels[voxelX][voxelZ][voxelY] = this._copy(data);
    }
    /**# Insert Data
     * ---
     * Acts like **setData** but will create a new chunk if it does not exist.
     * @param x
     * @param y
     * @param z
     * @param data
     */
    insertData(x, y, z, data) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        let chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        if (!chunk) {
            chunk = this.DVEW.worldGeneration.getBlankChunk(false);
            this.setChunk(chunkX, chunkY, chunkZ, chunk);
        }
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkYPow2) - 1;
            }
        }
        const voxels = chunk.voxels;
        voxels[voxelX] ??= [];
        voxels[voxelX][voxelZ] ??= [];
        voxels[voxelX][voxelZ][voxelY] = this._copy(data);
    }
    getChunk(chunkX, chunkY, chunkZ) {
        if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`]) {
            return false;
        }
        return this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
    }
    removeChunk(chunkX, chunkY, chunkZ) {
        delete this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
    }
    setChunk(chunkX, chunkY, chunkZ, chunk) {
        this.chunks[`${chunkX}-${chunkZ}-${chunkY}`] = chunk;
    }
    getChunkPosition(x, y, z) {
        return [
            (x >> this.chunkXPow2) << this.chunkXPow2,
            (y >> this.chunkYPow2) << this.chunkYPow2,
            (z >> this.chunkXPow2) << this.chunkXPow2,
        ];
    }
    requestVoxelAdd(x, y, z, voxelId, voxelStateId, voxelData = 0) {
        const chunkX = (x >> this.chunkXPow2) << this.chunkXPow2;
        const chunkY = (y >> this.chunkYPow2) << this.chunkYPow2;
        const chunkZ = (z >> this.chunkXPow2) << this.chunkXPow2;
        const chunk = this.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return;
        let voxelPalletId = 0;
        if (chunk.palette) {
            const check = this.DVEW.worldGeneration.voxelPaletteHelper.getVoxelPaletteId(chunk, voxelId, voxelStateId);
            if (check) {
                voxelPalletId = check;
            }
            else {
                const newPaletteId = this.DVEW.worldGeneration.voxelPaletteHelper.addToChunksVoxelPalette(chunk, voxelId, voxelStateId);
                if (!newPaletteId)
                    return;
                voxelPalletId = newPaletteId;
            }
        }
        else {
            const check = this.DVEW.worldGeneration.getVoxelPaletteIdFromGlobalPalette(voxelId, voxelStateId);
            if (check) {
                voxelPalletId = check;
            }
        }
        let light = 0;
        const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
        if (voxel.data.lightSource && voxel.data.lightValue) {
            light = voxel.data.lightValue;
        }
        else {
            light = this.getLight(x, y, z);
        }
        this.setData(x, y, z, [voxelPalletId, voxelData, light]);
        this._addToRebuildQue(x, y, z, "all");
        this._addToRebuildQue(x + 1, y, z, "all");
        this._addToRebuildQue(x - 1, y, z, "all");
        this._addToRebuildQue(x, y + 1, z, "all");
        this._addToRebuildQue(x, y - 1, z, "all");
        this._addToRebuildQue(x, y, z + 1, "all");
        this._addToRebuildQue(x, y, z - 1, "all");
    }
    requestVoxelBeRemoved(x, y, z) {
        this.setData(x, y, z, [-1, 0]);
        this._addToRebuildQue(x, y, z, "all");
        this._addToRebuildQue(x + 1, y, z, "all");
        this._addToRebuildQue(x - 1, y, z, "all");
        this._addToRebuildQue(x, y + 1, z, "all");
        this._addToRebuildQue(x, y - 1, z, "all");
        this._addToRebuildQue(x, y, z + 1, "all");
        this._addToRebuildQue(x, y, z - 1, "all");
    }
}
