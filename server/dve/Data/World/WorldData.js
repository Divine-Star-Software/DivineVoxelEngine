import { WorldRegister } from "./WorldRegister.js";
import { LightData } from "../Light/LightByte.js";
import { VoxelReader } from "../Voxel/VoxelByte.js";
import { VoxelData } from "../Voxel/VoxelData.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { WorldBounds } from "./WorldBounds.js";
import { HeightMapData } from "../Chunk/HeightByte.js";
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
            const dv = chunk.data;
            return ChunkReader.getVoxelData(dv, x, y, z, secondary);
        },
        set(dimensionId, x, y, z, data, secondary = false) {
            const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
            if (!chunk)
                return -1;
            const dv = chunk.data;
            return ChunkReader.setVoxelData(dv, x, y, z, data, secondary);
        },
    },
    voxel: {
        _air: ["dve:air", 0],
        _barrier: ["dve:barrier", 0],
        air: {
            isAt(dimensionId, x, y, z, secondary = false) {
                const id = WD.voxel.id.numeric(dimensionId, x, y, z, secondary);
                if (id == 0)
                    return true;
            },
            set(dimensionId, x, y, z, secondary = false) {
                WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(0, 0));
                if (secondary) {
                    const data = WD.rawData.get(dimensionId, x, y, z, true);
                    WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(0, data), secondary);
                }
            },
        },
        barrier: {
            isAt(dimensionId, x, y, z, secondary = false) {
                const id = WD.voxel.id.numeric(dimensionId, x, y, z, secondary);
                if (id == 1)
                    return true;
            },
            set(dimensionId, x, y, z, secondary = false) {
                if (!secondary) {
                    WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(1, 0));
                }
                else {
                    const data = WD.rawData.get(dimensionId, x, y, z, true);
                    WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(1, data), secondary);
                }
            },
        },
        get(dimensionId, x, y, z, secondary = false) {
            const vId = WD.voxel.id.numeric(dimensionId, x, y, z, secondary);
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
            const id = this.id.numeric(dimensionId, x, y, z, secondary);
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
            numeric(dimensionId, x, y, z, secondary = false) {
                const rawVoxelData = WD.rawData.get(dimensionId, x, y, z, secondary);
                if (rawVoxelData < 0)
                    return -1;
                return VoxelReader.getId(rawVoxelData);
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
                    let data = WD.rawData.get(dimensionId, x, y, z);
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
                    let data = WD.rawData.get(dimensionId, x, y, z);
                    data = VoxelReader.setShapeState(data, state);
                    WD.rawData.set(dimensionId, x, y, z, data);
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
                    let data = WD.rawData.get(dimensionId, x, y, z);
                    if (data < 0)
                        data = 0;
                    return this.get(data);
                },
                get(data) {
                    return VoxelReader.decodeLevelFromVoxelData(data);
                },
                set(data, level) {
                    return VoxelReader.encodeLevelIntoVoxelData(data, level);
                },
                setAt(dimensionId, x, y, z, state) {
                    let data = WD.rawData.get(dimensionId, x, y, z);
                    data = this.set(data, state);
                    WD.rawData.set(dimensionId, x, y, z, data);
                },
                state: {
                    getAt(dimensionId, x, y, z) {
                        let data = WD.rawData.get(dimensionId, x, y, z);
                        if (data < 0)
                            data = 0;
                        return this.get(data);
                    },
                    get(data) {
                        return VoxelReader.decodeLevelStateFromVoxelData(data);
                    },
                    set(data, level) {
                        return VoxelReader.encodeLevelStateIntoVoxelData(data, level);
                    },
                    setAt(dimensionId, x, y, z, state) {
                        let data = WD.rawData.get(dimensionId, x, y, z);
                        data = this.set(data, state);
                        WD.rawData.set(dimensionId, x, y, z, data);
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
        voxel(data) {
            if (!data.dimension) {
                data.dimension = WD._currentionDimension;
            }
            const dimension = data.dimension;
            const pos = data.position;
            const chunk = WorldRegister.chunk.get(dimension, pos[0], pos[1], pos[2]);
            if (!chunk)
                return false;
            const voxelPaletteId = this._worldGen.getPaletteId(data.id, data.state ? data.state : 0);
            const substance = VoxelData.getTrueSubstance(voxelPaletteId);
            const voxelData = this._worldGen.getChunkId(voxelPaletteId);
            if (voxelData < 0)
                return false;
            WD.heightMap.update.add(dimension, substance, pos[0], pos[1], pos[2]);
            let stateData = VoxelReader.setShapeState(0, data.shapeState ? data.shapeState : 0);
            const voxelPOS = WorldBounds.getVoxelPosition(pos[0], pos[1], pos[2]);
            ChunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, data.shapeState ? data.shapeState : 0);
            ChunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, stateData, true);
        },
        erease(dimensionId, x, y, z) { },
        _worldGen: {
            getChunkId(voxelId) {
                if (voxelId) {
                    return VoxelReader.setId(voxelId, 0);
                }
                return -1;
            },
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
        get(dimesnionId, x, y, z, log = false) {
            const rawVoxelData = WD.rawData.get(dimesnionId, x, y, z);
            if (log) {
                console.log(rawVoxelData);
            }
            if (rawVoxelData < 0)
                return -1;
            const voxelId = VoxelReader.getId(rawVoxelData);
            if (log) {
                console.log(voxelId);
            }
            if (voxelId == 0)
                return VoxelReader.decodeLightFromVoxelData(rawVoxelData);
            if (voxelId < 2)
                return -1;
            const isLightSource = VoxelData.isLightSource(voxelId);
            const lightValue = VoxelData.getLightValue(voxelId);
            if (isLightSource && lightValue) {
                return lightValue;
            }
            if (log) {
                console.log(VoxelData.getTrueSubstance(voxelId));
            }
            if (VoxelData.getTrueSubstance(voxelId) == "solid") {
                return -1;
            }
            if (log) {
                console.log(VoxelReader.decodeLightFromVoxelData(rawVoxelData));
            }
            return VoxelReader.decodeLightFromVoxelData(rawVoxelData);
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
WorldData.light.get("main", 0, 0, 0);
WorldData.light.set("main", 0, 0, 0, 0xf);
