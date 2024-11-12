import { DataTool } from "../../Tools/Data/DataTool.js";
import type { RawVoxelData } from "../../Data/Types/VoxelData.types.js";
import { WorldPainter } from "../../Data/World/WorldPainter.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPalette } from "../../Data/Voxel/VoxelPalette.js";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { AddVoxelData } from "../../Data/Types/WorldData.types.js";
const air = "dve_air";

export class BrushTool extends LocationBoundTool {
  data: AddVoxelData = {
    id: air,
    shapeState: 0,
    secondaryVoxelId: air,
    level: 0,
    levelState: 0,
    mod: 0,
  };

  name = air;

  _worldPainter = new WorldPainter();

  _dt = new DataTool();

  setData(data: Partial<AddVoxelData>) {
    this.data.id = data.id ? data.id : air;
    this.data.shapeState = data.shapeState ? data.shapeState : 0;
    this.data.secondaryVoxelId = data.secondaryVoxelId
      ? data.secondaryVoxelId
      : air;
    this.data.level = data.level ? data.level : 0;
    this.data.levelState = data.levelState ? data.levelState : 0;
    this.data.mod = data.mod ? data.mod : 0;
    return this;
  }

  setId(id: string) {
    this.data.id = id;
    return this;
  }

  setName(name: string) {
    this.data.id = VoxelPalette.name.getId(name);
    this.name = name;
    return this;
  }

  setDimension(dimensionId: string) {
    this.dimension = dimensionId;
    this._dt.setDimension(dimensionId);
    return this;
  }

  setSecondaryId(id: string) {
    this.data.secondaryVoxelId = id;
    return this;
  }

  setShapeState(state: number) {
    this.data.shapeState = state;
    return this;
  }

  setLevel(level: number) {
    this.data.level = level;
    return this;
  }

  setLevelState(levelState: number) {
    this.data.levelState = levelState;
    return this;
  }

  setMod(mod: number) {
    this.data.mod = mod;
    return this;
  }

  clear() {
    this.data.id = "dve_air";
    this.data.secondaryVoxelId = "dve_air";
    this.data.level = 0;
    this.data.levelState = 0;
    this.data.shapeState = 0;
    this.data.mod = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  setRaw(data: RawVoxelData) {
    this._dt.loadInRaw(data);
    this.data.id = this._dt.getStringId();
    this.data.shapeState = this._dt.getShapeState();
    this.data.levelState = this._dt.getLevelState();
    this.data.level = this._dt.getLevel();
    this._dt.setSecondary(true);
    if (this._dt.data.secondaryId >= 2) {
      this.data.secondaryVoxelId = this._dt.getStringId();
    }
    this._dt.setSecondary(false);
    this.data.mod = this._dt.getMod();
    return this;
  }

  getRaw() {
    this._dt.setId(VoxelPalette.ids.getNumberId(this.data.id));
    this._dt
      .setSecondary(true)
      .setId(VoxelPalette.ids.getNumberId(this.data.secondaryVoxelId))
      .setSecondary(false);

    this._dt.setLevel(this.data.level);
    this._dt.setLevelState(this.data.levelState);
    this._dt.setShapeState(this.data.shapeState);
    this._dt.data.raw[3] == -1 ? (this._dt.data.raw[3] = 0) : false;
    this._dt.data.raw[4] = this.data.mod;
    return this._dt.data.raw;
  }

  getData() {
    return this.data;
  }

  paint() {
    this._worldPainter.dimenion = this.dimension;
    this._worldPainter.data = this.data;
    this._worldPainter.paintVoxel(this.x, this.y, this.z);
    return this;
  }

  erase() {
    this._worldPainter.dimenion = this.dimension;
    this._worldPainter.eraseVoxel(this.x, this.y, this.z);
    return this;
  }

  start() {
    WorldRegister.instance.cache.enable();
    return this;
  }

  stop() {
    WorldRegister.instance.cache.disable();
    return this;
  }
}
