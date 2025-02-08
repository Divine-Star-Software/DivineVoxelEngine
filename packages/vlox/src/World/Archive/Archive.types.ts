import { Vec3Array } from "@amodx/math";
import { LocationData } from "../../Math";
import { BinaryBufferData } from "../../Util/Binary/BinaryBuffer";

export type ArchivedLightSegments = "sun" | "red" | "green" | "blue";
/**
 * Interface for an archived sector.
 */
export interface ArchivedSectorData {
  /** A user provided version of the data. */
  version: string;
  /** The version of vlox the data was stored in. */
  vloxVersion: string;
  /** The location of the sector in the world. */
  location: LocationData;
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
export interface ArchivedSectorPaletteData {
  id: string[];
  secondaryId: string[];
  /**A map of sector voxel ids to a palette of store state objects.
   *1. First depth -> voxels
   *2. Second depth -> voxel states
   *3. Third depth -> state object
   */
  stateMap: any[][][];
  /**Same as state map but for secondary voxels */
  secondaryStateMap: any[][][];
  /**A map of sector voxel ids to a palette of store mod state objects.
   *1. First depth -> voxels
   *2. Second depth -> voxel mode states
   *3. Third depth -> mode state object
   */
  modMap: any[][][];
  /**Same as mod map but for secondary voxels */
  secondaryModMap: any[][][];
  level?: Uint8Array;
  light: Partial<Record<ArchivedLightSegments, Uint8Array>>;
  secondaryValue?: Uint16Array;
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
  secondaryId?: Uint16Array;
  /** Palette of sector voxel ids to a palette of state ids for the voxel*/
  state?: Record<number, Uint16Array>;
  /** Palette of sector secondary voxel ids to a palette of state ids for the voxel*/
  secondaryState?: Record<number, Uint16Array>;
  /** Palette of sector voxel ids to a palette of mod ids for the voxel*/
  mod?: Record<number, Uint16Array>;
  /** Palette of sector secondary voxel ids to a palette of mod ids for the voxel*/
  secondaryMod?: Record<number, Uint16Array>;

  secondaryValue?: Uint16Array;
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
  state?: BinaryBufferData | number;
  mod?: BinaryBufferData | number;
  secondary?: BinaryBufferData | number;
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
  secondaryValuePalette: Record<string, Uint16Array>;
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
  light: Uint16Array;
  level: Uint8Array;
  state: Uint16Array;
  mod: Uint16Array;
  stateMap: Record<number, any[]>;
  modMap: Record<number, any[]>;
  secondaryId: string[];
  secondaryValueState: Uint16Array;
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
