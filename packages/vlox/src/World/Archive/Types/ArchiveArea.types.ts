import { BinaryBufferData } from "../../../Util/BinaryBuffer/BinaryBuffer.types";
import { VoxelArchivePaletteData } from "../../../Voxels/Archive/VoxelArchive.types";
import {
  ArchivedLightSegments,
  BaseArchivedDataBase,
  BaseArchivedSectorData,
} from "./Archive.types";
import {
  ArchivedSectionData,
  ArchivedSectorDuplicteData,
} from "./ArchivedSector.types";
/**
 * Interface for an archived area.
 */
export interface ArchivedAreaData extends BaseArchivedDataBase {
  /** Array of archived sector data within the area. */
  sectors: ArchivedAreaSectorData[];
}

/**
 * Interface representing the palette data for a sector.
 */
export interface ArchivedAreaSectorPaletteData extends VoxelArchivePaletteData {
  level?: BinaryBufferData;
  light: Partial<Record<ArchivedLightSegments, BinaryBufferData>>;
}

/**
 * Interface representing the archived data for a sector within an area.
 */
export interface ArchivedAreaSectorData extends BaseArchivedSectorData {
  /** The palette data used within the sector. */
  palettes: ArchivedAreaSectorPaletteData;
  /** Array of archived section data or references to section data. */
  sections: (ArchivedSectionData | string)[];
  duplicates: ArchivedSectorDuplicteData;
}
