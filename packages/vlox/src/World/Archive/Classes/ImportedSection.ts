import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedLightSegments, ArchivedSectionData } from "../Archive.types";
import {
  BinaryBuffer,
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
  state: BinaryBuffer;
  mod: BinaryBuffer;
  secondary: BinaryBuffer;

  constructor(section: ArchivedSectionData) {
    this.ids = !section.buffers.id
      ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
      : typeof section.buffers.id == "number"
        ? new BinaryBuffer({
            buffer: section.buffers.id,
            type: BinaryBufferTypes.Value,
          })
        : new BinaryBuffer(section.buffers.id);

    this.level = !section.buffers.level
      ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
      : typeof section.buffers.level == "number"
        ? new BinaryBuffer({
            buffer: section.buffers.level,
            type: BinaryBufferTypes.Value,
          })
        : new BinaryBuffer(section.buffers.level);

    this.light = {
      sun: !section.buffers.light?.sun
        ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
        : typeof section.buffers.light.sun == "number"
          ? new BinaryBuffer({
              buffer: section.buffers.light.sun,
              type: BinaryBufferTypes.Value,
            })
          : new BinaryBuffer(section.buffers.light.sun),
      red: !section.buffers.light?.red
        ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
        : typeof section.buffers.light.red == "number"
          ? new BinaryBuffer({
              buffer: section.buffers.light.red,
              type: BinaryBufferTypes.Value,
            })
          : new BinaryBuffer(section.buffers.light.red),
      green: !section.buffers.light?.green
        ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
        : typeof section.buffers.light.green == "number"
          ? new BinaryBuffer({
              buffer: section.buffers.light.green,
              type: BinaryBufferTypes.Value,
            })
          : new BinaryBuffer(section.buffers.light.green),
      blue: !section.buffers.light?.blue
        ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
        : typeof section.buffers.light.blue == "number"
          ? new BinaryBuffer({
              buffer: section.buffers.light.blue,
              type: BinaryBufferTypes.Value,
            })
          : new BinaryBuffer(section.buffers.light.blue),
    };

    this.state = !section.buffers.state
      ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
      : typeof section.buffers.state == "number"
        ? new BinaryBuffer({
            buffer: section.buffers.state,
            type: BinaryBufferTypes.Value,
          })
        : new BinaryBuffer(section.buffers.state);

    this.mod = !section.buffers.mod
      ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
      : typeof section.buffers.mod == "number"
        ? new BinaryBuffer({
            buffer: section.buffers.mod,
            type: BinaryBufferTypes.Value,
          })
        : new BinaryBuffer(section.buffers.mod);

    this.secondary = !section.buffers.secondary
      ? new BinaryBuffer({ buffer: 0, type: BinaryBufferTypes.Value })
      : typeof section.buffers.secondary == "number"
        ? new BinaryBuffer({
            buffer: section.buffers.secondary,
            type: BinaryBufferTypes.Value,
          })
        : new BinaryBuffer(section.buffers.secondary);
  }
}
class ImportedSectionPalettes {
  id?: NumberPalette;
  level?: NumberPalette;
  light: Record<ArchivedLightSegments, NumberPalette | null>;
  state?: NumberPalette[];
  secondaryState?: NumberPalette[];
  mod?: NumberPalette[];
  secondaryMod?: NumberPalette[];
  secondaryId?: NumberPalette;
  secondaryValue?: NumberPalette;
  constructor(section: ArchivedSectionData) {
    this.id = section.palettes?.id
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

    if (section.palettes?.state) {
      for (const stateKey in section.palettes.state) {
        this.state ??= [];
        this.state[stateKey] = new NumberPalette(
          section.palettes.state[stateKey]
        );
      }
    }
    if (section.palettes?.mod) {
      for (const modKey in section.palettes.mod) {
        this.mod ??= [];
        this.mod[modKey] = new NumberPalette(section.palettes.mod[modKey]);
      }
    }

    this.secondaryValue = section.palettes?.secondaryValue
      ? new NumberPalette(section.palettes?.secondaryValue)
      : undefined;
    this.secondaryId = section.palettes?.secondaryId
      ? new NumberPalette(section.palettes?.secondaryId)
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
      return VoxelPalettesRegister.voxels.getNumberId(
        this.sector.palettes.id.getStringId(value)
      );
    }
    if (this.palettes.id) {
      return VoxelPalettesRegister.voxels.getNumberId(
        this.sector.palettes.id.getStringId(this.palettes.id.getValue(value))
      );
    }
    return VoxelPalettesRegister.voxels.getNumberId(
      this.sector.palettes.id.getStringId(value)
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
    const voxelId = this.getId(index);
    const value = this.buffers.secondary.getValue(index);
    if (VoxelTagsRegister.VoxelTags[voxelId]["dve_can_have_secondary"]) {
      if (this.palettes.secondaryId) {
        return VoxelPalettesRegister.voxels.getNumberId(
          this.sector.palettes.secondaryId!.getStringId(
            this.palettes.secondaryId.getValue(value)
          )
        );
      }
      return VoxelPalettesRegister.voxels.getNumberId(
        this.sector.sector.palettes.secondaryId![value]
      );
    }

    if (typeof this.section.buffers.secondary == "number") {
      return value;
    }
    if (this.palettes.secondaryValue && this.sector.palettes.secondaryValue) {
      return this.sector.palettes.secondaryValue.getValue(
        this.palettes.secondaryValue.getValue(value)
      );
    }
    if (this.sector.palettes.secondaryValue) {
      return this.sector.palettes.secondaryValue.getId(value);
    }
    return value;
  }

  getState(index: number) {
    const stateIndex = this.buffers.state.getValue(index);
    let returnValue = stateIndex;
    let voxelId = VoxelPalettesRegister.voxels.getStringId(this.getId(index));

    const secondary =
      VoxelTagsRegister.VoxelTags[this.getId(index)][
        "dve_can_have_secondary"
      ] && this.getSecondary(index) > 0;

    if (secondary) {
      voxelId = VoxelPalettesRegister.voxels.getStringId(
        this.getSecondary(index)
      );

      let voxelIndex = this.sector.palettes.secondaryId.getNumberId(voxelId);
      const statePalette = this.sector.palettes.secondaryState[voxelIndex];
      if (!statePalette) return 0;
      if (this.buffers.state.type == BinaryBufferTypes.Value) {
        returnValue = statePalette[stateIndex];
      } else {
        if (this.section.palettes?.secondaryState) {
          returnValue =
            statePalette[
              this.section.palettes?.secondaryState[voxelIndex][stateIndex]
            ];
        } else {
          returnValue = statePalette[stateIndex];
        }
      }
    } else {
      let voxelIndex = this.sector.palettes.id.getNumberId(voxelId);
      const statePalette = this.sector.palettes.state[voxelIndex];
      if (!statePalette) return 0;
      if (this.buffers.state.type == BinaryBufferTypes.Value) {
        returnValue = statePalette[stateIndex];
      } else {
        if (this.section.palettes?.state) {
          returnValue =
            statePalette[this.section.palettes?.state[voxelIndex][stateIndex]];
        } else {
          returnValue = statePalette[stateIndex];
        }
      }
    }

    return returnValue;
  }
  getMod(index: number) {
    const modIndex = this.buffers.mod.getValue(index);
    let returnValue = modIndex;
    let voxelId = VoxelPalettesRegister.voxels.getStringId(this.getId(index));

    const secondary =
      VoxelTagsRegister.VoxelTags[this.getId(index)][
        "dve_can_have_secondary"
      ] && this.getSecondary(index) > 0;

    if (secondary) {
      voxelId = VoxelPalettesRegister.voxels.getStringId(
        this.getSecondary(index)
      );
      let voxelIndex = this.sector.palettes.secondaryId.getNumberId(voxelId);
      const modPalette = this.sector.palettes.secondaryMod[voxelIndex];
      if (!modPalette) return 0;
      if (this.buffers.mod.type == BinaryBufferTypes.Value) {
        returnValue = modPalette[modIndex];
      } else {
        if (this.section.palettes?.secondaryMod) {
          returnValue =
            modPalette[
              this.section.palettes?.secondaryMod[voxelIndex][modIndex]
            ];
        } else {
          returnValue = modPalette[modIndex];
        }
      }
    } else {
      let voxelIndex = this.sector.palettes.id.getNumberId(voxelId);
      const modPalette = this.sector.palettes.mod[voxelIndex];
      if (!modPalette) return 0;
      if (this.buffers.mod.type == BinaryBufferTypes.Value) {
        returnValue = modPalette[modIndex];
      } else {
        if (this.section.palettes?.mod) {
          returnValue =
            modPalette[this.section.palettes?.mod[voxelIndex][modIndex]];
        } else {
          returnValue = modPalette[modIndex];
        }
      }
    }

    return returnValue;
  }
}
