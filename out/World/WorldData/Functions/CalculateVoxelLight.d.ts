import { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
import { WorldData } from "../WorldData";
export declare function CalculateVoxelLight(this: WorldData, voxel: VoxelInteface, voxelData: any[], voxelPallet: VoxelPallet, lightTemplate: number[], exposedFaces: number[], chunkX: number, chunkZ: number, x: number, y: number, z: number): void;
export declare function VoxelLightMixCalcO(this: WorldData, voxel: VoxelInteface, voxelPallet: VoxelPallet, blockX: number, blockY: number, blockZ: number, x: number, y: number, z: number): 1 | 0.75;
export declare function VoxelLightMixCalc(this: WorldData, voxelData: any[], voxel: VoxelInteface, voxelPallet: VoxelPallet, blockX: number, blockY: number, blockZ: number, checkSet: number[]): number;
