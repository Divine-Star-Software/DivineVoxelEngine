import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { ArchivedVoxelTemplateData } from "./ArchivedVoxelTemplate.types";
import type { RawVoxelData } from "../../Voxels/Types/Voxel.types";
import { StringPalette } from "../../Util/StringPalette";
import { NumberPalette } from "../../Util/NumberPalette";

import { getPaletteArray } from "../../Util/Binary/Palettes";
import { NibbleArray } from "@amodx/binary/Arrays/NibbleArray";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";

type TemplateCursor = { position: Vec3Array; raw: RawVoxelData };

export class ArchivedVoxelTemplate implements IVoxelTemplate {
  index = Flat3DIndex.GetXZYOrder();
  bounds: Vec3Array;
  ids: Uint8Array | Uint16Array | number;
  level: Uint8Array | number;
  secondary: Uint8Array | Uint16Array | number;
  idPalette: StringPalette;
  levelPalette: NumberPalette;
  secondaryIdPalette: StringPalette;
  secondaryStatePalette: NumberPalette;
  constructor(data: ArchivedVoxelTemplateData) {
    this.bounds = [...data.bounds];
    this.index.setBounds(...data.bounds);

    this.idPalette = new StringPalette(data.palettes.id);
    this.levelPalette = new NumberPalette(data.palettes.level);
    this.secondaryIdPalette = new StringPalette(data.palettes.secondaryId);
    this.secondaryStatePalette = new NumberPalette(
      data.palettes.secondaryState
    );

    typeof data.buffers.ids == "object"
      ? (this.ids = getPaletteArray(
          data.palettes.id.length,
          data.buffers.ids as any
        ) as any)
      : (this.ids = data.buffers.ids);

    typeof data.buffers.level == "object"
      ? (this.level = getPaletteArray(
          data.palettes.level.length,
          data.buffers.level as any
        ) as any)
      : (this.level = data.buffers.level);

    typeof data.buffers.secondary == "object"
      ? (this.secondary = getPaletteArray(
          Math.max(
            data.palettes.secondaryState.length,
            data.palettes.secondaryId.length
          ),
          data.buffers.secondary as any
        ) as any)
      : (this.secondary = data.buffers.secondary);
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
    const ids = this.ids;
    return VoxelPalettesRegister.voxelIds.getNumberId(
      this.idPalette.getStringId(typeof ids == "number" ? ids : ids[index])
    )!;
  }

  getLevel(index: number) {
    const level = this.level;
    return this.levelPalette.getValue(
      typeof level == "number" ? level : level[index]
    );
  }

  getLight(index: number): number {
    return 0;
  }

  getSecondary(index: number) {
    const secondary = this.secondary;
    const id = this.getId(index);

    if (VoxelTagsRegister.VoxelTags[id]["dve_can_have_secondary"]) {
      return VoxelPalettesRegister.voxelIds.getNumberId(
        this.secondaryIdPalette.getStringId(
          typeof secondary == "number" ? secondary : secondary[index]
        )
      )!;
    }

    return this.secondaryStatePalette.getValue(
      typeof secondary == "number" ? secondary : secondary[index]
    );
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
    return {
      type: "archived",
      templatorVersion: 0,
      version: 0,
      bounds: this.bounds,
      palettes: {
        id: this.idPalette._palette,
        level: Uint8Array.from(this.levelPalette._palette),
        secondaryId: this.secondaryIdPalette._palette,
        secondaryState: Uint16Array.from(this.secondaryStatePalette._palette),
      },
      buffers: {
        ids:
          this.ids instanceof Uint16Array ||
          this.ids instanceof Uint8Array ||
          typeof this.ids == "number"
            ? this.ids
            : new Uint8Array((this.ids as NibbleArray).buffer),
        level:
          this.level instanceof Uint8Array || typeof this.level == "number"
            ? this.level
            : new Uint8Array((this.level as NibbleArray).buffer),
        secondary:
          this.secondary instanceof Uint16Array ||
          this.secondary instanceof Uint8Array ||
          typeof this.secondary == "number"
            ? this.secondary
            : new Uint8Array((this.secondary as NibbleArray).buffer),
      },
    };
  }
}
