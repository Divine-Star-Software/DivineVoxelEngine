import { VoxelPallet } from "Meta/WorldData/World.types";

export interface WorldGenerationInterface {
 addToGlobalVoxelPallet(id: string, voxleStateData: any[]): void;
 getVoxelIdFromGlobalPallet(id : string) : number;
 getGlobalVoxelPallet(): VoxelPallet;

}
