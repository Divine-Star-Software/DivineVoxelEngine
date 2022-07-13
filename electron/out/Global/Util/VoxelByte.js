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
    setId(id, value) {
        return (value & ~(0xffff << 16)) | (id << 16);
    },
    getId(value) {
        return (value & (0xffff << 16)) >> 16;
    },
    decodeLightFromVoxelData(voxelData) {
        return (voxelData & (0xffff << 0)) >> 0;
    },
    encodeLightIntoVoxelData(voxelData, encodedLight) {
        return (voxelData & ~(0xffff << 0)) | (encodedLight << 0);
    },
    getShapeState(voxelData) {
        return (voxelData & voxelStateMasks.shapeState) >> 6;
    },
    setShapeState(voxelData, shapeState) {
        return (voxelData & ~voxelStateMasks.shapeState) | (shapeState << 6);
    },
};
