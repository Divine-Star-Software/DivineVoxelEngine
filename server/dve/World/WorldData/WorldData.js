//obejcts
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { Util } from "../../Global/Util.helper.js";
import { CardinalNeighbors } from "../../Constants/Util/CardinalNeighbors.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export const WorldData = {
    currentDimension: "main",
    dimensions: {
        main: {},
    },
    regions: {},
    tempVoxelData: new DataView(new ArrayBuffer(8)),
    heightByte: Util.getHeightByte(),
    chunkReader: Util.getChunkReader(),
    lightByte: Util.getLightByte(),
    voxelByte: Util.getVoxelByte(),
    _3dArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    setCurrentDimension(dimension) {
        this.currentDimension = dimension;
    },
    registerDimension(dimension) {
        if (Array.isArray(dimension)) {
            for (const dim of dimension) {
                this.dimensions[dim] = {};
            }
            dimension;
            return;
        }
        this.dimensions[dimension] = {};
    },
    runRebuildCheck(x, y, z) {
        DVEW.queues.build.chunk.add([x, y, z]);
        for (let i = 0; i < CardinalNeighbors.length; i++) {
            const n = CardinalNeighbors[i];
            DVEW.queues.build.chunk.add([n[0] + x, n[1] + y, n[2] + z]);
        }
    },
    __lightQueCheck(remove = false, x, y, z) {
        const l = this.getLight(x, y, z);
        if (l > 0) {
            if (this.lightByte.getS(l) > 0) {
                if (!remove) {
                    DVEW.queues.sun.update.add([x, y, z]);
                }
                else {
                    DVEW.queues.sun.remove.add([x, y, z]);
                }
            }
            if (this.lightByte.hasRGBLight(l)) {
                if (!remove) {
                    DVEW.queues.rgb.remove.add([x, y, z]);
                }
                else {
                    DVEW.queues.rgb.update.add([x, y, z]);
                }
            }
        }
    },
    runLightUpdateCheck(x, y, z, remove = false) {
        this.__lightQueCheck(remove, x, y, z);
        this.__lightQueCheck(remove, x + 1, y, z);
        this.__lightQueCheck(remove, x - 1, y, z);
        this.__lightQueCheck(remove, x, y + 1, z);
        this.__lightQueCheck(remove, x, y - 1, z);
        this.__lightQueCheck(remove, x, y, z + 1);
        this.__lightQueCheck(remove, x, y, z - 1);
    },
    setAir(x, y, z, lightValue) {
        let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
        this.setData(x, y, z, data);
    },
    setLight(x, y, z, lightValue) {
        let data = this.getData(x, y, z);
        if (data === false)
            return;
        data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
        this.setData(x, y, z, data);
    },
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
                    return -1;
                }
                return this.voxelByte.decodeLightFromVoxelData(voxel[2]);
            }
        }
        return -1;
    },
    removeData(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk) {
            return false;
        }
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, 0);
    },
    getLevelState(x, y, z) {
        let data = this.getData(x, y, z, true);
        if (!data)
            data = 0;
        const state = this.voxelByte.decodeLevelStateFromVoxelData(data);
        return state;
    },
    setLevelState(state, x, y, z) {
        let data = this.getData(x, y, z, true);
        if (!data)
            data = 0;
        data = this.voxelByte.encodeLevelStateIntoVoxelData(data, state);
        console.log(data, state);
        this.setData(x, y, z, data, true);
    },
    getData(x, y, z, state = false) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk) {
            return false;
        }
        return this.chunkReader.getVoxelDataUseObj(chunk.data, this.worldBounds.getVoxelPosition(x, y, z), state);
    },
    setData(x, y, z, data, state = false) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk) {
            return false;
        }
        this.chunkReader.setVoxelDataUseObj(chunk.data, this.worldBounds.getVoxelPosition(x, y, z), data, state);
        return true;
    },
    getVoxelPaletteId(voxelId, voxelStateId) {
        const paletteId = DVEW.worldGeneration.voxelPalette.getVoxelPaletteId(voxelId, voxelStateId);
        if (paletteId) {
            return this.voxelByte.setId(paletteId, 0);
        }
        return -1;
    },
    getVoxel(x, y, z, secondary = false) {
        const voxelData = this.getData(x, y, z, secondary);
        if (voxelData < 0 || voxelData === false)
            return false;
        const voxelId = this.voxelByte.getId(voxelData);
        if (voxelId == 0)
            return [-1, voxelData, 0];
        if (voxelId == 1)
            return [-2, voxelData, 0];
        const voxelTrueID = DVEW.worldGeneration.voxelPalette.getVoxelTrueId(voxelId);
        if (!voxelTrueID)
            return false;
        const voxelStateId = DVEW.worldGeneration.voxelPalette.getVoxelState(voxelId);
        let voxelStateRaw = this.getData(x, y, z, true);
        if (!voxelStateRaw)
            voxelStateRaw = 0;
        const voxelShapeState = this.voxelByte.getShapeState(voxelStateRaw);
        const voxel = DVEW.voxelManager.getVoxelData(voxelTrueID);
        return [voxel, voxelStateId, voxelShapeState];
    },
    addRegion(x, y, z) {
        const newRegion = DVEW.worldGeneration.getBlankRegion();
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        this.regions[regionKey] = newRegion;
        return newRegion;
    },
    getRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        if (!this.regions[regionKey]) {
            return false;
        }
        return this.regions[regionKey];
    },
    addChunk(x, y, z) {
        const chunk = DVEW.worldGeneration.getBlankChunk(false);
        this.setChunk(x, y, z, chunk);
        return chunk;
    },
    paintVoxel(voxelId, voxelStateId, shapeState, x, y, z) {
        const voxelData = DVEW.voxelManager.getVoxelData(voxelId);
        if (!voxelData)
            return;
        const chunk = this.addOrGetChunk(x, y, z);
        const data = this.getVoxelPaletteId(voxelId, voxelStateId);
        if (data < 0)
            return;
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelData.substance, chunk);
        let stateData = this.voxelByte.setShapeState(0, shapeState);
        stateData = this._getStartingLevel(voxelData, stateData);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, data);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, stateData, true);
        if (DVEW.settings.doRGBPropagation()) {
            if (voxelData.lightSource && voxelData.lightValue) {
                DVEW.queues.rgb.update.add([x, y, z]);
            }
        }
        if (voxelData.isRich) {
            DVEW.richWorldComm.setInitalData(voxelData.id, x, y, z);
        }
    },
    addOrGetChunk(x, y, z) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, z);
        }
        let chunk = this.getChunk(x, y, z);
        if (!chunk) {
            chunk = this.addChunk(x, y, z);
        }
        return chunk;
    },
    _getStartingLevel(voxelData, stateData) {
        if (voxelData.substance == "fluid" || voxelData.substance == "magma") {
            stateData = this.voxelByte.encodeLevelIntoVoxelData(stateData, 0b1111);
        }
        return stateData;
    },
    paintDualVoxel(voxelId, voxelStateId, shapeState, secondVoxelId, secondVoxelStateId, x, y, z) {
        const voxelData = DVEW.voxelManager.getVoxelData(voxelId);
        const secondVoxelData = DVEW.voxelManager.getVoxelData(secondVoxelId);
        if (!secondVoxelData || !voxelData) {
            throw new Error(`Either voxel with id : ${voxelId} or ${secondVoxelId} does not exists`);
        }
        const chunk = this.addOrGetChunk(x, y, z);
        const mainId = this.getVoxelPaletteId(voxelId, voxelStateId);
        const secondaryId = this.getVoxelPaletteId(secondVoxelId, secondVoxelStateId);
        if (mainId < 0 || secondaryId < 0)
            return;
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelData.substance, chunk);
        this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, secondVoxelData.substance, chunk);
        let stateData = this.voxelByte.setShapeState(secondaryId, shapeState);
        stateData = this._getStartingLevel(voxelData, stateData);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, mainId);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, stateData, true);
        if (DVEW.settings.doRGBPropagation()) {
            if ((voxelData.lightSource && voxelData.lightValue) ||
                (secondVoxelData.lightSource && secondVoxelData.lightValue)) {
                DVEW.queues.rgb.update.add([x, y, z]);
            }
        }
    },
    __handleHeightMapUpdateForVoxelAdd(voxelPOS, substance, chunk) {
        if (substance == "transparent") {
            substance = "solid";
        }
        this.heightByte.calculateHeightAddDataForSubstance(voxelPOS.y, substance, voxelPOS.x, voxelPOS.z, chunk.data);
        this.heightByte.updateChunkMinMax(voxelPOS, chunk.data);
    },
    __handleHeightMapUpdateForVoxelRemove(voxelPOS, voxelData, chunk) {
        let substance = voxelData.substance;
        if (substance == "transparent") {
            substance = "solid";
        }
        let needToRecalculateHeightMap = this.heightByte.calculateHeightRemoveDataForSubstance(voxelPOS.y, substance, voxelPOS.x, voxelPOS.z, chunk.data);
        if (needToRecalculateHeightMap) {
            /**
             * @TODO implement this
             */
        }
    },
    getChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
        if (!region.chunks[worldColumnKey])
            return false;
        if (!region.chunks[worldColumnKey][chunkKey])
            return false;
        return region.chunks[worldColumnKey][chunkKey];
    },
    removeChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunks = region.chunks;
        delete chunks[this.worldBounds.getChunkKeyFromPosition(x, y, z)];
    },
    setChunk(x, y, z, chunk, doNotSyncInThreads = false) {
        let region = this.getRegion(x, y, z);
        if (!region) {
            region = this.addRegion(x, y, z);
        }
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
        const chunks = region.chunks;
        this.chunkReader.setChunkPosition(chunk.data, chunkPOS);
        if (!chunks[worldColumnKey]) {
            chunks[worldColumnKey] = {};
        }
        chunks[worldColumnKey][chunkKey] = chunk;
        if (doNotSyncInThreads)
            return;
        DVEW.ccm.syncChunkInAllThreads(chunkPOS.x, chunkPOS.y, chunkPOS.z);
        if (DVEW.settings.syncChunksInNexusThread()) {
            DVEW.matrixCentralHub.syncChunkInThread("nexus", chunkPOS.x, chunkPOS.y, chunkPOS.z);
        }
        if (DVEW.settings.syncChunkInDataThread()) {
            DVEW.matrixCentralHub.syncChunkInThread("data", chunkPOS.x, chunkPOS.y, chunkPOS.z);
        }
        if (DVEW.settings.syncChunkInFXThread()) {
            DVEW.matrixCentralHub.syncChunkInThread("fx", chunkPOS.x, chunkPOS.y, chunkPOS.z);
        }
        if (DVEW.settings.syncChunkInRichWorldThread()) {
            DVEW.matrixCentralHub.syncChunkInThread("rich-world", chunkPOS.x, chunkPOS.y, chunkPOS.z);
        }
    },
    async __runLightRemoveAndUpdates(remove = true, update = true) {
        if (remove) {
            if (DVEW.settings.doRGBPropagation()) {
                DVEW.queues.rgb.remove.run();
                await DVEW.queues.rgb.remove.awaitAll();
            }
            if (DVEW.settings.doSunPropagation()) {
                DVEW.queues.sun.remove.run();
                await DVEW.queues.sun.remove.awaitAll();
            }
        }
        if (update) {
            if (DVEW.settings.doRGBPropagation()) {
                DVEW.queues.sun.update.run();
            }
            if (DVEW.settings.doSunPropagation()) {
                DVEW.queues.rgb.update.run();
            }
            await Promise.all([
                DVEW.queues.rgb.update.awaitAll(),
                DVEW.queues.sun.update.awaitAll(),
            ]);
        }
    },
    async requestVoxelAddFromRaw(rawData1, rawData2, x, y, z) {
        const voxelId = this.voxelByte.getId(rawData1);
        const voxelData = DVEW.voxelMatrix.getVoxelData(voxelId);
        const substance = DVEW.voxelMatrix.getTrueSubstance(voxelId);
        if (!voxelData)
            return false;
        const chunk = this.addOrGetChunk(x, y, z);
        const l = this.getLight(x, y, z);
        if (l > 0) {
            if (DVEW.settings.doRGBPropagation()) {
                if (this.lightByte.hasRGBLight(l)) {
                    DVEW.queues.rgb.update.add([x, y, z]);
                }
            }
            if (DVEW.settings.doSunPropagation()) {
                if (this.lightByte.getS(l) > 0) {
                    DVEW.queues.sun.remove.add([x, y - 1, z]);
                    DVEW.queues.sun.remove.add([x, y, z]);
                }
            }
            await this.__runLightRemoveAndUpdates(true, false);
        }
        let needLightUpdate = false;
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, rawData1);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, rawData2, true);
        this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, substance, chunk);
        if (!DVEW.settings.settings.server.enabled) {
            this.runRebuildCheck(x, y, z);
        }
        if (DVEW.settings.settings.lighting?.autoRGBLight) {
            if (voxelData.lightSource && voxelData.lightValue) {
                needLightUpdate = true;
                DVEW.queues.rgb.update.add([x, y, z]);
            }
        }
        if (DVEW.settings.settings.updating?.autoRebuild) {
            if (needLightUpdate) {
                await this.__runLightRemoveAndUpdates(false, true);
            }
            if (!DVEW.settings.settings.server.enabled) {
                this.runRebuildCheck(x, y, z);
                DVEW.queues.build.chunk.run();
                await DVEW.queues.build.chunk.awaitAll();
            }
        }
        this.tempVoxelData.setUint32(0, rawData1);
        this.tempVoxelData.setUint32(4, rawData2);
        return this.tempVoxelData;
    },
    getRawVoxelData(voxelId, voxelStateId, shapeState) {
        const voxelData = DVEW.voxelManager.getVoxelData(voxelId);
        if (!voxelData)
            return false;
        const data = this.getVoxelPaletteId(voxelId, voxelStateId);
        if (data < 0)
            return false;
        let stateData = this.voxelByte.setShapeState(0, shapeState);
        stateData = this._getStartingLevel(voxelData, stateData);
        this.tempVoxelData.setUint32(0, data);
        this.tempVoxelData.setUint32(4, stateData);
        return this.tempVoxelData;
    },
    async requestVoxelAdd(voxelId, voxelStateId, shapeState, x, y, z) {
        const voxelData = DVEW.voxelManager.getVoxelData(voxelId);
        if (!voxelData)
            return false;
        const data = this.getVoxelPaletteId(voxelId, voxelStateId);
        if (data < 0)
            return false;
        const chunk = this.addOrGetChunk(x, y, z);
        const l = this.getLight(x, y, z);
        if (l > 0) {
            if (DVEW.settings.doRGBPropagation()) {
                if (this.lightByte.hasRGBLight(l)) {
                    DVEW.queues.rgb.remove.add([x, y, z]);
                }
            }
            if (DVEW.settings.doSunPropagation()) {
                if (this.lightByte.getS(l) > 0) {
                    DVEW.queues.sun.remove.add([x, y - 1, z]);
                    DVEW.queues.sun.remove.add([x, y, z]);
                }
            }
            await this.__runLightRemoveAndUpdates(true, false);
        }
        let needLightUpdate = false;
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        let stateData = this.voxelByte.setShapeState(0, shapeState);
        stateData = this._getStartingLevel(voxelData, stateData);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, data);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, stateData, true);
        this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelData.substance, chunk);
        this.runRebuildCheck(x, y, z);
        if (DVEW.settings.settings.lighting?.autoRGBLight) {
            if (voxelData.lightSource && voxelData.lightValue) {
                needLightUpdate = true;
                DVEW.queues.rgb.update.add([x, y, z]);
            }
        }
        if (DVEW.settings.settings.updating?.autoRebuild) {
            if (needLightUpdate) {
                await this.__runLightRemoveAndUpdates(false, true);
            }
            DVEW.queues.build.chunk.run();
            await DVEW.queues.build.chunk.awaitAll();
        }
        if (voxelData.isRich) {
            DVEW.richWorldComm.setInitalData(voxelData.id, x, y, z);
        }
        this.tempVoxelData.setUint32(0, data);
        this.tempVoxelData.setUint32(4, stateData);
        return this.tempVoxelData;
    },
    async requestVoxelBeRemoved(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return;
        const voxelCheck = this.getVoxel(x, y, z);
        if (!voxelCheck || voxelCheck[0] == -1)
            return;
        const voxelData = voxelCheck[0];
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        this.__handleHeightMapUpdateForVoxelRemove(voxelPOS, voxelData, chunk);
        if (!DVEW.settings.settings.server.enabled) {
            this.runRebuildCheck(x, y, z);
        }
        if (DVEW.settings.doLight()) {
            const l = this.getLight(x, y, z);
            if (l > 0) {
                this.setAir(x, y, z, l);
                if (DVEW.settings.doRGBPropagation()) {
                    DVEW.queues.rgb.remove.add([x, y, z]);
                }
                if (DVEW.settings.doSunPropagation()) {
                    DVEW.queues.sun.remove.add([x, y, z]);
                }
            }
            if (l < 0) {
                this.setAir(x, y, z, 0);
                this.runLightUpdateCheck(x, y, z);
            }
        }
        else {
            this.setAir(x, y, z, 0);
        }
        if (!DVEW.settings.settings.server.enabled) {
            if (DVEW.settings.settings.updating?.autoRebuild) {
                await this.__runLightRemoveAndUpdates(true, true);
                DVEW.queues.build.chunk.run();
                await DVEW.queues.build.chunk.awaitAll();
            }
        }
        if (voxelData.isRich) {
            DVEW.richWorldComm.removeRichData(x, y, z);
        }
    },
    getWorldColumn(x, z) {
        const region = this.getRegion(x, this.worldBounds.bounds.MinY, z);
        if (!region) {
            return false;
        }
        const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
        const worldWolumn = region.chunks[worldColumnKey];
        if (!worldWolumn)
            return;
        return worldWolumn;
    },
    getRelativeMaxWorldColumnHeight(x, z) {
        const chunkWidth = this.worldBounds.chunkXSize;
        const chunkDepth = this.worldBounds.chunkZSize;
        let maxHeight = -Infinity;
        const center = this.getAbsoluteHeightOfWorldColumn(x, z);
        if (center > maxHeight)
            maxHeight = center;
        const north = this.getAbsoluteHeightOfWorldColumn(x, z + chunkDepth);
        if (north > maxHeight)
            maxHeight = north;
        const south = this.getAbsoluteHeightOfWorldColumn(x, z - chunkDepth);
        if (south > maxHeight)
            maxHeight = south;
        const east = this.getAbsoluteHeightOfWorldColumn(x + chunkWidth, z);
        if (east > maxHeight)
            maxHeight = east;
        const west = this.getAbsoluteHeightOfWorldColumn(x - chunkWidth, z);
        if (west > maxHeight)
            maxHeight = west;
        const northEast = this.getAbsoluteHeightOfWorldColumn(x + chunkWidth, z + chunkDepth);
        if (northEast > maxHeight)
            maxHeight = northEast;
        const northWest = this.getAbsoluteHeightOfWorldColumn(x - chunkWidth, z + chunkDepth);
        if (northWest > maxHeight)
            maxHeight = northWest;
        const southEast = this.getAbsoluteHeightOfWorldColumn(x + chunkWidth, z + chunkDepth);
        if (southEast > maxHeight)
            maxHeight = southEast;
        const southWest = this.getAbsoluteHeightOfWorldColumn(x - chunkWidth, z + chunkDepth);
        if (southWest > maxHeight)
            maxHeight = southWest;
        return maxHeight;
    },
    getAbsoluteHeightOfWorldColumn(x, z) {
        const worldColumn = this.getWorldColumn(x, z);
        if (!worldColumn)
            return -Infinity;
        const chunkKeys = Object.keys(worldColumn);
        if (chunkKeys.length == 0)
            return -Infinity;
        let maxHeight = -Infinity;
        for (const chunkKey of chunkKeys) {
            const chunk = worldColumn[chunkKey];
            const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
            const chunkMax = this.heightByte.getChunkMax(chunk.data) + chunkPOS.y;
            if (maxHeight < chunkMax) {
                maxHeight = chunkMax;
            }
        }
        return maxHeight + 1;
    },
    fillWorldCollumnWithChunks(x, z) {
        for (let y = this.worldBounds.bounds.MinY; y < this.worldBounds.bounds.MaxY; y += this.worldBounds.chunkYSize) {
            if (!this.getChunk(x, y, z)) {
                this.addChunk(x, y, z);
            }
        }
    },
};
