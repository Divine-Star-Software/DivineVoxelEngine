import type {
  PaintVoxelData,
  RawVoxelData,
} from "../../Voxels/Types/Voxel.types.js";
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { VoxelCursor } from "../../Voxels/Cursor/VoxelCursor.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister.js";
const airId = "dve_air";
const air: RawVoxelData = [0, 0, 0, 0, 0, 0];

export class BrushTool {
  data: PaintVoxelData = {
    id: airId,
    name: "",
    state: 0,
    secondaryVoxelId: "",
    secondaryVoxeName: "",
    level: 0,
    levelState: 0,
    mod: 0,
  };

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
    if (data.secondaryVoxeName) {
      this.setSecondaryName(data.secondaryVoxeName);
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
      this.data.secondaryVoxeName =
        VoxelPalettesRegister.voxelIdToNameMap.get(id)!;
    } else {
      this.data.secondaryVoxeName = "";
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

    this.data.secondaryVoxeName = name;
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
  _debug = false;

  _paint() {
    if (!this.dataCursor.inBounds(this.x, this.y, this.z)) return false;

    const voxel = this.dataCursor.getVoxel(this.x, this.y, this.z);
    if (!voxel) return;
    const id = VoxelPalettesRegister.voxels.getNumberId(this.data.id);
    if (id < 0) return false;
    voxel.setId(id);

    if (this._debug) {
      console.warn(this.x, this.y, this.z, this.data.state);
    }

    voxel.setState(this.data.state);

    voxel.setLevel(this.data.level);

    voxel.setMod(this.data.mod);

    if (this.data.secondaryVoxelId) {
      const vid = VoxelPalettesRegister.voxels.getNumberId(
        this.data.secondaryVoxelId
      );
      if (vid > 0) {
        voxel.setSecondary(true);
        voxel.setId(vid);
        voxel.setSecondary(false);
      }
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
    voxel.copyRaw(air).updateVoxel(1);
  }

  paint() {
    this._paint();
    return this;
  }

  erase() {
    this._erase();
    return this;
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
