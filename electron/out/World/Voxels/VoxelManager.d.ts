import { DivineVoxelEngineWorld } from "index";
import { VoxelHooks, VoxelData } from "Meta/Voxels/Voxel.types";
export declare class VoxelManager {
    private DVEW;
    voxels: Record<string, VoxelData>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    constructor(DVEW: DivineVoxelEngineWorld);
    setShapeMap(shapeMap: Record<string, number>): void;
    setFluidShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelData;
    registerVoxelData(voxel: VoxelData): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
}
