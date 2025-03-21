import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { StringPalette } from "../../Util/StringPalette";
import { ArchivedVoxelTemplate } from "./ArchivedVoxelTemplate";
import { NumberPalette } from "../../Util/NumberPalette";
import { convertToPaletteBuffer } from "../../Util/Binary/Palettes";
import { WorldCursor } from "../../World";

export default function CreateArchivedTemplate(
  dimension: number,
  start: Vec3Array,
  end: Vec3Array
) {
  const dataTool = new WorldCursor();
  dataTool.setFocalPoint(dimension, start[0], start[1], start[2]);
  const index = Flat3DIndex.GetXZYOrder();
  const [sx, sy, sz] = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2],
  ];
  index.setBounds(sx, sy, sz);

  const idPalette = new StringPalette();
  const levelPalette = new NumberPalette();

  const secondaryIdPalette = new StringPalette();
  const secondaryStatePalette = new NumberPalette();

  const ids = new Uint16Array(index.size);
  const levels = new Uint8Array(index.size);

  const secondarys = new Uint16Array(index.size);

  let idsAllTheSame = true;
  let levelAllTheSame = true;

  let secondaryAllTheSame = true;

  let firstId = -1;
  let firstLevel = -1;

  let firstSecondary = -1;

  for (const { x, y, z } of Traverse.FromToVec3(
    start,
    [end[0] - 1, end[1] - 1, end[2] - 1],
    1
  )) {
    const voxel = dataTool.getVoxel(x, y, x);
    if (!voxel) continue;

    const vindex = index.getIndexXYZ(x - start[0], y - start[1], z - start[2]);
    const rawData = voxel.getRaw();
    const level = rawData[2];
    const seoncdary = rawData[3];

    const stringId = voxel.getStringId();
    const voxelId = !idPalette.isRegistered(stringId)
      ? idPalette.register(stringId)
      : idPalette.getNumberId(stringId);
    const levelId = !levelPalette.isRegistered(level)
      ? levelPalette.register(level)
      : levelPalette.getId(level);

    let secondaryData = 0;

    if (voxel.canHaveSecondaryVoxel()) {
      voxel.setSecondary(true);
      let secondaryId = voxel.hasSecondaryVoxel()
        ? voxel.getStringId()
        : "dve_air";
      voxel.setSecondary(false);
      secondaryData = !secondaryIdPalette.isRegistered(secondaryId)
        ? secondaryIdPalette.register(secondaryId)
        : secondaryIdPalette.getNumberId(secondaryId);
    } else {
      secondaryData = !secondaryStatePalette.isRegistered(seoncdary)
        ? secondaryStatePalette.register(seoncdary)
        : secondaryStatePalette.getId(seoncdary);
    }
    if (firstId == -1) firstId = voxelId;
    if (firstLevel == -1) firstLevel = levelId;

    if (firstSecondary == -1) firstSecondary = secondaryData;

    ids[vindex] = voxelId;
    levels[vindex] = voxelId;

    secondarys[vindex] = secondaryData;

    if (firstId != voxelId) idsAllTheSame = false;
    if (firstLevel != levelId) levelAllTheSame = false;

    if (firstSecondary != secondaryData) secondaryAllTheSame = false;
  }

  return new ArchivedVoxelTemplate({
    type: "archived",
    templatorVersion: 0,
    version: 0,
    bounds: [sx, sy, sz],
    palettes: {
      id: idPalette._palette,
      level: Uint8Array.from(levelPalette._palette),

      secondaryId: secondaryIdPalette._palette,
      secondaryState: Uint16Array.from(secondaryStatePalette._palette),
    },
    buffers: {
      ids: !idsAllTheSame
        ? convertToPaletteBuffer(idPalette.size, Uint16Array.from(ids), true)
        : ids[0],
      level: !levelAllTheSame
        ? (convertToPaletteBuffer(levelPalette.size, levels, true) as any)
        : levels[0],

      secondary: !secondaryAllTheSame
        ? convertToPaletteBuffer(
            Math.max(secondaryIdPalette.size, secondaryStatePalette.size),
            Uint16Array.from(secondarys),
            true
          )
        : secondarys[0],
    },
  });
}
