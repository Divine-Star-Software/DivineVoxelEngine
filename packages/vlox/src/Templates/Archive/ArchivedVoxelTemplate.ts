import { Flat3DIndex, Vec3Array, Vector3Like } from "@amodx/math";
import { ArchivedVoxelTemplateData } from "./ArchivedVoxelTemplate.types";
import type { RawVoxelData } from "../../Voxels/Types/Voxel.types";
import { NumberPalette } from "../../Util/NumberPalette";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";
import {
  BinaryBuffer,
  BinaryBufferFormat,
} from "../../Util/BinaryBuffer/index";
import { VoxelPaletteArchiveReader } from "../../Voxels/Archive/VoxelPaletteArchiveReader";
import { BoundingBox } from "@amodx/math/Geomtry/Bounds/BoundingBox";

type TemplateCursor = { position: Vec3Array; raw: RawVoxelData };

export class ArchivedVoxelTemplate implements IVoxelTemplate {
  index = Flat3DIndex.GetXZYOrder();
  position: Vector3Like;
  bounds: BoundingBox;
  ids: BinaryBuffer;
  level: BinaryBuffer;
  secondary: BinaryBuffer;

  voxelPalette: VoxelPaletteArchiveReader;

  levelPalette: NumberPalette;
  secondaryPalette: NumberPalette;

  constructor(private _data: ArchivedVoxelTemplateData) {
    this.bounds = new BoundingBox();
    this.position = { ..._data.position };
    this.bounds.setMinPositionAndSize(_data.position, _data.bounds);
    this.index.setBounds(_data.bounds.x, _data.bounds.y, _data.bounds.z);

    this.voxelPalette = new VoxelPaletteArchiveReader(_data.palettes);
    if (_data.palettes.level) {
      this.levelPalette = new NumberPalette(
        BinaryBuffer.ToTypedArray(_data.palettes.level)
      );
    } else {
      this.levelPalette = new NumberPalette([0]);
    }

    if (_data.palettes.secondary) {
      this.secondaryPalette = new NumberPalette(
        BinaryBuffer.ToTypedArray(_data.palettes.secondary)
      );
    } else {
      this.secondaryPalette = new NumberPalette([0]);
    }

    const volume = this.index.size;
    this.ids = _data.buffers.ids
      ? new BinaryBuffer(_data.buffers.ids)
      : new BinaryBuffer(
          BinaryBuffer.Create({
            format: BinaryBufferFormat.Uint16,
            byteLength: volume,
            buffer: 0,
          })
        );
    this.level = _data.buffers.level
      ? new BinaryBuffer(_data.buffers.level)
      : new BinaryBuffer(
          BinaryBuffer.Create({
            format: BinaryBufferFormat.Uint8,
            byteLength: volume,
            buffer: 0,
          })
        );
    this.secondary = _data.buffers.secondary
      ? new BinaryBuffer(_data.buffers.secondary)
      : new BinaryBuffer(
          BinaryBuffer.Create({
            format: BinaryBufferFormat.Uint16,
            byteLength: volume,
            buffer: 0,
          })
        );
  }

  setPosition(x: number, y: number, z: number): void {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
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
    for (let x = 0; x < this.bounds.size.x; x++) {
      for (let y = 0; y < this.bounds.size.y; y++) {
        for (let z = 0; z < this.bounds.size.z; z++) {
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
