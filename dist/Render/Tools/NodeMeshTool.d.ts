import type { ConstructorTextureData, RawVoxelData } from "Meta/index.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
import { VoxelEntityTool } from "./VoxelEntityTool.js";
import { TextureEntityTool } from "./TextureEntityTool.js";
export declare class NodeMeshTool extends LocationBoundTool {
    constructor();
    texture: {
        build: (textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray, onDone: (mesh: TextureEntityTool | false) => void) => void;
        buildAsync(textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray): Promise<unknown>;
    };
    voxel: {
        dataTool: DataTool;
        build: (voxelData: RawVoxelData, onDone: (mesh: VoxelEntityTool | false) => void) => void;
        buildAsync(voxelData: RawVoxelData): Promise<VoxelEntityTool | false>;
    };
}
