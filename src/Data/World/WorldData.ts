import type {
 AddVoxelData,
 VoxelPalette,
 VoxelPaletteMap,
 ChunkData,
} from "../../Meta/Data/WorldData.types";
import type { VoxelSubstanceType } from "Meta/index.js";
import { WorldRegister } from "./WorldRegister.js";
import { LightData } from "../Light/LightByte.js";
import { VoxelReader } from "../Voxel/VoxelByte.js";
import { VoxelData } from "../Voxel/VoxelData.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { WorldBounds } from "./WorldBounds.js";

import { HeightMapData } from "../Chunk/HeightMapData.js";
import { DataHooks } from "../DataHooks.js";
import { DimensionsData } from "../../Data/Dimensions/DimensionsData.js";

type ID = string | number;
const WD = {
 _currentionDimension: "main",
 voxelPalette: <VoxelPalette>{},
 voxelPaletteMap: <VoxelPaletteMap>{},
 setCurrentDimension(id: ID) {},
 setVoxelPalette(voxelPalette: VoxelPalette, voxelPaletteMap: VoxelPaletteMap) {
  this.voxelPalette = voxelPalette;
  this.voxelPaletteMap = voxelPaletteMap;
 },
 rawData: {
  get(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
   const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
   if (!chunk) return -1;
   const voxPOS = WorldBounds.getVoxelPosition(x, y, z);
   return ChunkReader.getVoxelDataUseObj(chunk, voxPOS, secondary);
  },
  set(
   dimensionId: ID,
   x: number,
   y: number,
   z: number,
   data: number,
   secondary = false
  ) {
   const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
   if (!chunk) return -1;
   const voxPOS = WorldBounds.getVoxelPosition(x, y, z);
   return ChunkReader.setVoxelDataUseObj(chunk, voxPOS, data, secondary);
  },
 },
 util: {
  isSameVoxel(
   dimensionId: ID,
   x: number,
   y: number,
   z: number,
   x2: number,
   y2: number,
   z2: number,
   secondary = false
  ) {
   return (
    WD.voxel.id.baseNumericAt(dimensionId, x, y, z, secondary) ==
    WD.voxel.id.baseNumericAt(dimensionId, x2, y2, z2, secondary)
   );
  },
 },
 voxel: {
  _air: <[string, number]>["dve:air", 0],
  _barrier: <[string, number]>["dve:barrier", 0],
  air: {
   isAt(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    const id = WD.voxel.id.stateNumeric(dimensionId, x, y, z, secondary);
    if (id == 0) return true;
   },
   set(
    dimensionId: ID,
    x: number,
    y: number,
    z: number,
    light = 0,
    secondary = false
   ) {
    let data = VoxelReader.setId(0, 0);
    data = VoxelReader.setLight(data, light);
    WD.rawData.set(dimensionId, x, y, z, data, secondary);
   },
  },
  barrier: {
   isAt(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    const id = WD.voxel.id.stateNumeric(dimensionId, x, y, z, secondary);
    if (id == 1) return true;
   },
   set(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(1, 0), secondary);
   },
  },
  get(
   dimensionId: ID,
   x: number,
   y: number,
   z: number,
   secondary = false
  ): false | [string, number] {
   const vId = WD.voxel.id.stateNumeric(dimensionId, x, y, z, secondary);
   if (vId < 0) return false;
   if (vId == 0) return this._air;
   if (vId == 1) return this._barrier;
   const paletteId = WD.voxelPalette[vId];
   const mapId = WD.voxelPaletteMap[paletteId];
   return [paletteId, vId - mapId];
  },
  getData(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
   const id = this.id.stateNumeric(dimensionId, x, y, z, secondary);
   if (id < 0) return false;
   return VoxelData.getVoxelData(id);
  },
  id: {
   string(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    const voxel = WD.voxel.get(dimensionId, x, y, z, secondary);
    if (!voxel) return -1;
    return voxel[0];
   },
   stateNumeric(
    dimensionId: ID,
    x: number,
    y: number,
    z: number,
    secondary = false
   ) {
    const rawVoxelData = WD.rawData.get(dimensionId, x, y, z, secondary);
    if (rawVoxelData < 0) return -1;
    return VoxelReader.getId(rawVoxelData);
   },
   baseNumeric(id: number) {
    if (id < 2) return id;
    const paletteId = WD.voxelPalette[id];
    return WD.voxelPaletteMap[paletteId];
   },
   baseNumericAt(
    dimensionId: ID,
    x: number,
    y: number,
    z: number,
    secondary = false
   ) {
    const rawVoxelData = WD.rawData.get(dimensionId, x, y, z, secondary);
    if (rawVoxelData < 0) return -1;
    const vid = VoxelReader.getId(rawVoxelData);
    if (vid < 2) return vid;
    const paletteId = WD.voxelPalette[vid];
    return WD.voxelPaletteMap[paletteId];
   },
   stringFromNumber(id: number) {
    return WD.voxelPalette[id];
   },
   numberFromString(id: string) {
    return WD.voxelPaletteMap[id];
   },
   getPaletteId(voxelId: string, voxelState: number) {
    const numericID = WD.voxelPaletteMap[voxelId];
    const stateId = voxelState + numericID;
    if (WD.voxelPalette[stateId] != voxelId) {
     throw new Error(
      `${voxelState} is not a valid state for voxel with id : ${voxelId}`
     );
    }
    if (stateId) {
     return stateId;
    }
    return -1;
   },
  },
  data: {
   shapeId: {
    getAt(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
     const data = WD.rawData.get(dimensionId, x, y, z, secondary);
     const vid = VoxelReader.getId(data);
     return this.get(vid);
    },
    get(id: number) {
     return VoxelData.getShapeId(id);
    },
   },
   substance: {
    getAt(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
     const data = WD.rawData.get(dimensionId, x, y, z, secondary);
     const vid = VoxelReader.getId(data);
     return this.get(vid);
    },
    get(id: number) {
     return VoxelData.getTrueSubstance(id);
    },
   },
   shapeState: {
    getAt(dimensionId: ID, x: number, y: number, z: number) {
     let data = WD.rawData.get(dimensionId, x, y, z, true);
     if (data < 0) data = 0;
     return VoxelReader.getShapeState(data);
    },
    get(data: number) {
     return VoxelReader.getShapeState(data);
    },
    set(data: number, state: number) {
     return VoxelReader.setShapeState(data, state);
    },
    setAt(dimensionId: ID, x: number, y: number, z: number, state: number) {
     let data = WD.rawData.get(dimensionId, x, y, z, true);
     data = VoxelReader.setShapeState(data, state);
     WD.rawData.set(dimensionId, x, y, z, data, true);
    },
   },
   state: {
    getAt(dimensionId: ID, x: number, y: number, z: number) {
     let data = WD.rawData.get(dimensionId, x, y, z);
     if (data < 0) data = 0;
     return this.get(data);
    },
    get(data: number) {
     const numericVoxelId = VoxelReader.getId(data);
     const paletteId = WD.voxelPalette[numericVoxelId];
     const mapId = WD.voxelPaletteMap[paletteId];
     return numericVoxelId - mapId;
    },
    set(data: number, state: number) {
     const numericVoxelId = VoxelReader.getId(data);
     const paletteId = WD.voxelPalette[numericVoxelId];
     return WD.voxelPaletteMap[paletteId] + state;
    },
    setAt(dimensionId: ID, x: number, y: number, z: number, state: number) {
     let data = WD.rawData.get(dimensionId, x, y, z);
     data = this.set(data, state);
     WD.rawData.set(dimensionId, x, y, z, data);
    },
   },
   lightSource: {
    trueAt(
     dimensionId: ID,
     x: number,
     y: number,
     z: number,
     secondary = false
    ) {
     const data = WD.rawData.get(dimensionId, x, y, z, secondary);
     const vid = VoxelReader.getId(data);
     return VoxelData.isLightSource(vid);
    },
    true(voxelId: number) {
     return VoxelData.isLightSource(voxelId);
    },
   },
   level: {
    getAt(dimensionId: ID, x: number, y: number, z: number) {
     let data = WD.rawData.get(dimensionId, x, y, z, true);
     if (data < 0) data = 0;
     return this.get(data);
    },
    get(data: number) {
     return VoxelReader.getLevel(data);
    },
    set(data: number, level: number) {
     return VoxelReader.setLevel(data, level);
    },
    setAt(dimensionId: ID, x: number, y: number, z: number, level: number) {
     let data = WD.rawData.get(dimensionId, x, y, z, true);
     data = this.set(data, level);
     WD.rawData.set(dimensionId, x, y, z, data, true);
    },
    state: {
     getAt(dimensionId: ID, x: number, y: number, z: number) {
      let data = WD.rawData.get(dimensionId, x, y, z, true);
      if (data < 0) data = 0;
      return this.get(data);
     },
     get(data: number) {
      return VoxelReader.getLevelState(data);
     },
     set(data: number, level: number) {
      return VoxelReader.setLevelState(data, level);
     },
     setAt(dimensionId: ID, x: number, y: number, z: number, state: number) {
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
   add(
    dimensionId: ID,
    substance: VoxelSubstanceType,
    x: number,
    y: number,
    z: number
   ) {
    const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
    if (!chunk) return;
    const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
    if (substance == "transparent") {
     substance = "solid";
    }
    HeightMapData.calculateHeightAddDataForSubstance(
     voxelPOS.y,
     substance,
     voxelPOS.x,
     voxelPOS.z,
     chunk.data
    );
    HeightMapData.updateChunkMinMax(voxelPOS, chunk.data);
   },
   remove(
    dimensionId: ID,
    substance: VoxelSubstanceType,
    x: number,
    y: number,
    z: number
   ) {
    const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
    if (!chunk) return;
    const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
    if (substance == "transparent") {
     substance = "solid";
    }
    HeightMapData.calculateHeightRemoveDataForSubstance(
     voxelPOS.y,
     substance,
     voxelPOS.x,
     voxelPOS.z,
     chunk.data
    );
    HeightMapData.updateChunkMinMax(voxelPOS, chunk.data);
   },
  },
 },
 paint: {
  getVoxelBrush() {
   return;
  },
  voxel(data: AddVoxelData, update = true) {
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
    if (!buffer) return;
    chunk = WorldRegister.chunk.add(dimension, pos[0], pos[1], pos[2], buffer);
   }
   this.__paint(dimension, data, chunk, update);
  },

  async voxelAsync(data: AddVoxelData) {
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
    if (!buffer) return;
    chunk = WorldRegister.chunk.add(dimension, pos[0], pos[1], pos[2], buffer);
   }
   this.__paint(dimension, data, chunk);
  },
  __paint(dimension: ID, data: AddVoxelData, chunk: ChunkData, update = true) {
   const x = data.position[0];
   const y = data.position[1];
   const z = data.position[2];

   const id = WD.voxel.id.getPaletteId(data.id, data.state ? data.state : 0);
   const voxleData = VoxelData.getVoxelData(id);
   if (id < 0) return false;
   WD.heightMap.update.add(dimension, voxleData.substance, x, y, z);

   let stateData = VoxelReader.setShapeState(
    0,
    data.shapeState ? data.shapeState : 0
   );
   if (voxleData.substance == "fluid" || voxleData.substance == "magma") {
    stateData = VoxelReader.setLevel(stateData, 15);
   }
   if (data.secondaryVoxelId && data.secondaryVoxelId != "dve:air") {
    const vid = WD.voxel.id.getPaletteId(
     data.secondaryVoxelId,
     data.secondaryState ? data.secondaryState : 0
    );
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

  erease(dimensionId: ID, x: number, y: number, z: number) {
   const voxelCheck = WD.voxel.id.baseNumericAt(dimensionId, x, y, z);
   if (voxelCheck < 2) return;
   const substance = WD.voxel.data.substance.get(voxelCheck);
   WD.heightMap.update.remove(dimensionId, substance, x, y, z);
   WD.voxel.air.set(dimensionId, x, y, z);
  },
  _worldGen: {
   getPaletteId(voxelId: string, voxelState: number) {
    const numericID = WD.voxelPaletteMap[voxelId];
    const stateId = voxelState + numericID;
    if (WD.voxelPalette[stateId] != voxelId) {
     throw new Error(
      `${voxelState} is not a valid state for voxel with id : ${voxelId}`
     );
    }

    if (stateId) {
     return VoxelReader.setId(stateId, 0);
    }
    return -1;
   },
  },
 },
 light: {
  get(dimesnionId: ID, x: number, y: number, z: number) {
   const rawVoxelData = WD.rawData.get(dimesnionId, x, y, z);
   if (rawVoxelData < 0) return -1;
   const voxelId = VoxelReader.getId(rawVoxelData);
   if (voxelId == 0) return VoxelReader.getLight(rawVoxelData);
   if (voxelId < 2) return -1;
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
  set(dimesnionId: ID, x: number, y: number, z: number, lightValue: number) {
   let data = WD.rawData.get(dimesnionId, x, y, z);
   if (data === -1) return -1;
   data = LightData.encodeLightIntoVoxelData(data, lightValue);
   WD.rawData.set(dimesnionId, x, y, z, data);
  },
  red: {
   get(dimesnionId: ID, x: number, y: number, z: number) {
    const value = WD.light.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    return LightData.getR(value);
   },
   set(dimesnionId: ID, x: number, y: number, z: number, value: number) {
    const data = WD.rawData.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    WD.rawData.set(dimesnionId, x, y, z, LightData.setR(value, data));
   },
  },
  green: {
   get(dimesnionId: ID, x: number, y: number, z: number) {
    const value = WD.light.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    return LightData.getG(value);
   },
   set(dimesnionId: ID, x: number, y: number, z: number, value: number) {
    const data = WD.rawData.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    WD.rawData.set(dimesnionId, x, y, z, LightData.setG(value, data));
   },
  },
  blue: {
   get(dimesnionId: ID, x: number, y: number, z: number) {
    const value = WD.light.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    return LightData.getB(value);
   },
   set(dimesnionId: ID, x: number, y: number, z: number, value: number) {
    const data = WD.rawData.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    WD.rawData.set(dimesnionId, x, y, z, LightData.setB(value, data));
   },
  },
  sun: {
   get(dimesnionId: ID, x: number, y: number, z: number) {
    const value = WD.light.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    return LightData.getS(value);
   },
   set(dimesnionId: ID, x: number, y: number, z: number, value: number) {
    const data = WD.rawData.get(dimesnionId, x, y, z);
    if (value < 0) return 0;
    WD.rawData.set(dimesnionId, x, y, z, LightData.setS(value, data));
   },
  },
 },
};

export const WorldData = WD;

const brush = WD.paint.getVoxelBrush();
