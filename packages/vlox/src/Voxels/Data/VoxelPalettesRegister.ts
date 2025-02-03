import { StringPalette } from "../../Util/StringPalette";

export class VoxelPalettesRegister {
  static material = new StringPalette();
  static substance = new StringPalette();
  static voxels = new StringPalette();
  static voxelNametoIdMap = new Map<string, string>();
  static voxelIdToNameMap = new Map<string, string>();
  static loadInVoxel(
    voxelPalette: string[],
    nameToIdMap: Record<string, string>,
    idToNameMap: Record<string, string>
  ) {
    this.voxels = new StringPalette(voxelPalette);
    this.voxelNametoIdMap = new Map<string, string>(
      Object.entries(nameToIdMap)
    );
    this.voxelIdToNameMap = new Map<string, string>(
      Object.entries(idToNameMap)
    );
  }
  static voxelName = {
    getId: (name: string) => this.voxelNametoIdMap.get(name)!,
    getName: (id: string) => this.voxelIdToNameMap.get(id)!,
  };
}
