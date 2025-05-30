import type { RawVoxelData } from "../../Voxels/Types/Voxel.types.js";
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { VoxelCursor } from "../../Voxels/Cursor/VoxelCursor.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister.js";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types.js";
import { PaintVoxelData } from "../../Voxels/Types/PaintVoxelData.js";
import { VoxelPathData } from "../../Templates/Path/VoxelPath.types.js";
const air: RawVoxelData = [0, 0, 0, 0];
const temp: RawVoxelData = [0, 0, 0, 0];
export class BrushTool {
  data = PaintVoxelData.Create();

  dimension = 0;
  x = 0;
  y = 0;
  z = 0;

  voxelCursor = new VoxelCursor();
  dataCursor = new WorldCursor();
  setXYZ(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  newSector() {
    WorldRegister.sectors.new(this.dimension, this.x, this.y, this.z);
  }

  setData(data: Partial<PaintVoxelData>) {
    this.clear();
    if (data.name) {
      this.setName(data.name);
    } else {
      if (data.id) this.setId(data.id);
    }
    if (data.secondaryName) {
      this.setSecondaryName(data.secondaryName);
    } else {
      if (data.secondaryVoxelId) this.setSecondaryId(data.secondaryVoxelId);
    }

    this.data.state = data.state ? data.state : 0;
    this.data.level = data.level ? data.level : 0;
    this.data.levelState = data.levelState ? data.levelState : 0;
    this.data.mod = data.mod ? data.mod : 0;
    return this;
  }
  getData() {
    return this.data;
  }
  setRaw(data: RawVoxelData) {
    this.voxelCursor.setRaw(data).process();
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
    this.data.name = VoxelPalettesRegister.voxelIdToNameMap.get(id)!;
    return this;
  }

  setName(name: string) {
    this.data.id = VoxelPalettesRegister.voxelNametoIdMap.get(name)!;
    this.data.name = name;
    return this;
  }

  setSecondaryId(id: string) {
    this.data.secondaryVoxelId = id;
    if (id) {
      this.data.secondaryName = VoxelPalettesRegister.voxelIdToNameMap.get(id)!;
    } else {
      this.data.secondaryName = "";
    }

    return this;
  }
  setSecondaryName(name: string) {
    if (name) {
      this.data.secondaryVoxelId =
        VoxelPalettesRegister.voxelNametoIdMap.get(name)!;
    } else {
      this.data.secondaryVoxelId = "";
    }

    this.data.secondaryName = name;
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
    this.data.name = "";
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
    if (!this.data.id || this.data.id == "dve_air") return false;
    voxel.setStringId(this.data.id, this.data.state, this.data.mod);

    voxel.setLevel(this.data.level);

    if (this.data.secondaryVoxelId && this.data.secondaryVoxelId != "dve_air") {
      voxel.setSecondary(true);
      voxel.setStringId(this.data.secondaryVoxelId);
      voxel.setSecondary(false);
    }

    voxel.process();
    if (voxel.isLightSource() && voxel.getLightSourceValue()) {
      voxel.setLight(voxel.getLightSourceValue());
    }

    voxel.updateVoxel(0);
  }

  _erase() {
    const voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return;
    voxel.setRaw(air).updateVoxel(1);
  }

  paint() {
    this._paint();
    return this;
  }

  paintTemplate(voxelTemplate: IVoxelTemplate) {
    const { x: ox, y: oy, z: oz } = this;
    const { x: sx, y: sy, z: sz } = voxelTemplate.bounds.size;

    for (let x = 0; x < sx; x++) {
      for (let y = 0; y < sy; y++) {
        for (let z = 0; z < sz; z++) {
          const tx = ox + x;
          const ty = oy + y;
          const tz = oz + z;
          if (!this.dataCursor.inBounds(tx, ty, tz)) continue;
          if (voxelTemplate.isAir(voxelTemplate.getIndex(x, y, z))) continue;
          voxelTemplate.getRaw(voxelTemplate.getIndex(x, y, z), temp);
          this.setRaw(temp);
          this.setXYZ(tx, ty, tz).paint();
        }
      }
    }
  }

  paintPath(data: VoxelPathData) {
    throw new Error("Paint path not implemented.");
  }

  erase() {
    this._erase();
    return this;
  }

  eraseTemplate(voxelTemplate: IVoxelTemplate) {
    const { x: ox, y: oy, z: oz } = this;
    const { x: sx, y: sy, z: sz } = voxelTemplate.bounds.size;

    for (let x = 0; x < sx; x++) {
      for (let y = 0; y < sy; y++) {
        for (let z = 0; z < sz; z++) {
          const tx = ox + x;
          const ty = oy + y;
          const tz = oz + z;
          if (!this.dataCursor.inBounds(tx, ty, tz)) continue;
          if (voxelTemplate.isAir(voxelTemplate.getIndex(x, y, z))) continue;
          this.setXYZ(x, y, z).erase();
        }
      }
    }
  }

  erasePath(data: VoxelPathData) {
    throw new Error("Erase path not implemented.");
  }

  start(dimension: number, x: number, y: number, z: number) {
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
