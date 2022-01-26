import type { Util } from "Global/Util.helper";
import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import type { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";
import type { BuilderManagerInterface } from "./BuilderManager/BuilderManager.interface";
import type { TextureManagerInterface } from "./Textures/TextureManager.interface";
import type { WorldDataInterface } from "./WorldData/WorldData.types";
import type { WorldGenerationInterface } from "./WorldGeneration/WorldGeneration.interface";
export declare type DVEWInitData = {
    voxelPaletteMode: "per-chunk" | "global";
    onReady: Function;
    onMessage: (message: string, data: any[]) => void;
    onRestart?: Function;
};
export interface DVEW {
    textureManager: TextureManagerInterface;
    voxelManager: VoxelManagerInterface;
    voxelHelper: VoxelHelperInterface;
    worldData: WorldDataInterface;
    worldGeneration: WorldGenerationInterface;
    builderManager: BuilderManagerInterface;
    UTIL: Util;
    $INIT(data: DVEWInitData): Promise<void>;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildFluidMesh(): void;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
}
