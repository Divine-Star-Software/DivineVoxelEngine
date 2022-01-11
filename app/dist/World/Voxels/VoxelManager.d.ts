import { VoxelInteface } from "Meta/Contents/World/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/Contents/World/Voxels/VoxelManager.interface";
export declare class VoxelManager implements VoxelManagerInterface {
    voxels: Record<string, VoxelInteface>;
    getVoxel(id: string): VoxelInteface;
    registerVoxelData(voxel: VoxelInteface): void;
}
