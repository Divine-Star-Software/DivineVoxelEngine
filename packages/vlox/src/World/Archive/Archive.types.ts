import { Vec3Array } from "@amodx/math";
import { LocationData } from "../../Math";

/**
 * Interface for an archived sector.
 */
export interface ArchivedSectorData {
  /** The version of vlox the data was stored in. */
  version: string;
  /** The location of the sector in the world. */
  location: LocationData;
  /** Record of the sector's state, storing dynamic or user-defined data. */
  sectorState: Record<string, any>;
  /** The palette data used within the sector. */
  palettes: ArchivedSectorPaletteData;
  /** Placeholder for future buffer data. */
  buffers: ArchivedSectorBuffersData;
  /** Keys associated with section states and other objects. */
  keys: ArchivedSectorKeysData;
  /** Array of archived section data within the sector. */
  sections: ArchivedSectionData[];
}

/**
 * Interface for the palettes of an archived sector.
 */
export interface ArchivedSectorPaletteData {
  id: string[];
  secondaryId?: string[];
  level?: Uint8Array;
  stateMap: Record<number,any[]>;
  modMap: Record<number,any[]>;
  state: Uint16Array;
  mod: Uint16Array;
  light?: Uint16Array;
  secondaryState?: Uint16Array;
}

/**
 * Interface for the keys of an archived sector.
 */
export interface ArchivedSectorKeysData {
  /** Array of strings that are the keys for the section state struct.  */
  sectionState: string[];
}

/**
 * Placeholder interface for future buffer data in a sector.
 */
export interface ArchivedSectorBuffersData {}

/**
 * Interface for an archived section.
 */
export interface ArchivedSectionData {
  /** Array representing the section's state, holding dynamic or user-defined data. */
  state: any[];
  /** Palette data used within the section. */
  palettes: ArchivedSectionPaletteData;
  /** Buffer data for the section, holding voxel type identifiers, light data, state, and secondary state. */
  buffers: ArchivedSectionBuffers;
}

/**
 * Interface representing the palette data for a single section in the voxel engine.
 */
export interface ArchivedSectionPaletteData {
  id?: Uint16Array;
  light?: Uint16Array;
  level?: Uint8Array;
  secondaryId?: Uint16Array;
  state?: Uint16Array;
  mod?: Uint16Array;
  secondaryState?: Uint16Array;
}

/**
 * Interface representing the buffer data for a section.
 */
export interface ArchivedSectionBuffers {
  id: Uint16Array | Uint8Array | number;
  light: Uint16Array | Uint8Array | number;
  level: Uint8Array | number;
  state: Uint16Array | Uint8Array | number;
  mod: Uint16Array | Uint8Array | number;
  secondary: Uint16Array | Uint8Array | number;
}

/**
 * Interface for an archived area.
 */
export interface ArchivedAreaData {
  /** The version of vlox the data was stored in. */
  version: string;
  /** String representing the dimension or world type the area belongs to. */
  dimension: string;
  /** The palette maps for the area, including voxel, light, and state data. */
  maps: ArchivedAreaMapData;
  /** Keys associated with sector and section states and other objects. */
  keys: ArchivedAreaKeysData;
  /** Array of archived sector data within the area. */
  sectors: ArchivedAreaSectorData[];
}

/**
 * Interface for an archived area maps.
 */
export interface ArchivedAreaMapData {
  /** Record mapping voxel IDs to string identifiers. */
  id: Record<string, string>;
  /** Record mapping string IDs to arrays of voxel identifiers. */
  idPalette: Record<string, string[]>;
  /** Record mapping string IDs to Uint16Arrays of light data. */
  lightPalette: Record<string, Uint16Array>;
  /** Record mapping string IDs to Uint8Arrays of level data. */
  levelPalette: Record<string, Uint8Array>;
  /** Record mapping string IDs to Uint16Arrays of voxel states. */
  statePalette: Record<string, Uint16Array>;
  /** Record mapping string IDs to Uint16Arrays of voxel mods. */
  modPalette: Record<string, Uint16Array>;
  /** Record mapping string IDs to arrays of secondary voxel identifiers. */
  secondaryIdPalette: Record<string, string[]>;
  /** Record mapping string IDs to Uint16Arrays of secondary voxel states. */
  secondaryStatePalette: Record<string, Uint16Array>;
  /** Record mapping section identifiers to `ArchivedSectionData`. */
  section: Record<string, ArchivedSectionData>;
  /** Record mapping sector state identifiers to arrays of state data. */
  sectorState: Record<string, any[]>;
}

/**
 * Interface representing the keys associated with sector and section states within an area.
 */
export interface ArchivedAreaKeysData {
  /** Array of strings that are the keys for the sector state struct.  */
  sectorState: string[];
  /** Array of strings that are the keys for the section state struct.  */
  sectionState: string[];
}

/**
 * Interface representing the palette data for a sector.
 */
export interface ArchivedAreaSectorPaletteData {
  id: string[];
  light?: Uint16Array;
  level?: Uint8Array;
  state?: Uint16Array;
  mod?: Uint16Array;
  stateMap: Record<number,any[]>;
  modMap: Record<number,any[]>;
  secondaryId?: string[];
  secondaryState?: Uint16Array;
}

/**
 * Interface representing the archived data for a sector within an area.
 */
export interface ArchivedAreaSectorData {
  /** A Vec3Array representing the position of the sector within the area. */
  position: Vec3Array;
  /** The state data for the sector, either as an array or a reference string. */
  sectorState: any[] | string;
  /** Buffer data for the sector. */
  buffers: ArchivedSectorBuffersData;
  /** The palette data used within the sector. */
  palettes: ArchivedAreaSectorPaletteData;
  /** Array of archived section data or references to section data. */
  sections: (ArchivedSectionData | string)[];
}
