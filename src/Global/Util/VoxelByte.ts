const voxelStateMasks = {
 level: 0b1111_11,
 shapeState: 0b1111_1111_11_00_0000,
 extraVoxelId: 0xffff,
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
  return (voxelData & (0xffff << 0)) >> 0;
 },
 encodeLightIntoVoxelData(voxelData: number, encodedLight: number) {
  return (voxelData & ~(0xffff << 0)) | (encodedLight << 0);
 },

 getShapeState(voxelData: number) {
  return (voxelData & voxelStateMasks.shapeState) >> 6;
 },
 setShapeState(voxelData: number, shapeState: number) {
  return (voxelData & ~voxelStateMasks.shapeState) | (shapeState << 6);
 },
};
