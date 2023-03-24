import type { ConstructorTextureData, DirectionNames } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
export declare class SimpleBoxVoxelConstructor extends VoxelConstructor {
    id: string;
    textureData: ConstructorTextureData | Record<DirectionNames, ConstructorTextureData>;
    textures: number[];
    constructor(id: string, textureData: ConstructorTextureData | Record<DirectionNames, ConstructorTextureData>);
    process(tool: VoxelMesherDataTool): void;
    onTexturesRegistered(textureManager: typeof TextureManager): void;
}
