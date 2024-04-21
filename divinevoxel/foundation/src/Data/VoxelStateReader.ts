enum StateMasks {
  Level = 0b00_1111,
  LevelState = 0b11_0000,
  ShapeState = 0b1111_1111_11_00_0000,
}

/**# Voxel Reader
 * ---
 * Used to decode voxel state data.
 */
export const VoxelStateReader = {
  getLevel(stateData: number) {
    return stateData & StateMasks.Level;
  },
  setLevel(stateData: number, level: number) {
    return (stateData & ~StateMasks.Level) | level;
  },

  getLevelState(stateData: number) {
    return (stateData & StateMasks.LevelState) >> 4;
  },
  setLevelState(stateData: number, levelState: number) {
    return (stateData & ~StateMasks.LevelState) | (levelState << 4);
  },

  getShapeState(voxelData: number) {
    return (voxelData & StateMasks.ShapeState) >> 6;
  },
  setShapeState(voxelData: number, shapeState: number) {
    return (voxelData & ~StateMasks.ShapeState) | (shapeState << 6);
  },
};
