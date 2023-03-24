import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
export declare class SimpleLiquidConstructor extends VoxelConstructor {
    id: string;
    textureData: [ConstructorTextureData, ConstructorTextureData];
    textures: number[];
    constructor(id: string, textureData: [ConstructorTextureData, ConstructorTextureData]);
    process(tool: VoxelMesherDataTool): void;
    onTexturesRegistered(textureManager: typeof TextureManager): void;
}
