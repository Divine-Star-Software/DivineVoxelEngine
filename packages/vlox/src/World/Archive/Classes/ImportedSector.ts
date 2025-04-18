import { StringPalette } from "../../../Util/StringPalette";
import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedLightSegments, ArchivedSectorData } from "../Archive.types";
import { ImportedSection } from "./ImportedSection";
import { BinarySchemaNodeData } from "../../../Voxels/State/State.types";
import { BinarySchema } from "../../../Voxels/State/Schema/BinarySchema";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";

class ImportedSectorPalettes {
  id: StringPalette;
  voxelPalette: Uint16Array;
  statePalette: BinarySchemaNodeData[][] = [];
  modPalette: BinarySchemaNodeData[][] = [];

  stateSchemas = new Map<number, BinarySchema>();
  modSchema = new Map<number, BinarySchema>();

  level?: NumberPalette;
  light: Record<ArchivedLightSegments, NumberPalette | null>;

  constructor(sector: ArchivedSectorData) {
    this.id = new StringPalette(sector.palettes.id);
    this.voxelPalette = BinaryBuffer.ToTypedArray(
      sector.palettes.voxelPalette
    )! as Uint16Array;
    this.statePalette = sector.palettes.stateSchemaPalette;
    this.modPalette = sector.palettes.modSchemaPaette;

    this.level = sector.palettes.level
      ? new NumberPalette(BinaryBuffer.ToTypedArray(sector.palettes.level))
      : undefined;
    this.light = {
      sun: sector.palettes.light.sun
        ? new NumberPalette(BinaryBuffer.ToTypedArray( sector.palettes.light.sun))
        : null,
      red: sector.palettes.light.red
        ? new NumberPalette(BinaryBuffer.ToTypedArray(sector.palettes.light.red))
        : null,
      green: sector.palettes.light.green
        ? new NumberPalette(BinaryBuffer.ToTypedArray(sector.palettes.light.green))
        : null,
      blue: sector.palettes.light.blue
        ? new NumberPalette(BinaryBuffer.ToTypedArray(sector.palettes.light.blue))
        : null,
    };
  }
}

const temp: [id: string, state: number, mod: number] = ["", 0, 0];
export class ImportedSector {
  sections: ImportedSection[] = [];
  palettes: ImportedSectorPalettes;
  constructor(public sector: ArchivedSectorData) {
    this.palettes = new ImportedSectorPalettes(sector);

    for (
      let sectionIndex = 0;
      sectionIndex < sector.sections.length;
      sectionIndex++
    ) {
      const archivedSectionValue = sector.sections[sectionIndex];
      const archivedSection =
        typeof archivedSectionValue == "string"
          ? sector.duplicates?.sections?.[archivedSectionValue]!
          : archivedSectionValue;
      this.sections[sectionIndex] = new ImportedSection(
        sectionIndex,
        this,
        archivedSection
      );
    }
  }

  getVoxelData(id: number) {
    const index = id * 5;
    temp[0] = this.palettes.id.getStringId(this.palettes.voxelPalette[index]);
    if (temp[0] == "dve_air") {
      temp[1] = 0;
      temp[2] = 0;
      return temp;
    }
    const voxelSchema = SchemaRegister.getVoxelSchemas(temp[0]);
    let finalStateValue = 0;
    const statePaletteId = this.palettes.voxelPalette[index + 1];
    if (statePaletteId != 0) {
      const stateNodes = this.palettes.statePalette[statePaletteId];
      if (!this.palettes.stateSchemas.get(statePaletteId)!)
        this.palettes.stateSchemas.set(
          statePaletteId,
          new BinarySchema(stateNodes)
        );
      const stateSchema = this.palettes.stateSchemas.get(statePaletteId)!;
      const stateValue = this.palettes.voxelPalette[index + 2];
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
    const modPaletteId = this.palettes.voxelPalette[index + 3];
    if (modPaletteId != 0) {
      const modNodes = this.palettes.modPalette[modPaletteId];

      if (!this.palettes.modSchema.get(modPaletteId)!)
        this.palettes.modSchema.set(modPaletteId, new BinarySchema(modNodes));
      const modSchema = this.palettes.modSchema.get(modPaletteId)!;
      const modValue = this.palettes.voxelPalette[index + 4];
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
