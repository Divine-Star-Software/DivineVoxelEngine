import type { VoxelInteface } from "./Voxel.types";

export interface VoxelManagerInterface {
 getVoxel(id: string): VoxelInteface;

 registerVoxelData(voxel: VoxelInteface): void;
}
