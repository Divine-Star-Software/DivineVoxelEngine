import { VoxelStructProperties } from "../../Constants/Structs/VoxelStructProperties";
import { VoxelTagIDs } from "../../Constants/VoxelTagIds";
import { LightData } from "../../LightData";
import { MappedDataRegister } from "../../Register/MappedDataRegister";
import { VoxelStruct } from "../../Voxel/VoxelStruct";
import { VoxelStateReader } from "../../VoxelStateReader";
import { VoxelTagStates } from "../../../VoxelState/VoxelTagStates";
import { VoxelPalette } from "../../Voxel/VoxelPalette";
import { DataTool } from "../../../Tools/Data/DataTool";
import { SubstancePaletteReader } from "../../Substance/SubstancePalette";
import { RawVoxelData } from "Data/Types/VoxelData.types";
export abstract class VoxelCursorInterface {
  _loadedId = 0;
  id = 0;
  secondaryId = 0;

  __struct: VoxelStruct;
  __secondary = false;

  // private _chunk: Chunk;
  _index = 0;

  abstract ids: Uint16Array;
  abstract light: Uint16Array;
  abstract state: Uint16Array;
  abstract secondary: Uint16Array;
  abstract mod: Uint16Array;

  process() {
    if (!this.__struct) this.__struct = VoxelStruct.clone();
    this.id = this.ids[this._index];
    this.secondaryId = this.secondary[this._index];

    if (this.secondaryId > 1) {
      this.id = this.secondaryId;
    } else {
      this.secondaryId = 0;
    }
    this.__struct.setIndex(VoxelStruct.voxelIndex[this.id]);
    this._loadedId = this.getId();
  }

  abstract loadIn(): void;

  setSecondary(enable: boolean) {
    this.__secondary = enable;
    if (enable) {
      this.__struct.setIndex(VoxelStruct.voxelIndex[this.secondaryId]);
    } else {
      this.__struct.setIndex(VoxelStruct.voxelIndex[this.id]);
    }
    this._loadedId = this.getId();
    return this;
  }
  getSubstance() {
    const vID = this._loadedId;
    if (vID < 2) return -1;
    return this.__struct[VoxelTagIDs.substance];
  }
  getSubstanceStringId() {
    const vID = this._loadedId;
    if (vID < 2) return "#dve_transparent";
    return SubstancePaletteReader.id.stringFromNumber(this.getSubstance());
  }
  isOpaque() {
    return this.__struct[VoxelTagIDs.isTransparent] == 0;
  }
  getMod() {
    return this.mod[this._index];
  }
  setMod(mod: number) {
    this.mod[this._index] = mod;
    return this;
  }
  getLevel() {
    return VoxelStateReader.getLevel(this.state[this._index]);
  }
  setLevel(level: number) {
    this.state[this._index] = VoxelStateReader.setLevel(
      this.state[this._index],
      level
    );
    return this;
  }
  getLevelState() {
    return VoxelStateReader.getLevelState(this.state[this._index]);
  }
  setLevelState(state: number) {
    this.state[this._index] = VoxelStateReader.setLevelState(
      this.state[this._index],
      state
    );
    return this;
  }
  getShapeState() {
    return VoxelStateReader.getShapeState(this.state[this._index]);
  }
  setShapeState(state: number) {
    this.state[this._index] = VoxelStateReader.setShapeState(
      this.state[this._index],
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
    if (vID == 0) return this.light[this._index];
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
      return LightData.mixLight(this.light[this._index], lightValue);
    }
    return this.light[this._index];
  }
  setLight(light: number) {
    this.light[this._index] = light;
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
    return 0 == this.ids[this._index];
  }
  isBarrier() {
    return 1 == this.ids[this._index];
  }
  getId() {
    if (this.__secondary) {
      return this.secondaryId;
    }
    return this.id;
  }
  setId(id: number) {
    if (this.__secondary) {
      this.secondary[this._index] = id;
      return this;
    }
    this.ids[this._index] = id;
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

  isSameVoxel(voxel: VoxelCursorInterface | DataTool) {
    return this.getId() == voxel.getId();
  }
  copy(cursor: VoxelCursorInterface) {
    this.ids[this._index] = cursor.ids[cursor._index];
    this.light[this._index] = cursor.light[cursor._index];
    this.state[this._index] = cursor.state[cursor._index];
    this.secondary[this._index] = cursor.secondary[cursor._index];
    this.mod[this._index] = cursor.mod[cursor._index];
    return this;
  }

  copyRaw(raw: RawVoxelData) {
    this.ids[this._index] = raw[0];
    this.light[this._index] = raw[1];
    this.state[this._index] = raw[2];
    this.secondary[this._index] = raw[3];
    this.mod[this._index] = raw[4];
    return this;
  }
}
