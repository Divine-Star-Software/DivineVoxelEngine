import { VoxelStructProperties } from "../Constants/Structs/VoxelStructProperties";
import { VoxelTagIDs } from "../Constants/VoxelTagIds";
import { LightData } from "../LightData";
import { MappedDataRegister } from "../Register/MappedDataRegister";
import { RawVoxelData } from "../Types/VoxelData.types";
import { VoxelStruct } from "../Voxel/VoxelStruct";
import { VoxelStateReader } from "../VoxelStateReader";
import { VoxelTagStates } from "../../VoxelState/VoxelTagStates";
import { ColumnCursor } from "./ColumnCursor";
import { Chunk } from "../World/Classes";
import { VoxelPalette } from "../Voxel/VoxelPalette";
import { ChunkStructProperties } from "../Constants/Structs/ChunkStructProperties";
import { DataTool } from "Tools/Data/DataTool";
export class VoxelCursor {
  _loadedId = 0;
  id = 0;
  secondaryId = 0;

  __struct: VoxelStruct;
  __secondary = false;

  private _chunk: Chunk;
  private _index = 0;

  constructor(public columnCursor: ColumnCursor) {}

  process() {
    if (!this.__struct) this.__struct = VoxelStruct.clone();
    this.id = this._chunk.ids[this._index];
    this.secondaryId = this._chunk.secondary[this._index];

    if (this.secondaryId > 1) {
      this.id = this.secondaryId;
    } else {
      this.secondaryId = 0;
    }
    this.__struct.setIndex(VoxelStruct.voxelIndex[this.id]);
    this._loadedId = this.getId(true);
  }
  loadIn() {
    if (!this.columnCursor._chunk) return;
    this._chunk = this.columnCursor._chunk;
    this._index = this.columnCursor._voxelIndex;
    this.process();
  }

  setSecondary(enable: boolean) {
    this.__secondary = enable;
    if (enable) {
      this.__struct.setIndex(VoxelStruct.voxelIndex[this.secondaryId]);
    } else {
      this.__struct.setIndex(VoxelStruct.voxelIndex[this.id]);
    }
    this._loadedId = this.getId(true);
    return this;
  }
  getSubstance() {
    const vID = this._loadedId;
    if (vID < 2) return -1;
    return this.__struct[VoxelTagIDs.substance];
  }
  isOpaque() {
    return this.__struct[VoxelTagIDs.isTransparent] == 0;
  }
  getMod() {
    return this._chunk.mod[this._index];
  }
  setMod(mod: number) {
    this._chunk.mod[this._index] = mod;
    return this;
  }
  getLevel() {
    return VoxelStateReader.getLevel(this._chunk.state[this._index]);
  }
  setLevel(level: number) {
    this._chunk.state[this._index] = VoxelStateReader.setLevel(
      this._chunk.state[this._index],
      level
    );
    return this;
  }
  getLevelState() {
    return VoxelStateReader.getLevelState(this._chunk.state[this._index]);
  }
  setLevelState(state: number) {
    this._chunk.state[this._index] = VoxelStateReader.setLevelState(
      this._chunk.state[this._index],
      state
    );
    return this;
  }
  getShapeState() {
    return VoxelStateReader.getShapeState(this._chunk.state[this._index]);
  }
  setShapeState(state: number) {
    this._chunk.state[this._index] = VoxelStateReader.setShapeState(
      this._chunk.state[this._index],
      state
    );
    return this;
  }
  hasSecondaryVoxel() {
    return this.secondaryId > 1;
  }
  canHaveSecondaryVoxel() {
    return this.__struct[VoxelTagIDs.canHaveSecondary] == 1;
  }
  getLight() {
    const vID = this._loadedId;
    if (vID == 0) return this._chunk.light[this._index];
    if (vID < 2) return -1;

    const lightValue = this.__struct[VoxelTagIDs.lightValue];
    if (this.isOpaque()) {
      if (this.isLightSource() && lightValue) {
        return lightValue;
      } else {
        return -1;
      }
    }
    if (this.isLightSource() && lightValue) {
      return LightData.mixLight(this._chunk.light[this._index], lightValue);
    }
    return this._chunk.light[this._index];
  }
  setLight(light: number) {
    this._chunk.light[this._index] = light;
    return this;
  }
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
    return VoxelTagStates.isRegistered(
      this._loadedId,
      VoxelTagIDs.isLightSource
    )
      ? VoxelTagStates.getValue(
          this._loadedId,
          VoxelTagIDs.isLightSource,
          this.getShapeState()
        ) === true
      : this.__struct[VoxelTagIDs.isLightSource] == 1;
  }
  noAO() {
    const vID = this._loadedId;
    if (vID < 2) return false;
    return this.__struct[VoxelTagIDs.noAO] == 1;
  }
  isRenderable() {
    if (this.id < 2 && this.secondaryId < 2) return false;
    return true;
  }
  isAir() {
    return 0 == this._chunk.ids[this._index];
  }
  isBarrier() {
    return 1 == this._chunk.ids[this._index];
  }
  getId(base: boolean = false) {
    if (this.__secondary) {
      if (!base) return this.secondaryId;
      return this.secondaryId;
    }
    if (!base) return this.id;
    return this.id;
  }
  setId(id: number) {
    if (this.__secondary) {
      this._chunk.secondary[this._index] = id;
      return this;
    }
    this._chunk.ids[this._index] = id;
    return this;
  }
  setStringId(id: string) {
    return this.setId(VoxelPalette.ids.getNumberId(id)!);
  }
  getStringId() {
    if (this.__secondary) {
      return VoxelPalette.ids.getStringId(this.secondaryId);
    }
    return VoxelPalette.ids.getStringId(this.id);
  }

  setName(name: string) {
    this.setStringId(VoxelPalette.name.getId(name));
  }

  getName() {
    return this.getStringId();
  }

  /**
   *
   * @param mode 0 for add 1 for remove
   * @param x
   * @param y
   * @param z
   * @returns
   */
  updateHeightMap(mode: 0 | 1) {
    Chunk.StateStruct.setBuffer(this._chunk.chunkState);

    const voxelPos = this.columnCursor._voxelPosition;
    if (mode == 0) {
      Chunk.StateStruct.setArrayPropertyValue(
        ChunkStructProperties.heightMap,
        voxelPos.y,
        1
      );
      return true;
    }
    if (mode == 1) {
      Chunk.StateStruct.setArrayPropertyValue(
        ChunkStructProperties.dirtyMap,
        voxelPos.y,
        1
      );
      Chunk.StateStruct.setArrayPropertyValue(
        ChunkStructProperties.heightMap,
        voxelPos.y,
        0
      );
      return true;
    }
    return false;
  }

  isSameVoxel(voxel: VoxelCursor | DataTool) {
    return this.getId() == voxel.getId();
  }
}
