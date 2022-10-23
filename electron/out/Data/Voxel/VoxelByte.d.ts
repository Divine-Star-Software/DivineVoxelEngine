/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export declare const VoxelReader: {
    setId(id: number, value: number): number;
    getId(value: number): number;
    getLight(voxelData: number): number;
    setLight(voxelData: number, encodedLight: number): number;
    getLevel(stateData: number): number;
    setLevel(stateData: number, level: number): number;
    getLevelState(stateData: number): number;
    setLevelState(stateData: number, levelState: number): number;
    getShapeState(voxelData: number): number;
    setShapeState(voxelData: number, shapeState: number): number;
};
