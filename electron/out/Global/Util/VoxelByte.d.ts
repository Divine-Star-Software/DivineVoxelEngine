/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export declare const VoxelByte: {
    setId(id: number, value: number): number;
    getId(value: number): number;
    decodeLightFromVoxelData(voxelData: number): number;
    encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    decodeLevelFromVoxelData(stateData: number): number;
    encodeLevelIntoVoxelData(stateData: number, level: number): number;
    decodeLevelStateFromVoxelData(stateData: number): number;
    encodeLevelStateIntoVoxelData(stateData: number, levelState: number): number;
    getShapeState(voxelData: number): number;
    setShapeState(voxelData: number, shapeState: number): number;
};
