import { CardinalNeighbors3D } from "../../../Math/CardinalNeighbors.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";

import { VoxelUpdateTask } from "../../VoxelUpdateTask.js";
import { WorldCursor } from "../../../World/index.js";

export class FlowManager {
  static _brush = new BrushTool();
  static _sDataTool = new WorldCursor();
  static _nDataTool = new WorldCursor();

  static setVoxel(
    tasks: VoxelUpdateTask,
    vox: string,
    level: number,
    levelState: number,
    x: number,
    y: number,
    z: number
  ) {
    /*    this.sunCheck(tasks, x, y, z);
    SunRemove(tasks);
    this._brush.setId(vox).setXYZ(x, y, z).paint();
    this._sDataTool.loadInAt(x, y, z);
    this._sDataTool
      .setLevel(level)
      .setLevelState(levelState)
      .setLight(this.getAbsorbLight(x, y, z))
      .commit();

    SunUpdate(tasks); */
  }

  static setDimension(dimension: string) {
    // this._sDataTool.setDimension(dimension);
    //  this._nDataTool.setDimension(dimension);
    //   this._brush.setDimension(dimension);
    // IlluminationManager.setDimension(dimension);
  }

  static removeVoxel(tasks: VoxelUpdateTask, x: number, y: number, z: number) {
    /*     for (const n of $3dCardinalNeighbors) {
      const nx = x + n[0];
      const ny = y + n[1];
      const nz = z + n[2];
      if (!this._nDataTool.loadInAt(nx, ny, nz)) continue;

      const l = this._nDataTool.getLight();

      if (l <= 0) continue;

      if (this.lightData.getS(l) > 0) {
        tasks.sun.update.push(nx, ny, nz);
      }

      if (this.lightData.hasRGBLight(l)) {
        tasks.rgb.update.push(nx, ny, nz);
      }
    }
    this._nDataTool.loadInAt(x, y, z);
    const currentLight = this._nDataTool.getLight();
    this._brush.setXYZ(x, y, z).erase();
    this._nDataTool.clear().loadInAt(x, y, z);
    this._nDataTool.setLight(currentLight).commit();
    tasks.rgb.remove.push(x, y, z);
    RGBRemove(tasks);
    SunUpdate(tasks);
    RGBUpdate(tasks); */
  }

  static getFlowRate(substance: string) {
    //  this._substanceTool.setSubstanceFromString(substance);
    //  return this._substanceTool.getFlowRate();
    return 0;
  }

  static getVoxel(x: number, y: number, z: number) {
    /*    if (!this._sDataTool.loadInAt(x, y, z)) return false;
    if (!this._sDataTool.isRenderable()) return false;

    const substance = this._sDataTool.getSubstnaceData();
    if (!substance.isLiquid()) return false; */
    return this._sDataTool;
  }

  static setLevel(level: number, x: number, y: number, z: number) {
    //   this._nDataTool.loadInAt(x, y, z);
    //   this._nDataTool.setLevel(level).commit();
  }

  static getLevel(vox: string, x: number, y: number, z: number) {
    /*    if (!this._nDataTool.loadInAt(x, y, z)) return -2;
    const voxel = this._nDataTool.getStringId();
    if (this._nDataTool.isAir()) {
      return 0;
    }
    if (voxel == vox) {
      return this._nDataTool.getLevel();
    }
    return -1; */
  }

  static getLevelState(vox: string, x: number, y: number, z: number) {
    /*     if (!this._nDataTool.loadInAt(x, y, z)) return -2;
    const voxel = this._nDataTool.getStringId();
    if (voxel == vox) {
      return this._nDataTool.getLevelState();
    }
    if (this._nDataTool.isAir()) {
      return -1;
    }
    return -3; */
  }

  static canFlowOutwardTest(vox: string, x: number, y: number, z: number) {
    /*    const level = this.getLevel(vox, x, y - 1, z);
    if (level == -1) {
      return true;
    }
    return false; */
  }

  static flowDownTest(vox: string, x: number, y: number, z: number) {
    /*     const level = this.getLevel(vox, x, y - 1, z);
    if (level >= 0) {
      return true;
    }
    return false; */
  }

  static wait(ms: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }

  static _lightValues: [s: number, r: number, g: number, b: number] = [
    0, 0, 0, 0,
  ];
  static getAbsorbLight(x: number, y: number, z: number) {
    /*     for (const n of $3dCardinalNeighbors) {
      if (!n[0] && !n[1] && !n[2]) continue;
      if (!this._nDataTool.loadInAt(x + n[0], y + n[1], z + n[2])) continue;
      let l = this._nDataTool.getLight();
      if (l <= 0) continue;
      const v = this.lightData.getLightValues(l);
      for (let i = 0; i < 4; i++) {
        if (this._lightValues[i] < v[i]) {
          this._lightValues[i] = v[i];
        }
      }
    }
    let brightest = this.lightData.setLightValues(this._lightValues);
    for (let i = 0; i < 4; i++) {
      this._lightValues[i] = 0;
    } */
    // return this.lightData.minusOneForAll(2);
  }

  static sunCheck(tasks: VoxelUpdateTask, x: number, y: number, z: number) {
    /*     if (!this._nDataTool.loadInAt(x, y - 1, z)) return;
    if (!this._nDataTool.isAir()) return;
    const l = this._nDataTool.getLight();
    if (this.lightData.getS(l) == 0xf) {
      tasks.sun.remove.push(x, y - 1, z);
    } */
  }
}
