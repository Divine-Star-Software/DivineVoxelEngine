import { Vec3Array } from "@amodx/math";
import { BinaryBufferData } from "../../Util/Binary/BinaryBuffer";
import { BinarySchemaNodeData } from "../../Voxels/State/State.types";
import { VoxelArchivePaletteData } from "Voxels/Archive/VoxelArchive.types";

export type ArchivedLightSegments = "sun" | "red" | "green" | "blue";
/**
 * Interface for an archived sector.
 */
export interface ArchivedSectorData {
  /** A user provided version of the data. */
  version: string;
  /** The version of vlox the data was stored in. */
  vloxVersion: string;
  dimension: string;
  /** The location of the sector in the world. */
  position: Vec3Array;
  /** Record of the sector's bit flags.  */
  flags: Record<string, boolean>;
  /** Record of the sector's timestamps. */
  timestamps: Record<string, number>;
  /** The palette data used within the sector. */
  palettes: ArchivedSectorPaletteData;
  /** Placeholder for future buffer data. */
  buffers: ArchivedSectorBuffersData;
  /**Contains duplicate data like duplicate sections. */
  duplicates: ArchivedSectorDuplicteData;
  /** Array of archived section data within the sector. */
  sections: (ArchivedSectionData | string)[];
}

export interface ArchivedSectorDuplicteData {
  sections?: Record<string, ArchivedSectionData>;
}

/**
 * Interface for the palettes of an archived sector.
 */
export interface ArchivedSectorPaletteData extends VoxelArchivePaletteData {
  level?: Uint8Array;
  light: Partial<Record<ArchivedLightSegments, Uint8Array>>;
}

/**
 * Placeholder interface for future buffer data in a sector.
 */
export interface ArchivedSectorBuffersData {}

/**
 * Interface for an archived section.
 */
export interface ArchivedSectionData {
  /** Record of the sections's bit flags.  */
  flags?: Record<string, boolean>;
  /** Palette data used within the section. */
  palettes?: ArchivedSectionPaletteData;
  /** Buffer data for the section, holding voxel type identifiers, light data, state, and secondary state. */
  buffers: ArchivedSectionBuffers;
}

/**
 * Interface representing the palette data for a single section in the voxel engine.
 */
export interface ArchivedSectionPaletteData {
  id?: Uint16Array;
  light?: Partial<Record<ArchivedLightSegments, Uint8Array>>;
  level?: Uint8Array;
  secondaryVoxels?: Uint16Array;
}

/**
 * Interface representing the buffer data for a section.
 */
export interface ArchivedSectionBuffers {
  //state
  buried?: Uint8Array | number;
  voxelMap?: Uint8Array | number;
  dirtyMap?: Uint8Array | number;
  //voxel buffers
  id?: BinaryBufferData | number;
  light?: Partial<Record<ArchivedLightSegments, BinaryBufferData | number>>;
  level?: BinaryBufferData | number;
  secondary?: BinaryBufferData | number;
}

/**
 * Interface for an archived area.
 */
export interface ArchivedAreaData {
  /** A user provided version of the data. */
  version: string;
  /** The version of vlox the data was stored in. */
  vloxVersion: string;
  dimension: string;
  /** Array of archived sector data within the area. */
  sectors: ArchivedAreaSectorData[];
}

/**
 * Interface representing the palette data for a sector.
 */
export interface ArchivedAreaSectorPaletteData {
  /**Palette of voxel string ids */
  id: string[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state schema palette id
   * 3 -> state value
   * 4 -> mod schema palette id
   * 5 -> mod value
   */
  voxelPalette: Uint16Array;
  stateSchemaPalette: BinarySchemaNodeData[][];
  modSchemaPaette: BinarySchemaNodeData[][];
  level?: Uint8Array;
  light: Partial<Record<ArchivedLightSegments, Uint8Array>>;
}

/**
 * Interface representing the archived data for a sector within an area.
 */
export interface ArchivedAreaSectorData {
  /** A Vec3Array representing the position of the sector within the area. */
  position: Vec3Array;
  /** Record of the sector's bit flags.  */
  flags: Record<string, boolean>;
  /** Record of the sector's timestamps. */
  timestamps: Record<string, number>;
  /** Buffer data for the sector. */
  buffers: ArchivedSectorBuffersData;
  /** The palette data used within the sector. */
  palettes: ArchivedAreaSectorPaletteData;
  /** Array of archived section data or references to section data. */
  sections: (ArchivedSectionData | string)[];
  duplicates: ArchivedSectorDuplicteData;
}
