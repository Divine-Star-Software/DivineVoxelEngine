import { Vec3Array } from "@amodx/math";
import { LocationData } from "../Math";

/**
 * Interface for an archived column.
 */
export interface ArchivedColumnData {
  /** Number representing the version of the archiver used. */
  archiverVersion: number;
  /** Number representing the version of the column data. */
  version: number;
  /** The location of the column in the world. */
  location: LocationData;
  /** Record of the column's state, storing dynamic or user-defined data. */
  columnState: Record<string, any>;
  /** The palette data used within the column. */
  palettes: ArchivedColumnPaletteData;
  /** Placeholder for future buffer data. */
  buffers: ArchivedColumnBuffersData;
  /** Keys associated with chunk states and other objects. */
  keys: ArchivedColumnKeysData;
  /** Array of archived chunk data within the column. */
  chunks: ArchivedChunkData[];
}

/**
 * Interface for the palettes of an archived column.
 */
export interface ArchivedColumnPaletteData {
  /** Array of strings representing the unique identifiers for the primary voxel types in the column. */
  id: string[];
  /** Optional array of strings for the secondary voxel types, providing additional data for complex structures. */
  secondaryId?: string[];
  /** Optional Uint16Array representing the state of voxels, indicating specific conditions or variations. */
  state?: Uint16Array;
  /** Optional Uint16Array representing the mod state of voxels, indicating specific conditions or variations. */
  mod?: Uint16Array;
  /** Optional Uint16Array representing light levels for each voxel in the column. */
  light?: Uint16Array;
  /** Optional Uint16Array representing the state of secondary voxels. */
  secondaryState?: Uint16Array;
}

/**
 * Interface for the keys of an archived column.
 */
export interface ArchivedColumnKeysData {
  /** Array of strings that are the keys for the chunk state struct.  */
  chunkState: string[];
}

/**
 * Placeholder interface for future buffer data in a column.
 */
export interface ArchivedColumnBuffersData {}

/**
 * Interface for an archived chunk.
 */
export interface ArchivedChunkData {
  /** Array representing the chunk's state, holding dynamic or user-defined data. */
  state: any[];
  /** Palette data used within the chunk. */
  palettes: ArchivedChunkPaletteData;
  /** Buffer data for the chunk, holding voxel type identifiers, light data, state, and secondary state. */
  buffers: ArchivedChunkBuffers;
}

/**
 * Interface representing the palette data for a single chunk in the voxel engine.
 */
export interface ArchivedChunkPaletteData {
  /** Optional Uint16Array representing the voxel type identifiers within the chunk. */
  id?: Uint16Array;
  /** Optional Uint16Array for storing light data. */
  light?: Uint16Array;
  /** Optional Uint16Array for secondary voxel type identifiers. */
  secondaryId?: Uint16Array;
  /** Optional Uint16Array for storing voxel states within the chunk. */
  state?: Uint16Array;
  /** Optional Uint16Array for storing mod data. */
  mod?: Uint16Array;
  /** Optional Uint16Array for storing states of secondary voxels. */
  secondaryState?: Uint16Array;
}

/**
 * Interface representing the buffer data for a chunk.
 */
export interface ArchivedChunkBuffers {
  /** The buffer for voxel type identifiers, which could be a Uint16Array, Uint8Array, or a single number if all voxels are the same. */
  id: Uint16Array | Uint8Array | number;
  /** The buffer for light data, which could be a Uint16Array, Uint8Array, or a single number if all light values are the same. */
  light: Uint16Array | Uint8Array | number;
  /** The buffer for voxel states, which could be a Uint16Array, Uint8Array, or a single number if all states are the same. */
  state: Uint16Array | Uint8Array | number;
  /** The buffer for voxel mod states, which could be a Uint16Array, Uint8Array, or a single number if all states are the same. */
  mod: Uint16Array | Uint8Array | number;
  /** The buffer for secondary voxel data, which could be a Uint16Array, Uint8Array, or a single number if all secondary data is the same. */
  secondary: Uint16Array | Uint8Array | number;
}

/**
 * Interface for an archived area.
 */
export interface ArchivedAreaData {
  /** Number representing the version of the archiver used. */
  archiverVersion: number;
  /** Number representing the version of the area data. */
  version: number;
  /** String representing the dimension or world type the area belongs to. */
  dimension: string;
  /** The palette maps for the area, including voxel, light, and state data. */
  maps: ArchivedAreaMapData;
  /** Keys associated with column and chunk states and other objects. */
  keys: ArchivedAreaKeysData;
  /** Array of archived column data within the area. */
  columns: ArchivedAreaColumnData[];
}

/**
 * Interface for an archived area maps.
 */
export interface ArchivedAreaMapData {
  /** Record mapping voxel IDs to string identifiers. */
  id: Record<string, string>;
  /** Record mapping string IDs to arrays of voxel identifiers. */
  idPalette: Record<string, string[]>;
  /** Record mapping string IDs to arrays of secondary voxel identifiers. */
  secondaryIdPalette: Record<string, string[]>;
  /** Record mapping string IDs to Uint16Arrays of light data. */
  lightPalette: Record<string, Uint16Array>;
  /** Record mapping string IDs to Uint16Arrays of voxel states. */
  statePalette: Record<string, Uint16Array>;
  /** Record mapping string IDs to Uint16Arrays of voxel mods. */
  modPalette: Record<string, Uint16Array>;
  /** Record mapping string IDs to Uint16Arrays of secondary voxel states. */
  secondaryStatePalette: Record<string, Uint16Array>;
  /** Record mapping chunk identifiers to `ArchivedChunkData`. */
  chunk: Record<string, ArchivedChunkData>;
  /** Record mapping column state identifiers to arrays of state data. */
  columnState: Record<string, any[]>;
}

/**
 * Interface representing the keys associated with column and chunk states within an area.
 */
export interface ArchivedAreaKeysData {
  /** Array of strings that are the keys for the column state struct.  */
  columnState: string[];
  /** Array of strings that are the keys for the chunk state struct.  */
  chunkState: string[];
}

/**
 * Interface representing the palette data for a column within an area.
 */
export interface ArchivedAreaColumnPaletteData {
  /** Array of strings representing the unique identifiers for the primary voxel types in the column. */
  id: string[];
  /** Optional array of strings for secondary voxel types. */
  secondary?: string[];
  /** Optional Uint16Array representing the state of voxels in the column. */
  state?: Uint16Array;
  /** Optional Uint16Array representing the mod of voxels in the column. */
  mod?: Uint16Array;
  /** Optional Uint16Array representing light levels for each voxel in the column. */
  light?: Uint16Array;
  /** Optional Uint16Array representing the state of secondary voxels. */
  secondaryState?: Uint16Array;
}

/**
 * Interface representing the archived data for a column within an area.
 */
export interface ArchivedAreaColumnData {
  /** A Vec3Array representing the position of the column within the area. */
  position: Vec3Array;
  /** The state data for the column, either as an array or a reference string. */
  columnState: any[] | string;
  /** Buffer data for the column. */
  buffers: ArchivedColumnBuffersData;
  /** The palette data used within the column. */
  palettes: ArchivedAreaColumnPaletteData;
  /** Array of archived chunk data or references to chunk data. */
  chunks: (ArchivedChunkData | string)[];
}
