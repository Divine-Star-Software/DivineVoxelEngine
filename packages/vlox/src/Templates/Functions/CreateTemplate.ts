import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { StringPalette } from "../../Interfaces/Data/StringPalette";
import { VoxelTemplate } from "../VoxelTemplate";
import { NumberPalette } from "../../Interfaces/Data/NumberPalette";
import { DataTool } from "../../Tools/Data/DataTool";
import { convertToPaletteBuffer } from "../../Archive/Functions/Palettes";

export default function CreateTemplate(
  dimension: string,
  start: Vec3Array,
  end: Vec3Array
) {
  const dataTool = new DataTool();
  const index = Flat3DIndex.GetXZYOrder();
  const [sx, sy, sz] = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2],
  ];
  index.setBounds(sx, sy, sz);

  const idPalette = new StringPalette();
  const secondaryIdPalette = new StringPalette();
  const statePalette = new NumberPalette();
  const modPalette = new NumberPalette();
  const secondaryStatePalette = new NumberPalette();

  const ids: number[] = new Array(index.size);
  const state: number[] = new Array(index.size);
  const mod: number[] = new Array(index.size);
  const secondary: number[] = new Array(index.size);

  dataTool.setDimension(dimension);

  let idsAllTheSame = true;
  let stateAllTheSame = true;
  let modAllTheSame = true;
  let secondaryAllTheSame = true;

  let firstId = -1;
  let firstState = -1;
  let firstMod = -1;
  let firstSecondary = -1;

  for (const { x, y, z } of Traverse.FromToVec3(
    start,
    [end[0] - 1, end[1] - 1, end[2] - 1],
    1
  )) {
    if (!dataTool.loadInAt(x, y, z)) continue;

    const vindex = index.getIndexXYZ(x - start[0], y - start[1], z - start[2]);
    const raw = dataTool.getRaw();

    const stringId = dataTool.getStringId();
    const stateId = !statePalette.isRegistered(raw[2])
      ? statePalette.register(raw[2])
      : statePalette.getId(raw[2]);
    const modId = !modPalette.isRegistered(raw[4])
      ? modPalette.register(raw[4])
      : modPalette.getId(raw[4]);
    const voxelId = !idPalette.isRegistered(stringId)
      ? idPalette.register(stringId)
      : idPalette.getNumberId(stringId);

    let secondaryData = 0;

    if (dataTool.canHaveSecondaryVoxel()) {
      dataTool.setSecondary(true);
      let secondaryId = dataTool.hasSecondaryVoxel()
        ? dataTool.getStringId()
        : "dve_air";
      dataTool.setSecondary(false);
      secondaryData = !secondaryIdPalette.isRegistered(secondaryId)
        ? secondaryIdPalette.register(secondaryId)
        : secondaryIdPalette.getNumberId(secondaryId);
    } else {
      secondaryData = !secondaryStatePalette.isRegistered(raw[3])
        ? secondaryStatePalette.register(raw[3])
        : secondaryStatePalette.getId(raw[3]);
    }
    if (firstId == -1) firstId = voxelId;
    if (firstState == -1) firstState = stateId;
    if (firstMod == -1) firstMod = modId;
    if (firstSecondary == -1) firstSecondary = secondaryData;

    ids[vindex] = voxelId;
    mod[vindex] = modId;
    state[vindex] = stateId;
    secondary[vindex] = secondaryData;

    if (firstId != voxelId) idsAllTheSame = false;
    if (firstState != stateId) stateAllTheSame = false;
    if (firstMod != modId) modAllTheSame = false;
    if (firstSecondary != secondaryData) secondaryAllTheSame = false;
  }


  console.log("CREATE VOXEL TEMPLATE",{modPalette,mod})
  return new VoxelTemplate({
    templatorVersion: 0,
    version: 0,
    size: [sx, sy, sz],
    palettes: {
      id: idPalette._palette,
      secondaryId: secondaryIdPalette._palette,
      state: Uint16Array.from(statePalette._palette),
      mod: Uint16Array.from(modPalette._palette),
      secondaryState: Uint16Array.from(secondaryStatePalette._palette),
    },
    buffers: {
      ids: !idsAllTheSame
        ? convertToPaletteBuffer(idPalette.size, Uint16Array.from(ids), true)
        : ids[0],
      mod: !modAllTheSame
        ? convertToPaletteBuffer(modPalette.size, Uint16Array.from(mod), true)
        : mod[0],
      state: !stateAllTheSame
        ? convertToPaletteBuffer(
            statePalette.size,
            Uint16Array.from(state),
            true
          )
        : state[0],
      secondary: !secondaryAllTheSame
        ? convertToPaletteBuffer(
            Math.max(secondaryIdPalette.size, secondaryStatePalette.size),
            Uint16Array.from(secondary),
            true
          )
        : secondary[0],
    },
  });
}
