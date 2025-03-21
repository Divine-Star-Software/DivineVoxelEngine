import { Vec3Array } from "@amodx/math";
import { IVoxelTemplateData } from "../VoxelTemplates.types";

export interface VoxelTemplateBuffers {
  ids: Uint16Array | Uint8Array | number;
  level: Uint8Array | number;
  secondary: Uint16Array | Uint8Array | number;
}

export interface VoxelTemplatePaletteData {
  id: string[];
  level: Uint8Array;
  secondaryId: string[];
  secondaryState: Uint16Array;
}

export interface ArchivedVoxelTemplateData
  extends IVoxelTemplateData<"archived"> {
  /** Number representing the version of the templator used. */
  templatorVersion: number;
  /** Number representing the version of the voxel data. */
  version: number;
  palettes: VoxelTemplatePaletteData;
  buffers: VoxelTemplateBuffers;
}
