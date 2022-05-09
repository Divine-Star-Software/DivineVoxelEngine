/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export declare const VoxelByte: {
    setId(id: number, value: number): number;
    getId(value: number): number;
    decodeLightFromVoxelData(voxelData: number): number;
    encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
};
