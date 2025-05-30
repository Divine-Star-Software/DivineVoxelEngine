import { Flat3DIndex, Traverse, Vec3Array, Vector3Like } from "@amodx/math";
import { StringPalette } from "../../../Util/StringPalette";
import { ArchivedVoxelTemplate } from "../ArchivedVoxelTemplate";
import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedVoxelTemplateData } from "../ArchivedVoxelTemplate.types";
import {
  BinaryBuffer,
  BinaryBufferTypes,
} from "../../../Util/Binary/BinaryBuffer";
import { VoxelArchivePalette } from "../../../Voxels/Archive/VoxelPaletteArechive";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { DataCursorInterface } from "../../../Voxels/Cursor/DataCursor.interface";
import { BoundsMinMaxData } from "@amodx/math/Geomtry/Bounds/BoundsInterface";

/**
 * Creates an archived template using the passed in the data cursor.
 * @param dimension
 * @param start
 * @param end
 * @returns
 */
export default function CreateArchivedTemplate(
  dataCursor: DataCursorInterface,
  bounds: BoundsMinMaxData
) {
  const index = Flat3DIndex.GetXZYOrder();

  index.setBounds(
    bounds.max.x - bounds.min.x,
    bounds.max.y - bounds.min.y,
    bounds.max.z - bounds.min.z
  );

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

  const { x: sx, y: sy, z: sz } = bounds.min;
  const { x: ex, y: ey, z: ez } = bounds.max;

  for (let x = sx; x < ex; x++) {
    for (let y = sy; y < ey; y++) {
      for (let z = sz; z < ez; z++) {
        const voxel = dataCursor.getVoxel(x, y, z);
        if (!voxel) continue;

        const vindex = index.getIndexXYZ(x - sx, y - sy, z - sz);
        const rawData = voxel.getRaw();
        const level = rawData[2];

        const voxelId = voxelPalette.register(rawData[0]);

        const levelId = !levelPalette.isRegistered(level)
          ? levelPalette.register(level)
          : levelPalette.getId(level);

        let voxelSecondary = 0;
        if (
          VoxelTagsRegister.VoxelTags[
            VoxelPalettesRegister.voxels[rawData[0]][0]
          ]["dve_can_have_secondary"]
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
    }
  }
  const buffers: ArchivedVoxelTemplateData["buffers"] = <any>{};

  const idsPaletted = voxelPalette._voxelCount < 0xffff;
  const levelPaletted = levelPalette.size < 0xff;
  const secondaryPaletted = secondaryPalette.size < 0xffff;

  //id
  if (idsAllTheSame) {
    if (firstId !== 0) {
      buffers.ids = BinaryBuffer.Create({
        type: 16,
        length: ids.length,
        buffer: ids[0],
      });
    }
  } else if (idsPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(voxelPalette.size)!;
    buffers.ids = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(ids, BinaryBufferTypes.ShortArray, type)
        .buffer,
      type,
      length: ids.length,
    });
  } else {
    buffers.ids = BinaryBuffer.Create({
      buffer: ids.buffer,
      type: BinaryBufferTypes.ShortArray,
      length: ids.length,
    });
  }

  //levelPaletted
  if (levelAllTheSame) {
    if (firstId !== 0) {
      buffers.level = BinaryBuffer.Create({
        type: 8,
        length: levels.length,
        buffer: levels[0],
      });
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
      buffers.secondary = BinaryBuffer.Create({
        type: 16,
        length: secondary.length,
        buffer: secondary[0],
      });
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

  const data: ArchivedVoxelTemplateData = {
    type: "archived",
    vloxVersion: "",
    version: "",
    position: Vector3Like.Create(),
    bounds: Vector3Like.Create(...index.getBounds()),
    palettes: {
      level: BinaryBuffer.Create({
        type: 8,
        length: levelPalette._palette.length,
        buffer: Uint8Array.from(levelPalette._palette).buffer,
      }),
      secondary: BinaryBuffer.Create({
        type: 16,
        length: secondaryPalette._palette.length,
        buffer: Uint16Array.from(secondaryPalette._palette).buffer,
      }),
      ...voxelPalette.toJSON(),
    },
    buffers,
  };

  console.log(data);
  const archived = new ArchivedVoxelTemplate(data);

  return archived;
}
