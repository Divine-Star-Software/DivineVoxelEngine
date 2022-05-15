import type { VoxelHooks, VoxelBuilderThreadObject } from "Meta/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelObjects: Record<string, VoxelBuilderThreadObject>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    setShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelBuilderThreadObject;
    registerVoxel(voxel: VoxelBuilderThreadObject): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
};
