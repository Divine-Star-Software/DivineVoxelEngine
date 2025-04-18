import { BinaryBufferData, JSONBinaryBufferData } from "../../Util/Binary/BinaryBuffer";
import { BinarySchemaNodeData } from "../../Voxels/State/State.types";

export type VoxelArchivePaletteData = {
  /**Palette of voxel string ids */
  id: string[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state schema palette id
   * 3 -> state value
   * 4 -> mod schema palette id
   * 5 -> mod value
   */
  voxelPalette: BinaryBufferData;
  stateSchemaPalette: BinarySchemaNodeData[][];
  modSchemaPaette: BinarySchemaNodeData[][];
};


export type VoxelArchiPaveletteExportedJSONData = {
  /**Palette of voxel string ids */
  id: string[];
  /**A palette of voxels and their states and mods in sets 5 of numbers.
   * 1 -> voxel palette id
   * 2 -> state schema palette id
   * 3 -> state value
   * 4 -> mod schema palette id
   * 5 -> mod value
   */
  voxelPalette: JSONBinaryBufferData;
  stateSchemaPalette: BinarySchemaNodeData[][];
  modSchemaPaette: BinarySchemaNodeData[][];
};
