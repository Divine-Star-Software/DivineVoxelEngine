import type {
  PaintVoxelData,
  RawVoxelData,
} from "../../Voxels/Types/Voxel.types.js";
import { VoxelPalette } from "../../Voxels/Palettes/VoxelPalette.js";
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { VoxelCursor } from "../../Voxels/Cursor/VoxelCursor.js";
import { WorldRegister } from "../../World/WorldRegister.js";
const airId = "dve_air";
const air: RawVoxelData = [0, 0, 0, 0, 0, 0];

export class BrushTool {
  data: PaintVoxelData = {
    id: airId,
    state: 0,
    secondaryVoxelId: "",
    level: 0,
    levelState: 0,
    mod: 0,
  };

  dimension = "main";
  x = 0;
  y = 0;
  z = 0;
  name = airId;

  voxelCursor = new VoxelCursor();
  dataCursor = new WorldCursor();
  substanceData = new SubstanceDataTool();
  setXYZ(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  newSector() {
    WorldRegister.setDimension(this.dimension);
    WorldRegister.sectors.new(this.x, this.y, this.z);
  }

  setData(data: Partial<PaintVoxelData>) {
    this.data.id = data.id ? data.id : airId;
    this.data.state = data.state ? data.state : 0;
    this.data.secondaryVoxelId = data.secondaryVoxelId
      ? data.secondaryVoxelId
      : airId;
    this.data.level = data.level ? data.level : 0;
    this.data.levelState = data.levelState ? data.levelState : 0;
    this.data.mod = data.mod ? data.mod : 0;
    return this;
  }
  getData() {
    return this.data;
  }
  setRaw(data: RawVoxelData) {
    this.voxelCursor.copyRaw(data).process();
    this.data.id = this.voxelCursor.getStringId();
    this.data.state = this.voxelCursor.getState();
    this.data.levelState = this.voxelCursor.getLevelState();
    this.data.level = this.voxelCursor.getLevel();
    this.voxelCursor.setSecondary(true);
    if (this.voxelCursor.secondaryId >= 2) {
      this.data.secondaryVoxelId = this.voxelCursor.getStringId();
    }
    this.voxelCursor.setSecondary(false);
    this.data.mod = this.voxelCursor.getMod();
    return this;
  }

  getRaw() {
    return VoxelCursor.VoxelDataToRaw(this.data);
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

  setSecondaryId(id: string) {
    this.data.secondaryVoxelId = id;
    return this;
  }

  setShapeState(state: number) {
    this.data.state = state;
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
    this.data.secondaryVoxelId = "";
    this.data.level = 0;
    this.data.levelState = 0;
    this.data.state = 0;
    this.data.mod = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  _paint() {
    if (!this.dataCursor.inBounds(this.x, this.y, this.z)) return false;

    const voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return;
    const id = VoxelPalette.ids.getNumberId(this.data.id);
    if (id < 0) return false;
    voxel.setId(id);

    voxel.setState(this.data.state ? this.data.state : 0);

    voxel.setLevel(this.data.level);

    voxel.setMod(this.data.mod);

    if (this.data.secondaryVoxelId) {
      const vid = VoxelPalette.ids.getNumberId(this.data.secondaryVoxelId);
      if (vid > 0) {
        voxel.setSecondary(true);
        voxel.setId(vid);
        voxel.setSecondary(false);
      }
    }

    if (voxel.isLightSource() && voxel.getLightSourceValue()) {
      voxel.setLight(voxel.getLightSourceValue());
    }

    /*    if (this.voxelCursor.isRich()) {
      DataHooks.paint.onRichVoxelPaint.notify([
        this.voxelCursor.getStringId(),
        [this.dimenion, x, y, z],
      ]);
    } */

    voxel.updateHeightMap(0);
  }
  _erase() {
    const voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return;
    voxel.copyRaw(air).updateHeightMap(1);
  }

  paint() {
    this._paint();
    return this;
  }

  erase() {
    this._erase();
    return this;
  }

  start(dimension: string, x: number, y: number, z: number) {
    this.dataCursor.setFocalPoint(dimension, x, y, z);
    this.dimension = dimension;
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  stop() {
    return this;
  }
}
