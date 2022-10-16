import type {
 AddVoxelData,
 VoxelPalette,
 VoxelPaletteMap,
} from "../../Meta/Data/WorldData.types";
import type { VoxelSubstanceType } from "Meta/index.js";
import { WorldRegister } from "./WorldRegister.js";
import { LightData } from "../Light/LightByte.js";
import { VoxelReader } from "../Voxel/VoxelByte.js";
import { VoxelData } from "../Voxel/VoxelData.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { WorldBounds } from "./WorldBounds.js";

import { HeightMapData } from "../Chunk/HeightByte.js";

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
   const dv = chunk.data;
   return ChunkReader.getVoxelData(dv, x, y, z, secondary);
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
   const dv = chunk.data;
   return ChunkReader.setVoxelData(dv, x, y, z, data, secondary);
  },
 },
 voxel: {
  _air: <[string, number]>["dve:air", 0],
  _barrier: <[string, number]>["dve:barrier", 0],
  air: {
   isAt(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    const id = WD.voxel.id.numeric(dimensionId, x, y, z, secondary);
    if (id == 0) return true;
   },
   set(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(0, 0));
    if (secondary) {
     const data = WD.rawData.get(dimensionId, x, y, z, true);
     WD.rawData.set(
      dimensionId,
      x,
      y,
      z,
      VoxelReader.setId(0, data),
      secondary
     );
    }
   },
  },
  barrier: {
   isAt(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    const id = WD.voxel.id.numeric(dimensionId, x, y, z, secondary);
    if (id == 1) return true;
   },
   set(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    if (!secondary) {
     WD.rawData.set(dimensionId, x, y, z, VoxelReader.setId(1, 0));
    } else {
     const data = WD.rawData.get(dimensionId, x, y, z, true);
     WD.rawData.set(
      dimensionId,
      x,
      y,
      z,
      VoxelReader.setId(1, data),
      secondary
     );
    }

   },

  },
  get(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
   const vId = WD.voxel.id.numeric(dimensionId, x, y, z, secondary);
   if (vId < 0) return false;
   if (vId == 0) return this._air;
   if (vId == 1) return this._barrier;
   const paletteId = WD.voxelPalette[vId];
   const mapId = WD.voxelPaletteMap[paletteId];
   return [paletteId, vId - mapId];
  },
  getData(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
   const id = this.id.numeric(dimensionId, x, y, z, secondary);
   if (id < 0) return false;
   return VoxelData.getVoxelData(id);
  },
  id: {
   string(dimensionId: ID, x: number, y: number, z: number, secondary = false) {
    const voxel = WD.voxel.get(dimensionId, x, y, z, secondary);
    if (!voxel) return -1;
    return voxel[0];
   },
   numeric(
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
     let data = WD.rawData.get(dimensionId, x, y, z);
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
     let data = WD.rawData.get(dimensionId, x, y, z);
     data = VoxelReader.setShapeState(data, state);
     WD.rawData.set(dimensionId, x, y, z, data);
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
     let data = WD.rawData.get(dimensionId, x, y, z);
     if (data < 0) data = 0;
     return this.get(data);
    },
    get(data: number) {
     return VoxelReader.decodeLevelFromVoxelData(data);
    },
    set(data: number, level: number) {
     return VoxelReader.encodeLevelIntoVoxelData(data, level);
    },
    setAt(dimensionId: ID, x: number, y: number, z: number, state: number) {
     let data = WD.rawData.get(dimensionId, x, y, z);
     data = this.set(data, state);
     WD.rawData.set(dimensionId, x, y, z, data);
    },
    state: {
     getAt(dimensionId: ID, x: number, y: number, z: number) {
      let data = WD.rawData.get(dimensionId, x, y, z);
      if (data < 0) data = 0;
      return this.get(data);
     },
     get(data: number) {
      return VoxelReader.decodeLevelStateFromVoxelData(data);
     },
     set(data: number, level: number) {
      return VoxelReader.encodeLevelStateIntoVoxelData(data, level);
     },
     setAt(dimensionId: ID, x: number, y: number, z: number, state: number) {
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
  voxel(data: AddVoxelData) {
   if (!data.dimension) {
    data.dimension = WD._currentionDimension;
   }
   const dimension = data.dimension;
   const pos = data.position;
   const chunk = WorldRegister.chunk.get(dimension, pos[0], pos[1], pos[2]);
   if (!chunk) return false;
   const voxelPaletteId = this._worldGen.getPaletteId(
    data.id,
    data.state ? data.state : 0
   );
   const substance = VoxelData.getTrueSubstance(voxelPaletteId);
   const voxelData = this._worldGen.getChunkId(voxelPaletteId);
   if (voxelData < 0) return false;
   WD.heightMap.update.add(dimension, substance, pos[0], pos[1], pos[2]);
   let stateData = VoxelReader.setShapeState(
    0,
    data.shapeState ? data.shapeState : 0
   );
   const voxelPOS = WorldBounds.getVoxelPosition(pos[0], pos[1], pos[2]);
   ChunkReader.setVoxelDataUseObj(
    chunk.data,
    voxelPOS,
    data.shapeState ? data.shapeState : 0
   );
   ChunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, stateData, true);
  },
  erease(dimensionId: ID, x: number, y: number, z: number) {},
  _worldGen: {
   getChunkId(voxelId: number) {
    if (voxelId) {
     return VoxelReader.setId(voxelId, 0);
    }
    return -1;
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
     return VoxelReader.setId(stateId, 0);
    }
    return -1;
   },
  },
 },
 light: {
  get(dimesnionId: ID, x: number, y: number, z: number, log = false) {
   const rawVoxelData = WD.rawData.get(dimesnionId, x, y, z);
   if (log) {
    console.log(rawVoxelData);
   }
   if (rawVoxelData < 0) return -1;
   const voxelId = VoxelReader.getId(rawVoxelData);
   if (log) {
    console.log(voxelId);
   }
   if (voxelId == 0) return VoxelReader.decodeLightFromVoxelData(rawVoxelData);
   if (voxelId < 2) return -1;
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

WorldData.light.get("main", 0, 0, 0);
WorldData.light.set("main", 0, 0, 0, 0xf);
