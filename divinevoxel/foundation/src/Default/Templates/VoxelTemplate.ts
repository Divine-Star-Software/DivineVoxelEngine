import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { VoxelTemplateData } from "./VoxelTemplates.types";
import { RawVoxelData } from "@divinevoxel/core";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { NumberPalette } from "@divinevoxel/core/Interfaces/Data/NumberPalette";
import { VoxelPaletteReader } from "@divinevoxel/core/Data/Voxel/VoxelPalette";

type TemplateCursor = { position: Vec3Array; raw: RawVoxelData };

export class VoxelTemplate {
  index = Flat3DIndex.GetXZYOrder();
  palette = new StringPalette();
  statePalette = new NumberPalette();
  constructor(public data: VoxelTemplateData) {
    this.index.setBounds(...this.data.size);
    data.palette.forEach((_) => this.palette.register(_));
    data.statePalette.forEach((_) => this.statePalette.register(_));
  }

  *traverse(): Generator<TemplateCursor> {
    const end = this.data.size;

    const raw: RawVoxelData = [0, 0, 0, 0];

    const curosr: TemplateCursor = {
      position: [0, 0, 0],
      raw,
    };

    for (const { x, y, z } of Traverse.FromToVec3(
      [0, 0, 0],
      [end[0] - 1, end[1] - 1, end[2] - 1],
      1
    )) {
      const vindex = this.index.getIndexXYZ(x, y, z);
      curosr.position[0] = x;
      curosr.position[1] = y;
      curosr.position[2] = z;
      raw[0] = VoxelPaletteReader.id.numberFromString(
        this.palette.getStringId(this.data.voxels.ids[vindex])
      )!;
      raw[1] = 0;
      raw[2] = this.statePalette.getValue(this.data.voxels.state[vindex]);
      raw[3] = VoxelPaletteReader.id.numberFromString(
        this.palette.getStringId(this.data.voxels.secondary[vindex])
      )!;
      if (raw[0] < 1 && raw[3] < 1) continue;

      yield curosr;
    }
  }

  toJSON(): VoxelTemplateData {
    return {
      size: this.data.size,
      palette: this.data.palette,
      statePalette: this.data.statePalette,
      voxels: this.data.voxels,
    };
  }
}
