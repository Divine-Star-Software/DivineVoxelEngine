import { JSONBinaryBufferData } from "../../../Util/BinaryBuffer/BinaryBuffer.types";
import {
  ArchivedLightSegments,
  BaseArchivedDataBase,
  BaseArchivedSectionBuffers,
  BaseArchivedSectionData,
  BaseArchivedSectionPaletteData,
  BaseArchivedSectorData,
} from "./Archive.types";
import { ArchiveAreaPalettesData } from "./ArchiveArea.types";

export interface ArchivedSectorDuplicteJSONData {
  sections?: Record<string, ArchivedSectionJSONData>;
}

/**
 * Interface for an archived section.
 */
export interface ArchivedSectionJSONData extends BaseArchivedSectionData {
  /** Palette data used within the section. */
  palettes?: ArchivedSectionPaletteJSONData;
  /** Buffer data for the section, holding voxel type identifiers, light data, state, and secondary state. */
  buffers: ArchivedSectionBuffersJSONData;
}

/**
 * Interface representing the palette data for a single section in the voxel engine.
 */
export interface ArchivedSectionPaletteJSONData
  extends BaseArchivedSectionPaletteData<JSONBinaryBufferData> {}

/**
 * Interface representing the buffer data for a section.
 */
export interface ArchivedSectionBuffersJSONData
  extends BaseArchivedSectionBuffers<JSONBinaryBufferData> {}

/**
 * Interface for an archived area.
 */
export interface ArchivedAreaJSONData extends BaseArchivedDataBase {
  palettes: ArchiveAreaPalettesData;
  /** Array of archived sector data within the area. */
  sectors: ArchivedAreaSectorJSONData[];
}

/**
 * Interface representing the palette data for a sector.
 */
export interface ArchivedAreaSectorPaletteJSONData {
  id: string[];
  voxelPalette: JSONBinaryBufferData;
  level?: JSONBinaryBufferData;
  light?: Partial<Record<ArchivedLightSegments, JSONBinaryBufferData>>;
}

/**
 * Interface representing the archived data for a sector within an area.
 */
export interface ArchivedAreaSectorJSONData extends BaseArchivedSectorData {
  /** The palette data used within the sector. */
  palettes: ArchivedAreaSectorPaletteJSONData;
  /** Array of archived section data or references to section data. */
  sections: (ArchivedSectionJSONData | string)[];
  duplicates: ArchivedSectorDuplicteJSONData;
}
