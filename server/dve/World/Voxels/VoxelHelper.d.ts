import type { VoxelInteface, VoxelProcessData } from "Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import { DivineVoxelEngineWorld } from "index.js";
export declare class VoxelHelper implements VoxelHelperInterface {
    DVEW: DivineVoxelEngineWorld;
    constructor(DVEW: DivineVoxelEngineWorld);
    getTrueShapeId(id: string): number;
    getTrueFluidShapeId(id: string): number;
    processVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void;
    calculateVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void;
    calculateVoxelAO(data: VoxelProcessData, voxel: VoxelInteface): void;
}
