import { Vector3Like } from "@amodx/math";
import { IndexOrderingTypes } from "Math/Indexing";
import { ArchivedVoxelPaletteDataKey } from "Voxels/Archive/VoxelArchive.types";
import { WorldSpaceDataKey } from "World/WorldSpaces";

export type ArchivedLightSegments = "sun" | "red" | "green" | "blue";

export interface ArchivedDataKey extends WorldSpaceDataKey {
  voxelPalette: ArchivedVoxelPaletteDataKey;
}

export interface BaseArchivedDataBase {
  dimension: string;
  /** A user provided version of the data. */
  formatVersion: string;
  /** The version of vlox the data was stored in. */
  engineVersion: string;
  dataKey: ArchivedDataKey;
}

export interface BaseArchivedSectorData {
  /** The location of the sector in the world. */
  position: Vector3Like;
  /** Record of the sector's bit flags.  */
  flags: Record<string, boolean>;
  /** Record of the sector's timestamps. */
  timestamps: Record<string, number>;
}

export interface BaseArchivedSectionData {
  /** Record of the section's bit flags.  */
  flags?: Record<string, boolean>;
}

/**
 * Interface representing the palette data for a single section in the voxel engine.
 */
export interface BaseArchivedSectionPaletteData<BufferType> {
  id?: BufferType;
  light?: Partial<Record<ArchivedLightSegments, BufferType>>;
  level?: BufferType;
  secondary?: BufferType;
}

/**
 * Interface representing the buffer data for a section.
 */
export interface BaseArchivedSectionBuffers<BufferType> {
  //voxel buffers
  id?: BufferType;
  light?: Partial<Record<ArchivedLightSegments, BufferType>>;
  level?: BufferType;
  secondary?: BufferType;
}
