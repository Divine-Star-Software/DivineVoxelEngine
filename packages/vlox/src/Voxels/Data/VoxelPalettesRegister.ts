import { StringPalette } from "../../Util/StringPalette";

export class VoxelPalettesRegister {
  static material = new StringPalette();
  static substance = new StringPalette();
  static voxels = new StringPalette();
  static voxelNametoIdMap = new Map<string, string>();
  static voxelIdToNameMap = new Map<string, string>();

}
