import {
  BinaryBufferData,
  JSONBinaryBufferData,
} from "../../Util/BinaryBuffer/BinaryBuffer.types";
import { VoxelBinaryStateSchemaNode } from "../../Voxels/State/State.types";
export interface ArchivedVoxelDataForPalette {
  id: string;
  name?: string;
  stateSchemaId?: string;
  modSchema?: VoxelBinaryStateSchemaNode[];
}

export enum VoxelPaletteCompents {
  VoxelId = "voxelId",
  ModValue = "modValue",
  StateValue = "stateValue",
}

export interface VoxelPaletteComponent {
  type: VoxelPaletteCompents;
  index: number;
}

export interface ArchivedVoxelPaletteDataKey {
  stride: number;
  components: VoxelPaletteComponent[];
}

export interface VoxelArchivePaletteData {
  /**Palette of voxel string ids */
  voxels: ArchivedVoxelDataForPalette[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state value
   * 3 -> mod value
   */
  voxelPalette: BinaryBufferData;
  stateSchemas: Record<string, VoxelBinaryStateSchemaNode[]>;
}

export interface VoxelArchiPaveletteExportedJSONData {
  /**Palette of voxel string ids */
  voxels: ArchivedVoxelDataForPalette[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state value
   * 3 -> mod value
   */
  voxelPalette: JSONBinaryBufferData;
  stateSchemas: Record<string, VoxelBinaryStateSchemaNode[]>;
}
