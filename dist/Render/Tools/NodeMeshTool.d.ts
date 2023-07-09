import type { ConstructorTextureData, RawVoxelData } from "Meta/index.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
import { EntityTool } from "./EntityTool.js";
export declare class NodeMeshTool extends LocationBoundTool {
    constructor();
    texture: {
        build: (textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray, onDone: (mesh: EntityTool | false) => void) => void;
        buildAsync(textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray): Promise<false | EntityTool>;
    };
    voxel: {
        dataTool: DataTool;
        build: (voxelData: RawVoxelData, onDone: (mesh: EntityTool | false) => void) => void;
        buildAsync(voxelData: RawVoxelData): Promise<EntityTool | false>;
    };
}
