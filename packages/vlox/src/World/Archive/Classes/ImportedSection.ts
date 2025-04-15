import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedLightSegments, ArchivedSectionData } from "../Archive.types";
import {
  BinaryBuffer,
  BinaryBufferData,
  BinaryBufferTypes,
} from "../../../Util/Binary/BinaryBuffer";
import { ImportedSector } from "./ImportedSector";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { lightSegments, lightSemgnetSet } from "../Functions/Shared";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";

class ImportedSectionBuffers {
  ids: BinaryBuffer;
  level: BinaryBuffer;
  light: Record<ArchivedLightSegments, BinaryBuffer>;
  secondary: BinaryBuffer;

  constructor(section: ArchivedSectionData) {
    this.ids = BinaryBuffer.GetBuffer(section.buffers.id);
    this.level = BinaryBuffer.GetBuffer(section.buffers.level);
    this.light = {
      sun: BinaryBuffer.GetBuffer(section.buffers.light?.sun),
      red: BinaryBuffer.GetBuffer(section.buffers.light?.red),
      green: BinaryBuffer.GetBuffer(section.buffers.light?.green),
      blue: BinaryBuffer.GetBuffer(section.buffers.light?.blue),
    };
    this.secondary = BinaryBuffer.GetBuffer(section.buffers.secondary);
  }
}
class ImportedSectionPalettes {
  voxels?: NumberPalette;
  level?: NumberPalette;
  light: Record<ArchivedLightSegments, NumberPalette | null>;
  secondaryVoxels?: NumberPalette;
  constructor(section: ArchivedSectionData) {
    this.voxels = section.palettes?.id
      ? new NumberPalette(section.palettes?.id)
      : undefined;
    this.light = {
      sun: section.palettes?.light?.sun
        ? new NumberPalette(section.palettes?.light?.sun)
        : null,
      red: section.palettes?.light?.red
        ? new NumberPalette(section.palettes?.light?.red)
        : null,
      green: section.palettes?.light?.green
        ? new NumberPalette(section.palettes?.light?.green)
        : null,
      blue: section.palettes?.light?.blue
        ? new NumberPalette(section.palettes?.light?.blue)
        : null,
    };

    this.level = section.palettes?.level
      ? new NumberPalette(section.palettes?.level)
      : undefined;

    this.secondaryVoxels = section.palettes?.secondaryVoxels
      ? new NumberPalette(section.palettes?.secondaryVoxels)
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
    if (this.buffers.ids.type == BinaryBufferTypes.Value) {
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.sector.getVoxelData(value)
      );
    }
    if (this.palettes.voxels) {
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.sector.getVoxelData(this.palettes.voxels.getValue(value))
      );
    }
    return VoxelPalettesRegister.getVoxelIdFromString(
      ...this.sector.getVoxelData(value)
    );
  }

  getLight(index: number) {
    let finalLight = 0;
    for (let l = 0; l < lightSegments.length; l++) {
      const segment = lightSegments[l];
      let value = 0;
      if (this.buffers.light[segment].type == BinaryBufferTypes.Value) {
        value = this.buffers.light[segment].getValue(index);
      } else {
        if (this.buffers.light[segment].type == BinaryBufferTypes.NibbleArray) {
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
      if (this.buffers.ids.type == BinaryBufferTypes.Value) {
        return VoxelPalettesRegister.getVoxelIdFromString(
          ...this.sector.getVoxelData(value)
        );
      }
      if (this.palettes.secondaryVoxels) {
        return VoxelPalettesRegister.getVoxelIdFromString(
          ...this.sector.getVoxelData(
            this.palettes.secondaryVoxels.getValue(value)
          )
        );
      }
      return VoxelPalettesRegister.getVoxelIdFromString(
        ...this.sector.getVoxelData(value)
      );
    }
    return value;
  }
}
