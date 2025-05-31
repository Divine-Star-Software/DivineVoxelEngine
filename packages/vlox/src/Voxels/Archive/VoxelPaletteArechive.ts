import { BinaryBufferFormat } from "../../Util/BinaryBuffer";
import { BinaryBuffer } from "../../Util/BinaryBuffer/BinaryBuffer";
import { StringPalette } from "../../Util/StringPalette";
import { VoxelPalettesRegister } from "../Data/VoxelPalettesRegister";
import { SchemaRegister } from "../State/SchemaRegister";
import { BinarySchemaNodeData } from "../State/State.types";
import { VoxelArchivePaletteData } from "./VoxelArchive.types";

export class VoxelArchivePalette {
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

  toJSON(): VoxelArchivePaletteData {
    return {
      id: this.ids._palette,
      voxelPalette: BinaryBuffer.Create({
        format: BinaryBufferFormat.Uint16,
        length: this.voxelPalette.length,
        buffer: new Uint16Array(this.voxelPalette).buffer,
      }),
      stateSchemaPalette: this.statePalette,
      modSchemaPaette: this.modPalette,
    };
  }
}
