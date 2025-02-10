import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { StringPalette } from "../../Util/StringPalette";
import { VoxelTemplate } from "../VoxelTemplate";
import { NumberPalette } from "../../Util/NumberPalette";
import { convertToPaletteBuffer } from "../../Util/Binary/Palettes";
import { WorldCursor } from "../../World";

export default function CreateTemplate(
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
  const statePalette = new NumberPalette();
  const modPalette = new NumberPalette();
  const secondaryIdPalette = new StringPalette();
  const secondaryStatePalette = new NumberPalette();

  const ids = new Uint16Array(index.size);
  const levels = new Uint8Array(index.size);
  const states = new Uint16Array(index.size);
  const mods = new Uint16Array(index.size);
  const secondarys = new Uint16Array(index.size);

  let idsAllTheSame = true;
  let levelAllTheSame = true;
  let stateAllTheSame = true;
  let modAllTheSame = true;
  let secondaryAllTheSame = true;

  let firstId = -1;
  let firstLevel = -1;
  let firstState = -1;
  let firstMod = -1;
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
    const state = rawData[3];
    const mod = rawData[4];
    const seoncdary = rawData[5];

    const stringId = voxel.getStringId();
    const voxelId = !idPalette.isRegistered(stringId)
      ? idPalette.register(stringId)
      : idPalette.getNumberId(stringId);
    const levelId = !levelPalette.isRegistered(level)
      ? levelPalette.register(level)
      : levelPalette.getId(level);
    const stateId = !statePalette.isRegistered(state)
      ? statePalette.register(state)
      : statePalette.getId(state);
    const modId = !modPalette.isRegistered(mod)
      ? modPalette.register(mod)
      : modPalette.getId(mod);

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
    if (firstLevel == -1) firstLevel = stateId;
    if (firstState == -1) firstState = stateId;
    if (firstMod == -1) firstMod = modId;
    if (firstSecondary == -1) firstSecondary = secondaryData;

    ids[vindex] = voxelId;
    levels[vindex] = voxelId;
    mods[vindex] = modId;
    states[vindex] = stateId;
    secondarys[vindex] = secondaryData;

    if (firstId != voxelId) idsAllTheSame = false;
    if (firstLevel != levelId) levelAllTheSame = false;
    if (firstState != stateId) stateAllTheSame = false;
    if (firstMod != modId) modAllTheSame = false;
    if (firstSecondary != secondaryData) secondaryAllTheSame = false;
  }

  console.log("CREATE VOXEL TEMPLATE", { modPalette, mod: mods });
  return new VoxelTemplate({
    templatorVersion: 0,
    version: 0,
    size: [sx, sy, sz],
    palettes: {
      id: idPalette._palette,
      level: Uint8Array.from(levelPalette._palette),
      state: Uint16Array.from(statePalette._palette),
      mod: Uint16Array.from(modPalette._palette),
      secondaryId: secondaryIdPalette._palette,
      secondaryState: Uint16Array.from(secondaryStatePalette._palette),
    },
    buffers: {
      ids: !idsAllTheSame
        ? convertToPaletteBuffer(idPalette.size, Uint16Array.from(ids), true)
        : ids[0],
      level: !levelAllTheSame
        ? convertToPaletteBuffer(modPalette.size, levels, true) as any
        : levels[0],
      mod: !modAllTheSame
        ? convertToPaletteBuffer(modPalette.size, Uint16Array.from(mods), true)
        : mods[0],
      state: !stateAllTheSame
        ? convertToPaletteBuffer(
            statePalette.size,
            Uint16Array.from(states),
            true
          )
        : states[0],
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
