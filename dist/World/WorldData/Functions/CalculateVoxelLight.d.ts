import type { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import type { WorldData } from "../WorldData";
export declare function CalculateVoxelLight(this: WorldData, voxel: VoxelInteface, voxelData: number, lightTemplate: number[], exposedFaces: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): void;
export declare function VoxelLightMixCalc(this: WorldData, voxelLigtValue: number, voxel: VoxelInteface, chunkX: number, chunkY: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, checkSet: number[]): number;
