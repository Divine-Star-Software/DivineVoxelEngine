import { DivineVoxelEngineWorld } from "index";
import { VoxelHooks, VoxelInteface } from "Meta/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/Voxels/VoxelManager.interface";
export declare class VoxelManager implements VoxelManagerInterface {
    private DVEW;
    voxels: Record<string, VoxelInteface>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    constructor(DVEW: DivineVoxelEngineWorld);
    setShapeMap(shapeMap: Record<string, number>): void;
    setFluidShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelInteface;
    registerVoxelData(voxel: VoxelInteface): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
}
