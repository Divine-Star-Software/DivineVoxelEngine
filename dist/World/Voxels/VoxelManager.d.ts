import { VoxelHooks, VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";
export declare class VoxelManager implements VoxelManagerInterface {
    voxels: Record<string, VoxelInteface>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    setShapeMap(shapeMap: Record<string, number>): void;
    setFluidShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelInteface;
    registerVoxelData(voxel: VoxelInteface): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
}
