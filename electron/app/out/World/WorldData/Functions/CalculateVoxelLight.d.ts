import { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelPalette } from "Meta/WorldData/World.types";
import { WorldData } from "../WorldData";
export declare function CalculateVoxelLight(this: WorldData, voxel: VoxelInteface, voxelData: any[], voxelPalette: VoxelPalette, RGBlightTemplate: number[], exposedFaces: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): void;
export declare function VoxelLightMixCalc(this: WorldData, airData: any[], voxel: VoxelInteface, voxelPalette: VoxelPalette, chunkX: number, chunkY: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, checkSet: number[]): number;
