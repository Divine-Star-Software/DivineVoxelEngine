import { VoxelData } from "./Voxel.types";
export type VoxelManagerInterface = {
    getVoxelData(id: string): VoxelData;
};
