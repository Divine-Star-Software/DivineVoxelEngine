import { StringPalette } from "../../../Util/StringPalette";
import { NumberPalette } from "../../../Util/NumberPalette";
import { Section } from "../../../World/Section";
import { ArchivedLightSegments } from "../Archive.types";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { BinarySchemaNodeData } from "../../../Voxels/State/State.types";
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

export class SectorVoxelPalette {
  ids = new StringPalette();
  value = 0;
  get size() {
    return this._voxelCount;
  }
  _voxelsRegistered = new Map<number, number>();
  _statesSchemasRegistered = new Map<string, number>();
  _modSchemasRegistered = new Map<string, number>();

  voxelPalette: number[] = [];
  statePalette: BinarySchemaNodeData[][] = [[]];
  modPalette: BinarySchemaNodeData[][] = [[]];
  _voxelCount = 0;
  _stateSchemaCount = 1;
  _modSchemaCount = 1;
  register(id: number) {
    if (this._voxelsRegistered.has(id)) return this._voxelsRegistered.get(id)!;

    const stringId = VoxelPalettesRegister.voxelIds.getStringId(
      VoxelPalettesRegister.voxels[id][0]
    );

    let voxelId = 0;
    if (!this.ids.isRegistered(stringId)) {
      voxelId = this.ids.register(stringId);
      const stateData = SchemaRegister.stateSchemaData.get(
        SchemaRegister.voxelModelMap.get(stringId)!
      );
      const modData = SchemaRegister.modSchemaData.get(stringId);

      let statePaletteId = this._stateSchemaCount;
      if (!stateData || stateData?.length == 0) {
        statePaletteId = 0;
      } else {
        this.statePalette[statePaletteId] = stateData;
        this._stateSchemaCount++;
      }

      let modPaletteId = this._modSchemaCount;
      if (!modData || modData?.length == 0) {
        modPaletteId = 0;
      } else {
        this.modPalette[modPaletteId] = modData;
        this._modSchemaCount++;
      }

      this._statesSchemasRegistered.set(stringId, statePaletteId);
      this._modSchemasRegistered.set(stringId, modPaletteId);
    } else {
      voxelId = this.ids.getNumberId(stringId);
    }
    const statePaletteId = this._statesSchemasRegistered.get(stringId)!;
    const modPaletteId = this._modSchemasRegistered.get(stringId)!;

    const paletteId = this._voxelCount;
    this._voxelsRegistered.set(id, paletteId);
    const [, state, mod] = VoxelPalettesRegister.voxels[id];
    this.voxelPalette.push(voxelId, statePaletteId, state, modPaletteId, mod);
    this._voxelCount++;

    return paletteId;
  }
}

export class ProcessedSection {
  palettes = new SectionPalette();
  isBuriedAllTheSame = false;
  buriedValue = 0;
  isVoxelMapAllTheSame = false;
  voxelMapValue = 0;
  isDirtyMapAllTheSame = false;
  dirtyMapValue = 0;
  voxels: ProcessedData<Uint16Array>;
  light: Record<ArchivedLightSegments, ProcessedData<Uint8Array>>;
  level: ProcessedData<Uint8Array>;

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
  voxels = new SectorVoxelPalette();
  level = new NumberPalette();
  light = new LightPalette();
}
