import { StringPalette } from "../../../Util/StringPalette";
import { NumberPalette } from "../../../Util/NumberPalette";
import { Section } from "../../../World/Section";
import { ArchivedLightSegments } from "../Archive.types";

class ProcessedData<Buffer = any> {
  constructor(public buffer: Buffer) {}
  allTheSame = true;
  isPaletted = false;
  remapped = false;
  value = 0;
}

class SectionPalette {
  ids = new NumberPalette();
  level = new NumberPalette();
  light = new LightPalette();
  maxStatePaletteSize = 0;
  state: Record<number, NumberPalette> = {};
  secondaryState: Record<number, NumberPalette> = {};
  maxModPaletteSize = 0;
  mod: Record<number, NumberPalette> = {};
  secondaryMod: Record<number, NumberPalette> = {};
  secondaryId = new NumberPalette();
  secondaryValue = new NumberPalette();
}

export class ProcessedSection {
  palettes = new SectionPalette();
  isBuriedAllTheSame = false;
  buriedValue = 0;
  isVoxelMapAllTheSame = false;
  voxelMapValue = 0;
  isDirtyMapAllTheSame = false;
  dirtyMapValue = 0;
  ids: ProcessedData<Uint16Array>;
  light: Record<ArchivedLightSegments, ProcessedData<Uint8Array>>;
  level: ProcessedData<Uint8Array>;

  secondary: ProcessedData<Uint16Array>;
  constructor(public original: Section) {
    this.ids = new ProcessedData(new Uint16Array(original.ids.length));
    this.level = new ProcessedData(new Uint8Array(original.level.length));
    this.light = {
      sun: new ProcessedData(new Uint8Array(original.light.length)),
      red: new ProcessedData(new Uint8Array(original.light.length)),
      green: new ProcessedData(new Uint8Array(original.light.length)),
      blue: new ProcessedData(new Uint8Array(original.light.length)),
    };
    this.secondary = new ProcessedData(
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
  ids = new StringPalette();
  level = new NumberPalette();
  light = new LightPalette();
  stateMap: VoxelStateObjectMap[] = [];
  secondaryStateMap: VoxelStateObjectMap[] = [];
  maxStatePaletteSize = 0;
  modMap: VoxelStateObjectMap[] = [];
  secondaryModMap: VoxelStateObjectMap[] = [];
  maxModPaletteSize = 0;
  secondaryId = new StringPalette();
  secondaryValue = new NumberPalette();
}
