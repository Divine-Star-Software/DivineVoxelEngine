import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { ArchivedVoxelTemplateData } from "./ArchivedVoxelTemplate.types";
import type { RawVoxelData } from "../../Voxels/Types/Voxel.types";
import { NumberPalette } from "../../Util/NumberPalette";
import { NibbleArray } from "@amodx/binary/Arrays/NibbleArray";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";
import { BinaryBuffer } from "../../Util/Binary/BinaryBuffer";
import { VoxelPaletteArchiveReader } from "../../Voxels/Archive/VoxelPaletteArchiveReader";

type TemplateCursor = { position: Vec3Array; raw: RawVoxelData };

export class ArchivedVoxelTemplate implements IVoxelTemplate {
  index = Flat3DIndex.GetXZYOrder();
  bounds: Vec3Array;
  ids: BinaryBuffer;
  level: BinaryBuffer;
  secondary: BinaryBuffer;

  voxelPalette: VoxelPaletteArchiveReader;

  levelPalette: NumberPalette;
  secondaryPalette: NumberPalette;

  constructor(private _data: ArchivedVoxelTemplateData) {
    this.bounds = [..._data.bounds];
    this.index.setBounds(..._data.bounds);

    this.voxelPalette = new VoxelPaletteArchiveReader(_data.palettes);
    this.levelPalette = new NumberPalette(_data.palettes.level);
    this.secondaryPalette = new NumberPalette(_data.palettes.secondary);

    this.ids = BinaryBuffer.GetBuffer(_data.buffers.ids);
    this.level = BinaryBuffer.GetBuffer(_data.buffers.level);
    this.secondary = BinaryBuffer.GetBuffer(_data.buffers.secondary);
  }

  isAir(index: number) {
    return this.getId(index) === 0;
  }
  isIncluded(index: number) {
    return true;
  }
  getIndex(x: number, y: number, z: number) {
    return this.index.getIndexXYZ(x, y, z);
  }

  getId(index: number) {
    return VoxelPalettesRegister.getVoxelIdFromString(
      ...this.voxelPalette.getVoxelData(this.ids.getValue(index))
    );
  }

  getLevel(index: number) {
    return this.levelPalette.getValue(this.level.getValue(index));
  }

  getLight(index: number): number {
    return 0;
  }

  getSecondary(index: number) {
    const id = this.getId(index);
    const trueId = VoxelPalettesRegister.voxels[id][0];
    if (VoxelTagsRegister.VoxelTags[trueId]["dve_can_have_secondary"]) {
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.voxelPalette.getVoxelData(
          this.secondaryPalette.getValue(this.secondary.getValue(index))
        )
      );
    }

    return 0;
  }

  *traverse(
    curosr: TemplateCursor = {
      position: [0, 0, 0],
      raw: [0, 0, 0, 0],
    }
  ): Generator<TemplateCursor> {
    for (let x = 0; x < this.bounds[0]; x++) {
      for (let y = 0; y < this.bounds[1]; y++) {
        for (let z = 0; z < this.bounds[2]; z++) {
          curosr.position[0] = x;
          curosr.position[1] = y;
          curosr.position[2] = z;
          const vindex = this.index.getIndexXYZ(x, y, z);
          curosr.raw[0] = this.getId(vindex);
          curosr.raw[1] = 0;
          curosr.raw[2] = this.getLevel(vindex);
          curosr.raw[3] = this.getSecondary(vindex);
          if (curosr.raw[0] < 1 && curosr.raw[3] < 1) continue;
          yield curosr;
        }
      }
    }
  }

  getRaw(index: number, rawRef: RawVoxelData = [0, 0, 0, 0]): RawVoxelData {
    rawRef[0] = this.getId(index);
    rawRef[1] = this.getLight(index);
    rawRef[2] = this.getLevel(index);
    rawRef[3] = this.getSecondary(index);
    return rawRef;
  }

  toJSON(): ArchivedVoxelTemplateData {
    return this._data;
  }
}
