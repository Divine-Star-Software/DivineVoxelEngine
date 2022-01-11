import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import type { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";
import { BuilderManagerInterface } from "./BuilderManager/BuilderManager";
import type { TextureManagerInterface } from "./Textures/TextureManager.interface";
import { WorldDataInterface } from "./WorldData/WorldData.types";
export interface DVEW {
    textureManager: TextureManagerInterface;
    voxelManager: VoxelManagerInterface;
    voxelHelper: VoxelHelperInterface;
    worldData: WorldDataInterface;
    builderManager: BuilderManagerInterface;
    $INIT(data: {
        onReady: Function;
        onMessage: (message: string, data: any[]) => void;
    }): void;
    buildChunk(chunkX: number, chunkZ: number): boolean;
    removeChunk(chunkX: number, chunkZ: number): boolean;
}
