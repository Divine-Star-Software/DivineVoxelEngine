import {
  VoxelArchivePaletteData,
  VoxelArchiPaveletteExportedJSONData,
  ArchivedVoxelPaletteDataKey,
} from "../../Voxels/Archive/VoxelArchive.types";
import {
  BinaryBufferData,
  JSONBinaryBufferData,
} from "../../Util/BinaryBuffer/BinaryBuffer.types";
import { IVoxelTemplateData } from "../VoxelTemplates.types";
import { IndexOrderingTypes } from "../../Math/Indexing";

export interface ArchivedVoxelTemplateDataKey {
  voxelPalette: ArchivedVoxelPaletteDataKey;
  arrayOrders: {
    id: IndexOrderingTypes;
    level: IndexOrderingTypes;
    secondary: IndexOrderingTypes;
  };
}

export interface ArchivedVoxelTemplateBuffers {
  ids?: BinaryBufferData;
  level?: BinaryBufferData;
  secondary?: BinaryBufferData;
}

export interface ArchivedVoxelTemplatePaletteData
  extends VoxelArchivePaletteData {
  level?: BinaryBufferData;
  secondary?: BinaryBufferData;
}

export interface BaseVoxelTemplateData extends IVoxelTemplateData<"archived"> {
  /** A user provided version of the data. */
  formatVersion: string;
  /** The version of vlox the data was stored in. */
  engineVersion: string;
  dataKey: ArchivedVoxelTemplateDataKey;
}

export interface ArchivedVoxelTemplateData extends BaseVoxelTemplateData {
  palettes: ArchivedVoxelTemplatePaletteData;
  buffers: ArchivedVoxelTemplateBuffers;
}

export interface ArchivedVoxelTemplatePaletteDataExportedJSONData
  extends VoxelArchiPaveletteExportedJSONData {
  level?: JSONBinaryBufferData;
  secondary?: JSONBinaryBufferData;
}

export interface ArchivedVoxelTemplateBuffersExportdJSONData {
  ids?: JSONBinaryBufferData;
  level?: JSONBinaryBufferData;
  secondary?: JSONBinaryBufferData;
}

export interface ArchivedVoxelTemplateExportedJSONData
  extends BaseVoxelTemplateData {
  palettes: ArchivedVoxelTemplatePaletteDataExportedJSONData;
  buffers: ArchivedVoxelTemplateBuffersExportdJSONData;
}
