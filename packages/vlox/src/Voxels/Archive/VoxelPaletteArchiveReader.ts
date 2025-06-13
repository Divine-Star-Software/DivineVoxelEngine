import { SchemaRegister } from "../State/SchemaRegister";
import { BinarySchema } from "../State/Schema/BinarySchema";
import {
  ArchivedVoxelDataForPalette,
  VoxelArchivePaletteData,
} from "./VoxelArchive.types";
import { BinaryBuffer } from "../../Util/BinaryBuffer/BinaryBuffer";

const temp: [id: string, state: number, mod: number] = ["", 0, 0];
export class VoxelPaletteArchiveReader {
  voxelPalette: Uint16Array;

  _voxels: ArchivedVoxelDataForPalette[] = [];
  _voxelStateSchema = new Map<string, BinarySchema>();
  _stateSchemas = new Map<string, BinarySchema>();
  _modSchema = new Map<string, BinarySchema>();
  constructor(palettes: VoxelArchivePaletteData) {
    this._voxels = palettes.voxels;

    for (const key in palettes.stateSchemas) {
      const nodes = palettes.stateSchemas[key];
      this._stateSchemas.set(key, new BinarySchema(nodes));
    }
    for (let i = 0; i < this._voxels.length; i++) {
      const voxel = this._voxels[i];
      if (voxel.modSchema) {
        const binarySchema = new BinarySchema(voxel.modSchema);
        this._modSchema.set(voxel.id, binarySchema);
      }
      if (voxel.stateSchemaId && this._stateSchemas.has(voxel.stateSchemaId)) {
        this._voxelStateSchema.set(
          voxel.stateSchemaId,
          this._stateSchemas.get(voxel.stateSchemaId)!
        );
      }
    }

    this.voxelPalette = BinaryBuffer.ToTypedArray(
      palettes.voxelPalette
    ) as Uint16Array;
  }

  getVoxelData(id: number) {
    const index = id * 3;
    const voxelId = this._voxels[this.voxelPalette[index]]?.id;
    temp[0] = voxelId;
    if (temp[0] == "dve_air") {
      temp[1] = 0;
      temp[2] = 0;
      return temp;
    }
    const voxelSchema = SchemaRegister.getVoxelSchemas(voxelId);
    let finalStateValue = 0;

    if (this._voxelStateSchema.has(voxelId)) {
      const stateSchema = this._voxelStateSchema.get(voxelId)!;
      const stateValue = this.voxelPalette[index + 1];
      stateSchema.startEncoding(stateValue);
      for (const node of stateSchema.nodes) {
        if (node.valuePalette) {
          voxelSchema.state.setValue(
            node.name,
            stateSchema.getValue(node.name)
          );
        } else {
          voxelSchema.state.setNumber(
            node.name,
            stateSchema.getNumber(node.name)
          );
        }
      }
      finalStateValue = stateSchema.getEncoded();
    }
    temp[1] = finalStateValue;
    let finalModValue = 0;
    if (this._modSchema.has(voxelId)) {
      const modSchema = this._modSchema.get(voxelId)!;
      const modValue = this.voxelPalette[index + 2];
      modSchema.startEncoding(modValue);
      for (const node of modSchema.nodes) {
        if (node.valuePalette) {
          voxelSchema.mod.setValue(node.name, modSchema.getValue(node.name));
        } else {
          voxelSchema.mod.setNumber(node.name, modSchema.getNumber(node.name));
        }
      }
      finalModValue = modSchema.getEncoded();
    }
    temp[2] = finalModValue;
    return temp;
  }
}
