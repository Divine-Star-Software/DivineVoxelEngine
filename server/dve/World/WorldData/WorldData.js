/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export class WorldData {
    DVEW;
    renderDistance = 20;
    worldBounds;
    regionXPow2 = 9;
    regionZPow2 = 9;
    regionYPow2 = 8;
    voxelPaletteFunctions = {
        global: (voxelId, voxelStateId, chunk, region) => {
            const check = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(voxelId, voxelStateId);
            if (check) {
                return this.DVEW.worldGeneration.paintVoxel(check);
            }
            return -1;
        },
        "per-region": (voxelId, voxelStateId, chunk, region) => {
            if (!region)
                return -1;
            const check = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromRegion(region, voxelId, voxelStateId);
            if (check) {
                return this.DVEW.worldGeneration.paintVoxel(check);
            }
            else {
                const newPaletteId = this.DVEW.worldGeneration.voxelPalette.addToRegionsVoxelPalette(region, voxelId, voxelStateId);
                if (!newPaletteId)
                    return -1;
                return this.DVEW.worldGeneration.paintVoxel(newPaletteId);
            }
        },
    };
    regions = {};
    chunks = {};
    _RGBLightRemoveQue = [];
    _RGBLightUpdateQue = [];
    _chunkRebuildQue = [];
    _chunkRebuildQueMap = {};
    infoByte;
    lightByte;
    voxelByte;
    _3dArray;
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
    lightValueFunctions = {
        r: (value) => {
            return this.lightByte.getR(value);
        },
        g: (value) => {
            return this.lightByte.getG(value);
        },
        b: (value) => {
            return this.lightByte.getB(value);
        },
        s: (value) => {
            return this.lightByte.getS(value);
        },
    };
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.worldBounds = DVEW.worldBounds;
        this.infoByte = this.DVEW.UTIL.getInfoByte();
        this.lightByte = this.DVEW.UTIL.getLightByte();
        this.voxelByte = this.DVEW.UTIL.getVoxelByte();
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    syncChunkBounds() {
        this.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
    }
    getRGBLightUpdateQue() {
        return this._RGBLightUpdateQue;
    }
    clearRGBLightUpdateQue() {
        this._RGBLightUpdateQue = [];
    }
    getRGBLightRemoveQue() {
        return this._RGBLightRemoveQue;
    }
    clearRGBLightRemoveQue() {
        this._RGBLightRemoveQue = [];
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
    addToRebuildQue(x, y, z, substance) {
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        if (!this._chunkRebuildQueMap[chunkKey]) {
            this._chunkRebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
            //@ts-ignore
            this._chunkRebuildQueMap[chunkKey] = {};
            this._chunkRebuildQueMap[chunkKey][substance] = true;
        }
        else {
            this._chunkRebuildQueMap[chunkKey][substance] = true;
        }
    }
    getCurrentWorldDataSize() {
        const data = JSON.stringify(this.regions);
        return new Blob([data]).size;
    }
    getCurrentWorldDataString() {
        return JSON.stringify(this.regions);
    }
    setAir(x, y, z, lightValue) {
        let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
        this.setData(x, y, z, data);
    }
    setLight(x, y, z, lightValue) {
        let data = this.getData(x, y, z);
        data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
        this.setData(x, y, z, data);
    }
    /**# Get Light
     * ---
     * Returns the raw light value for a voxel.
     */
    getLight(x, y, z) {
        const voxel = this.getVoxel(x, y, z);
        if (voxel) {
            if (voxel[0] == -1) {
                return this.voxelByte.decodeLightFromVoxelData(voxel[1]);
            }
            else {
                const voxelData = voxel[0];
                if (voxelData.lightSource && voxelData.lightValue) {
                    return voxelData.lightValue;
                }
                if (voxelData.substance == "solid") {
                    return 0;
                }
                return this.voxelByte.decodeLightFromVoxelData(voxel[2]);
            }
        }
        return 0;
    }
    /**# Get Light Value
     * ---
     * Returns the value of the light level type for the given voxel at x,y,z.
     */
    getLightValue(x, y, z, type) {
        return this.lightValueFunctions[type](this.getLight(x, y, z));
    }
    /**# Is Exposed
     * ---
     * Will return true if any face of the voxel is exposed.
     * Must provide the voxel's x,y,z position.
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
     */
    voxelFaceCheck(voxel, voxelData, x, y, z) {
        const voxelCheck = this.getVoxel(x, y, z);
        if (voxelCheck && voxelCheck[0] != -1) {
            const neighborVoxel = voxelCheck[0];
            if (this.substanceRules[`${voxel.substance}-${neighborVoxel.substance}`]) {
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
        const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
        const regionKey = this.worldBounds.getRegionKey(regionPOS);
        let region = this.regions[regionKey];
        if (!region) {
            return false;
        }
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        const chunk = chunks[chunkKey];
        if (!chunk || chunk.isEmpty) {
            return false;
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
        if (this._3dArray.getValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels)) {
            this._3dArray.setValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels, 0);
        }
        else {
            return false;
        }
    }
    getData(x, y, z) {
        const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
        const regionKey = this.worldBounds.getRegionKey(regionPOS);
        let region = this.regions[regionKey];
        if (!region) {
            return -1;
        }
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        const chunk = chunks[chunkKey];
        if (!chunk || chunk.isEmpty) {
            return -1;
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
        return this._3dArray.getValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels);
    }
    /**# Set Data
     * ---
     * Sets the data for a specific point in the world data.
     * Will not make a new chunk if there is none and just return false.
     */
    setData(x, y, z, data) {
        const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
        const regionKey = this.worldBounds.getRegionKey(regionPOS);
        let region = this.regions[regionKey];
        if (!region) {
            return -1;
        }
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        const chunk = chunks[chunkKey];
        if (!chunk || chunk.isEmpty) {
            return -1;
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
        return this._3dArray.setValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels, data);
    }
    getVoxel(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const voxelData = this.getData(x, y, z);
        if (voxelData < 0)
            return false;
        let globalPalette = true;
        if (region.palette) {
            globalPalette = false;
        }
        if (voxelData) {
            const voxelId = this.voxelByte.getId(voxelData);
            if (voxelId == 0) {
                return [-1, voxelData];
            }
            else {
                let voxelTrueID = "";
                let voxelState = "";
                if (globalPalette) {
                    const check = this.DVEW.worldGeneration.voxelPalette.getVoxelDataFromGlobalPalette(voxelId);
                    if (check) {
                        voxelTrueID = check[0];
                        voxelState = check[1];
                    }
                    else {
                        return false;
                    }
                }
                else {
                    const check = this.DVEW.worldGeneration.voxelPalette.getVoxelDataFromRegion(region, voxelId);
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
    addRegion(x, y, z) {
        let regionPalette = this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region";
        const newRegion = this.DVEW.worldGeneration.getBlankRegion(regionPalette);
        const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
        const regionKey = this.worldBounds.getRegionKey(regionPOS);
        this.regions[regionKey] = newRegion;
        return newRegion;
    }
    getRegion(x, y, z) {
        const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
        const regionKey = this.worldBounds.getRegionKey(regionPOS);
        if (!this.regions[regionKey])
            return false;
        return this.regions[regionKey];
    }
    addChunk(x, y, z) {
        const chunk = this.DVEW.worldGeneration.getBlankChunk(false);
        if (this.DVEW.engineSettings.settings.lighting?.doSunLight ||
            this.DVEW.engineSettings.settings.lighting?.doRGBLight) {
            if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight ||
                this.DVEW.engineSettings.settings.lighting?.autoSunLight) {
                this.DVEW.worldGeneration.chunkDataHelper.fillWithAir(chunk);
            }
        }
        this.setChunk(x, y, z, chunk);
        return chunk;
    }
    paintVoxel(voxelId, voxelStateId, x, y, z) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, x);
        }
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        let chunk = chunks[chunkKey];
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
        const data = this.voxelPaletteFunctions[
        //@ts-ignore
        this.DVEW.engineSettings.settings.world?.voxelPaletteMode](voxelId, voxelStateId, chunk);
        if (data < 0)
            return;
        this._3dArray.setValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels, data);
        if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
            const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
            if (voxel.lightSource && voxel.lightValue) {
                this._RGBLightUpdateQue.push([x, y, z]);
            }
        }
    }
    /**# Insert Data
     * ---
     * Acts like **setData** but will create a new chunk if it does not exist.
     */
    insertData(x, y, z, data) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, x);
        }
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        let chunk = chunks[chunkKey];
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
        this._3dArray.setValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels, data);
    }
    getChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        if (!chunks[chunkKey])
            return false;
        return chunks[chunkKey];
    }
    removeChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        delete chunks[chunkKey];
    }
    setChunk(x, y, z, chunk, doNotSyncInBuilderThread = false) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, z);
        }
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getRegionKey(chunkPOS);
        const chunks = region.chunks;
        chunks[chunkKey] = chunk;
        if (doNotSyncInBuilderThread)
            return;
        this.DVEW.builderCommManager.syncChunkInAllBuilders(chunkPOS.x, chunkPOS.y, chunkPOS.z);
    }
    requestVoxelAdd(voxelId, voxelStateId, x, y, z) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, x);
        }
        const chunks = region.chunks;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        let chunk = chunks[chunkKey];
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z, chunkPOS);
        const data = this.voxelPaletteFunctions[
        //@ts-ignore
        this.DVEW.engineSettings.settings.world?.voxelPaletteMode](voxelId, voxelStateId, chunk);
        if (data < 0)
            return;
        this._3dArray.setValue(voxelPOS.x, voxelPOS.y, voxelPOS.z, chunk.voxels, data);
        let needLightUpdate = false;
        if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
            const voxel = this.DVEW.voxelManager.getVoxel(voxelId);
            if (voxel.lightSource && voxel.lightValue) {
                needLightUpdate = true;
                this._RGBLightUpdateQue.push([x, y, z]);
            }
        }
        this.addToRebuildQue(x, y, z, "all");
        this.addToRebuildQue(x + 1, y, z, "all");
        this.addToRebuildQue(x - 1, y, z, "all");
        this.addToRebuildQue(x, y + 1, z, "all");
        this.addToRebuildQue(x, y - 1, z, "all");
        this.addToRebuildQue(x, y, z + 1, "all");
        this.addToRebuildQue(x, y, z - 1, "all");
        if (this.DVEW.engineSettings.settings.updating?.autoRebuild) {
            if (needLightUpdate) {
                this.DVEW.runRGBLightUpdateQue();
                if (this.DVEW.engineSettings.settings.updating?.rebuildMode == "sync") {
                    this.DVEW.runChunkRebuildQue();
                }
                else {
                    this.DVEW.runChunkRebuildQue();
                }
            }
        }
    }
    requestVoxelBeRemoved(x, y, z) {
        const voxelCheck = this.getVoxel(x, y, z);
        if (!voxelCheck || voxelCheck[0] == -1)
            return;
        const voxel = voxelCheck[0];
        this.addToRebuildQue(x, y, z, "all");
        this.addToRebuildQue(x + 1, y, z, "all");
        this.addToRebuildQue(x - 1, y, z, "all");
        this.addToRebuildQue(x, y + 1, z, "all");
        this.addToRebuildQue(x, y - 1, z, "all");
        this.addToRebuildQue(x, y, z + 1, "all");
        this.addToRebuildQue(x, y, z - 1, "all");
        let needLightUpdate = false;
        if (this.DVEW.engineSettings.settings.lighting?.autoRGBLight) {
            if (voxel.data.lightSource && voxel.data.lightValue) {
                this._RGBLightRemoveQue.push([x, y, z]);
                needLightUpdate = true;
            }
        }
        if (this.DVEW.engineSettings.settings.updating?.autoRebuild) {
            if (needLightUpdate) {
                this.DVEW.runRGBLightRemoveQue();
                if (this.DVEW.engineSettings.settings.updating?.rebuildMode == "sync") {
                    this.DVEW.runChunkRebuildQue();
                }
                else {
                    this.DVEW.runChunkRebuildQue();
                }
            }
        }
        this.setData(x, y, z, 0);
    }
}
