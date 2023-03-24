import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
export declare class SimpleStairVoxelConstructor extends VoxelConstructor {
    id: string;
    textureData: ConstructorTextureData;
    texture: number;
    constructor(id: string, textureData: ConstructorTextureData);
    process(tool: VoxelMesherDataTool): void;
    onTexturesRegistered(textureManager: typeof TextureManager): void;
}
