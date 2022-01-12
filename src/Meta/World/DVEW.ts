import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import type { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";
import type { VoxelPallet } from "Meta/WorldData/World.types";
import type { BuilderManagerInterface } from "./BuilderManager/BuilderManager";
import type { TextureManagerInterface } from "./Textures/TextureManager.interface";
import type { WorldDataInterface } from "./WorldData/WorldData.types";
import type { WorldGenerationInterface } from "./WorldGeneration/WorldGeneration.interface";

export interface DVEW {
 textureManager: TextureManagerInterface;
 voxelManager: VoxelManagerInterface;
 voxelHelper: VoxelHelperInterface;
 worldData: WorldDataInterface;
 worldGeneration : WorldGenerationInterface;
 builderManager: BuilderManagerInterface;

 $INIT(data: {
  voxelPalletMode : "per-chunk" | "global",
  globalVoxelPallet ?: VoxelPallet;
  onReady: Function;
  onMessage: (message: string, data: any[]) => void;
 }): void;

 buildChunk(chunkX: number, chunkZ: number): boolean;
 removeChunk(chunkX: number, chunkZ: number): boolean;
}
