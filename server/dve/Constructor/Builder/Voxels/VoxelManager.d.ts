import type { VoxelHooks, VoxelConstructorObject } from "Meta/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelObjects: Record<string, VoxelConstructorObject>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    setShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelConstructorObject;
    registerVoxel(voxel: VoxelConstructorObject): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
};
