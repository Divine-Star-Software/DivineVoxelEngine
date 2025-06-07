
import { NumberPalette } from "../../../Util/NumberPalette";
import { ArchivedLightSegments, ArchivedSectorData } from "../Types/index";
import { ImportedSection } from "./ImportedSection";
import { BinarySchema } from "../../../Voxels/State/Schema/BinarySchema";
import { BinaryBuffer } from "../../../Util/BinaryBuffer/BinaryBuffer";
import { VoxelPaletteArchiveReader } from "../../../Voxels/Archive/VoxelPaletteArchiveReader";

class ImportedSectorPalettes {
  voxelPalette: Uint16Array;

  stateSchemas = new Map<number, BinarySchema>();
  modSchema = new Map<number, BinarySchema>();

  level?: NumberPalette;
  light: Record<ArchivedLightSegments, NumberPalette | null>;

  constructor(sector: ArchivedSectorData) {
    this.voxelPalette = BinaryBuffer.ToTypedArray(
      sector.palettes.voxelPalette
    )! as Uint16Array;

    this.level = sector.palettes.level
      ? new NumberPalette(BinaryBuffer.ToTypedArray(sector.palettes.level))
      : undefined;
    this.light = {
      sun: sector.palettes.light?.sun
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(sector.palettes.light.sun)
          )
        : null,
      red: sector.palettes.light?.red
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(sector.palettes.light.red)
          )
        : null,
      green: sector.palettes.light?.green
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(sector.palettes.light.green)
          )
        : null,
      blue: sector.palettes.light?.blue
        ? new NumberPalette(
            BinaryBuffer.ToTypedArray(sector.palettes.light.blue)
          )
        : null,
    };
  }
}

const temp: [id: string, state: number, mod: number] = ["", 0, 0];
export class ImportedSector {
  sections: ImportedSection[] = [];
  palettes: ImportedSectorPalettes;
  voxels: VoxelPaletteArchiveReader;
  constructor(public sector: ArchivedSectorData) {
    this.palettes = new ImportedSectorPalettes(sector);
    this.voxels = new VoxelPaletteArchiveReader(sector.palettes);
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
