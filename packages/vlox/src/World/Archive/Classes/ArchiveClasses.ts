import { NumberPalette } from "../../../Util/NumberPalette";
import { Section } from "../../../World/Section";
import { ArchivedLightSegments } from "../Types/Archive.types";
import { VoxelArchivePalette } from "../../../Voxels/Archive/VoxelPaletteArechive";

class ProcessedData<Buffer = any> {
  constructor(public buffer: Buffer) {}
  allTheSame = true;
  isPaletted = false;
  remapped = false;
  value = 0;
}

class SectionPalette {
  voxels = new NumberPalette();
  level = new NumberPalette();
  light = new LightPalette();
  secondaryVoxels = new NumberPalette();
}

export class ProcessedSection {
  palettes = new SectionPalette();

  light: Record<ArchivedLightSegments, ProcessedData<Uint8Array>>;
  level: ProcessedData<Uint8Array>;
  voxels: ProcessedData<Uint16Array>;
  secondaryVoxels: ProcessedData<Uint16Array>;
  constructor(public original: Section) {
    this.voxels = new ProcessedData(new Uint16Array(original.ids.length));
    this.level = new ProcessedData(new Uint8Array(original.level.length));
    this.light = {
      sun: new ProcessedData(new Uint8Array(original.light.length)),
      red: new ProcessedData(new Uint8Array(original.light.length)),
      green: new ProcessedData(new Uint8Array(original.light.length)),
      blue: new ProcessedData(new Uint8Array(original.light.length)),
    };
    this.secondaryVoxels = new ProcessedData(
      new Uint16Array(original.secondary.length)
    );
  }
}

class LightPalette {
  sun = new NumberPalette();
  red = new NumberPalette();
  green = new NumberPalette();
  blue = new NumberPalette();
}

export class VoxelStateObjectMap {
  palette = new NumberPalette();
  states: any[] = [];
}

export class SectorPalette {
  voxels = new VoxelArchivePalette();
  level = new NumberPalette();
  light = new LightPalette();
}
