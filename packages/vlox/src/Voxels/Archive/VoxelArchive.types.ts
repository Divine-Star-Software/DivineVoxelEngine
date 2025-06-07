import {
  BinaryBufferData,
  JSONBinaryBufferData,
} from "../../Util/BinaryBuffer/BinaryBuffer.types";
import { BinarySchemaNodeData } from "../../Voxels/State/State.types";
export interface ArchivedVoxelDataForPalette {
  id: string;
  stateSchemaId?: string;
  modSchema?: BinarySchemaNodeData[];
}

export type VoxelArchivePaletteData = {
  /**Palette of voxel string ids */
  voxels: ArchivedVoxelDataForPalette[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state value
   * 3 -> mod value
   */
  voxelPalette: BinaryBufferData;
  stateSchemas: Record<string, BinarySchemaNodeData[]>;
};

export type VoxelArchiPaveletteExportedJSONData = {
  /**Palette of voxel string ids */
  voxels: ArchivedVoxelDataForPalette[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state value
   * 3 -> mod value
   */
  voxelPalette: JSONBinaryBufferData;
  stateSchemas: Record<string, BinarySchemaNodeData[]>;
};
