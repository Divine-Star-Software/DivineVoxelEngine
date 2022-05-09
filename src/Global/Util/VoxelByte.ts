/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export const VoxelByte =  {
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
  return (voxelData & ~(0xffff << 0)) | (encodedLight << 0);
 }
}
