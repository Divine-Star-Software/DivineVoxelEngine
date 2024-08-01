import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { DataTool } from "../Tools/Data/DataTool";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { VoxelTemplate } from "./VoxelTemplate";
import { VoxelTemplateBuffers } from "./VoxelTemplates.types";
import { NumberPalette } from "@divinevoxel/core/Interfaces/Data/NumberPalette";

export class VoxelTemplator {
  private static dataTool = new DataTool();
  private static index = Flat3DIndex.GetXZYOrder();

  static createTemplate(dimension: string, start: Vec3Array, end: Vec3Array) {
    const [sx, sy, sz] = [
      end[0] - start[0],
      end[1] - start[1],
      end[2] - start[2],
    ];
    this.index.setBounds(sx, sy, sz);

    const palette = new StringPalette();
    const statePalette = new NumberPalette();

    palette.register("dve_air");
    palette.register("dve_barrier");

    const ids: number[] = new Array(this.index.size);
    const state: number[] = new Array(this.index.size);
    const secondary: number[] = new Array(this.index.size);

    this.dataTool.setDimension(dimension);

    for (const { x, y, z } of Traverse.FromToVec3(
      start,
      [end[0] - 1, end[1] - 1, end[2] - 1],
      1
    )) {
      if (!this.dataTool.loadInAt(x, y, z)) continue;

      const vindex = this.index.getIndexXYZ(
        x - start[0],
        y - start[1],
        z - start[2]
      );
      const raw = this.dataTool.getRaw();

      const stringId = this.dataTool.getStringId();
      const stateId = !statePalette.isRegistered(raw[2])
        ? statePalette.register(raw[2])
        : statePalette.getId(raw[2]);

      if (!palette.isRegistered(stringId)) palette.register(stringId);

      this.dataTool.setSecondary(true);
      let secondaryId = this.dataTool.hasSecondaryVoxel()
        ? this.dataTool.getStringId()
        : "dve_air";
      this.dataTool.setSecondary(false);

      ids[vindex] = palette.getNumberId(stringId);
      state[vindex] = stateId;
      secondary[vindex] = palette.getNumberId(secondaryId);
    }

    let use16bitForIds = false;
    let use16bitForState = false;

    if (palette._count > 255) use16bitForIds = true;
    if (statePalette._count > 255) use16bitForState = true;

    const idsBuffer = use16bitForIds
      ? new Uint16Array(new SharedArrayBuffer(this.index.size * 2))
      : new Uint8Array(new SharedArrayBuffer(this.index.size));
    const stateBuffer = use16bitForState
      ? new Uint16Array(new SharedArrayBuffer(this.index.size * 2))
      : new Uint8Array(new SharedArrayBuffer(this.index.size));
    const secondaryBuffer = use16bitForIds
      ? new Uint16Array(new SharedArrayBuffer(this.index.size * 2))
      : new Uint8Array(new SharedArrayBuffer(this.index.size));
    let i = ids.length;
    while (i--) {
      idsBuffer[i] = ids[i];
      stateBuffer[i] = state[i];
      secondaryBuffer[i] = secondary[i];
    }

    const buffers: VoxelTemplateBuffers = {
      ids: idsBuffer,
      state: stateBuffer,
      secondary: secondaryBuffer,
    };

    return new VoxelTemplate({
      size: [sx, sy, sz],
      palette: palette._palette,
      statePalette: new Uint16Array(statePalette._palette),
      voxels: buffers,
    });
  }
}
