import { StringPalette } from "../../../Util/StringPalette";
import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedLightSegments, ArchivedSectorData } from "../Archive.types";
import { ImportedSection } from "./ImportedSection";
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";

class ImportedSectorPalettes {
  id: StringPalette;
  secondaryId: StringPalette;
  secondaryValue: NumberPalette;
  level?: NumberPalette;
  light: Record<ArchivedLightSegments, NumberPalette | null>;
  state: number[][] = [];
  secondaryState: number[][] = [];
  mod: number[][] = [];
  secondaryMod: number[][] = [];
  constructor(sector: ArchivedSectorData) {
    for (let i = 0; i < sector.palettes.id.length; i++) {
      const voxelId = sector.palettes.id[i];
      if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
      const schema = SchemaRegister.getVoxelSchemas(voxelId);
      const stateMap = sector.palettes.stateMap[i];
      if (stateMap) {
        const stateArray: number[] = [];
        for (let s = 0; s < stateMap.length; s++) {
          stateArray[s] = schema.state.fromStateObject(stateMap[s]);
        }
        this.state[i] = stateArray;
      }

      const modMap = sector.palettes.modMap[i];
      if (modMap) {
        const modArray: number[] = [];
        for (let m = 0; m < modMap.length; m++) {
          modArray[m] = schema.mod.fromStateObject(modMap[m]);
        }
        this.mod[i] = modArray;
      }
    }

    for (let i = 0; i < sector.palettes.secondaryId.length; i++) {
      const voxelId = sector.palettes.secondaryId[i];
      if (!SchemaRegister.hasVoxelSchema(voxelId)) continue;
      const schema = SchemaRegister.getVoxelSchemas(voxelId);
      const stateMap = sector.palettes.secondaryStateMap[i];
      if (stateMap) {
        const stateArray: number[] = [];
        for (let s = 0; s < stateMap.length; s++) {
          stateArray[s] = schema.state.fromStateObject(stateMap[s]);
        }
        this.secondaryState[i] = stateArray;
      }
      const modMap = sector.palettes.secondaryModMap[i];

      if (modMap) {
        const modArray: number[] = [];
        for (let m = 0; m < modMap.length; m++) {
          modArray[m] = schema.mod.fromStateObject(modMap[m]);
        }
        this.secondaryMod[i] = modArray;
      }
    }

    this.id = new StringPalette(sector.palettes.id);
    this.secondaryId = new StringPalette(sector.palettes.secondaryId);
    this.secondaryValue = new NumberPalette(sector.palettes.secondaryValue);
    this.level = sector.palettes.level
      ? new NumberPalette(sector.palettes.level)
      : undefined;
    this.light = {
      sun: sector.palettes.light.sun
        ? new NumberPalette(sector.palettes.light.sun)
        : null,
      red: sector.palettes.light.red
        ? new NumberPalette(sector.palettes.light.red)
        : null,
      green: sector.palettes.light.green
        ? new NumberPalette(sector.palettes.light.green)
        : null,
      blue: sector.palettes.light.blue
        ? new NumberPalette(sector.palettes.light.blue)
        : null,
    };
  }
}

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
}
