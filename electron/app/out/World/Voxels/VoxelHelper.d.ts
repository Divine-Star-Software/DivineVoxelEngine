import type { VoxelInteface, VoxelProcessData } from "Meta/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/Voxels/VoxelHelper.interface";
import { DivineVoxelEngineWorld } from "index.js";
export declare class VoxelHelper implements VoxelHelperInterface {
    DVEW: DivineVoxelEngineWorld;
    constructor(DVEW: DivineVoxelEngineWorld);
    getTrueShapeId(id: string): any;
    getTrueFluidShapeId(id: string): any;
    processVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void;
    calculateVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void;
    calculateVoxelAO(data: VoxelProcessData, voxel: VoxelInteface): void;
}
