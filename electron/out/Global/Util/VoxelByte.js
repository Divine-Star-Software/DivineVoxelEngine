/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export const VoxelByte = {
    setId(id, value) {
        return (value & ~(0xffff << 16)) | (id << 16);
    },
    getId(value) {
        return (value & (0xffff << 16)) >> 16;
    },
    decodeLightFromVoxelData(voxelData) {
        return voxelData & 0xffff;
    },
    encodeLightIntoVoxelData(voxelData, encodedLight) {
        return (voxelData & ~(0xffff << 0)) | (encodedLight << 0);
    }
};
