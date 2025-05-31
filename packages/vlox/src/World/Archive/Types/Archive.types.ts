import { Vector3Like } from "@amodx/math";

export type ArchivedLightSegments = "sun" | "red" | "green" | "blue";

export type ArchivedIndexOrderingType = "XYZ" | "XZY" | "YXZ";

export interface ArchivedDataKey {
  sectorSize: Vector3Like;
  sectionSize: Vector3Like;
  sectionIndexOrder: ArchivedIndexOrderingType;
  sectionBuffersIndexOrder: {
    id: ArchivedIndexOrderingType;
    light: ArchivedIndexOrderingType;
    level: ArchivedIndexOrderingType;
    secondary: ArchivedIndexOrderingType;
  };
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
