const voxelStateMasks = {
 level: 0b00_1111,
 levelState: 0b11_0000,
 shapeState: 0b1111_1111_11_00_0000,
 extraVoxelId: 0xffff0000,
};

/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export const VoxelByte = {
 setId(id: number, value: number) {
  return (value & ~(0xffff << 16)) | (id << 16);
 },

 getId(value: number) {
  return (value & (0xffff << 16)) >> 16;
 },

 decodeLightFromVoxelData(voxelData: number) {
  return voxelData & 0xffff;
 },
 encodeLightIntoVoxelData(voxelData: number, encodedLight: number) {
  return (voxelData & ~0xffff) | encodedLight;
 },

 decodeLevelFromVoxelData(stateData: number) {
  return stateData & voxelStateMasks.level;
 },
 encodeLevelIntoVoxelData(stateData: number, level: number) {
  return (stateData & ~voxelStateMasks.level) | level;
 },

 decodeLevelStateFromVoxelData(stateData: number) {
  return (stateData & voxelStateMasks.levelState) >> 4;
 },
 encodeLevelStateIntoVoxelData(stateData: number, levelState: number) {
  return (stateData & ~voxelStateMasks.levelState) | (levelState << 4);
 },

 getShapeState(voxelData: number) {
  return (voxelData & voxelStateMasks.shapeState) >> 6;
 },
 setShapeState(voxelData: number, shapeState: number) {
  return (voxelData & ~voxelStateMasks.shapeState) | (shapeState << 6);
 },
};
