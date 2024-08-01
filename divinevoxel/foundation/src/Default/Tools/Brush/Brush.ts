import { DataTool } from "../../Tools/Data/DataTool.js";
import type { RawVoxelData } from "@divinevoxel/core/Types/Voxel.types.js";
import { WorldPainter } from "../../../Data/World/WorldPainter.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "@divinevoxel/core/Data/Voxel/VoxelPalette.js";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { AddVoxelData } from "../../../Data/Types/WorldData.types.js";
const air = "dve_air";

export class BrushTool extends LocationBoundTool {
  data: AddVoxelData = {
    id: air,
    shapeState: 0,
    secondaryVoxelId: air,
    level: 0,
    levelState: 0,
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
    return this;
  }

  setId(id: string) {
    this.data.id = id;
    return this;
  }

  setName(name: string) {
    this.data.id = VoxelPaletteReader.name.getId(name);
    this.name = name;
    return this;
  }

  setDimension(dimensionId: string) {
    this.location[0] = dimensionId;
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
  clear() {
    this.data.id = "dve_air";
    this.data.secondaryVoxelId = "dve_air";
    this.data.level = 0;
    this.data.levelState = 0;
    this.data.shapeState = 0;
    this.location[1] = 0;
    this.location[2] = 0;
    this.location[3] = 0;
  }

  setRaw(data: RawVoxelData) {
    this._dt.loadInRaw(data);
    this.data.id = this._dt.getStringId();
    this.data.shapeState = this._dt.getShapeState();
    this._dt.setSecondary(true);
    if (this._dt.data.secondaryId >= 2) {
      this.data.secondaryVoxelId = this._dt.getStringId();
    }
    this._dt.setSecondary(false);
    return this;
  }

  getRaw() {
    this._dt.setId(VoxelPaletteReader.id.getPaletteId(this.data.id));
    this._dt
      .setSecondary(true)
      .setId(VoxelPaletteReader.id.getPaletteId(this.data.secondaryVoxelId))
      .setSecondary(false);

    this._dt.setLevel(this.data.level);
    this._dt.setLevelState(this.data.levelState);
    this._dt.setShapeState(this.data.shapeState);
    this._dt.data.raw[3] == -1 ? (this._dt.data.raw[3] = 0) : false;
    return this._dt.data.raw;
  }

  getData() {
    return this.data;
  }

  paint() {
    this._worldPainter.paintVoxel(this.location, this.data);
    return this;
  }

  erase() {
    this._worldPainter.eraseVoxel(this.location);
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
