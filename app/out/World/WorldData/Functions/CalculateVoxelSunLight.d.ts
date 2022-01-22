import { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelPallet } from "Meta/WorldData/World.types";
import { WorldData } from "../WorldData";
export declare function CalculateVoxelRGBLight(this: WorldData, voxel: VoxelInteface, voxelData: any[], voxelPallet: VoxelPallet, lightTemplate: number[], exposedFaces: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): void;
export declare function VoxelSunLightMixCalc(this: WorldData, voxelData: any[], voxel: VoxelInteface, voxelPallet: VoxelPallet, chunkX: number, chunkY: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, checkSet: number[]): number;
