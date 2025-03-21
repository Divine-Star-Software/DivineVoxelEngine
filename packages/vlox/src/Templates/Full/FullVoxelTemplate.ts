import { Flat3DIndex, Vec3Array, Vector3Like } from "@amodx/math";
import { IVoxelTemplate } from "../VoxelTemplates.types";
import { FullVoxelTemplateData } from "./FullVoxelTemplate.types";
import { RawVoxelData } from "../../Voxels/Types/Voxel.types";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";
import { getBitArrayIndex } from "../../Util/Binary/BinaryArrays";

export class FullVoxelTemplate implements IVoxelTemplate {
  static CreateNew(
    bounds: Vec3Array,
    baseLightValue = 0
  ): FullVoxelTemplateData {
    const voxelSize = bounds[0] * bounds[1] * bounds[2];
    const sectionBuffer = new SharedArrayBuffer(
      //ids
      voxelSize * 2 +
        //light
        voxelSize * 2 +
        //secondary
        voxelSize * 2 +
        //level
        voxelSize
    );
    let bufferStart = 0;

    const ids = new Uint16Array(sectionBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    const light = new Uint16Array(sectionBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    if (baseLightValue) light.fill(baseLightValue);
    const secondary = new Uint16Array(sectionBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;

    const level = new Uint8Array(sectionBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize;
    return {
      type: "full",
      bounds,
      ids,
      light,
      level,
      secondary,
    };
  }

  static CreateNewFromArea(
    dataCursor: DataCursorInterface,
    start: Vector3Like,
    end: Vector3Like,
    storeLight = false
  ) {
    const { x: sx, y: sy, z: sz } = start;
    const { x: ex, y: ey, z: ez } = end;
    const template = FullVoxelTemplate.CreateNew([ex - sx, ey - sy, ez - sz]);
    const index = Flat3DIndex.GetXZYOrder();
    index.setBounds(...template.bounds);

    for (let x = sx; x < ex; x++) {
      for (let y = sy; y < ey; y++) {
        for (let z = sz; z < ez; z++) {
          if (!dataCursor.inBounds(x, y, z)) continue;
          const voxel = dataCursor.getVoxel(x, y, z);

          if (!voxel) continue;
          const vIndex = index.getIndexXYZ(x - sx, y - sy, z - sz);

          template.ids[vIndex] = voxel.ids[voxel._index];

          template.level[vIndex] = voxel.level[voxel._index];
          template.secondary[vIndex] = voxel.secondary[voxel._index];
          if (storeLight) template.light[vIndex] = voxel.light[voxel._index];
        }
      }
    }

    return template;
  }

  index = Flat3DIndex.GetXZYOrder();
  bounds: Vec3Array;
  ids: Uint16Array;
  level: Uint8Array;
  light: Uint16Array;
  secondary: Uint16Array;

  mask?: Uint8Array;

  constructor(data: FullVoxelTemplateData) {
    this.bounds = [...data.bounds];
    this.index.setBounds(...data.bounds);
    this.ids = data.ids;
    this.level = data.level;
    this.light = data.light;
    this.secondary = data.secondary;
    if (data.mask) this.mask = data.mask;
  }
  isAir(index: number) {
    return this.ids[index] === 0;
  }
  isIncluded(index: number) {
    if (this.mask) {
      return getBitArrayIndex(this.mask, index) === 1;
    }

    return true;
  }
  getIndex(x: number, y: number, z: number): number {
    return this.index.getIndexXYZ(x, y, z);
  }
  getId(index: number): number {
    return this.ids[index];
  }
  getLight(index: number): number {
    return this.light[index];
  }
  getLevel(index: number): number {
    return this.level[index];
  }
  getSecondary(index: number): number {
    return this.secondary[index];
  }

  getRaw(index: number, rawRef: RawVoxelData = [0, 0, 0, 0]): RawVoxelData {
    rawRef[0] = this.getId(index);
    rawRef[1] = this.getLight(index);
    rawRef[2] = this.getLevel(index);
    rawRef[3] = this.getSecondary(index);
    return rawRef;
  }

  toJSON(): FullVoxelTemplateData {
    return {
      type: "full",
      bounds: this.bounds,
      ids: this.ids,
      light: this.light,
      level: this.level,
      secondary: this.secondary,
      ...(this.mask ? { mask: this.mask } : {}),
    };
  }
}
