import type { Mesh } from "@babylonjs/core";
import type { ConstructorTextureData, RawVoxelData } from "Meta/index.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
export declare class NodeMeshTool extends LocationBoundTool {
    constructor();
    texture: {
        build: (textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray, onDone: (mesh: Mesh | false) => void) => void;
        buildAsync(textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray): Promise<unknown>;
    };
    voxel: {
        dataTool: DataTool;
        build: (voxelData: RawVoxelData, onDone: (mesh: Mesh | false) => void) => void;
        buildAsync(voxelData: RawVoxelData): Promise<Mesh | false>;
    };
}
