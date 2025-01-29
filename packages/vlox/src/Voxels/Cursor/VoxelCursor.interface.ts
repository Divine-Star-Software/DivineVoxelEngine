import { VoxelStructIds } from "../Types/Voxel.types";
import { VoxelLightData } from "./VoxelLightData";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister";
import { VoxelStruct } from "../Structs/VoxelStruct";
import { VoxelStateReader } from "../VoxelStateReader";
import { VoxelTagStates } from "../State/VoxelTagStates";
import { VoxelPalette } from "../Palettes/VoxelPalette";
import { SubstancePalette } from "../Palettes/SubstancePalette";
import { RawVoxelData } from "../Types/Voxel.types";
import { MaterialPalette } from "../Palettes/MaterialPalette";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool";
interface WritableArrayLike<T> {
  length: number;
  [index: number]: T;
}
export abstract class VoxelCursorInterface {
  _loadedId = 0;
  id = 0;
  secondaryId = 0;

  __struct: VoxelStruct;
  __secondary = false;

  // private _section: Section;
  _index = 0;

  abstract ids: WritableArrayLike<number>;
  abstract light: WritableArrayLike<number>;
  abstract level: WritableArrayLike<number>;
  abstract state: WritableArrayLike<number>;
  abstract secondary: WritableArrayLike<number>;
  abstract mod: WritableArrayLike<number>;

  _lightData = new VoxelLightData();

  _substanceData = new SubstanceDataTool();

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
  getRenderedMaterial() {
    return this.__struct[VoxelStructIds.renderedMaterial];
  }
  getRenderedMaterialStringId() {
    return MaterialPalette.id.stringFromNumber(
      this.__struct[VoxelStructIds.renderedMaterial]
    );
  }
  getMaterial() {
    return this.__struct[VoxelStructIds.voxelMaterial];
  }
  getMaterialStringId() {
    return MaterialPalette.id.stringFromNumber(
      this.__struct[VoxelStructIds.voxelMaterial]
    );
  }
  checkCollisions() {
    return this.__struct[VoxelStructIds.checkCollisions] == 1;
  }
  getCollider() {
    return this.__struct[VoxelStructIds.colliderID];
  }
  getColliderStringId() {
    return MappedDataRegister.stringMaps.get(
      "voxel",
      VoxelStructIds.colliderID,
      this.__struct[VoxelStructIds.colliderID]
    );
  }

  getSubstance() {
    return this.__struct[VoxelStructIds.substance];
  }
  getSubstanceData() {
    return this._substanceData.setSubstance(this.getSubstance());
  }
  getSubstanceStringId() {
    return SubstancePalette.id.stringFromNumber(this.getSubstance());
  }
  isOpaque() {
    return this.__struct[VoxelStructIds.isTransparent] == 0;
  }
  getMod() {
    return this.mod[this._index];
  }
  setMod(mod: number) {
    this.mod[this._index] = mod;
    return this;
  }
  getLevel() {
    return VoxelStateReader.getLevel(this.level[this._index]);
  }
  setLevel(level: number) {
    this.level[this._index] = VoxelStateReader.setLevel(
      this.level[this._index],
      level
    );
    return this;
  }
  getLevelState() {
    return VoxelStateReader.getLevelState(this.level[this._index]);
  }
  setLevelState(state: number) {
    this.level[this._index] = VoxelStateReader.setLevelState(
      this.level[this._index],
      state
    );
    return this;
  }
  getState() {
    return this.state[this._index];
  }
  setState(state: number) {
    this.state[this._index] = state;
    return this;
  }
  hasSecondaryVoxel() {
    return this.secondaryId > 1;
  }
  canHaveSecondaryVoxel() {
    return this.__struct[VoxelStructIds.canHaveSecondary] == 1;
  }
  hasRGBLight() {
    const light = this.getLight();
    if (light <= 0) false;
    return this._lightData.hasRGBLight(light);
  }
  hasSunLight() {
    const light = this.getLight();
    if (light <= 0) false;
    return this._lightData.hasSunLight(light);
  }
  getLight() {
    if (this._loadedId == 0) return this.light[this._index];
    const lightValue = this.__struct[VoxelStructIds.lightValue];
    if (this.isOpaque()) {
      if (this.isLightSource() && lightValue) {
        return lightValue;
      } else {
        return -1;
      }
    }
    if (this.isLightSource() && lightValue) {
      return this._lightData.mixLight(this.light[this._index], lightValue);
    }
    return this.light[this._index];
  }
  setLight(light: number) {
    this.light[this._index] = light;
    return this;
  }
  isLightSource() {
    if (this._loadedId <= 0) return false;
    return VoxelTagStates.isRegistered(
      this._loadedId,
      VoxelStructIds.isLightSource
    )
      ? VoxelTagStates.getValue(
          this._loadedId,
          VoxelStructIds.isLightSource,
          this.getState()
        ) === true
      : this.__struct[VoxelStructIds.isLightSource] == 1;
  }
  getLightSourceValue() {
    if (this._loadedId <= 0) return 0;
    return this.__struct[VoxelStructIds.lightValue];
  }
  noAO() {
    if (this._loadedId <= 0) return false;
    return this.__struct[VoxelStructIds.noAO] == 1;
  }
  isRenderable() {
    if (this.id > 0) return true;
    if (this.canHaveSecondaryVoxel() && this.secondary[this._index] > 0)
      return true;
    return false;
  }
  isAir() {
    return 0 == this.ids[this._index];
  }
  setAir() {
    this.ids[0] = 0;
    return this;
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

  isSameVoxel(voxel: VoxelCursorInterface) {
    return this.getId() == voxel.getId();
  }
  copy(cursor: VoxelCursorInterface) {
    this.ids[this._index] = cursor.ids[cursor._index];
    this.light[this._index] = cursor.light[cursor._index];
    this.level[this._index] = cursor.level[cursor._index];
    this.state[this._index] = cursor.state[cursor._index];
    this.mod[this._index] = cursor.mod[cursor._index];
    this.secondary[this._index] = cursor.secondary[cursor._index];
    return this;
  }

  copyRaw(raw: RawVoxelData) {
    this.ids[this._index] = raw[0];
    this.light[this._index] = raw[1];
    this.level[this._index] = raw[2];
    this.state[this._index] = raw[3];
    this.secondary[this._index] = raw[4];
    this.mod[this._index] = raw[5];
    return this;
  }

  getRaw(): RawVoxelData {
    return [
      this.ids[this._index],
      this.light[this._index],
      this.level[this._index],
      this.state[this._index],
      this.mod[this._index],
      this.secondary[this._index],
    ];
  }

  getRawToRef(raw: RawVoxelData): RawVoxelData {
    raw[0] = this.ids[this._index];
    raw[1] = this.light[this._index];
    raw[2] = this.level[this._index];
    raw[3] = this.state[this._index];
    raw[4] = this.mod[this._index];
    raw[5] = this.secondary[this._index];
    return raw;
  }
}
