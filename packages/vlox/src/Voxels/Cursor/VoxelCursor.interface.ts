import { VoxelLightData } from "./VoxelLightData";
import { VoxelLevelReader } from "./VoxelLevelReader";
import { RawVoxelData } from "../Types/Voxel.types";
import {
  VoxelSubstanceTags,
  VoxelTagIds,
  VoxelTags,
} from "../../Voxels/Data/VoxelTag.types";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelLogicRegister } from "../../Voxels/Logic/VoxelLogicRegister";
import { VoxelSchema } from "../../Voxels/State/Schema/VoxelSchema";
import { SchemaRegister } from "../../Voxels/State/SchemaRegister";
import { NumberArray } from "../../Util/Util.types";

export abstract class VoxelCursorInterface {
  _voxelId = 0;
  id = 0;

  secondaryId = 0;

  schema: VoxelSchema;
  tags: VoxelTags = {} as any;
  substanceTags: VoxelSubstanceTags = {} as any;
  __readingSecondaryVoxel = false;

  // private _section: Section;
  _index = 0;

  abstract ids: NumberArray;
  abstract light: NumberArray;
  abstract level: NumberArray;
  abstract secondary: NumberArray;

  /**
   *
   * @param mode 0 for add 1 for remove 2 for the voxel needs a buried and logic check only, 3 for propagatin check only
   */
  abstract updateVoxel(mode: 0 | 1 | 2): void;
  _lightData = new VoxelLightData();

  process() {
    this.id = this.ids[this._index];
    this.secondaryId = this.secondary[this._index];

    this._voxelId = this.getVoxelId();
    this.tags = VoxelTagsRegister.VoxelTags[this._voxelId];

    this.substanceTags =
      VoxelTagsRegister.SubstanceStags[
        VoxelPalettesRegister.substance.getNumberId(this.tags["dve_substance"]!)
      ];

    this.schema = SchemaRegister.getVoxelSchemas(this.getStringId());
  }

  abstract loadIn(): void;

  setSecondary(enable: boolean) {
    this.__readingSecondaryVoxel = enable;

    return this;
  }
  getRenderedMaterial() {
    return this.tags[VoxelTagIds.renderedMaterial];
  }

  getMaterial() {
    return this.tags[VoxelTagIds.voxelMaterial];
  }

  checkCollisions() {
    return this.tags[VoxelTagIds.checkCollisions];
  }
  getCollider() {
    return this.tags[VoxelTagIds.colliderID];
  }

  getSubstance() {
    return this.tags[VoxelTagIds.substance];
  }
  getSubstanceData() {
    return this.substanceTags;
  }
  isOpaque() {
    return !this.tags[VoxelTagIds.isTransparent];
  }

  getLevel() {
    return VoxelLevelReader.getLevel(this.level[this._index]);
  }
  setLevel(level: number) {
    this.level[this._index] = VoxelLevelReader.setLevel(
      this.level[this._index],
      level
    );
    return this;
  }
  getLevelState() {
    return VoxelLevelReader.getLevelState(this.level[this._index]);
  }
  setLevelState(state: number) {
    this.level[this._index] = VoxelLevelReader.setLevelState(
      this.level[this._index],
      state
    );
    return this;
  }

  hasSecondaryVoxel() {
    return this.secondaryId > 1;
  }
  canHaveSecondaryVoxel() {
    return this.tags[VoxelTagIds.canHaveSecondary];
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
    if (this._voxelId == 0) return this.light[this._index];
    if (this.isOpaque()) {
      if (this.isLightSource()) {
        return this.tags[VoxelTagIds.lightValue] as number;
      }
      return -1;
    }
    if (this.isLightSource()) {
      return this._lightData.mixLight(
        this.light[this._index],
        this.tags[VoxelTagIds.lightValue] as number
      );
    }
    return this.light[this._index];
  }

  setLight(light: number) {
    this.light[this._index] = light;
    return this;
  }

  isLightSource() {
    if (this._voxelId <= 0) return false;
    if (
      VoxelLogicRegister.voxels[this._voxelId]?.hasTag(
        VoxelTagIds.isLightSource
      )
    ) {
      return VoxelLogicRegister.voxels[this._voxelId].getTagValue(
        VoxelTagIds.isLightSource,
        this
      );
    }
    return this.tags[VoxelTagIds.isLightSource];
  }

  doesVoxelAffectLogic() {
    if (
      this.tags["dve_can_be_powered"] ||
      this.tags["dve_can_hold_power"] ||
      this.tags["dve_can_carry_power"] ||
      this.tags["dve_is_power_source"]
    )
      return true;

    return false;
  }

  getLightSourceValue() {
    if (this._voxelId <= 0) return 0;
    return this.tags[VoxelTagIds.lightValue] as number;
  }

  getPower() {
    if (this._voxelId == 0) return -1;
    if (this.substanceTags["dve_is_liquid"]) return -1;
    if (
      !this.tags["dve_can_carry_power"] &&
      !this.tags["dve_can_hold_power"] &&
      !this.tags["dve_can_be_powered"] &&
      !this.tags["dve_is_power_source"]
    )
      return -1;
    const level = VoxelLevelReader.getLevel(this.level[this._index]);
    if (
      this.tags["dve_is_power_source"] &&
      this.tags["dve_power_value"] > level
    )
      return this.tags["dve_power_value"];
    return level;
  }

  setPower(level: number) {
    this.level[this._index] = VoxelLevelReader.setLevel(
      this.level[this._index],
      level
    );
    return this;
  }

  isPowerSource() {
    if (this._voxelId <= 0) return false;
    if (
      VoxelLogicRegister.voxels[this._voxelId]?.hasTag(
        VoxelTagIds.isPowerSource
      )
    ) {
      return VoxelLogicRegister.voxels[this._voxelId].getTagValue(
        VoxelTagIds.isPowerSource,
        this
      );
    }
    return this.tags[VoxelTagIds.isPowerSource];
  }

  getPowerSourceValue() {
    if (this._voxelId <= 0) return 0;
    return this.tags[VoxelTagIds.powerValue] as number;
  }

  noAO() {
    if (this._voxelId <= 0) return false;
    return this.tags[VoxelTagIds.noAO];
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
    this.ids[this._index] = 0;
    return this;
  }

  getId() {
    if (this.__readingSecondaryVoxel) {
      return this.secondaryId;
    }
    return this.id;
  }
  setId(id: number) {
    if (this.__readingSecondaryVoxel) {
      this.secondary[this._index] = id;
      return this;
    }
    this.ids[this._index] = id;
    return this;
  }
  getVoxelId() {
    return this.getIndexData()[0];
  }
  setVoxelId(id: number, state = 0, mod = 0) {
    return this.setId(VoxelPalettesRegister.getVoxelId(id, state, mod));
  }

  setStringId(id: string, state = 0, mod = 0) {
    return this.setVoxelId(
      VoxelPalettesRegister.voxelIds.getNumberId(id),
      state,
      mod
    );
  }
  getStringId() {
    return VoxelPalettesRegister.voxelIds.getStringId(this.getIndexData()[0]);
  }

  setName(name: string, state = 0, mod = 0) {
    return this.setVoxelId(
      VoxelPalettesRegister.voxelIds.getNumberId(
        VoxelPalettesRegister.voxelNametoIdMap.get(name)!
      ),
      state,
      mod
    );
  }

  getName() {
    return VoxelPalettesRegister.voxelIdToNameMap.get(this.getStringId())!;
  }
  getIndexData() {
    if (this.__readingSecondaryVoxel) {
      return VoxelPalettesRegister.voxels[this.secondary[this._index]];
    }
    return VoxelPalettesRegister.voxels[this.ids[this._index]];
  }

  getMod() {
    return VoxelPalettesRegister.voxels[this.ids[this._index]][2];
  }
  setMod(mod: number) {
    const index = VoxelPalettesRegister.voxels[this.ids[this._index]];
    this.setId(VoxelPalettesRegister.getVoxelId(index[0], index[1], mod));
    return this;
  }
  getState() {
    return this.getIndexData()[1];
  }
  setState(state: number) {
    const index = this.getIndexData();
    this.setId(VoxelPalettesRegister.getVoxelId(index[0], state, index[2]));
    return this;
  }

  isSameVoxel(voxel: VoxelCursorInterface) {
    return this.getIndexData()[0] == voxel.getIndexData()[0];
  }
  copy(cursor: VoxelCursorInterface) {
    this.ids[this._index] = cursor.ids[cursor._index];
    this.light[this._index] = cursor.light[cursor._index];
    this.level[this._index] = cursor.level[cursor._index];
    this.secondary[this._index] = cursor.secondary[cursor._index];
    return this;
  }

  setRaw(raw: RawVoxelData) {
    this.ids[this._index] = raw[0];
    this.light[this._index] = raw[1];
    this.level[this._index] = raw[2];
    this.secondary[this._index] = raw[3];
    return this;
  }

  getRaw(): RawVoxelData {
    return [
      this.ids[this._index],
      this.light[this._index],
      this.level[this._index],
      this.secondary[this._index],
    ];
  }

  getRawToRef(raw: RawVoxelData): RawVoxelData {
    raw[0] = this.ids[this._index];
    raw[1] = this.light[this._index];
    raw[2] = this.level[this._index];
    raw[3] = this.secondary[this._index];
    return raw;
  }
}
