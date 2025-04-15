import { Flat3DIndex, Traverse, Vec3Array } from "@amodx/math";
import { StringPalette } from "../../Util/StringPalette";
import { ArchivedVoxelTemplate } from "./ArchivedVoxelTemplate";
import { NumberPalette } from "../../Util/NumberPalette";
import { WorldCursor } from "../../World";
import { ArchivedVoxelTemplateData } from "./ArchivedVoxelTemplate.types";
import {
  BinaryBuffer,
  BinaryBufferTypes,
} from "../../Util/Binary/BinaryBuffer";
import { VoxelArchivePalette } from "../../Voxels/Archive/VoxelPaletteArechive";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";

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

  const voxelPalette = new VoxelArchivePalette();
  const secondaryPalette = new NumberPalette();

  const ids = new Uint16Array(index.size);
  const levels = new Uint8Array(index.size);
  const secondary = new Uint16Array(index.size);

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

    let voxelSecondary = 0;
    if (
      VoxelTagsRegister.VoxelTags[VoxelPalettesRegister.voxels[rawData[0]][0]][
        "dve_can_have_secondary"
      ]
    ) {
      voxelSecondary = voxelPalette.register(rawData[3]);
      if (!secondaryPalette.isRegistered(voxelSecondary))
        secondaryPalette.register(voxelSecondary);
    }

    if (firstId == -1) firstId = voxelId;
    if (firstLevel == -1) firstLevel = levelId;

    if (firstSecondary == -1) firstSecondary = voxelSecondary;

    ids[vindex] = voxelId;
    levels[vindex] = levelId;
    secondary[vindex] = voxelSecondary;

    if (firstId != voxelId) idsAllTheSame = false;
    if (firstLevel != levelId) levelAllTheSame = false;

    if (firstSecondary != voxelSecondary) secondaryAllTheSame = false;
  }

  const buffers: ArchivedVoxelTemplateData["buffers"] = <any>{};

  const idsPaletted = voxelPalette._voxelCount < 0xffff;
  const levelPaletted = levelPalette.size < 0xff;
  const secondaryPaletted = secondaryPalette.size < 0xffff;

  //id
  if (idsAllTheSame) {
    if (firstId !== 0) {
      buffers.ids = firstId;
    }
  } else if (idsPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(voxelPalette.size)!;
    buffers.ids = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(ids, BinaryBufferTypes.ShortArray, type)
        .buffer,
      type,
    });
  } else {
    buffers.ids = BinaryBuffer.Create({
      buffer: ids.buffer,
      type: BinaryBufferTypes.ShortArray,
    });
  }

  //levelPaletted
  if (levelAllTheSame) {
    if (firstId !== 0) {
      buffers.level = firstLevel;
    }
  } else if (levelPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(levelPalette.size)!;
    buffers.level = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(levels, BinaryBufferTypes.ByteArray, type)
        .buffer,
      type,
    });
  } else {
    buffers.level = BinaryBuffer.Create({
      buffer: levels.buffer,
      type: BinaryBufferTypes.ByteArray,
    });
  }

  //secondary
  if (secondaryAllTheSame) {
    if (firstId !== 0) {
      buffers.secondary = firstSecondary;
    }
  } else if (secondaryPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(voxelPalette.size)!;
    buffers.secondary = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(
        secondary,
        BinaryBufferTypes.ShortArray,
        type
      ).buffer,
      type,
    });
  } else {
    buffers.secondary = BinaryBuffer.Create({
      buffer: secondary.buffer,
      type: BinaryBufferTypes.ShortArray,
    });
  }

  return new ArchivedVoxelTemplate({
    type: "archived",
    vloxVersion: "",
    version: "",
    bounds: [sx, sy, sz],
    palettes: {
      level: Uint8Array.from(levelPalette._palette),
      secondary: Uint16Array.from(secondaryPalette._palette),
      ...voxelPalette.toJSON(),
    },
    buffers,
  });
}
