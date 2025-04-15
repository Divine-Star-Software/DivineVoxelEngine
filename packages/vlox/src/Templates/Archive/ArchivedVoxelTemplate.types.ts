import { VoxelArchivePaletteData } from "../../Voxels/Archive/VoxelArchive.types";
import { BinaryBufferData } from "../../Util/Binary/BinaryBuffer";
import { IVoxelTemplateData } from "../VoxelTemplates.types";

export interface ArchivedVoxelTemplateBuffers {
  ids?: BinaryBufferData | number;
  level?: BinaryBufferData | number;
  secondary?: BinaryBufferData | number;
}

export interface ArchivedVoxelTemplatePaletteData
  extends VoxelArchivePaletteData {
  level: Uint8Array;
  secondary: Uint16Array | Uint8Array;
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
