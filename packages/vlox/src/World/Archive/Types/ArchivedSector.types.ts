import { BinaryBufferData } from "../../../Util/BinaryBuffer/BinaryBuffer.types";
import { VoxelArchivePaletteData } from "../../../Voxels/Archive/VoxelArchive.types";
import {
  ArchivedLightSegments,
  BaseArchivedDataBase,
  BaseArchivedSectionBuffers,
  BaseArchivedSectionData,
  BaseArchivedSectionPaletteData,
  BaseArchivedSectorData,
} from "./Archive.types";

/**
 * Interface for an archived sector.
 */
export interface ArchivedSectorData
  extends BaseArchivedDataBase,
    BaseArchivedSectorData {
  /** The palette data used within the sector. */
  palettes: ArchivedSectorPaletteData;
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
  level?: BinaryBufferData;
  light?: Partial<Record<ArchivedLightSegments, BinaryBufferData>>;
}


/**
 * Interface for an archived section.
 */
export interface ArchivedSectionData extends BaseArchivedSectionData {
  /** Palette data used within the section. */
  palettes?: ArchivedSectionPaletteData;
  /** Buffer data for the section, holding voxel type identifiers, light data, state, and secondary state. */
  buffers: ArchivedSectionBuffers;
}

/**
 * Interface representing the palette data for a single section in the voxel engine.
 */
export interface ArchivedSectionPaletteData
  extends BaseArchivedSectionPaletteData<BinaryBufferData> {}

/**
 * Interface representing the buffer data for a section.
 */
export interface ArchivedSectionBuffers
  extends BaseArchivedSectionBuffers<BinaryBufferData> {}
