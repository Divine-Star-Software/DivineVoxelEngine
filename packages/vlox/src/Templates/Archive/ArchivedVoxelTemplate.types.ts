import {
  VoxelArchivePaletteData,
  VoxelArchiPaveletteExportedJSONData,
} from "../../Voxels/Archive/VoxelArchive.types";
import {
  BinaryBufferData,
  JSONBinaryBufferData,
} from "../../Util/Binary/BinaryBuffer";
import { IVoxelTemplateData } from "../VoxelTemplates.types";

export interface ArchivedVoxelTemplateBuffers {
  ids?: BinaryBufferData;
  level?: BinaryBufferData;
  secondary?: BinaryBufferData ;
}

export interface ArchivedVoxelTemplatePaletteData
  extends VoxelArchivePaletteData {
  level: BinaryBufferData;
  secondary: BinaryBufferData;
}

export interface ArchivedVoxelTemplateData
  extends IVoxelTemplateData<"archived"> {
  /** A user provided version of the data. */
  version: string;
  /** The version of vlox the data was stored in. */
  vloxVersion: string;
  palettes: ArchivedVoxelTemplatePaletteData;
  buffers: ArchivedVoxelTemplateBuffers;
}


export interface ArchivedVoxelTemplatePaletteDataExportedJSONData
  extends VoxelArchiPaveletteExportedJSONData {
  level: JSONBinaryBufferData;
  secondary: JSONBinaryBufferData;
}

export interface ArchivedVoxelTemplateBuffersExportdJSONData {
  ids?: JSONBinaryBufferData;
  level?: JSONBinaryBufferData;
  secondary?: JSONBinaryBufferData;
}

export interface ArchivedVoxelTemplateExportedJSONData
  extends IVoxelTemplateData<"archived"> {
  /** A user provided version of the data. */
  version: string;
  /** The version of vlox the data was stored in. */
  vloxVersion: string;
  palettes: ArchivedVoxelTemplatePaletteDataExportedJSONData;
  buffers: ArchivedVoxelTemplateBuffersExportdJSONData;
}
