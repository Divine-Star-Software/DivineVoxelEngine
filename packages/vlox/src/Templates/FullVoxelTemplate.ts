import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { FullVoxelTemplateData } from "./VoxelTemplates.types";

export class FullVoxelTemplate {
  static CreateNew(size: Vec3Array, baseLightValue = 0): FullVoxelTemplateData {
    const voxelSize = size[0] * size[1] * size[2];
    const sectionBuffer = new SharedArrayBuffer(
      //ids
      voxelSize * 2 +
        //light
        voxelSize * 2 +
        //state
        voxelSize * 2 +
        //mod
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
    bufferStart += voxelSize * 2;
    const secondary = new Uint16Array(sectionBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;

    const level = new Uint8Array(sectionBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize;
    return {
      size,
      ids,
      light,
      level,
      secondary,
    };
  }
  index = Flat3DIndex.GetXZYOrder();
  size: Vec3Array;
  ids: Uint16Array;
  level: Uint8Array;
  state: Uint16Array;
  light: Uint16Array;
  mod: Uint16Array;
  secondary: Uint16Array;
  constructor(data: FullVoxelTemplateData) {
    this.size = [...data.size];
    this.index.setBounds(...data.size);
    this.ids = data.ids;
    this.level = data.level;
    this.light = data.light;
    this.secondary = data.secondary;
  }
}
