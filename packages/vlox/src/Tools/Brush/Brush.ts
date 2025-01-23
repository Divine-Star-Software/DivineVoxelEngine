import type { RawVoxelData } from "../../Voxels/Voxel.types.js";
import { VoxelPalette } from "../../Data/Palettes/VoxelPalette.js";
import { PaintVoxelData } from "../../Data/Types/WorldData.types.js";
import { WorldCursor } from "../../Data/Cursor/World/WorldCursor.js";
import { VoxelCursor } from "../../Data/Cursor/VoxelCursor.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
const airId = "dve_air";

const air: RawVoxelData = [0, 0, 0, 0, 0];

export class BrushTool {
  data: PaintVoxelData = {
    id: airId,
    shapeState: 0,
    secondaryVoxelId: airId,
    level: 0,
    levelState: 0,
    mod: 0,
  };

  dimension: string;
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

  setData(data: Partial<PaintVoxelData>) {
    this.data.id = data.id ? data.id : airId;
    this.data.shapeState = data.shapeState ? data.shapeState : 0;
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
    this.data.shapeState = this.voxelCursor.getShapeState();
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
   return VoxelCursor.VoxelDataToRaw(this.data)
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





  _paint() {
    const voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return;
    const id = VoxelPalette.ids.getNumberId(this.data.id);
    if (id < 0) return false;
    voxel.setId(id);

    voxel.setShapeState(this.data.shapeState ? this.data.shapeState : 0);

    const substance = voxel.getSubstance();
    if (
      substance > -1 && !voxel.isAir()
        ? this.substanceData.setSubstance(voxel.getSubstance()).isLiquid()
        : false
    ) {
      voxel.setLevel(7);
    }
    voxel.setMod(this.data.mod);

    if (
      this.data.secondaryVoxelId &&
      this.data.secondaryVoxelId != "dve_air" &&
      voxel.canHaveSecondaryVoxel()
    ) {
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
