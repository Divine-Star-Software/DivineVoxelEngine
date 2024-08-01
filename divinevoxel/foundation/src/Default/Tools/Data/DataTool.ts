import type { RawVoxelData } from "@divinevoxel/core/Types/Voxel.types.js";
import { DimensionsRegister } from "../../../Data/World/DimensionsRegister.js";
import { VoxelStateReader } from "../../../Data/VoxelStateReader.js";
import { VoxelStruct } from "@divinevoxel/core/Data/Voxel/VoxelStruct.js";
import { VoxelPaletteReader } from "@divinevoxel/core/Data/Voxel/VoxelPalette.js";
import { ChunkDataTool } from "./WorldData/ChunkDataTool.js";
import { HeightMapTool } from "./WorldData/HeightMapTool.js";
import { DataToolBase } from "../Classes/DataToolBase.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";
import { LightData } from "../../../Data/LightData.js";
import { VoxelStructProperties } from "../../../Data/Constants/Structs/VoxelStructProperties.js";
import { MappedDataRegister } from "@divinevoxel/core/Data/Register/MappedDataRegister.js";
import { SubstanceDataTool } from "./SubstanceDataTool.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";
import { SafePromise } from "@amodx/core/Promises/SafePromise.js";
import { LocationData } from "@divinevoxel/core/Math/index.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { AddVoxelData } from "Data/Types/WorldData.types.js";
import { VoxelTagIDs } from "@divinevoxel/core/Data/Constants/VoxelTagIds.js";
import { SubstancePaletteReader } from "@divinevoxel/core/Data/Substance/SubstancePalette.js";

export enum DataToolModes {
  /**# World Data Mode
   * ---
   * Read data directly from the world.
   */
  WORLD = 0,
  /**# Voxel Matrix Mode
   * ---
   * Read from a voxel matrix.
   */
  VOXEL_MATRIX = 1,
  /**# Voxel Data Mode
   * ---
   * Read data from a single voxel passed in via `loadInRaw`
   */
  VOXEL_DATA = 2,
}

export class DataTool extends DataToolBase {
  static GetVoxelIDFromString(id: string) {
    return VoxelPaletteReader.id.numberFromString(id);
  }
  static GetVoxelIDFromNumber(id: number) {
    return VoxelPaletteReader.id.stringFromNumber(id);
  }
  static IsSameVoxel(dataTool1: DataTool, dataTool2: DataTool) {
    return dataTool1.getId(true) == dataTool2.getId(true);
  }

  static VoxelDataToRaw(data: Partial<AddVoxelData>, light = 0): RawVoxelData {
    const id =
      (data.id !== undefined && VoxelPaletteReader.id.getPaletteId(data.id)) ||
      0;
    const secondaryId =
      (data.secondaryVoxelId !== undefined &&
        VoxelPaletteReader.id.getPaletteId(data.secondaryVoxelId)) ||
      0;
    let stateData = 0;

    if (data.level !== undefined)
      stateData = VoxelStateReader.setLevel(stateData, data.level);
    if (data.levelState !== undefined)
      stateData = VoxelStateReader.setLevelState(stateData, data.levelState);
    if (data.shapeState !== undefined)
      stateData = VoxelStateReader.setShapeState(stateData, data.shapeState);

    return [id, light, stateData, secondaryId];
  }

  static Modes = DataToolModes;
  static _heightMapTool = new HeightMapTool();
  static _columntool = new ColumnDataTool();
  _chunkTool = new ChunkDataTool();
  _substanceTool = new SubstanceDataTool();

  _loadedIn = false;
  _mode = DataToolModes.WORLD;
  data = {
    raw: <RawVoxelData>[0, 0, 0, 0],
    id: 0,
    secondaryId: 0,
  };
  /**## secondary
   * If the data tool is processing secondary voxoels
   */
  __secondary = false;

  private _loadedId = 0;

  constructor() {
    super();
  }
  setMode(mode: DataToolModes) {
    this._mode = mode;
    return this;
  }

  clear() {
    this._loadedIn = false;
    let i = this.data.raw.length;
    while (i--) {
      this.data.raw[i] = 0;
    }
    this.data.id = 0;
    this.data.secondaryId = 0;
    return this;
  }

  setDimension(dimensionId: string | number) {
    this.location[0] =
      DimensionsRegister.instance.getDimensionStringId(dimensionId);
    return this;
  }

  setSecondary(enable: boolean) {
    this.__secondary = enable;
    if (enable) {
      this.__struct.setIndex(VoxelStruct.voxelIndex[this.data.secondaryId]);
    } else {
      this.__struct.setIndex(VoxelStruct.voxelIndex[this.data.id]);
    }
    this._loadedId = this.getId(true);
    return this;
  }
  _getBaseId(id: number) {
    return VoxelPaletteReader.id.baseNumeric(id);
  }

  getSubstnaceData() {
    this._substanceTool.setSubstance(this.getSubstance());
    return this._substanceTool;
  }

  getRaw() {
    return this.data.raw;
  }

  async waitTillCanLoad(
    locatin: LocationData,
    maxWaitTime = 60_000
  ): Promise<boolean> {
    if (WorldRegister.instance.chunk.get(locatin)) return true;
    return new SafePromise(
      "wait-till-can-load",
      (resolve, reject, prom) => {
        const inte = new SafeInterval();
        prom.observers.died.subscribe(resolve, () => inte.stop());
        prom.observers.canceled.subscribe(resolve, () => inte.stop());
        prom.observers.finally.subscribe(resolve, () => inte.stop());
        inte.setOnRun(() => {
          if (WorldRegister.instance.chunk.get(locatin)) {
            resolve(true);
          }
        });
      },
      maxWaitTime
    ).run();
  }

  loadInRaw(rawData: RawVoxelData) {
    this.data.raw[0] = rawData[0];
    this.data.raw[1] = rawData[1];
    this.data.raw[2] = rawData[2];
    this.data.raw[3] = rawData[3];
    this.__process();
    return this;
  }

  loadInData(data: Partial<AddVoxelData>, light = 0) {
    this.loadInRaw(DataTool.VoxelDataToRaw(data, light));
  }

  __struct: VoxelStruct;
  private __process() {
    if (!this.__struct) this.__struct = VoxelStruct.clone();
    this.data.id = this.data.raw[0];
    this.data.secondaryId = this.data.raw[3];

    if (this.data.secondaryId > 1) {
      this.data.id = this._getBaseId(this.data.secondaryId);
    } else {
      this.data.secondaryId = 0;
    }
    this.__struct.setIndex(VoxelStruct.voxelIndex[this.data.id]);
    this._loadedId = this.getId(true);
  }

  loadIn() {
    if (this._mode == DataTool.Modes.WORLD) {
      if (!this._chunkTool.setLocation(this.location).loadIn()) return false;

      const index = WorldSpaces.voxel.getIndexLocation(this.location);
      this._chunkTool.loadInRaw(index, this.data.raw);
      this.__process();
      this._loadedIn = true;
      return true;
    }
    if (this._mode == DataTool.Modes.VOXEL_MATRIX) {
      return false;
    }
    if (this._mode == DataTool.Modes.VOXEL_DATA) {
      this.data.raw[0] = 0;
      this.data.raw[1] = LightData.getS(0xff);
      this.data.raw[2] = 0;
      return false;
    }

    return false;
  }

  commit(heightMapUpdate = 0) {
    if (!this._loadedIn) return false;
    if (this._mode == DataTool.Modes.WORLD) {
      const index = WorldSpaces.voxel.getIndexLocation(this.location);
      this._chunkTool.setRaw(index, this.data.raw);
      if (DataTool._columntool.loadInAtLocation(this.location)) {
        DataTool._columntool.markAsNotStored();
      }
      if (heightMapUpdate) {
        DataTool._heightMapTool.chunk._c = <DataView>this._chunkTool._c;

        //on add
        if (heightMapUpdate == 1) {
          DataTool._heightMapTool.chunk.setY(this.y).setHasVoxels(true);
          //  DataTool._heightMapTool.chunk.update("add", substance, this.location);
        }
        //on remove
        if (heightMapUpdate == 2) {
          DataTool._heightMapTool.chunk.setY(this.y).setDirty(true);
          //   DataTool._heightMapTool.chunk.update("remove", substance, this.location);
        }
      }
      this._loadedIn = false;
      return true;
    }
    if (this._mode == DataTool.Modes.VOXEL_MATRIX) {
      return false;
    }
    if (this._mode == DataTool.Modes.VOXEL_DATA) {
      return false;
    }
    return false;
  }

  hasRGBLight() {
    const light = this.getLight();
    if (light <= 0) false;
    return LightData.hasRGBLight(light);
  }
  hasSunLight() {
    const light = this.getLight();
    if (light <= 0) false;
    return LightData.hasSunLight(light);
  }
  getLight() {
    if (this._mode == DataTool.Modes.VOXEL_DATA) return 0xf;
    const vID = this._loadedId;
    if (vID == 0) return this.data.raw[1];
    if (vID < 2) return -1;
    const lightValue = this.__struct[VoxelTagIDs.lightValue];
    if (this.isOpaque()) {
      if (this.__struct[VoxelTagIDs.isLightSource] && lightValue) {
        return lightValue;
      } else {
        return -1;
      }
    }
    if (this.__struct[VoxelTagIDs.isLightSource] && lightValue) {
      return LightData.mixLight(this.data.raw[1], lightValue);
    }
    return this.data.raw[1];
  }
  setLight(light: number) {
    this.data.raw[1] = light;
    return this;
  }

  isOpaque() {
    return this.getSubstnaceData().isOpaque();
  }

  getLevel() {
    return VoxelStateReader.getLevel(this.data.raw[2]);
  }
  setLevel(level: number) {
    this.data.raw[2] = VoxelStateReader.setLevel(this.data.raw[2], level);
    return this;
  }
  getLevelState() {
    return VoxelStateReader.getLevelState(this.data.raw[2]);
  }
  setLevelState(state: number) {
    this.data.raw[2] = VoxelStateReader.setLevelState(this.data.raw[2], state);
    return this;
  }
  getShapeState() {
    return VoxelStateReader.getShapeState(this.data.raw[2]);
  }
  setShapeState(state: number) {
    this.data.raw[2] = VoxelStateReader.setShapeState(this.data.raw[2], state);
    return this;
  }
  hasSecondaryVoxel() {
    return this.data.secondaryId > 1;
  }

  //voxel data
  getShapeId() {
    const vID = this._loadedId;
    if (vID < 2) return -1;
    return this.__struct[VoxelTagIDs.shapeID];
  }
  getShapeStringId() {
    const vID = this._loadedId;
    if (vID < 2) return "";
    return MappedDataRegister.stringMaps.get(
      "voxel",
      VoxelStructProperties.shapeID,
      this.__struct[VoxelTagIDs.shapeID]
    );
  }
  isLightSource() {
    const vID = this._loadedId;
    if (vID < 2) return false;
    return this.__struct[VoxelTagIDs.isLightSource] == 1;
  }
  getLightSourceValue() {
    const vID = this._loadedId;
    if (vID < 2) return 0;
    return this.__struct[VoxelTagIDs.lightValue];
  }
  getSubstanceStringId() {
    const vID = this._loadedId;
    if (vID < 2) return "#dve_transparent";
    return SubstancePaletteReader.id.stringFromNumber(this.getSubstance());
  }
  getSubstance() {
    const vID = this._loadedId;
    if (vID < 2) return -1;
    return this.__struct[VoxelTagIDs.substance];
  }
  getMaterial() {
    const vID = this._loadedId;
    if (vID < 2) return "none";
    return MappedDataRegister.stringMaps.get(
      "voxel",
      VoxelStructProperties.material,
      this.__struct[VoxelTagIDs.material]
    );
  }
  getHardness() {
    const vID = this._loadedId;
    if (vID < 2) return 0;
    return this.__struct[VoxelTagIDs.hardness];
  }
  getCollider() {
    const vID = this._loadedId;
    return MappedDataRegister.stringMaps.get(
      "voxel",
      VoxelStructProperties.colliderID,
      this.__struct[VoxelTagIDs.colliderID]
    );
  }
  checkCollisions() {
    const vID = this._loadedId;
    if (vID == 0) return false;
    if (vID == 1) return true;
    return this.__struct[VoxelTagIDs.checkCollisions] == 1;
  }

  isRich() {
    const vID = this._loadedId;
    if (vID < 2) return 0;
    return this.__struct[VoxelTagIDs.isRich] == 1;
  }

  //util
  setAir() {
    this.data.raw[0] = 0;
    this.__process();
    return this;
  }
  isAir() {
    return 0 == this.data.raw[0];
  }
  setBarrier() {
    this.data.raw[0] = 1;
    this.__process();
    return this;
  }
  isBarrier() {
    return 1 == this.data.raw[0];
  }
  //voxel id
  getId(base: boolean = false) {
    if (this.__secondary) {
      if (!base) return this.data.secondaryId;
      return this.data.secondaryId;
    }
    if (!base) return this.data.id;
    return this.data.id;
  }
  setId(id: number) {
    if (this.__secondary) {
      this.data.raw[3] = id;
      this.__process();
      return this;
    }
    this.data.raw[0] = id;
    this.__process();
    return this;
  }
  setStringId(id: string) {
    return this.setId(VoxelPaletteReader.id.numberFromString(id)!);
  }
  getStringId() {
    if (this.__secondary) {
      return VoxelPaletteReader.id.stringFromNumber(this.data.secondaryId);
    }
    return VoxelPaletteReader.id.stringFromNumber(this.data.id);
  }

  setName(name: string) {
    this.setStringId(VoxelPaletteReader.name.getId(name));
  }

  getName() {
    return this.getStringId();
  }
  //util
  isRenderable() {
    if (this.data.id < 2 && this.data.secondaryId < 2) return false;
    return true;
  }

  isSameVoxel(dataTool: DataTool) {
    return DataTool.IsSameVoxel(this, dataTool);
  }
}
