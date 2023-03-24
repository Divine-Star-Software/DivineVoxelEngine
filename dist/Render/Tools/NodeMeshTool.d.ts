import type { Mesh } from "@babylonjs/core";
import type { ConstructorTextureData } from "Meta/index.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
export declare class NodeMeshTool extends LocationBoundTool {
    buildTexture(textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray, onDone: (mesh: Mesh | false) => void): void;
    asyncBuildTexture(textureIdData: ConstructorTextureData, textureData: Uint8ClampedArray): Promise<unknown>;
}
