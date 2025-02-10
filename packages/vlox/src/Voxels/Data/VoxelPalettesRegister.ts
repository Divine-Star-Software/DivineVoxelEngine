import { NumberPalette } from "../../Util/NumberPalette";
import { StringPalette } from "../../Util/StringPalette";

export class VoxelPalettesRegister {
  static material = new StringPalette();
  static substance = new StringPalette();

  static voxelIds = new StringPalette();
  static voxelNametoIdMap = new Map<string, string>();
  static voxelIdToNameMap = new Map<string, string>();

  static state = new NumberPalette();
  static mod = new NumberPalette();

  static getVoxelId(id: number, state: number = 0, mod: number = 0) {
    return this.voxelRecord[id][mod][state];
  }
  static getVoxelIdFromString(id: string, state: number = 0, mod: number = 0) {
    return this.voxelRecord[this.voxelIds.getNumberId(id)][mod][state];
  }
  static getVoxelIdFromName(name: string, state: number = 0, mod: number = 0) {
    return this.voxelRecord[
      this.voxelIds.getNumberId(this.voxelNametoIdMap.get(name)!)
    ][mod][state];
  }
  /**Palette of voxel ids to their tree id, state, and mod value */
  static voxels: [voxelId: number, state: number, mod: number][] = [];
  /**Palette of true voxel ids to state then their mod then the final palette voxel id */
  static voxelRecord: number[][][] = [];
}
