import { Vec3Array } from "@amodx/math";
import { VoxelDataArrays } from "../Voxels";

export interface VoxelTemplateBuffers {
  ids: Uint16Array | Uint8Array | number;
  level: Uint8Array | number;
  secondary: Uint16Array | Uint8Array | number;
}

export interface FullVoxelTemplateData extends VoxelDataArrays {
  size: Vec3Array;
}

export interface VoxelTemplatePaletteData {
  id: string[];
  level: Uint8Array;
  secondaryId: string[];
  secondaryState: Uint16Array;
}

export interface VoxelTemplateData {
  /** Number representing the version of the templator used. */
  templatorVersion: number;
  /** Number representing the version of the voxel data. */
  version: number;
  size: Vec3Array;
  palettes: VoxelTemplatePaletteData;
  buffers: VoxelTemplateBuffers;
}
