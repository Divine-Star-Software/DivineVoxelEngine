import { WorldRegister } from "./WorldRegister.js";
import { LightData } from "../Light/LightByte.js";
import { VoxelReader } from "../Voxel/VoxelByte.js";
import { VoxelData } from "../Voxel/VoxelData.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { WorldBounds } from "./WorldBounds.js";
import { HeightMapData } from "../Chunk/HeightMapData.js";
import { DataHooks } from "../DataHooks.js";
import { DimensionsData } from "../../Data/Dimensions/DimensionsData.js";
const WD = {
    _currentionDimension: "main",
    voxelPalette: {},
    voxelPaletteMap: {},
    setCurrentDimension(id) { },
    setVoxelPalette(voxelPalette, voxelPaletteMap) {
        this.voxelPalette = voxelPalette;
        this.voxelPaletteMap = voxelPaletteMap;
    },
    rawData: {
        get(dimensionId, x, y, z, secondary = false) {
            const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
            if (!chunk)
                return -1;
            const voxPOS = WorldBounds.getVoxelPosition(x, y, z);
            return ChunkReader.getVoxelDataUseObj(chunk, voxPOS, secondary);
        },
        set(dimensionId, x, y, z, data, secondary = false) {
            const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
            if (!chunk)
                return -1;
            const voxPOS = WorldBounds.getVoxelPosition(x, y, z);
            return ChunkReader.setVoxelDataUseObj(chunk, voxPOS, data, secondary);
        },
    },
    util: {
        isSameVoxel(dimensionId, x, y, z, x2, y2, z2, secondary = false) {
            return (WD.voxel.id.baseNumericAt(dimensionId, x, y, z, secondary) ==
                WD.voxel.id.baseNumericAt(dimensionId, x2, y2, z2, secondary));
        },
    },
    voxel: {
        _air: ["dve:air", 0],
        _barrier: ["dve:barrier", 0],
        air: {
            isAt(dimensionId, x, y, z, secondary = false) {
                const id = WD.voxel.id.stateNumeric(dimensionId, x, y, z, secondary);
                if (id == 0)
                    return true;
            },
            set(dimensionId, x, y, z, light = 0, secondary = false) {
                let data = VoxelReader.setId(0, 0);
                data = VoxelReader.setLight(data, light);
                WD.rawData.set(dimensionId, x, y, z, data, secondary);
            },
        },
        barrier: {
            isAt(dimensionId, x, y, z, secondary = false) {
                const id = WD.voxel.id.stateNumeric(dimensionId, x, y, z, secondary);
                if (id == 1)
                    return true;
            },
            set(dimensionId, x, y, z, secondary = false) {
                WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(1, 0), secondary);
            },
        },
        get(dimensionId, x, y, z, secondary = false) {
            const vId = WD.voxel.id.stateNumeric(dimensionId, x, y, z, secondary);
            if (vId < 0)
                return false;
            if (vId == 0)
                return this._air;
            if (vId == 1)
                return this._barrier;
            const paletteId = WD.voxelPalette[vId];
            const mapId = WD.voxelPaletteMap[paletteId];
            return [paletteId, vId - mapId];
        },
        getData(dimensionId, x, y, z, secondary = false) {
            const id = this.id.stateNumeric(dimensionId, x, y, z, secondary);
            if (id < 0)
                return false;
            return VoxelData.getVoxelData(id);
        },
        id: {
            string(dimensionId, x, y, z, secondary = false) {
                const voxel = WD.voxel.get(dimensionId, x, y, z, secondary);
                if (!voxel)
                    return -1;
                return voxel[0];
            },
            stateNumeric(dimensionId, x, y, z, secondary = false) {
                const rawVoxelData = WD.rawData.get(dimensionId, x, y, z, secondary);
                if (rawVoxelData < 0)
                    return -1;
                return VoxelReader.getId(rawVoxelData);
            },
            baseNumeric(id) {
                if (id < 2)
                    return id;
                const paletteId = WD.voxelPalette[id];
                return WD.voxelPaletteMap[paletteId];
            },
            baseNumericAt(dimensionId, x, y, z, secondary = false) {
                const rawVoxelData = WD.rawData.get(dimensionId, x, y, z, secondary);
                if (rawVoxelData < 0)
                    return -1;
                const vid = VoxelReader.getId(rawVoxelData);
                if (vid < 2)
                    return vid;
                const paletteId = WD.voxelPalette[vid];
                return WD.voxelPaletteMap[paletteId];
            },
            stringFromNumber(id) {
                return WD.voxelPalette[id];
            },
            numberFromString(id) {
                return WD.voxelPaletteMap[id];
            },
            getPaletteId(voxelId, voxelState) {
                const numericID = WD.voxelPaletteMap[voxelId];
                const stateId = voxelState + numericID;
                if (WD.voxelPalette[stateId] != voxelId) {
                    throw new Error(`${voxelState} is not a valid state for voxel with id : ${voxelId}`);
                }
                if (stateId) {
                    return stateId;
                }
                return -1;
            },
        },
        data: {
            shapeId: {
                getAt(dimensionId, x, y, z, secondary = false) {
                    const data = WD.rawData.get(dimensionId, x, y, z, secondary);
                    const vid = VoxelReader.getId(data);
                    return this.get(vid);
                },
                get(id) {
                    return VoxelData.getShapeId(id);
                },
            },
            substance: {
                getAt(dimensionId, x, y, z, secondary = false) {
                    const data = WD.rawData.get(dimensionId, x, y, z, secondary);
                    const vid = VoxelReader.getId(data);
                    return this.get(vid);
                },
                get(id) {
                    return VoxelData.getTrueSubstance(id);
                },
            },
            shapeState: {
                getAt(dimensionId, x, y, z) {
                    let data = WD.rawData.get(dimensionId, x, y, z, true);
                    if (data < 0)
                        data = 0;
                    return VoxelReader.getShapeState(data);
                },
                get(data) {
                    return VoxelReader.getShapeState(data);
                },
                set(data, state) {
                    return VoxelReader.setShapeState(data, state);
                },
                setAt(dimensionId, x, y, z, state) {
                    let data = WD.rawData.get(dimensionId, x, y, z, true);
                    data = VoxelReader.setShapeState(data, state);
                    WD.rawData.set(dimensionId, x, y, z, data, true);
                },
            },
            state: {
                getAt(dimensionId, x, y, z) {
                    let data = WD.rawData.get(dimensionId, x, y, z);
                    if (data < 0)
                        data = 0;
                    return this.get(data);
                },
                get(data) {
                    const numericVoxelId = VoxelReader.getId(data);
                    const paletteId = WD.voxelPalette[numericVoxelId];
                    const mapId = WD.voxelPaletteMap[paletteId];
                    return numericVoxelId - mapId;
                },
                set(data, state) {
                    const numericVoxelId = VoxelReader.getId(data);
                    const paletteId = WD.voxelPalette[numericVoxelId];
                    return WD.voxelPaletteMap[paletteId] + state;
                },
                setAt(dimensionId, x, y, z, state) {
                    let data = WD.rawData.get(dimensionId, x, y, z);
                    data = this.set(data, state);
                    WD.rawData.set(dimensionId, x, y, z, data);
                },
            },
            lightSource: {
                trueAt(dimensionId, x, y, z, secondary = false) {
                    const data = WD.rawData.get(dimensionId, x, y, z, secondary);
                    const vid = VoxelReader.getId(data);
                    return VoxelData.isLightSource(vid);
                },
                true(voxelId) {
                    return VoxelData.isLightSource(voxelId);
                },
            },
            level: {
                getAt(dimensionId, x, y, z) {
                    let data = WD.rawData.get(dimensionId, x, y, z, true);
                    if (data < 0)
                        data = 0;
                    return this.get(data);
                },
                get(data) {
                    return VoxelReader.getLevel(data);
                },
                set(data, level) {
                    return VoxelReader.setLevel(data, level);
                },
                setAt(dimensionId, x, y, z, level) {
                    let data = WD.rawData.get(dimensionId, x, y, z, true);
                    data = this.set(data, level);
                    WD.rawData.set(dimensionId, x, y, z, data, true);
                },
                state: {
                    getAt(dimensionId, x, y, z) {
                        let data = WD.rawData.get(dimensionId, x, y, z, true);
                        if (data < 0)
                            data = 0;
                        return this.get(data);
                    },
                    get(data) {
                        return VoxelReader.getLevelState(data);
                    },
                    set(data, level) {
                        return VoxelReader.setLevelState(data, level);
                    },
                    setAt(dimensionId, x, y, z, state) {
                        let data = WD.rawData.get(dimensionId, x, y, z, true);
                        data = this.set(data, state);
                        WD.rawData.set(dimensionId, x, y, z, data, true);
                    },
                },
            },
        },
    },
    heightMap: {
        update: {
            add(dimensionId, substance, x, y, z) {
                const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
                if (!chunk)
                    return;
                const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
                if (substance == "transparent") {
                    substance = "solid";
                }
                HeightMapData.calculateHeightAddDataForSubstance(voxelPOS.y, substance, voxelPOS.x, voxelPOS.z, chunk.data);
                HeightMapData.updateChunkMinMax(voxelPOS, chunk.data);
            },
            remove(dimensionId, substance, x, y, z) {
                const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
                if (!chunk)
                    return;
                const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
                if (substance == "transparent") {
                    substance = "solid";
                }
                HeightMapData.calculateHeightRemoveDataForSubstance(voxelPOS.y, substance, voxelPOS.x, voxelPOS.z, chunk.data);
                HeightMapData.updateChunkMinMax(voxelPOS, chunk.data);
            },
        },
    },
    paint: {
        getVoxelBrush() {
            return;
        },
        voxel(data, update = true) {
            if (!data.dimension) {
                data.dimension = WD._currentionDimension;
            }
            const dimension = DimensionsData.getDimensionNumericId(data.dimension);
            const pos = data.position;
            let chunk = WorldRegister.chunk.get(dimension, pos[0], pos[1], pos[2]);
            if (!chunk) {
                let buffer = DataHooks.chunk.onGetSync.run([
                    dimension,
                    pos[0],
                    pos[1],
                    pos[2],
                ]);
                if (!buffer)
                    return;
                chunk = WorldRegister.chunk.add(dimension, pos[0], pos[1], pos[2], buffer);
            }
            this.__paint(dimension, data, chunk, update);
        },
        async voxelAsync(data) {
            if (!data.dimension) {
                data.dimension = WD._currentionDimension;
            }
            const dimension = DimensionsData.getDimensionNumericId(data.dimension);
            const pos = data.position;
            let chunk = WorldRegister.chunk.get(dimension, pos[0], pos[1], pos[2]);
            if (!chunk) {
                let buffer = await DataHooks.chunk.onGetAsync.run([
                    dimension,
                    pos[0],
                    pos[1],
                    pos[2],
                ]);
                if (!buffer)
                    return;
                chunk = WorldRegister.chunk.add(dimension, pos[0], pos[1], pos[2], buffer);
            }
            this.__paint(dimension, data, chunk);
        },
        __paint(dimension, data, chunk, update = true) {
            const x = data.position[0];
            const y = data.position[1];
            const z = data.position[2];
            const id = WD.voxel.id.getPaletteId(data.id, data.state ? data.state : 0);
            const voxleData = VoxelData.getVoxelData(id);
            if (id < 0)
                return false;
            WD.heightMap.update.add(dimension, voxleData.substance, x, y, z);
            let stateData = VoxelReader.setShapeState(0, data.shapeState ? data.shapeState : 0);
            if (voxleData.substance == "fluid" || voxleData.substance == "magma") {
                stateData = VoxelReader.setLevel(stateData, 15);
            }
            if (data.secondaryVoxelId && data.secondaryVoxelId != "dve:air") {
                const vid = WD.voxel.id.getPaletteId(data.secondaryVoxelId, data.secondaryState ? data.secondaryState : 0);
                if (vid > 0) {
                    stateData = VoxelReader.setId(vid, stateData);
                }
            }
            const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
            ChunkReader.setVoxelDataUseObj(chunk, voxelPOS, VoxelReader.setId(id, 0));
            ChunkReader.setVoxelDataUseObj(chunk, voxelPOS, stateData, true);
            if (data.secondaryVoxelId && data.secondaryVoxelId != "dve:air") {
            }
            if (update) {
                if (voxleData.lightSource && voxleData.lightValue) {
                    DataHooks.paint.addToRGBUpdate.run([dimension, x, y, z]);
                }
            }
        },
        erease(dimensionId, x, y, z) {
            const voxelCheck = WD.voxel.id.baseNumericAt(dimensionId, x, y, z);
            if (voxelCheck < 2)
                return;
            const substance = WD.voxel.data.substance.get(voxelCheck);
            WD.heightMap.update.remove(dimensionId, substance, x, y, z);
            WD.voxel.air.set(dimensionId, x, y, z);
        },
        _worldGen: {
            getPaletteId(voxelId, voxelState) {
                const numericID = WD.voxelPaletteMap[voxelId];
                const stateId = voxelState + numericID;
                if (WD.voxelPalette[stateId] != voxelId) {
                    throw new Error(`${voxelState} is not a valid state for voxel with id : ${voxelId}`);
                }
                if (stateId) {
                    return VoxelReader.setId(stateId, 0);
                }
                return -1;
            },
        },
    },
    light: {
        get(dimesnionId, x, y, z) {
            const rawVoxelData = WD.rawData.get(dimesnionId, x, y, z);
            if (rawVoxelData < 0)
                return -1;
            const voxelId = VoxelReader.getId(rawVoxelData);
            if (voxelId == 0)
                return VoxelReader.getLight(rawVoxelData);
            if (voxelId < 2)
                return -1;
            const isLightSource = VoxelData.isLightSource(voxelId);
            const lightValue = VoxelData.getLightValue(voxelId);
            if (isLightSource && lightValue) {
                return lightValue;
            }
            if (VoxelData.getTrueSubstance(voxelId) == "solid") {
                return -1;
            }
            return VoxelReader.getLight(rawVoxelData);
        },
        set(dimesnionId, x, y, z, lightValue) {
            let data = WD.rawData.get(dimesnionId, x, y, z);
            if (data === -1)
                return -1;
            data = LightData.encodeLightIntoVoxelData(data, lightValue);
            WD.rawData.set(dimesnionId, x, y, z, data);
        },
        red: {
            get(dimesnionId, x, y, z) {
                const value = WD.light.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                return LightData.getR(value);
            },
            set(dimesnionId, x, y, z, value) {
                const data = WD.rawData.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                WD.rawData.set(dimesnionId, x, y, z, LightData.setR(value, data));
            },
        },
        green: {
            get(dimesnionId, x, y, z) {
                const value = WD.light.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                return LightData.getG(value);
            },
            set(dimesnionId, x, y, z, value) {
                const data = WD.rawData.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                WD.rawData.set(dimesnionId, x, y, z, LightData.setG(value, data));
            },
        },
        blue: {
            get(dimesnionId, x, y, z) {
                const value = WD.light.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                return LightData.getB(value);
            },
            set(dimesnionId, x, y, z, value) {
                const data = WD.rawData.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                WD.rawData.set(dimesnionId, x, y, z, LightData.setB(value, data));
            },
        },
        sun: {
            get(dimesnionId, x, y, z) {
                const value = WD.light.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                return LightData.getS(value);
            },
            set(dimesnionId, x, y, z, value) {
                const data = WD.rawData.get(dimesnionId, x, y, z);
                if (value < 0)
                    return 0;
                WD.rawData.set(dimesnionId, x, y, z, LightData.setS(value, data));
            },
        },
    },
};
export const WorldData = WD;
const brush = WD.paint.getVoxelBrush();
