import { Vec3Array } from "@amodx/math";

export interface VoxelTemplateBuffers {
  ids: Uint16Array | Uint8Array;
  state: Uint16Array | Uint8Array;
  secondary: Uint16Array | Uint8Array;
}

export interface VoxelTemplateData {
  size: Vec3Array;
  palette: string[];
  statePalette: Uint16Array;
  voxels: VoxelTemplateBuffers;
}
