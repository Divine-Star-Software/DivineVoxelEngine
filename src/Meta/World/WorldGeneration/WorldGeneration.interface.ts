import { VoxelPalette } from "Meta/WorldData/World.types";

export interface WorldGenerationInterface {
 addToGlobalVoxelPalette(id: string, voxleStateData: any[]): void;
 getVoxelIdFromGlobalPalette(id : string) : number;
 getGlobalVoxelPalette(): VoxelPalette;

}
