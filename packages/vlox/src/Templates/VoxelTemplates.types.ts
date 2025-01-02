import { Vec3Array } from "@amodx/math";

export interface VoxelTemplateBuffers {
  ids: Uint16Array | Uint8Array | number;
  state: Uint16Array | Uint8Array | number;
  mod: Uint16Array | Uint8Array | number;
  secondary: Uint16Array | Uint8Array | number;
}

export interface FullVoxelTemplateData {
  size: Vec3Array;
  ids: Uint16Array;
  state: Uint16Array;
  light: Uint16Array;
  mod: Uint16Array;
  secondary: Uint16Array;
}

export interface VoxelTemplatePaletteData {
  id: string[];
  secondaryId: string[];
  state: Uint16Array;
  mod: Uint16Array;
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
