import { SchemaRegister } from "../State/SchemaRegister";
import { StringPalette } from "../../Util/StringPalette";
import { BinarySchema } from "../State/Schema/BinarySchema";
import { BinarySchemaNodeData } from "../../Voxels/State/State.types";
import { VoxelArchivePaletteData } from "./VoxelArchive.types";
import { BinaryBuffer } from "../../Util/BinaryBuffer/BinaryBuffer";

const temp: [id: string, state: number, mod: number] = ["", 0, 0];
export class VoxelPaletteArchiveReader {
  id: StringPalette;
  voxelPalette: Uint16Array;
  statePalette: BinarySchemaNodeData[][] = [];
  modPalette: BinarySchemaNodeData[][] = [];

  stateSchemas = new Map<number, BinarySchema>();
  modSchema = new Map<number, BinarySchema>();
  constructor(palettes: VoxelArchivePaletteData) {
    this.id = new StringPalette(palettes.id);
    this.voxelPalette = BinaryBuffer.ToTypedArray(
      palettes.voxelPalette
    ) as Uint16Array;
    this.statePalette = palettes.stateSchemaPalette;
    this.modPalette = palettes.modSchemaPaette;
  }

  getVoxelData(id: number) {
    const index = id * 5;
    temp[0] = this.id.getStringId(this.voxelPalette[index]);
    if (temp[0] == "dve_air") {
      temp[1] = 0;
      temp[2] = 0;
      return temp;
    }
    const voxelSchema = SchemaRegister.getVoxelSchemas(temp[0]);
    let finalStateValue = 0;
    const statePaletteId = this.voxelPalette[index + 1];
    if (statePaletteId != 0) {
      const stateNodes = this.statePalette[statePaletteId];
      if (!this.stateSchemas.get(statePaletteId)!)
        this.stateSchemas.set(statePaletteId, new BinarySchema(stateNodes));
      const stateSchema = this.stateSchemas.get(statePaletteId)!;
      const stateValue = this.voxelPalette[index + 2];
      stateSchema.startEncoding(stateValue);
      for (const node of stateNodes) {
        if (node.valuePalette) {
          voxelSchema.state.setValue(node.id, stateSchema.getValue(node.id));
        } else {
          voxelSchema.state.setNumber(node.id, stateSchema.getNumber(node.id));
        }
      }
      finalStateValue = stateSchema.getEncoded();
    }
    temp[1] = finalStateValue;
    let finalModValue = 0;
    const modPaletteId = this.voxelPalette[index + 3];
    if (modPaletteId != 0) {
      const modNodes = this.modPalette[modPaletteId];

      if (!this.modSchema.get(modPaletteId)!)
        this.modSchema.set(modPaletteId, new BinarySchema(modNodes));
      const modSchema = this.modSchema.get(modPaletteId)!;
      const modValue = this.voxelPalette[index + 4];
      modSchema.startEncoding(modValue);
      for (const node of modNodes) {
        if (node.valuePalette) {
          voxelSchema.mod.setValue(node.id, modSchema.getValue(node.id));
        } else {
          voxelSchema.mod.setNumber(node.id, modSchema.getNumber(node.id));
        }
      }
      finalModValue = modSchema.getEncoded();
    }
    temp[2] = finalModValue;
    return temp;
  }
}
