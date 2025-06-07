import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedLightSegments, ArchivedSectionData } from "../Types/index";
import {
  BinaryBuffer,
  BinaryBufferData,
  BinaryBufferFormat,
} from "../../../Util/BinaryBuffer/index";
import { ImportedSector } from "./ImportedSector";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import {
  lightSegments,
  lightSemgnetSet,
} from "../Functions/Shared/LightSegments";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";
import { WorldSpaces } from "../../WorldSpaces";

class ImportedSectionBuffers {
  ids: BinaryBuffer;
  level: BinaryBuffer;
  light: Record<ArchivedLightSegments, BinaryBuffer>;
  secondary: BinaryBuffer;

  constructor(section: ArchivedSectionData) {
    this.ids = section.buffers.id
      ? new BinaryBuffer(section.buffers.id)
      : new BinaryBuffer(
          BinaryBuffer.Create({
            byteLength: WorldSpaces.section.volumne,
            buffer: 0,
            format: BinaryBufferFormat.Uint16,
          })
        );
    this.secondary = section.buffers.secondary
      ? new BinaryBuffer(section.buffers.secondary)
      : new BinaryBuffer(
          BinaryBuffer.Create({
            byteLength: WorldSpaces.section.volumne,
            buffer: 0,
            format: BinaryBufferFormat.Uint16,
          })
        );
    this.level = section.buffers.level
      ? new BinaryBuffer(section.buffers.level)
      : new BinaryBuffer(
          BinaryBuffer.Create({
            byteLength: WorldSpaces.section.volumne,
            buffer: 0,
            format: BinaryBufferFormat.Uint8,
          })
        );
    this.light = {
      sun: section.buffers.light?.sun
        ? new BinaryBuffer(section.buffers.light.sun)
        : new BinaryBuffer(
            BinaryBuffer.Create({
              byteLength: WorldSpaces.section.volumne,
              buffer: 0,
              format: BinaryBufferFormat.NibbleArray,
            })
          ),
      red: section.buffers.light?.red
        ? new BinaryBuffer(section.buffers.light.red)
        : new BinaryBuffer(
            BinaryBuffer.Create({
              byteLength: WorldSpaces.section.volumne,
              buffer: 0,
              format: BinaryBufferFormat.NibbleArray,
            })
          ),
      green: section.buffers.light?.green
        ? new BinaryBuffer(section.buffers.light.green)
        : new BinaryBuffer(
            BinaryBuffer.Create({
              byteLength: WorldSpaces.section.volumne,
              buffer: 0,
              format: BinaryBufferFormat.NibbleArray,
            })
          ),
      blue: section.buffers.light?.blue
        ? new BinaryBuffer(section.buffers.light.blue)
        : new BinaryBuffer(
            BinaryBuffer.Create({
              byteLength: WorldSpaces.section.volumne,
              buffer: 0,
              format: BinaryBufferFormat.NibbleArray,
            })
          ),
    };
  }
}
class ImportedSectionPalettes {
  voxels?: NumberPalette;
  level?: NumberPalette;
  light: Record<ArchivedLightSegments, NumberPalette | null>;
  secondaryVoxels?: NumberPalette;
  constructor(section: ArchivedSectionData) {
    this.voxels = section.palettes?.id
      ? new NumberPalette(BinaryBuffer.ToTypedArray(section.palettes?.id))
      : undefined;
    this.light = {
      sun: section.palettes?.light?.sun
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(section.palettes?.light?.sun)
          )
        : null,
      red: section.palettes?.light?.red
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(section.palettes?.light?.red)
          )
        : null,
      green: section.palettes?.light?.green
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(section.palettes?.light?.green)
          )
        : null,
      blue: section.palettes?.light?.blue
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(section.palettes?.light?.blue)
          )
        : null,
    };

    this.level = section.palettes?.level
      ? new NumberPalette(BinaryBuffer.ToTypedArray(section.palettes?.level))
      : undefined;

    this.secondaryVoxels = section.palettes?.secondary
      ? new NumberPalette(
          BinaryBuffer.ToTypedArray(section.palettes?.secondary)
        )
      : undefined;
  }
}
export class ImportedSection {
  buffers: ImportedSectionBuffers;
  palettes: ImportedSectionPalettes;
  constructor(
    public sectionIndex: number,
    public sector: ImportedSector,
    public section: ArchivedSectionData
  ) {
    this.buffers = new ImportedSectionBuffers(section);
    this.palettes = new ImportedSectionPalettes(section);
  }
  getId(index: number): number {
    const value = this.buffers.ids.getValue(index);
    if (this.buffers.ids.isValue) {
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.sector.voxels.getVoxelData(value)
      );
    }
    if (this.palettes.voxels) {
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.sector.voxels.getVoxelData(this.palettes.voxels.getValue(value))
      );
    }
    return VoxelPalettesRegister.getVoxelIdFromString(
      ...this.sector.voxels.getVoxelData(value)
    );
  }

  getLight(index: number) {
    let finalLight = 0;
    for (let l = 0; l < lightSegments.length; l++) {
      const segment = lightSegments[l];
      let value = 0;
      if (this.buffers.light[segment].isValue) {
        value = this.buffers.light[segment].getValue(index);
      } else {
        if (
          this.buffers.light[segment].format == BinaryBufferFormat.NibbleArray
        ) {
          value = this.buffers.light[segment].getValue(index);
        } else {
          if (this.palettes.light[segment]) {
            value = this.palettes.light[segment].getValue(
              this.buffers.light[segment].getValue(index)
            );
          } else if (this.sector.palettes.light[segment]) {
            value = this.sector.palettes.light[segment].getValue(
              this.buffers.light[segment].getValue(index)
            );
          }
        }
      }

      finalLight = lightSemgnetSet[segment](value, finalLight);
    }

    return finalLight;
  }

  getLevel(index: number) {
    const value = this.buffers.level.getValue(index);
    if (this.palettes.level) {
      return this.palettes.level.getValue(value);
    }
    if (this.sector.palettes.level) {
      return this.sector.palettes.level.getValue(value);
    }
    return value;
  }

  getSecondary(index: number) {
    const trueVoxelId = VoxelPalettesRegister.voxels[this.getId(index)][0];
    const value = this.buffers.secondary.getValue(index);
    if (VoxelTagsRegister.VoxelTags[trueVoxelId]["dve_can_have_secondary"]) {
      if (this.buffers.ids.isValue) {
        return VoxelPalettesRegister.getVoxelIdFromString(
          ...this.sector.voxels.getVoxelData(value)
        );
      }
      if (this.palettes.secondaryVoxels) {
        return VoxelPalettesRegister.getVoxelIdFromString(
          ...this.sector.voxels.getVoxelData(
            this.palettes.secondaryVoxels.getValue(value)
          )
        );
      }
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.sector.voxels.getVoxelData(value)
      );
    }
    return value;
  }
}
