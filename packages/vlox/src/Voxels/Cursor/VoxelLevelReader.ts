const LEVEL_MASK = 0b0000_1111;
const LEVEL_STATE_MASK = 0b1111_0000;
/**# Voxel Reader
 * ---
 * Used to decode voxel state data.
 */
export class VoxelLevelReader {
  static getLevel(levelData: number) {
    return levelData & LEVEL_MASK;
  }
  static setLevel(levelData: number, level: number) {
    return (levelData & ~LEVEL_MASK) | level;
  }

  static getLevelState(levelData: number) {
    return (levelData & LEVEL_STATE_MASK) >> 4;
  }
  static setLevelState(levelData: number, levelState: number) {
    return (levelData & ~LEVEL_STATE_MASK) | (levelState << 4);
  }
}
