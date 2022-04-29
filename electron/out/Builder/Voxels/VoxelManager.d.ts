import type { DivineVoxelEngineBuilder } from "index";
import { VoxelData } from "Meta/World/Voxels/Voxel.types";
export declare class VoxelManager {
    private DVEB;
    voxelData: Record<string, VoxelData>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    constructor(DVEB: DivineVoxelEngineBuilder);
    setShapeMap(shapeMap: Record<string, number>): void;
    setFluidShapeMap(shapeMap: Record<string, number>): void;
    shapMapIsSet(): boolean;
    fluidShapMapIsSet(): boolean;
    getVoxel(id: string): VoxelData;
    registerVoxelData(voxel: VoxelData): void;
}
