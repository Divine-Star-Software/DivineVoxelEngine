import type { DivineVoxelEngineBuilder } from "index";
import { VoxelHooks, VoxelBuilderThreadObject } from "Meta/Voxels/Voxel.types";
export declare class VoxelManager {
    private DVEB;
    voxelObjects: Record<string, VoxelBuilderThreadObject>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    constructor(DVEB: DivineVoxelEngineBuilder);
    setShapeMap(shapeMap: Record<string, number>): void;
    setFluidShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelBuilderThreadObject;
    registerVoxel(voxel: VoxelBuilderThreadObject): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
}
