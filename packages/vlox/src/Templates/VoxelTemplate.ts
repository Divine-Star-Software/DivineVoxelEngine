import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { VoxelTemplateData } from "./VoxelTemplates.types";
import type { RawVoxelData } from "../Voxels/Types/Voxel.types";
import { StringPalette } from "../Util/StringPalette";
import { NumberPalette } from "../Util/NumberPalette";
import { VoxelPalette } from "../Voxels/Palettes/VoxelPalette";
import { VoxelStruct } from "../Voxels/Structs/VoxelStruct";
import { VoxelStructIds } from "../Voxels/Types/Voxel.types";
import { getPaletteArray } from "../Data/Functions/Palettes";
import { NibbleArray } from "@amodx/binary/Arrays/NibbleArray";

type TemplateCursor = { position: Vec3Array; raw: RawVoxelData };

export class VoxelTemplate {
  index = Flat3DIndex.GetXZYOrder();
  size: Vec3Array;
  ids: Uint8Array | Uint16Array | number;
  level: Uint8Array | number;
  state: Uint8Array | Uint16Array | number;
  mod: Uint8Array | Uint16Array | number;
  secondary: Uint8Array | Uint16Array | number;

  idPalette: StringPalette;
  levelPalette: NumberPalette;
  statePalette: NumberPalette;
  modPalette: NumberPalette;
  secondaryIdPalette: StringPalette;
  secondaryStatePalette: NumberPalette;
  constructor(data: VoxelTemplateData) {
    this.size = [...data.size];
    this.index.setBounds(...data.size);

    this.idPalette = new StringPalette(data.palettes.id);
    this.levelPalette = new NumberPalette(data.palettes.level);
    this.statePalette = new NumberPalette(data.palettes.state);
    this.modPalette = new NumberPalette(data.palettes.mod);
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

    typeof data.buffers.state == "object"
      ? (this.state = getPaletteArray(
          data.palettes.state.length,
          data.buffers.state as any
        ) as any)
      : (this.state = data.buffers.state);

    typeof data.buffers.mod == "object"
      ? (this.mod = getPaletteArray(
          data.palettes.mod.length,
          data.buffers.mod as any
        ) as any)
      : (this.mod = data.buffers.mod);

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

  getIndex(x: number, y: number, z: number) {
    return this.index.getIndexXYZ(x, y, z);
  }
  getId(index: number) {
    const ids = this.ids;
    return VoxelPalette.ids.getNumberId(
      this.idPalette.getStringId(typeof ids == "number" ? ids : ids[index])
    )!;
  }
  getState(index: number) {
    const state = this.state;
    return this.statePalette.getValue(
      typeof state == "number" ? state : state[index]
    );
  }
  getLevel(index: number) {
    const mod = this.mod;
    return this.modPalette.getValue(typeof mod == "number" ? mod : mod[index]);
  }
  getMod(index: number) {
    const mod = this.mod;
    return this.modPalette.getValue(typeof mod == "number" ? mod : mod[index]);
  }
  getSecondary(id: number, index: number) {
    const secondary = this.secondary;
    VoxelStruct.setVoxel(id);
    if (VoxelStruct.instance[VoxelStructIds.canHaveSecondary] == 1) {
      return VoxelPalette.ids.getNumberId(
        this.secondaryIdPalette.getStringId(
          typeof secondary == "number" ? secondary : secondary[index]
        )
      )!;
    }

    return this.secondaryStatePalette.getValue(
      typeof secondary == "number" ? secondary : secondary[index]
    );
  }
  *traverse(): Generator<TemplateCursor> {
    const end = this.size;

    const raw: RawVoxelData = [0, 0, 0, 0, 0, 0];

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
      raw[0] = this.getId(vindex);
      raw[1] = 0;
      raw[2] = this.getLevel(vindex);
      raw[3] = this.getState(vindex);
      raw[4] = this.getMod(vindex);
      raw[5] = this.getSecondary(raw[0], vindex);
      if (raw[0] < 1 && raw[3] < 1) continue;

      yield curosr;
    }
  }

  toJSON(): VoxelTemplateData {
    return {
      templatorVersion: 0,
      version: 0,
      size: this.size,
      palettes: {
        id: this.idPalette._palette,
        level: Uint8Array.from(this.statePalette._palette),
        state: Uint16Array.from(this.statePalette._palette),
        mod: Uint16Array.from(this.modPalette._palette),
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
        mod:
          this.mod instanceof Uint16Array ||
          this.mod instanceof Uint8Array ||
          typeof this.mod == "number"
            ? this.mod
            : new Uint8Array((this.mod as NibbleArray).buffer),
        state:
          this.state instanceof Uint16Array ||
          this.state instanceof Uint8Array ||
          typeof this.state == "number"
            ? this.state
            : new Uint8Array((this.state as NibbleArray).buffer),
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
